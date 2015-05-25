function initCanvas() {

    width = 4090;
    height = 330;

    buffer = document.createElement('canvas');
    buffer.width = width;
    buffer.height = height;
    buffer.context = buffer.getContext('2d');
    buffer.context.fillStyle = '#e386af';
    for (i = 0; i < 15; i++) {
        if (i % 2 === 0) {
            buffer.context.fillRect((i/2 * 272) + 10, 10, 262, 150);
        } else {
            buffer.context.fillRect(((i-1)/2 * 272) + 10, 170, 262, 150);
        }
    }

    canvas = document.getElementById("canv1");
    context = canvas.getContext("2d");
    canvas.width = Math.floor(window.innerWidth * .8);
    canvas.height = height;

    drag = false; // переменная истинная когда зажата кнопка мыши
    dragRect = new Shape(0, 0);
    canvas.onmousedown = mouseDown;
    setInterval(draw, 1000 / 60);
}
// Метод отрисовки
function draw() {
    dragRect.draw();
}
// Класс задающий прямоугольник
function Shape(topX) {
    this.x = topX;
    this.height = height; // Высота
    this.width = width; // Ширина
    this.offsetX = 0; //куда в области фигуры был произведен клик
    this.draw = function () // Метод рисующий прямоугольник
    {
        document.getElementById('coordx').value = this.x;
        document.getElementById('coordy').value = 0;

        if (this.x > 0) {
            this.x = 0;
        }
        if (this.x < -1400) {
            this.x = -1400;
        }

        context.clearRect(this.x, 0, this.width, this.height);
        context.drawImage(buffer, this.x, 0, this.width, this.height);
    }
}
// Метод срабатывающий на нажатие кнопки мыши
function mouseDown(evt) {
    var mouseX = evt.pageX - canvas.offsetLeft;
    document.getElementById('coordmx').value = mouseX;
    document.getElementById('coordmy').value = 0;
    if (mouseX < dragRect.x + dragRect.width && mouseX > dragRect.x) {
        drag = true;
        dragRect.offsetX = mouseX - dragRect.x + 8;
        canvas.onmousemove = mouseMove;
        canvas.onmouseup = mouseUp;
    }
}
// Движение мыши
function mouseMove(evt) {
    var mouseX = evt.pageX - canvas.offsetLeft;
    if (drag) {
        // Изменение координат фигуры
        dragRect.x = mouseX - dragRect.offsetX;
    }
}
// Если отпущина кнопка мыши, то переменная drag принимает ложное значение
function mouseUp(evt) {
    drag = false;
}