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
    });
    
    // Start all animations by default
    document.body.classList.remove('animations-paused');
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
    toggleUnitsBtn.textContent = isCelsius ? 'Switch to °F' : 'Switch to °C';
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
    this.classList.add('active');
    
    const filter = this.dataset.filter;
    
    // Show/hide cards based on filter
    weatherCards.forEach(card => {
        if (filter === 'all') {
            card.classList.remove('hidden');
        } else if (filter === 'warm' && card.dataset.type === 'warm') {
            card.classList.remove('hidden');
        } else if (filter === 'cold' && card.dataset.type === 'cold') {
            card.classList.remove('hidden');
        } else {
            card.classList.add('hidden');
        }
    });
}

// Expand card on click (toggle expanded state)
function expandCard() {
    const isExpanded = this.classList.contains('expanded');
    
    // First reset all cards
    weatherCards.forEach(card => {
        card.classList.remove('expanded');
        card.style.transform = '';
    });
    
    // If the card wasn't expanded, expand it
    if (!isExpanded) {
        this.classList.add('expanded');
        this.style.transform = 'scale(1.05)';
    }
}

// Add some dynamism with auto-cycling animations
setInterval(() => {
    if (animationsActive) {
        // Randomly adjust cloud and sun animations for more natural movement
        document.querySelector('.cloud-animation').style.animationDuration = 
            `${5 + Math.random() * 5}s`;
            
        document.querySelector('.sun-animation').style.animationDuration = 
            `${1.5 + Math.random()}s`;
    }
}, 8000);
