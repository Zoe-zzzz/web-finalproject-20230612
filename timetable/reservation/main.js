let moviesource=[
    {name:"Avatar",src:"image/IMG_5841.JPG"},
    {name:"Dune",src:"image/IMG_5842.JPG"},
    {name:"To All the Boy I've Loved Before",src:"image/IMG_5840.JPG"},
    {name:"Little Woman",src:"image/IMG_5839.JPG"},
    {name:"Fresh",src:"image/IMG_5838.JPG"},
    {name:"Before Sunrise",src:"image/IMG_5836.JPG"},
    {name:"Everything Everywhere All at Once",src:"image/IMG_5837.JPG"},
    {name:"Enola Holmes",src:"image/IMG_5833.JPG"},
    {name:"Call Me By Your Name",src:"image/IMG_5835.JPG"},
    {name:"Princess Mononoke",src:"image/IMG_5834.JPG"}
];
$(function(){
    $("#go").on("click",load);
});
let position=["","A","B","","C","D","E","F","G","H","","I","J"]
function load(){
    // console.log("s");
    $("#result").empty();
    var text=$("#name").val();
    let url="https://zs12-op04nty-dfsfjifjeohfjewpjqodj.azurewebsites.net/reservation/";
        // console.log(this.value);
        $.getJSON(url)
        .done(function(msg){
            var r=0;
            for(let x=0;x<msg.length;x++){
                
                var all=msg[x].date,month=0,date=0,year=0;
                date=all.substr(-2)*1;
                month=all.substr(-5,2)*1;
                year=all.substr(-10,4)*1;
                var today=new Date;
                
                if(!moreorless(year,month,date,today.getFullYear(),today.getMonth()+1,today.getDate()))
                {
                    console.log(msg[x].id);
                    let url="https://zs12-op04nty-dfsfjifjeohfjewpjqodj.azurewebsites.net/reservation/"+msg[x].id;
                    $.ajax({
                        url: url,
                        type: 'DELETE',
                        success: function(data) {
                            console.log("success!");
                        }
                    });
                    continue;
                }
                if(msg[x].name==text)
                {
                    console.log("kkk");
                    var date="Date : "+msg[x].date,time="Time : "+msg[x].time,title="Title : "+msg[x].title,seat="Seat : ",sttt=msg[x].seat,stt1,stt2,i=0;
                    for(let c=0;c<msg[x].ticket;c++)
                    {
                        stt1=sttt%1000;
                        stt2=(stt1%100)*1;
                        stt1=parseInt(stt1/100)-1;
                        seat+=position[stt2]+stt1+" ";
                        sttt=parseInt(sttt/1000);
                    }
                    for(t=0;t<moviesource.length;t++)
                    {
                        if(msg[x].title==moviesource[t].name)
                        {
                            r++;
                            i=t;
                            break;
                        }
                    }
                    $("#result").append(
                        `<hr><div class="button"><img class="ii" src="${moviesource[i].src}"><h4 class="inf">${title}</h4><h4 class="inf">${date}</h4><h4 class="inf">${time}</h4><h4 class="inf">${seat}</h4><input class="bgb" type="button" value="delete" onclick="makedelete(${msg[x].id})"></div>`
                    );
                }
            }
        })
        .fail(function(msg){
            console.log("Fail!");
        });
}
function makedelete(e)
{
    let url="https://zs12-op04nty-dfsfjifjeohfjewpjqodj.azurewebsites.net/reservation/"+e;
    $.ajax({
        url: url,
        type: 'DELETE',
        success: function(data) {
            alert("Success!");
            $("#result").empty();
        }
    });
}
function moreorless(y,m,d,yt,mt,dt)
{
    if(y<yt)
    {
        return false;
    }
    else if(y>yt)
    {
        return true;
    }
    else
    {
        if(m<mt)
        {
            return false;
        }
        else if(m>mt)
        {
            return true;
        }
        else{
            if(d<dt)
            {
                return false;
            }
            else
            {
                return true;
            }
        }
    }
}