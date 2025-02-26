// DOM elements
const toggleAnimationsBtn = document.getElementById("toggle-animations");
const changeSpeedBtn = document.getElementById("change-speed");
const toggleUnitsBtn = document.getElementById("toggle-units");
const windSlider = document.getElementById("wind-slider");
const windValue = document.getElementById("wind-value");
const windSpeed = document.querySelector(".wind-speed");
const filterButtons = document.querySelectorAll(".filter-btn");
const weatherCards = document.querySelectorAll(".weather-card");

// State variables
let animationsActive = true;
let isSpeedFast = false;
let isCelsius = true;

// Initialize the page
document.addEventListener("DOMContentLoaded", () => {
    setupEventListeners();
    document.body.classList.remove("animations-paused");
    addColorPulse();
    setInterval(randomizeWeatherDetails, 60000);
});

function setupEventListeners() {
    toggleAnimationsBtn.addEventListener("click", toggleAnimations);
    changeSpeedBtn.addEventListener("click", changeSpeed);
    toggleUnitsBtn.addEventListener("click", toggleUnits);
    windSlider.addEventListener("input", updateWindSpeed);

    filterButtons.forEach(button => button.addEventListener("click", filterWeather));
    weatherCards.forEach(card => setupCardInteractions(card));
}

// Toggle animations
function toggleAnimations() {
    animationsActive = !animationsActive;
    document.body.classList.toggle("animations-paused", !animationsActive);
    toggleAnimationsBtn.innerHTML = animationsActive
        ? `<i class="fas fa-pause"></i> Animations`
        : `<i class="fas fa-play"></i> Animations`;
}

// Change animation speed
function changeSpeed() {
    isSpeedFast = !isSpeedFast;
    const speedSettings = isSpeedFast
        ? { rain: "0.5s", snow: "1.5s", wind: "0.75s", sun: "1s", cloud: "4s" }
        : { rain: "1s", snow: "3s", wind: "1.5s", sun: "2s", cloud: "8s" };

    applyAnimationSpeed(speedSettings);
    changeSpeedBtn.innerHTML = `<i class="fas fa-tachometer-alt"></i> Speed: ${isSpeedFast ? "Fast" : "Normal"}`;
}

function applyAnimationSpeed(speeds) {
    document.querySelector(".rain-animation").style.animationDuration = speeds.rain;
    document.querySelector(".snow-animation").style.animationDuration = speeds.snow;
    document.querySelector(".wind-animation").style.animationDuration = speeds.wind;
    document.querySelector(".sun-animation").style.animationDuration = speeds.sun;
    document.querySelector(".cloud-animation").style.animationDuration = speeds.cloud;
}

// Toggle temperature units
function toggleUnits() {
    isCelsius = !isCelsius;
    weatherCards.forEach(card => {
        const tempElement = card.querySelector(".temp");
        const currentTemp = parseFloat(card.dataset.temp);
        const displayTemp = isCelsius
            ? currentTemp
            : Math.round((currentTemp * 9) / 5 + 32);

        tempElement.innerHTML = `${displayTemp}°<span class="unit">${isCelsius ? "C" : "F"}</span>`;
    });

    toggleUnitsBtn.innerHTML = `<i class="fas fa-exchange-alt"></i> Switch to °${isCelsius ? "F" : "C"}`;
}

// Update wind speed
function updateWindSpeed() {
    const speed = windSlider.value;
    windValue.textContent = `${speed} km/h`;
    windSpeed.textContent = speed;

    const windAnimation = document.querySelector(".wind-animation");
    const animationDuration = isSpeedFast ? 2 - speed / 50 : 3 - speed / 25;
    windAnimation.style.animationDuration = `${Math.max(0.2, animationDuration)}s`;
}

// Setup weather card interactions
function setupCardInteractions(card) {
    card.addEventListener("click", expandCard);

    const icon = card.querySelector(".icon");
    card.addEventListener("mousemove", e => {
        const rect = card.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        icon.style.transform = `translate(${x * 10}px, ${y * 10}px) scale(1.1)`;
    });

    card.addEventListener("mouseleave", () => {
        icon.style.transform = "translate(0, 0) scale(1)";
    });
}

// Filter weather cards
function filterWeather(event) {
    const filterType = event.target.dataset.filter; // Get the filter type from the button
    filterButtons.forEach(btn => btn.classList.remove("active"));
    event.target.classList.add("active");

    weatherCards.forEach(card => {
        const temp = parseFloat(card.dataset.temp);

        // Determine the visibility based on filter
        let shouldDisplay = false;
        if (filterType === "all") {
            shouldDisplay = true;
        } else if (filterType === "warm" && temp > 20) {
            shouldDisplay = true;
        } else if (filterType === "cold" && temp <= 20) {
            shouldDisplay = true;
        }

        card.style.display = shouldDisplay ? "block" : "none";
    });
}

// Dummy function placeholders
function addColorPulse() {
    console.log("Adding color pulse effect...");
}

function randomizeWeatherDetails() {
    console.log("Randomizing weather details...");
}

function expandCard() {
    console.log("Expanding weather card...");
}
