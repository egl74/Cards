// width, height, buffer
// canvas, context
// drag, dragRect
// selectedTemplate
function initCanvas() {
    width = 2500;
    height = 330;
    buffer = document.createElement('canvas');
    buffer.width = width;
    buffer.height = height;
    buffer.context = buffer.getContext('2d');
    buffer.context.fillStyle = '#000000';
    for (i = 0; i < 15; i++) {
        if (i % 2 === 0) {
            buffer.context.strokeRect((i / 2 * 272) + 9, 9, 264, 152);
        } else {
            buffer.context.strokeRect(((i - 1) / 2 * 272) + 9, 169, 264, 152);
        }
    }
    canvas = document.getElementById("canv1");
    context = canvas.getContext("2d");
    canvas.width = Math.floor(window.innerWidth * .8);
    canvas.height = height;
    drag = false; // переменная истинная, когда зажата кнопка мыши
    dragRect = new Shape(0, 0);
    selectedTemplate = new Template(); // выбранный шаблон
    canvas.onmousedown = mouseDown;
    setInterval(draw, 1000 / 60);
    initTemplates();
}
// Метод отрисовки
function draw() {
    dragRect.draw();
}
// Класс, задающий прямоугольник
function Shape(topX) {
    this.x = topX;
    this.height = height; // высота
    this.width = width; // ширина
    this.offsetX = 0; // куда в области фигуры был произведен клик
    this.offsetY = 0;
    this.draw = function () // метод, рисующий прямоугольник
    {
        document.getElementById('coordx').value = this.x; /*!!!!!!!!*/
        document.getElementById('offsetx').value = this.offsetX; /*!!!!!!!!*/
        document.getElementById('offsety').value = this.offsetY; /*!!!!!!!!*/
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
    selectedTemplate.coordMouseClick = dragRect.x;
    var mouseX = evt.pageX - canvas.offsetLeft;
    var mouseY = evt.pageY - canvas.offsetTop;
    document.getElementById('coordmx').value = mouseX; /*!!!!!!!!*/
    if (mouseX < dragRect.x + dragRect.width && mouseX > dragRect.x) {
        drag = true;
        dragRect.offsetX = mouseX - dragRect.x;
        dragRect.offsetY = mouseY;
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
// Отпускаем кнопку мыши
function mouseUp(evt) {
    drag = false;
    if (selectedTemplate.coordMouseClick === dragRect.x) {
        selectedTemplate.changeTemplate();
    }
}
// Отрисовка изображений-шаблонов
function initTemplates() {
    for (i = 0; i < 15; i++) {
        if (i % 2 === 0) {
            drawTemplate('/Content/Images/Templates/' + (i + 1) + '.png', (i / 2 * 272) + 10, 10);
        } else {
            drawTemplate('/Content/Images/Templates/' + (i + 1) + '.png', ((i - 1) / 2 * 272) + 10, 170);
        }
    }
}
// Отрисовка конкретного изображения-шаблона
function drawTemplate(src, x, y) {
    var pic = new Image();
    pic.src = src;
    pic.onload = function () {
        buffer.context.drawImage(pic, x, y, 262, 150);
    }
}
// Класс, задающий выбранный шаблон
function Template() {
    this.numberTemplate = 0;
    this.coordMouseClick = 0;
    this.offsetX = 0;
    this.offsetY = 0;
    this.changeTemplate = function () {
        if (this.numberTemplate) {
            buffer.context.fillStyle = '#000000';
            if (this.numberTemplate % 2 != 0) {
                buffer.context.clearRect(((this.numberTemplate - 1) / 2 * 272) + 6, 6, 270, 158);
                buffer.context.strokeRect(((this.numberTemplate - 1) / 2 * 272) + 9, 9, 264, 152);
                drawTemplate('/Content/Images/Templates/' + this.numberTemplate + '.png', ((this.numberTemplate - 1) / 2 * 272) + 10, 10);
            } else {
                buffer.context.clearRect(((this.numberTemplate - 2) / 2 * 272) + 6, 166, 270, 158);
                buffer.context.strokeRect(((this.numberTemplate - 2) / 2 * 272) + 9, 169, 264, 152);
                drawTemplate('/Content/Images/Templates/' + this.numberTemplate + '.png', ((this.numberTemplate - 2) / 2 * 272) + 10, 170);
            }
        }
        this.offsetX = dragRect.offsetX;
        this.offsetY = dragRect.offsetY;
        var oldTmp = this.numberTemplate;
        if ((this.offsetY >= 10 && this.offsetY <= 160) || (this.offsetY >= 170 && this.offsetY <= 320)) {
            for (i = 0; i < 8; i++) {
                if (this.offsetX >= (i*272)+10 && this.offsetX <= (i+1)*272) {
                    if (this.offsetY >= 10 && this.offsetY <= 160) {
                        this.numberTemplate = i * 2 + 1;
                    } else {
                        this.numberTemplate = i * 2 + 2;
                    }
                    if (this.numberTemplate === 16) {
                        this.numberTemplate = oldTmp;
                    }
                    break;
                }
            }
        }
        document.getElementById('template').value = this.numberTemplate; /*!!!!!!!!*/
        buffer.context.fillStyle = '#FF0000';
        if (this.numberTemplate % 2 != 0) {
            buffer.context.fillRect(((this.numberTemplate - 1) / 2 * 272) + 6, 6, 270, 158);
            drawTemplate('/Content/Images/Templates/' + this.numberTemplate + '.png', ((this.numberTemplate - 1) / 2 * 272) + 10, 10);
        } else {
            buffer.context.fillRect(((this.numberTemplate - 2) / 2 * 272) + 6, 166, 270, 158);
            drawTemplate('/Content/Images/Templates/' + this.numberTemplate + '.png', ((this.numberTemplate - 2) / 2 * 272) + 10, 170);
        }
    }
}