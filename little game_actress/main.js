let resource=[
    [
        ["Nicloe Kidman","Actress/IMG_5869.jpg"],
        ["Winona Ryder","Actress/IMG_1101.JPG"],
        ["Uma Thurman","Actress/IMG_5851.JPG"],
        ["Jolia Roberts","Actress/IMG_5852.JPG"],
        ["Angelina Jolie","Actress/IMG_5865.JPG"],
        ["Scarlett Johansson","Actress/IMG_5868.JPG"],
        ["Anne Hathaway","Actress/IMG_5864.JPG"],
        ["Jennifer Aniston","Actress/IMG_5863.JPG"],
        ["Brooke Shields","Actress/IMG_5862.JPG"],
        ["Kristen Stewart","Actress/IMG_5860.JPG"]
    ],
    [
        ["Tom Cruise","Actor/IMG_5872.JPG"],
        ["Brad Pitt","Actor/IMG_5873.JPG"],
        ["Leonardo Dicaprio","Actor/IMG_5875.JPG"],
        ["Robert Pattinson","Actor/IMG_5884.JPG"],
        ["Timothee Chalamet","Actor/IMG_5889.JPG"],
        ["Cole Sprouse","Actor/IMG_5891.JPG"],
        ["Jonnny Depp","Actor/IMG_5897.JPG"],
        ["Asa Butterfield","Actor/IMG_5893.JPG"],
        ["Jared Leto","Actor/IMG_5900.JPG"],
        ["Keanu Reeves","Actor/IMG_5902.JPG"]
    ]
]
var gender=0;
window.onload=function(){
    $(".s1").on("click",function(){
        gender=0;
        loadfirst();
    });
    $(".s2").on("click",function(){
        gender=1;
        loadfirst();
    });
};
var target=$("#img1");
var targetp=$("#p1");

$("#img1").on("click",function(){
    target=$("#img2");
    targetp=$("#p2");
    load();
});
$("#img2").on("click",function(){
    target=$("#img1");
    targetp=$("#p1");
    load();
});
var x=1;
// console.load(target);
function load(){
    x++;
    if(x>resource[gender].length-1)
    {
        target.remove();
        targetp.remove();
        $("h1").css("padding-bottom","40px");
        $("h3").css("display","block");
        $(".d1").removeClass();
        $(".d2").removeClass();
    }
    else
    {
        target.attr("src",resource[gender][x][1]);
        targetp.text(resource[gender][x][0]);
    }
    
}
function loadfirst(){
    $(".state1").css("display","none");
    $("#img1").attr("src",resource[gender][0][1]);
    $("#p1").text(resource[gender][0][0]);
    $("#img2").attr("src",resource[gender][1][1]);
    $("#p2").text(resource[gender][1][0]);
}