document.addEventListener('DOMContentLoaded', () => {
    applySettings();
});

function applySettings() {
    // Apply Background Image
    const backgroundImageURL = localStorage.getItem('backgroundImageURL') || '';
    if (backgroundImageURL) {
        document.body.style.backgroundImage = `url(${backgroundImageURL})`;
        document.body.style.backgroundSize = 'cover'; // Ensure the image covers the entire background
        document.body.style.backgroundRepeat = 'no-repeat'; // Prevent repeating
        document.body.style.backgroundPosition = 'center'; // Center the background image
    }

    // Apply Theme
    const theme = localStorage.getItem('theme') || 'theme-dark';
    document.body.className = theme;

    if (theme === 'custom') {
        // Apply custom theme colors
        const customNavbarColor = localStorage.getItem('customNavbarColor') || '#1a1a2e';
        const customBackgroundColor = localStorage.getItem('customBackgroundColor') || '#000000';
        const customTextColor = localStorage.getItem('customTextColor') || '#ffffff';
        const customBrightness = localStorage.getItem('customBrightness') || '100';

        document.documentElement.style.setProperty('--navbar-background', customNavbarColor);
        document.documentElement.style.setProperty('--navbar-darker', shadeColor(customNavbarColor, -20));
        document.documentElement.style.setProperty('--background-color', customBackgroundColor);
        document.documentElement.style.setProperty('--background-lighter', shadeColor(customBackgroundColor, 20));
        document.documentElement.style.setProperty('--text-color', customTextColor);
        document.documentElement.style.setProperty('--brightness', `${customBrightness}%`);

        document.body.style.filter = `brightness(${customBrightness}%)`;
    }

    // Apply Auto-Play Setting
    const autoPlay = localStorage.getItem('autoPlay') === 'true';
    // Apply auto-play setting wherever needed in your app
    // Example: Initialize a video player with this setting

    // Apply Stats Page Setting
    const statsPage = localStorage.getItem('statsPage') === 'true';
    if (statsPage) {
        // Show or configure stats page link or settings
        // Example: document.querySelector('#statsPageLink').style.display = 'block';
    }

    // Apply View Details Enabled Setting
    const viewDetailsEnabled = localStorage.getItem('viewDetails') === 'true';
    if (viewDetailsEnabled) {
        // Example: document.querySelector('#viewDetailsButton').style.display = 'inline-block';
    }
}

// Function to adjust color brightness (lighter or darker)
function shadeColor(color, percent) {
    let R = parseInt(color.substring(1, 3), 16);
    let G = parseInt(color.substring(3, 5), 16);
    let B = parseInt(color.substring(5, 7), 16);

    R = parseInt((R * (100 + percent)) / 100);
    G = parseInt((G * (100 + percent)) / 100);
    B = parseInt((B * (100 + percent)) / 100);

    R = R < 255 ? R : 255;
    G = G < 255 ? G : 255;
    B = B < 255 ? B : 255;

    const RR = R.toString(16).padStart(2, '0');
    const GG = G.toString(16).padStart(2, '0');
    const BB = B.toString(16).padStart(2, '0');

    return `#${RR}${GG}${BB}`;
}

// Optional: Toggle Theme Functionality
document.getElementById('theme-toggle')?.addEventListener('click', () => {
    const currentTheme = document.body.classList.contains('theme-dark') ? 'theme-dark' :
                         document.body.classList.contains('theme-light') ? 'theme-light' : 'theme-blue';
    const newTheme = currentTheme === 'theme-dark' ? 'theme-light' :
                     currentTheme === 'theme-light' ? 'theme-blue' : 'theme-dark';
    document.body.classList.replace(currentTheme, newTheme);
    localStorage.setItem('theme', newTheme);
});
