// Select elements
const rainCanvas = document.getElementById('rain');
const snowDiv = document.getElementById('snow');
const cloudDiv = document.getElementById('cloud');
const sunDiv = document.getElementById('sun');

// Function to simulate rain animation
function startRain() {
    const ctx = rainCanvas.getContext('2d');
    const drops = [];

    function createDrop() {
        drops.push({
            x: Math.random() * rainCanvas.width,
            y: Math.random() * rainCanvas.height,
            length: Math.random() * (20 - 10) + 10,
            speedY: Math.random() * (4 - 2) + 2,
        });
    }

    function drawRain() {
        ctx.clearRect(0, 0, rainCanvas.width, rainCanvas.height);
        ctx.strokeStyle = 'blue';
        ctx.lineWidth = 1;

        drops.forEach((drop) => {
            ctx.beginPath();
            ctx.moveTo(drop.x, drop.y);
            ctx.lineTo(drop.x, drop.y + drop.length);
            ctx.stroke();

            drop.y += drop.speedY;

            if (drop.y > rainCanvas.height) {
                drop.y = -10; // Reset to top
            }
        });

        requestAnimationFrame(drawRain);
    }

    for (let i = 0; i < 100; i++) createDrop();
    drawRain();
}

// Function to simulate snow animation
function startSnow() {
    snowDiv.innerHTML = '';
    for (let i = 0; i < 50; i++) {
        const flake = document.createElement('div');
        flake.className = 'snowflake';
        flake.style.left = `${Math.random() * window.innerWidth}px`;
        flake.style.animationDuration = `${Math.random() * (5 - 3) + 3}s`;
        snowDiv.appendChild(flake);
    }
}

// Function to toggle weather animations
function toggleWeather(weatherType) {
    switch (weatherType) {
        case 'Rain':
            startRain();
            break;
        case 'Snow':
            startSnow();
            break;
        case 'Sunny':
            sunDiv.style.display = 'block';
            break;
        case 'Cloudy':
            cloudDiv.style.display = 'block';
            break;
    }
}

// Example usage
toggleWeather('Rain'); // Change this to 'Snow', 'Sunny', or 'Cloudy' as needed.
