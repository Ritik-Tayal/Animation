let canvas = document.querySelector("canvas");
let c = canvas.getContext("2d");
let coins = [];
let points = 0;
let gameWon = false;

// Set the canvas dimensions based on the parent element
canvas.width = canvas.clientWidth;
canvas.height = canvas.clientHeight;

// Coin constructor
function Coin(x, y, radius, dx, dy) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.dx = dx; // horizontal velocity
    this.dy = dy; // vertical velocity

    // Draw the coin
    this.draw = function () {
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        c.fillStyle = "gold";
        c.fill();
        c.strokeStyle = "black";
        c.stroke();
        // c.closePath();
    };

    // Update coin position
    this.update = function () {
        // Bounce off the edges of the canvas
        if (this.x + this.radius > canvas.width || this.x - this.radius < 0) {
            this.dx = -this.dx;
        }
        if (this.y + this.radius > canvas.height || this.y - this.radius < 0) {
            this.dy = -this.dy;
        }

        // Update position
        this.x += this.dx;
        this.y += this.dy;

        // Draw the updated position
        this.draw();
    };
}

// Initialize coins
function initCoins() {
    for (let i = 0; i < 5; i++) {
        const radius = 20;
        const x = Math.random() * (canvas.width - radius * 2) + radius;
        const y = Math.random() * (canvas.height - radius * 2) + radius;
        const dx = (Math.random() - 0.5) * 4; // Random horizontal velocity
        const dy = (Math.random() - 0.5) * 4; // Random vertical velocity
        coins.push(new Coin(x, y, radius, dx, dy));
    }
}

// Detect if a click is inside a coin
function detectClick(x, y) {
    for (let i = 0; i < coins.length; i++) {
        const coin = coins[i];
        const dist = Math.sqrt((x - coin.x) ** 2 + (y - coin.y) ** 2);
        if (dist < coin.radius) {
            // Coin is clicked, remove it and update the points
            coins.splice(i, 1); // Remove the clicked coin
            points++;
            checkWinCondition();
            return;
        }
    }
}

// Check if the user has won
function checkWinCondition() {
    if (points === 5) {
        alert("You Win! 🎉"); // Alert instead of message display
        gameWon = true;
    }
}

// Game loop to animate the coins
function animate() {
    if (!gameWon) {
        c.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas

        for (let i = 0; i < coins.length; i++) {
            coins[i].update(); // Update each coin's position
        }

        requestAnimationFrame(animate); // Continue the animation loop
    }
}

// Add event listeners for hover and clicks
canvas.addEventListener("mouseenter", () => {
    if (!gameWon) {
        animate(); // Start animation when hovering
    }
});

canvas.addEventListener("mouseleave", () => {
    c.clearRect(0, 0, canvas.width, canvas.height); // Clear canvas when not hovering
});

canvas.addEventListener("click", (event) => {
    const rect = canvas.getBoundingClientRect();
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;
    detectClick(mouseX, mouseY); // Detect if a coin is clicked
});

// Initialize and start the game
initCoins();
