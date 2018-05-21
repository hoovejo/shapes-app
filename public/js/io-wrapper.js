$(function () {
    var socket = io();
    $('form').submit(function () {
        socket.emit('chat-message', $('#m').val());
        $('#m').val('');
        return false;
    });
    socket.on('chat-message', function (msg) {
        $('#messages').fadeIn(1000);

        $('#messages').append($('<li>').text(msg.type + ' - ' + msg.color));

        var event = new CustomEvent("msg-evt", { "detail": msg });
        document.dispatchEvent(event);

        setTimeout(function () {
            $('#messages').fadeOut(1000, function () {
                $(this).empty();
            });
        }, 10000);

    });
});
