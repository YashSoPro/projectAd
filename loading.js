$(document).ready(function() {
    $(window).on('load', function() {
        $('#loading-container').fadeOut(500, function() {
            $('#content').fadeIn(500);
        });
    });
});
