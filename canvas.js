let canvas=document.querySelector("canvas");
let c=canvas.getContext("2d");
let coins=[];
let points=0;
let gameWon=false;

canvas.width = canvas.clientWidth;
canvas.height = canvas.clientHeight;


function Coin(x, y, radius, dx, dy) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.dx = dx; 
    this.dy = dy; 

    this.draw = function () {
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        c.fillStyle = "gold";
        c.fill();
        c.strokeStyle = "black";
        c.stroke();
    };

    this.update=function () {
        if (this.x + this.radius > canvas.width || this.x - this.radius < 0) {
            this.dx = -this.dx;
        }
        if (this.y + this.radius > canvas.height || this.y - this.radius < 0) {
            this.dy = -this.dy;
        }

        this.x+=this.dx;
        this.y+=this.dy;

        this.draw();
    };
}

function initCoins() {
    for (let i = 0; i < 5; i++) {
        const radius = 20;
        const x = Math.random() * (canvas.width - radius * 2) + radius;
        const y = Math.random() * (canvas.height - radius * 2) + radius;
        const dx = (Math.random() - 0.5) * 4; 
        const dy = (Math.random() - 0.5) * 4;
        coins.push(new Coin(x, y, radius, dx, dy));
    }
}

function detectClick(x, y) {
    for (let i = 0; i < coins.length; i++) {
        const coin = coins[i];
        const dist = Math.sqrt((x - coin.x) ** 2 + (y - coin.y) ** 2);
        if (dist < coin.radius) {
            coins.splice(i, 1); 
            points++;
            checkWinCondition();
            return;
        }
    }
}

function checkWinCondition() {
    if (points === 5) {
        alert("You Win! 🎉"); 
        gameWon = true;
    }
}

function animate() {
    if (!gameWon) {
        c.clearRect(0, 0, canvas.width, canvas.height); 

        for (let i = 0; i < coins.length; i++) {
            coins[i].update(); 
        }

        requestAnimationFrame(animate); 
    }
}
canvas.addEventListener("mouseenter", () => {
    if (!gameWon) {
        initCoins();
        animate(); 
    }
});

canvas.addEventListener("mouseleave", () => {
    c.clearRect(0, 0, canvas.width, canvas.height);
    points=0;
    coins=[]; 
});

canvas.addEventListener("click", (event) => {
    const rect = canvas.getBoundingClientRect();
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;
    detectClick(mouseX, mouseY); 
});

// initCoins();
