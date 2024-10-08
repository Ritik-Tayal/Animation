let canvas=document.querySelector("canvas");
canvas.height=window.innerHeight;
canvas.width=window.innerWidth;
console.dir(canvas);

let c=canvas.getContext("2d");
// c.fillStyle="blue"
// c.fillRect(100,100,100,100);

// for(let i=0;i<200;i++){
//     x=Math.random()*window.innerWidth;
//     y=Math.random()*window.innerHeight;
//     z=Math.floor(Math.random()*255);
//     c.beginPath()
//     c.arc(x,y,20,0,Math.PI*2,false);
//     c.strokeStyle="rgb(0,0,255)";
//     console.log(z);
//     c.stroke();
// }

function bubble(x,y,radius,dx,dy,color,opac){
    this.x=x;
    this.y=y;
    this.radius=radius;
    this.dx=dx;
    this.dy=dy;
    this.color=this.color;
    this.opac=opac;

    this.draw=function() {
        // z=Math.random();
        c.beginPath();
        c.arc(this.x,this.y,this.radius,0,Math.PI*2,false);
        c.strokeStyle="white";
        c.stroke();
        c.fillStyle=`rgba(0,0,${color},${opac})`;
        c.fill();

    }

    this.update=function(){
        if(this.x +this.radius> innerWidth || this.x-this.radius<0){
            this.dx=-this.dx;
        }

        if(this.y +this.radius>innerHeight || this.y-this.radius<0){
            this.dy=-this.dy;
        }

        this.x+=this.dx;
        this.y+=this.dy;

        this.draw();
    }
}

let bubbles=[];

for( let i=0;i<200;i++){
    let x=Math.random()*innerWidth;
    let y=Math.random()*innerHeight;
    let radius=Math.random()*30;
    let dx=(Math.random()-0.5)*4;
    let dy=(Math.random()-0.5)*4;
    let color=Math.floor((Math.random()*50)+205);
    let opac=((Math.random()*0.4)+0.2);
    bubbles.push(new bubble(x,y,radius,dx,dy,color,opac));
}

function animate(){
    requestAnimationFrame(animate);
    c.clearRect(0,0,innerWidth,innerHeight);

    for(let i=0;i<bubbles.length;i++){
        bubbles[i].update();
    }
}

animate();