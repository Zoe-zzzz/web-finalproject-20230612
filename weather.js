var lat1=0,lon1=0;
let weartherAPI_URL="http://api.openweathermap.org/data/2.5/weather?";
let weatherMapAPIKey="2fc3a1bbf75edff6a8c7d705c6bdcadd";
$(function(){
    load();
});

function load()
{
    if(navigator.geolocation==undefined)
    {
        alert("Fail to get location!");
        return;
    }
    let settings={
        enableHighAccuracy:true
    };
    navigator.geolocation.getCurrentPosition(result2,error,settings);
}
function result2(position){
    let thisCoords=position.coords;
    console.log(`Location:${thisCoords.latitude},${thisCoords.longitude}`);
    $.getJSON(weartherAPI_URL,{
        lat:thisCoords.latitude,
        lon:thisCoords.longitude,
        appid:weatherMapAPIKey,
        units:'metric',
        lang:'zh_tw'
    })
    .done(function(data){
        console.log(data);
        $(".cityname").text(data.name);
        $("#img").attr("src","https://openweathermap.org/img/wn/"+data.weather[0].icon+"@2x.png");
    })
    .fail(function(){console.log("Error")})
    .always(function(){console.log("Always")});
    //window.location.href=`https://maps.google.com.tw?q=${thisCoords.latitude},${thisCoords.longitude}`;
}
function error(){
    alert(err);
}
