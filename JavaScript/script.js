// DOM elements
const toggleAnimationsBtn = document.getElementById('toggle-animations');
const changeSpeedBtn = document.getElementById('change-speed');
const toggleUnitsBtn = document.getElementById('toggle-units');
const windSlider = document.getElementById('wind-slider');
const windValue = document.getElementById('wind-value');
const windSpeed = document.querySelector('.wind-speed');
const filterButtons = document.querySelectorAll('.filter-btn');
const weatherCards = document.querySelectorAll('.weather-card');

// State variables
let animationsActive = true;
let isSpeedFast = false;
let isCelsius = true;
let activeCard = null;

// Initialize the page
initializePage();

function initializePage() {
    // Set up event listeners
    toggleAnimationsBtn.addEventListener('click', toggleAnimations);
    changeSpeedBtn.addEventListener('click', changeSpeed);
    toggleUnitsBtn.addEventListener('click', toggleUnits);
    windSlider.addEventListener('input', updateWindSpeed);
    
    // Set up filter buttons
    filterButtons.forEach(button => {
        button.addEventListener('click', filterWeather);
    });
    
    // Make cards interactive
    weatherCards.forEach(card => {
        card.addEventListener('click', expandCard);
        
        // Add subtle hover effect for icons
        const icon = card.querySelector('.icon');
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width - 0.5;
            const y = (e.clientY - rect.top) / rect.height - 0.5;
            
            icon.style.transform = `translate(${x * 10}px, ${y * 10}px) scale(1.1)`;
        });
        
        card.addEventListener('mouseleave', () => {
            icon.style.transform = 'translate(0, 0) scale(1)';
        });
    });
    
    // Start all animations by default
    document.body.classList.remove('animations-paused');
    
    // Add a subtle color pulse to each weather card
    addColorPulse();
    
    // Apply random weather details every minute to make it feel dynamic
    setInterval(randomizeWeatherDetails, 60000);
}

// Toggle animations on/off
function toggleAnimations() {
    animationsActive = !animationsActive;
    document.body.classList.toggle('animations-paused', !animationsActive);
    
    // Update button text
    toggleAnimationsBtn.innerHTML = animationsActive 
        ? '<i class="fas fa-pause"></i> Animations' 
        : '<i class="fas fa-play"></i> Animations';
    
    // Toggle active class
    toggleAnimationsBtn.classList.toggle('active', animationsActive);
}

// Change animation speed
function changeSpeed() {
    isSpeedFast = !isSpeedFast;
    
    // Get all animation elements
    const rainAnimation = document.querySelector('.rain-animation');
    const snowAnimation = document.querySelector('.snow-animation');
    const windAnimation = document.querySelector('.wind-animation');
    const sunAnimation = document.querySelector('.sun-animation');
    const cloudAnimation = document.querySelector('.cloud-animation');
    
    // Update animation speeds
    if (isSpeedFast) {
        rainAnimation.style.animationDuration = '0.5s';
        snowAnimation.style.animationDuration = '1.5s';
        windAnimation.style.animationDuration = '0.75s';
        sunAnimation.style.animationDuration = '1s';
        cloudAnimation.style.animationDuration = '4s';
        changeSpeedBtn.innerHTML = '<i class="fas fa-tachometer-alt"></i> Speed: Fast';
    } else {
        rainAnimation.style.animationDuration = '1s';
        snowAnimation.style.animationDuration = '3s';
        windAnimation.style.animationDuration = '1.5s';
        sunAnimation.style.animationDuration = '2s';
        cloudAnimation.style.animationDuration = '8s';
        changeSpeedBtn.innerHTML = '<i class="fas fa-tachometer-alt"></i> Speed: Normal';
    }
}

// Toggle temperature units between Celsius and Fahrenheit
function toggleUnits() {
    isCelsius = !isCelsius;
    
    // Update all temperature displays
    weatherCards.forEach(card => {
        const tempElement = card.querySelector('.temp');
        const currentTemp = parseFloat(card.dataset.temp);
        
        let displayTemp;
        if (isCelsius) {
            // Convert from F to C
            displayTemp = currentTemp;
            tempElement.innerHTML = `${displayTemp}°<span class="unit">C</span>`;
        } else {
            // Convert from C to F
            displayTemp = Math.round((currentTemp * 9/5) + 32);
            tempElement.innerHTML = `${displayTemp}°<span class="unit">F</span>`;
        }
    });
    
    // Update button text
    toggleUnitsBtn.innerHTML = isCelsius 
        ? '<i class="fas fa-exchange-alt"></i> Switch to °F' 
        : '<i class="fas fa-exchange-alt"></i> Switch to °C';
}

// Update wind speed based on slider
function updateWindSpeed() {
    const speed = windSlider.value;
    windValue.textContent = `${speed} km/h`;
    windSpeed.textContent = speed;
    
    // Adjust wind animation based on speed
    const windAnimation = document.querySelector('.wind-animation');
    const animationDuration = isSpeedFast ? 2 - (speed / 50) : 3 - (speed / 25);
    windAnimation.style.animationDuration = `${Math.max(0.2, animationDuration)}s`;
}

// Filter weather cards by type
function filterWeather() {
    // Update active filter button
    filterButtons.forEach(btn => btn.classList.remove('active'));
