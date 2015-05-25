function initCanvas() {
    x1 = window.innerWidth / 2 - 9100 / 2;
    y1 = window.innerHeight / 2 - 350 / 2;

    buffer = document.createElement('canvas');
    buffer.width = 9100;
    buffer.height = 350;
    buffer.context = buffer.getContext('2d');
    buffer.context.fillStyle = '#e386af';
    for (i = 0; i < 15; i++) {
        buffer.context.fillRect((i * 600) + 50, 25, 550, 300);
    }

    width = Math.floor(window.innerWidth*.8);
    height = 350;
    canvas = document.getElementById("canv1");
    context = canvas.getContext("2d");
    canvas.width = width;
    canvas.height = height;

    drag = false; // переменная истинная когда зажата кнопка мыши
    dragRect = new Shape(x1, y1);
    canvas.onmousedown = mouseDown;
    setInterval(draw, 1000 / 60);
}
// Метод отрисовки
function draw() {
    dragRect.draw();
}
// Класс задающий прямоугольник
function Shape(topX, topY) {
    this.x = topX;
    this.y = topY;
    this.height = 350; // Высота
    this.width = 9100; // Ширина
    this.offsetX = 0; //куда в области фигуры был произведен клик
    this.offsetY = 0;
    this.draw = function () // Метод рисующий прямоугольник
    {
        document.getElementById('coordx').value = this.x;
        document.getElementById('coordy').value = this.y;

        context.clearRect(this.x, this.y, this.width, this.height);
        context.drawImage(buffer, this.x, this.y, this.width, this.height);
    }
}
// Метод срабатывающий на нажатие кнопки мыши
function mouseDown(evt) {
    var mouseX = evt.pageX - canvas.offsetLeft;
    var mouseY = evt.pageY - canvas.offsetTop;
    if (mouseX < dragRect.x + dragRect.width && mouseX > dragRect.x && mouseY < dragRect.y + dragRect.height && mouseY > dragRect.y) {
        drag = true;
        dragRect.offsetX = mouseX - dragRect.x + 8;
        dragRect.offsetY = mouseY - dragRect.y + 8;
        canvas.onmousemove = mouseMove;
        canvas.onmouseup = mouseUp;
    }
}
// Движение мыши
function mouseMove(evt) {
    var mouseY = evt.pageY;
    var mouseX = evt.pageX;
    if (drag) {
        // Изменение координат фигуры
        dragRect.x = mouseX - dragRect.offsetX;
        dragRect.y = mouseY - dragRect.offsetY;
    }
}
// Если отпущина кнопка мыши, то переменная drag принимает ложное значение
function mouseUp(evt) {
    drag = false;
}