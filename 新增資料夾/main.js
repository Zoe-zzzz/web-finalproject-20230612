let mapArray,ctx,currentImgMain;
let imgMountain,imgMain,imgEnemy;
let lestImagePositionY;
const gridLength=37;
var stop=0;
var lasttime=60;
$(function(){
    mapArray=[
        //0:可以走的，1:有一座山，2:終點，3:有一個敵人
        [0,1,1,0,0,4,0,4,0,0],
        [0,0,0,1,0,0,1,0,0,3],
        [3,1,0,0,1,0,3,1,4,0],
        [0,1,0,0,0,1,0,0,0,0],
        [0,0,4,1,3,0,0,4,0,1],
        [1,0,1,0,1,1,1,1,0,0],
        [1,1,4,0,0,0,0,1,3,1],
        [1,0,0,0,4,0,1,0,0,0],
        [0,1,0,0,0,3,0,0,4,0],
        [0,3,0,4,0,1,0,1,3,2]
    ];
    
    ctx=$("#myCanvas")[0].getContext("2d");//後面接getContext為js原生語法，前面要加取第0個
    function showtime(){
        lasttime--;
        if(lasttime<1)
        {   imgangry=new Image();
            imgangry.src="image2/IMG_6028.PNG";
            ctx.drawImage(imgangry,0,0,223,255,currentImgMain.x,currentImgMain.y,gridLength,gridLength);
            lasttime=0;
            stop=1;
        }
        $("#game").text(lasttime);
    }
    setInterval(showtime,1000);
    imgMain=new Image();
    imgMain.src="image2/IMG_6010.PNG";
    
    currentImgMain={//單純的單字，可以加單引號或不用，但若有其他符號，一訂要加引號
        x:0,
        y:0
    };
    imgMain.onload=function(){//要先等圖來才能畫
         ctx.drawImage(imgMain,24,9,41,40,currentImgMain.x,currentImgMain.y,gridLength,gridLength); 
    };
     imgMountain=new Image();
     imgMountain.src="image2/PNG image(6).png";
     imgEnemy=new Image();
     imgEnemy.src="image2/IMG_6011.PNG";
     imgMountain.onload=function(){
     imgEnemy.onload=function(){
         for(var x in mapArray){
             for(var y in mapArray[x]){
                 if(mapArray[x][y]==1){
                     ctx.drawImage(imgMountain,0,160,90,145,y*gridLength,x*gridLength,gridLength,gridLength);
                 }else if(mapArray[x][y]==3){
                     ctx.drawImage(imgEnemy,10,271,39,52,y*gridLength,x*gridLength,gridLength,gridLength);
                 }
                 else if(mapArray[x][y]==4){
                    ctx.drawImage(imgMountain,0,370,90,130,y*gridLength,x*gridLength,gridLength,gridLength);
                }
             }
         }
     }
 }
});



 $(document).on("keydown",function(event){
    if(stop==1)
    {
        return false;
    }
     console.log(event.code);
     let targetImg,targetBlock,cutImagePositionX=24,cutImagePositionY;//決定臉朝哪個方向
     targetImg={
         "x":-1,
         "y":-1
     };
     targetBlock={
         "x":-1,
         "y":-1
     }
     event.preventDefault();
    
     switch(event.code){
         case "ArrowLeft":
             targetImg.x=currentImgMain.x-gridLength;
             targetImg.y=currentImgMain.y;
             lestImagePositionY=cutImagePositionY=60;//臉朝左
             break;
         case"ArrowUp":
             targetImg.x=currentImgMain.x;
             targetImg.y=currentImgMain.y-gridLength;
             lestImagePositionY=cutImagePositionY=153;//臉朝上
             break;
         case"ArrowRight":
             targetImg.x=currentImgMain.x+gridLength;
             targetImg.y=currentImgMain.y;
             lestImagePositionY=cutImagePositionY=105;//臉朝右
             break;
         case"ArrowDown":
             targetImg.x=currentImgMain.x;
             targetImg.y=currentImgMain.y+gridLength;
             lestImagePositionY=cutImagePositionY=9;//臉朝下
             break;
        case"Space":
            if(lestImagePositionY==9)
            {
                targetImg.x=currentImgMain.x;
                targetImg.y=currentImgMain.y+2*gridLength;
                cutImagePositionY=lestImagePositionY;
            }
            else if(lestImagePositionY==105)
            {
                targetImg.x=currentImgMain.x+2*gridLength;
                targetImg.y=currentImgMain.y;
                cutImagePositionY=lestImagePositionY;
            }
            else if(lestImagePositionY==153)
            {
                targetImg.x=currentImgMain.x;
                targetImg.y=currentImgMain.y-2*gridLength;
                cutImagePositionY=lestImagePositionY;
            }
            else
            {
                targetImg.x=currentImgMain.x-2*gridLength;
                targetImg.y=currentImgMain.y;
                cutImagePositionY=lestImagePositionY;
            }
            break;
         default://其他按鍵不處理
             return;
         }
         if(targetImg.x<370&&targetImg.x>=0&&targetImg.y<370&&targetImg.y>=0){//限制在9格裡
             targetBlock.x=targetImg.y/gridLength; //算出mapArray
             targetBlock.y=targetImg.x/gridLength;
         }else{
             targetBlock.x=-1; //-1 異常直 不讓它過去
             targetBlock.y=-1;
         }
         ctx.clearRect(currentImgMain.x,currentImgMain.y,gridLength,gridLength);
         if(targetBlock.x!=-1&&targetBlock.y!=-1){
             switch(mapArray[targetBlock.x][targetBlock.y]){
                 case 0:
                     $("#talkBox").text("");
                     currentImgMain.x=targetImg.x;
                     currentImgMain.y=targetImg.y;
                     break;
                 case 1:
                     $("#talkBox").text("Can't go here!");
                     //currentImgMain.x=targetImg.x;
                     //currentImgMain.y=targetImg.y;加了可以吃掉
                     break;
                 case 2:
                     $("#talkBox").text("Reach the finfish line!");
                     currentImgMain.x=targetImg.x;
                     currentImgMain.y=targetImg.y;
                     break;
                 case 3:
                     $("#talkBox").text("Enemy! Rest five second");
                     cutImagePositionX=5;
                     cutImagePositionY=200;
                     stop=1;
                     setTimeout(function(){stop=0; ctx.clearRect(currentImgMain.x,currentImgMain.y,gridLength,gridLength);ctx.drawImage(imgMain,24,9,41,40,currentImgMain.x,currentImgMain.y,gridLength,gridLength);},5000)
                     break;
             }
         }else{
             $("#talkBox").text("Boundary!");
         }
         ctx.drawImage(imgMain,cutImagePositionX,cutImagePositionY,41,40,currentImgMain.x,currentImgMain.y,gridLength,gridLength);
 });