document.addEventListener('DOMContentLoaded', function() {
    // Apply initial settings
    applySettings();

    // Event listeners for settings
    document.getElementById('backgroundImageURL').addEventListener('change', function(event) {
        const url = event.target.value;
        localStorage.setItem('backgroundImageURL', url);
        document.body.style.backgroundImage = `url(${url})`;
    });

    document.getElementById('themeSelector').addEventListener('change', function(event) {
        const selectedTheme = event.target.value;
        localStorage.setItem('theme', selectedTheme);

        if (selectedTheme === 'custom') {
            document.querySelector('.custom-theme-overlay').style.display = 'flex';
        } else {
            document.querySelector('.custom-theme-overlay').style.display = 'none';
            document.body.className = selectedTheme;
        }
    });

    document.getElementById('autoPlayToggle').addEventListener('change', function(event) {
        const autoPlay = event.target.checked;
        localStorage.setItem('autoPlay', autoPlay);
    });

    document.getElementById('statsPageToggle').addEventListener('change', function(event) {
        const statsPage = event.target.checked;
        localStorage.setItem('statsPage', statsPage);
    });

    document.getElementById('viewDetailsToggle').addEventListener('change', function(event) {
        const viewDetails = event.target.checked;
        localStorage.setItem('viewDetails', viewDetails);
    });

    // Event listener for custom theme overlay
    document.getElementById('apply-theme').addEventListener('click', function() {
        const navbarColor = document.getElementById('navbar-color').value;
        const backgroundColor = document.getElementById('background-color').value;
        const textColor = document.getElementById('text-color').value;
        const brightness = document.getElementById('brightness').value;

        const darkerNavbarColor = shadeColor(navbarColor, -20);
        const lighterBackgroundColor = shadeColor(backgroundColor, 20);

        document.documentElement.style.setProperty('--navbar-background', navbarColor);
        document.documentElement.style.setProperty('--navbar-darker', darkerNavbarColor);
        document.documentElement.style.setProperty('--background-color', backgroundColor);
        document.documentElement.style.setProperty('--background-lighter', lighterBackgroundColor);
        document.documentElement.style.setProperty('--text-color', textColor);
        document.documentElement.style.setProperty('--brightness', `${brightness}%`);

        document.body.style.filter = `brightness(${brightness}%)`;

        // Save custom theme settings to localStorage
        localStorage.setItem('customNavbarColor', navbarColor);
        localStorage.setItem('customBackgroundColor', backgroundColor);
        localStorage.setItem('customTextColor', textColor);
        localStorage.setItem('customBrightness', brightness);

        document.querySelector('.custom-theme-overlay').style.display = 'none';
    });

    document.getElementById('close-overlay').addEventListener('click', function() {
        document.querySelector('.custom-theme-overlay').style.display = 'none';
    });

    // Initialize settings based on stored values
    function applySettings() {
        const backgroundImageURL = localStorage.getItem('backgroundImageURL') || '';
        if (backgroundImageURL) {
            document.getElementById('backgroundImageURL').value = backgroundImageURL;
            document.body.style.backgroundImage = `url(${backgroundImageURL})`;
        }

        const theme = localStorage.getItem('theme') || 'theme-dark';
        document.getElementById('themeSelector').value = theme;
        document.body.className = theme;

        if (theme === 'custom') {
            const customNavbarColor = localStorage.getItem('customNavbarColor') || '#1a1a2e';
            const customBackgroundColor = localStorage.getItem('customBackgroundColor') || '#000000';
            const customTextColor = localStorage.getItem('customTextColor') || '#ffffff';
            const customBrightness = localStorage.getItem('customBrightness') || '100';

            document.getElementById('navbar-color').value = customNavbarColor;
            document.getElementById('background-color').value = customBackgroundColor;
            document.getElementById('text-color').value = customTextColor;
            document.getElementById('brightness').value = customBrightness;

            document.documentElement.style.setProperty('--navbar-background', customNavbarColor);
            document.documentElement.style.setProperty('--navbar-darker', shadeColor(customNavbarColor, -20));
            document.documentElement.style.setProperty('--background-color', customBackgroundColor);
            document.documentElement.style.setProperty('--background-lighter', shadeColor(customBackgroundColor, 20));
            document.documentElement.style.setProperty('--text-color', customTextColor);
            document.documentElement.style.setProperty('--brightness', `${customBrightness}%`);

            document.body.style.filter = `brightness(${customBrightness}%)`;

            // Show overlay if the theme is 'custom'
            document.querySelector('.custom-theme-overlay').style.display = 'flex';
        } else {
            // Hide overlay if the theme is not 'custom'
            document.querySelector('.custom-theme-overlay').style.display = 'none';
        }

        const autoPlay = localStorage.getItem('autoPlay') === 'true';
        document.getElementById('autoPlayToggle').checked = autoPlay;

        const statsPage = localStorage.getItem('statsPage') === 'true';
        document.getElementById('statsPageToggle').checked = statsPage;

        const viewDetails = localStorage.getItem('viewDetails') === 'true';
        document.getElementById('viewDetailsToggle').checked = viewDetails;
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
});
