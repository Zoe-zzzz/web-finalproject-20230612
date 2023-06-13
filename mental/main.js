var currentquestion=0;
var nTiger = 0;
var nPeacock = 0; // 孔雀
var nKoala = 0;
var nOwl = 0;
var nChameleon = 0; // 變色龍
$("#startbutton").on("click",function(){
    $("#startdiv").css("display","block");
    $("#startbutton").css("display","none");
    $("#question").text(question[currentquestion]);
});

$("#next").on("click",function(){ 
        var checkhavechoice=0;
        $.each($(":radio"),function(i,val){
            //console.log(i+":"+val.checked);
            if(val.checked)
            {
                checkhavechoice++;
                //console.log(valueradio);
                if(currentquestion==4||currentquestion==9||currentquestion==13||currentquestion==17||currentquestion==23||currentquestion==29)
                {//老虎
                    nTiger+=i+1;
                }
                if(currentquestion==2||currentquestion==5||currentquestion==12||currentquestion==19||currentquestion==21||currentquestion==28)
                {//孔雀
                    nPeacock+=i+1;
                }
                if(currentquestion==1||currentquestion==7||currentquestion==14||currentquestion==16||currentquestion==24||currentquestion==29)
                {//無尾熊
                    nKoala+=i+1;
                }
                if(currentquestion==0||currentquestion==6||currentquestion==10||currentquestion==15||currentquestion==20||currentquestion==25)
                {//貓頭鷹
                    nOwl+=i+1;
                }
                if(currentquestion==3||currentquestion==8||currentquestion==11||currentquestion==18||currentquestion==22||currentquestion==26)
                {//變色龍
                    nChameleon+=i+1;
                }
                $(this).prop("checked",false);
                console.log(currentquestion+"."+
                "老虎:"+nTiger+" "+
                "孔雀:"+nPeacock+" "+
                "無尾熊:"+nKoala+" "+
                "貓頭鷹:"+nOwl+" "+
                "變色龍:"+nChameleon+" "
                );
                return false;
                
            }
        });
        console.log("checkhavechoice="+checkhavechoice);
        if(checkhavechoice==0)
        {
            alert("你還沒選選項!");
        }
        else
        {
            currentquestion++;
            if(currentquestion==30)
            {
                // alert("跑結果");
                var a=max();
                console.log(a);
                $("#resulth").text(finalAnswers[a][0]);
                $("#resultp").text(finalAnswers[a][1]);
                $("#giveresult").css("display","block");
                $("#startdiv").css("display","none");
                if(a=="A")
                {
                    $("#A").css("display","block");
                }
                if(a=="B")
                {
                    $("#B").css("display","block");
                }
                if(a=="C")
                {
                    $("#C").css("display","block");
                }
                if(a=="D")
                {
                    $("#D").css("display","block");
                }
                if(a=="E")
                {
                    $("#E").css("display","block");
                }
            }
            else
            {
                $("#question").text(question[currentquestion]);
            }
            
        }
        
        
});
function max(){
    var findmax="";
if(nTiger>=nPeacock && nTiger>=nKoala && nTiger>=nOwl && nTiger>=nChameleon)
{
    findmax="A";
}
else if(nPeacock>=nTiger && nPeacock>=nKoala && nPeacock>=nOwl && nPeacock>=nChameleon)
{
    findmax="B";
}
else if(nKoala>=nTiger && nKoala>=nPeacock && nKoala>=nOwl && nKoala>=nChameleon)
{
    findmax="C";
}
else if(nOwl>=nTiger && nOwl>=nKoala && nOwl>=nPeacock && nOwl>=nChameleon)
{
    findmax="D";
}
else
{
    findmax="E";
}
//console.log( "max="+findmax);
return findmax;
}
$("#retest").on("click",function(){
    location.reload(true);
 });
 $("#reset").on("click",function(){
    location.reload(true);
 });