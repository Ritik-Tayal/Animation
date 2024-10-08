let canvas=document.querySelector("canvas");
canvas.style.backgroundColor="darkgreen";
console.dir(canvas);

canvas.addEventListener("mouseover",function(){
    canvas.style.cursor="url(photos/light2.png),auto"
    console.log("hi")
})