let store=[
["Dune","image/IMG_5842.JPG","https://www.imdb.com/title/tt1160419/"],
["Avatar","image/IMG_5841.JPG","https://www.imdb.com/title/tt1630029/"],
["To All the Boy I've Loved Before","image/IMG_5840.JPG","https://www.imdb.com/title/tt3846674/"],
["Little Woman","image/IMG_5839.JPG","https://www.imdb.com/title/tt3281548/"],
["Fresh","image/IMG_5838.JPG","https://www.imdb.com/title/tt13403046/"],
["Before Sunrise","image/IMG_5836.JPG","https://www.imdb.com/title/tt0112471/"],
["Everything Everywhere All at Once","image/IMG_5837.JPG",""],
["Enola Holmes","image/IMG_5833.JPG","https://www.imdb.com/title/tt6710474/"],
["Call Me By Your Name","image/IMG_5835.JPG","https://www.imdb.com/title/tt5726616/"],
["Princess Mononoke","image/IMG_5834.JPG","https://www.imdb.com/title/tt0119698/"]
];
window.onload=function(){
$("input").on("click",function(){
    var numberofLisstItem=store.length;
    console.log(numberofLisstItem);
    var randomChildNumber=Math.floor(Math.random()*numberofLisstItem);
    while(before===randomChildNumber)
    {
        randomChildNumber=Math.floor(Math.random()*numberofLisstItem);
    }
    console.log(randomChildNumber);
    $("h1").text(store[randomChildNumber][0]);
    $("img").attr("src",store[randomChildNumber][1]);
    $("a").attr("href",store[randomChildNumber][2]);
    before=randomChildNumber;
})
};
var before=7;

/*$(function(){
    $("input").on("click",function(){
        // alert("hi");
        //$("h1").text("hello");
        // $("h1").text($("li:first").text());
        var numberofLisstItem=$("li").length;
        var randomChildNumber=Math.floor(Math.random()*numberofLisstItem);
        while(before===randomChildNumber)
        {
            randomChildNumber=Math.floor(Math.random()*numberofLisstItem);
        }
        console.log(randomChildNumber);
        $("h1").text($("li").eq(randomChildNumber).text());
        $("img").attr("src",imageURL_Array[randomChildNumber]);
        before=randomChildNumber;
    })
});*/
