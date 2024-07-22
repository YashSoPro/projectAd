$(document).ready(function() {
    // Simulate loading delay
    setTimeout(function() {
        hideLoadingScreen();
    }, 2000); // Adjust delay as needed

    function hideLoadingScreen() {
        $('#loading-container').fadeOut(500, function() {
            $(this).addClass('hidden').css('visibility', 'hidden');
            $('body').css({
                'overflow-y': 'auto',
                'pointer-events': 'auto'
            });
        });
    }
});
