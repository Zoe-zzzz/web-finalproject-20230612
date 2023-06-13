let playList=[
    "HKUM1LnSxeQ",
    "p3Vyn9FpZJM",
    "aoRDq5ROgg4",
    "" 
];
//播放起訖秒數
let playTime=[
    [20,270],
    [60,180],
    [90,210]
];
let player;//YouTubePlayer
let currentPlay=0;//記錄目前撥到第幾首歌
//YouTubeAPIReady


function onYouTubeIframeAPIReady(){
    console.log("youtube ready!");
player=new YT.Player("player",{
    height:"390",
    width:"640",
    videoId:playList[currentPlay],
    playerVars:{
        autoplay:1,
        controls:0,
        showinfo: 0,            // 隱藏影片標題
        modestbranding: 0,
        start:playTime[currentPlay][0],
        end:playTime[currentPlay][1],
        iv_load_policy:3,
        cc_load_policy:1,
    },
    events:{
        'onReady':onPlayerReady,
        'onStateChange':onPlayerStateChange
   }
});
}
//YouTubePlayerReady
function onPlayerReady(event){
    event.target.playVideo();
    $("#BP").on("click",function(){
        console.log("y1");
        if((currentPlay-1)!=-1)
        {
            currentPlay--;
            onPlayer(event);
            event.target.playVideo();
        }
    });
    $("#BN").on("click",function(){
        console.log("yy2");
        if(currentPlay+1<playList.length)
        {
            currentPlay++;
            onPlayer(event);
            event.target.playVideo();
        }
    });
}
//PlayerStateChange
function onPlayerStateChange(event){
    console.log(event);
    if(Math.floor(player.getCurrentTime())==playTime[currentPlay][1]){
        if(currentPlay<playList.length-1){
        currentPlay++;
        player.loadVideoById({
            videoId:playList[currentPlay],
            startSeconds:playTime[currentPlay][0],
            endSeconds:playTime[currentPlay][1],
            suggestedQuality:"large"
        });
    }else{
        currentPlay=0;
        player.cueVideoById({
            videoId:playList[currentPlay],
            startSeconds:playTime[currentPlay][0],
            endSeconds:playTime[currentPlay][1],
            suggestedQuality:"large"
        });
    }

    }
}
function onPlayer(event){
    console.log(event);
        if(currentPlay<playList.length-1&&currentPlay>-1){
        player.loadVideoById({
            videoId:playList[currentPlay],
            startSeconds:playTime[currentPlay][0],
            endSeconds:playTime[currentPlay][1],
            suggestedQuality:"large"
        });
    }
}
