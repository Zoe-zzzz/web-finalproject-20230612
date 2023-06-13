let address=[{name:"桃園",lat:24.9910989,long:121.3074997,add:"330桃園市桃園區中正路61號9F-12F"},
    {name:"高雄",lat:22.6130672,long:120.3014837,add:"802高雄市苓雅區三多四路21號13-15樓"},
    {name:"台中",lat:24.1646419,long:120.6420433,add:"407台中市西屯區臺灣大道三段251號13樓"},
    {name:"台北",lat:25.0356037,long:121.5647001,add:"110台北市信義區松壽路20號"},
    {name:"台南",lat:22.9953658,long:120.2034945,add:"700台南市中西區公園路60號"},
]
let weartherAPI_URL="https://api.openweathermap.org/data/2.5/weather?";
let weatherMapAPIKey="2fc3a1bbf75edff6a8c7d705c6bdcadd";
$(function(){
    set();
    $("#bb").on("click", getLocation);
});
function getLocation(){
    if(navigator.geolocation==undefined)
    {
        alert("Fail to get location!");
        return;
    }
    let settings={
        enableHighAccuracy:true
    };
    navigator.geolocation.getCurrentPosition(result,error,settings);
}
function result(position){
    let thisCoords=position.coords;
    $("#result").css("display","block");
    $("#result").empty();
    console.log(`Location:${thisCoords.latitude},${thisCoords.longitude}`);
    let lastone=Math.abs(thisCoords.latitude-address[0].lat),finalmax=0;
    for(let x=1;x<address.length;x++)
    {
        if(Math.abs(thisCoords.latitude-address[x].add)<lastone)
        {
            finalmax=x;
        }
    }
    console.log(`最近${address[finalmax].name}`)
    $("#result").append(
        `<p>離你最近 : ${address[finalmax].name}分店</p>`
    )
    $.getJSON(weartherAPI_URL,{
        lat:address[finalmax].lat,
        lon:address[finalmax].long,
        appid:weatherMapAPIKey,
        units:'metric',
        lang:'zh_tw'
    })
.done(function(data){
    console.log(data);
    $("#result").append(
        `<p>氣溫：${data.main.temp_min} ~ ${data.main.temp_max}<br>
        體感:${data.main.feels_like}</p>`
    );
    $("#result").append(
        `<p><img src='https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png'>${data.weather[0].description}</p>`
    );
    if(data.main.feels_like>30)
    {
        $("#result").append(
            `<p>溫馨提示:請多喝水</p>`
        );
    }
    if(data.weather[0].description=="下雨")
    {
        $("#result").append(
            `<p>請記得帶傘</p>`
        );
    }
})
.fail(function(){console.log("Error")})
.always(function(){console.log("Always")});
    //window.location.href=`https://maps.google.com.tw?q=${thisCoords.latitude},${thisCoords.longitude}`;
}
function error(){
    alert(err);
}
function set(){
    for(let x=0;x<address.length;x++)
    {
        $(".branch").append(`
        <br><div class="button"><h4 class="inf">${address[x].name}分店 : ${address[x].add}<input class="bgb" type="button" value="Go&raquo" onclick="gotomap(${address[x].lat},${address[x].long})"></h4></div>`)
    }
}
function gotomap(lat,long){
    window.location.href=`https://maps.google.com.tw?q=${lat},${long}`;
}