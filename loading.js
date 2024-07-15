$(document).ready(function() {
    // Simulate loading delay (adjust time as needed)
    setTimeout(function() {
        hideLoadingScreen();
    }, 2000); // Adjust time as needed

    function hideLoadingScreen() {
        $('#loading-container').fadeTo(500, 0, function() {
            $(this).addClass('hidden').css('visibility', 'hidden');
            // After hiding loading screen, restore scrollbar and enable pointer events
            $('body').css({
                'overflow-y': 'auto',
                'pointer-events': 'auto'
            });
        });
        $('#content').removeClass('hidden'); // Show main content when loading screen hides
    }
});
