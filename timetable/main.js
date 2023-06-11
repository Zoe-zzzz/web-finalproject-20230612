let moviesource=[
    {name:"",time:""},
    {name:"Avatar",src:"image/IMG_5841.JPG",time:162},
    {name:"Dune",src:"image/IMG_5842.JPG",time:155},
    {name:"To All the Boy I've Loved Before",src:"image/IMG_5840.JPG",time:99},
    {name:"Little Woman",src:"image/IMG_5839.JPG",time:135},
    {name:"Fresh",src:"image/IMG_5838.JPG",time:117},
    {name:"Before Sunrise",src:"image/IMG_5836.JPG",time:105},
    {name:"Everything Everywhere All at Once",src:"image/IMG_5837.JPG",time:140},
    {name:"Enola Holmes",src:"image/IMG_5833.JPG",time:123},
    {name:"Call Me By Your Name",src:"image/IMG_5835.JPG",time:130},
    {name:"Princess Mononoke",src:"image/IMG_5834.JPG",time:124}
];
var reservation={title:"",name:"",date:"",time:"",seat:[],ticket};
var ticket=0;
var ticket2=0;
var tt;
var court=["A","B","C","D","E","F","G"];
$(function(){
    $("#firstdate").val(nowday);
    $("#firstdate").attr("max",maxday);
    $("#firstdate").attr("min",nowday);
    console.log(nowday);
    console.log(maxday);
    for(let x=0;x<moviesource.length;x++)
    {
        $("#moviename").append(
            `<option value='${x}'>${moviesource[x].name}</option>`
        );
    }
    $("#moviename").on("change",loadOnlyFilm);
    // $("button").on("change",loadserverdata);
});
function loadOnlyFilm(){
    if(this.value==0)return;
    $("#courseTable").empty();
        // console.log(this.value);
        $("#onlyimg").attr("src",moviesource[this.value].src);
        $("#onlyh").text(moviesource[this.value].name);
        var tt=[0,moviesource[this.value].time];
        checktime(tt);
        $("#onlyp").text("Movie Duration : "+tt[0]+" h "+tt[1]+" m ");

        let url="https://zs12-op04nty-dfsfjifjeohfjewpjqodj.azurewebsites.net/movie/"+this.value;
        // console.log(this.value);
        $.getJSON(url)
        .done(function(msg){
            //無關的方便轉換
            $("#onlyh").text(msg.title);
            reservation.title=msg.title;
            //放映廳&&場次
            // console.log(msg.title);
            console.log($("#firstdate").val());
            findweek($("#firstdate").val());
            for(let x=0;x<msg.DateAndTime[week].room.length;x++){//
                $("#courseTable").append(`<h3>${msg.DateAndTime[week].room[x]}</h3><br>`);
                
                for(let z=0;z<msg.DateAndTime[week].time[x].length;z++)
                {
                    
                    $("#courseTable").append(
                    `<input class="ch" type="button" value="${msg.DateAndTime[week].time[x][z]}" onclick="booking(value)">`//``可穿插固定內容與變數，變數需加$
                    );
                }
                $("#courseTable").append(`<br><br><br><br>`);
            }
        })
        .fail(function(msg){
            console.log("Fail!");
        });

    
}
function loadserverdata(){
    if(this.value==0)return;

}

function checktime(x){
    while(x[1]>59)
    {
        x[0]++;
        x[1]-=60;
    }
    while(x[0]>23)
    {
        x[0]-=24;
    }
}
function booking(time){
    console.log(time);
    $("#bookingpage").empty();
    $("#seattable").css("display","block");
    findthebooking();
    $("#bookingpage").append(
        `<div id="bd">
        <img id="onlyimg" src="${$("#onlyimg")[0].src}">
        <h3>${$("#onlyh").text()}</h3>
        </div>
        `+
        `<div id="bd2">
        <h2>Informaton:</h2>
        <h3>Date : ${$("#firstdate").val()}
        <h3>Time : ${time}
        <h3>Choose your seat:
        </div>
        <div id="bd3">
        <h3>Your name:</h3>
        <input type="text" class="namebox">
        </div>
        `
    )
    reservation.date=$("#firstdate").val();
    reservation.time=time;
    tt=time;
    console.log(reservation);
    $("#bookingpage").append(
        `<div id="bb"><button class="bb2 bb2b">Back</button><button class="bb2 bb2n">Next</button><div>`
    )
    $("#bookingpage").css("display","block");
    
    $(".seat").on("click",findseat);
    $(".bb2b").on("click",back);
    $(".bb2n").on("click",next);
}

function findseat(){
    if($(this).is(".color"))
    {
        ticket--;
        $(this).removeClass("color");
    }
    else
    {
        ticket++;
        $(this).addClass("color");
    }
    
}
function back(){
    $(".seat").each(function(){
        if($(this).is(".color"))
       {
        ticket=0;
        $(this).removeClass("color");
       }
    });
    $("#seattable").css("display","none");
    $("#bookingpage").css("display","none");
    $(".seat").on("click",findseat);
    location.reload();
}
function next(){
    if(ticket==0||$(".namebox").val()=="")
    {
        alert("Please choose a seat or enter your name");
        return false;
    }
    reservation.name=$(".namebox").val();
    reservation.ticket=ticket;
    console.log(reservation);
    $("#bookingpage").empty();
    $("#bookingpage").append(
        `<h3>Early Bird Ticket:</h3>
        <select class="ticketselect s">Early Bird Ticket</select><br>
        <h3>Adult Ticket:</h3>
        <select class="ticketselect1 s">Adult Ticket</select><br>
        <h3>Concession Ticket:</h3>
        <select class="ticketselect2 s">Concession Ticket</select><br>
        <h3 class="total">Total:</h3>
        
        <button class="bbb">Confirm</button>
        `
    )
    addtickettype($(".ticketselect"));
    addtickettype($(".ticketselect1"));
    addtickettype($(".ticketselect2"));
    $("table").css("left","40%");
    $(".s").on("change",finaltotal);
    $(".bbb").on("click",bookcomplete);
}

function addtickettype(e){
    for(var x=0;x<=ticket;x++)
    {
        $(e).append(
            `<option value='${x}'>${x}</option>`
        );
    }
}

function finaltotal(){
    var money=0;
    var to="Total : ";
    var cm=$(".ticketselect").val()*1+$(".ticketselect1").val()*1+$(".ticketselect2").val()*1;
    ticket2=cm;
    if(cm>ticket)
    {
        $(".s").val(0);
        console.log("out of range");
    }
    else
    {
        money=$(".ticketselect").val()*220+$(".ticketselect1").val()*290+$(".ticketselect2").val()*270;
    }
    $(".total").text(to+money);
}

function bookcomplete()
{
    ticket2=$(".ticketselect").val()*1+$(".ticketselect1").val()*1+$(".ticketselect2").val()*1;
    console.log(ticket);
    if(ticket!=ticket2)
    {
        return false;
    }
    else{
        $(".color").each(function(){
            var i=$(this).parent().parent().find("tr").index($(this).parent()[0]);
            var i2=$(this).index(),ii;
            if(i2<10)
            {
                ii="0"+i2;
            }
            else
            {
                ii=i2;
            }
            console.log(i+","+ii);
            reservation.seat+=i+""+ii+"";
            $(this).removeClass("color");
            $(this).addClass("booking");
        });
        console.log(reservation.seat);
        let url="https://zs12-op04nty-dfsfjifjeohfjewpjqodj.azurewebsites.net/reservation/";
        $.post(url,{name:reservation.name,title:reservation.title,date:reservation.date,time:reservation.time,ticket:reservation.ticket,seat:reservation.seat}).
        done(function(msg) {
            console.log(msg);
        }).
        fail(function(msg) {
            console.log("Fail!");
        });
        ticket2=0;
        ticket=0;
        alert("booking complete!");
        location.reload();
    }
}

function findthebooking(){

    let urll="https://zs12-op04nty-dfsfjifjeohfjewpjqodj.azurewebsites.net/reservation";
    $.getJSON(urll)
    .done(function(data){
        // console.log(msg[0]."seat[0]");
        console.log(data);
        for(let c=0;c<data.length;c++)
        {
            
            if(data[c].title==$("#onlyh").text()&&data[c].date==$("#firstdate").val()&&data[c].time==tt)
            {
                // console.log("hhh");
                $(".seat").each(function(){
                    var i=$(this).parent().parent().find("tr").index($(this).parent()[0]);
                    var ii=$(this).index();
                    var stt=data[c].seat;
                    for(let d=0;d<data[c].ticket;d++)
                    {
                        var sttt=stt%1000;
                        stt=parseInt(stt/1000);
                        console.log(sttt);
                        if((i*100+ii)==sttt)
                        {
                            $(this).addClass("booking");
                        }
                    }
                });
            }
        }
    })
    .fail(function(msg){
        console.log("Fail!");
    });
}