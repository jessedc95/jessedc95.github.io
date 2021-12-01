var theCanvas = document.getElementById("canvasOne");

window.addEventListener("load", eventWindowLoaded, false);
function eventWindowLoaded() {
    canvasApp();
}

function canvasApp() {
    drawScreen();

    function drawScreen() { 
        var canvas = document.getElementById('canvasOne'),
        context = canvas.getContext('2d');

        context.font = '38pt Arial';
        context.fillStyle = 'cornflowerblue';
        context.strokeStyle = 'blue';
        context.fillText('Hello Canvas', canvas.width/2 - 150,
        canvas.height/2 + 15);
        context.strokeText('Hello Canvas', canvas.width/2 - 150,
        canvas.height/2 + 15 );
    }
}
