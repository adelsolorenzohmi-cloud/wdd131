// --- Wind Chill Calculation Requirements ---

const staticTempC = 22;
const staticWindSpeedKmh = 8;

// 2. Wind Chill Calculation Formula (Metric)
const calculateWindChill = (T, V) =>
    (13.12 + (0.6215 * T) - (11.37 * Math.pow(V, 0.16)) + (0.3965 * T * Math.pow(V, 0.16))).toFixed(2);

// 3. Conditional Logic and Display
function displayWindChill() {
    const windChillElement = document.getElementById('wind-chill');

    if (staticTempC <= 10 && staticWindSpeedKmh > 4.8) {
        // Conditions met: Calculate and display wind chill
        const windChill = calculateWindChill(staticTempC, staticWindSpeedKmh);
        windChillElement.textContent = `${windChill}°C`;
        console.log(`Wind Chill Calculated: ${windChill}°C`);
    } else {
        // Conditions not met: Display "N/A"
        // (Current static values: 22 > 10, so N/A is displayed)
        windChillElement.textContent = 'N/A';
        console.log('Wind Chill not applicable (Temperature too high or wind too low).');
    }
}


// Function to set the current year in the footer
function setCurrentYear() {
    const yearSpan = document.getElementById('current-year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }
}

function setLastModifiedDate() {
    const lastModifiedSpan = document.getElementById('last-modified');

    if (lastModifiedSpan) {
        const now = new Date();
        const day = String(now.getDate()).padStart(2, '0');
        const month = String(now.getMonth() + 1).padStart(2, '0');
        const year = now.getFullYear();

        const datePart = `${day}/${month}/${year}`;
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        const seconds = String(now.getSeconds()).padStart(2, '0');

        const timePart = `${hours}:${minutes}:${seconds}`;

        lastModifiedSpan.textContent = `${datePart} ${timePart}`;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    setCurrentYear();
    setLastModifiedDate();

    displayWindChill();
});