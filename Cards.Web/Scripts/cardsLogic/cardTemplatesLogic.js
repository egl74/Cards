// widthTempl, heightTempl, bufferTempl
// canvasTempl, contextTempl
// dragTempl, dragRect
// selectedTemplate
function initTemplCanvas() {
    widthTempl = 2500;
    heightTempl = 330;
    bufferTempl = document.createElement('canvas');
    bufferTempl.width = widthTempl;
    bufferTempl.height = heightTempl;
    bufferTempl.context = bufferTempl.getContext('2d');
    bufferTempl.context.fillStyle = '#000000';
    for (i = 0; i < 15; i++) {
        if (i % 2 === 0) {
            bufferTempl.context.strokeRect((i / 2 * 272) + 9, 9, 264, 152);
        } else {
            bufferTempl.context.strokeRect(((i - 1) / 2 * 272) + 9, 169, 264, 152);
        }
    }
    canvasTempl = document.getElementById("templateCanvas");
    contextTempl = canvasTempl.getContext("2d");
    canvasTempl.width = 865;
    canvasTempl.height = heightTempl;
    dragTempl = false; // переменная истинная, когда зажата кнопка мыши
    dragRect = new ShapeTempl(0);
    selectedTemplate = new TemplateShape(); // выбранный шаблон
    selectedTemplate.numberTemplate = 1;
    selectedTemplate.changeTemplate();
    canvasTempl.onmousedown = mouseDownTempLog;
    setInterval(drawTempLog, 1000 / 60);
    initTemplates();
}
// Метод отрисовки
function drawTempLog() {
    dragRect.draw();
}
// Класс, задающий прямоугольник
function ShapeTempl(topX) {
    this.x = topX;
    this.height = heightTempl; // высота
    this.width = widthTempl; // ширина
    this.offsetX = 0; // куда в области фигуры был произведен клик
    this.offsetY = 0;
    this.draw = function () // метод, рисующий прямоугольник
    {
        if (this.x > 0) {
            this.x = 0;
        }
        if (this.x < -1400) {
            this.x = -1400;
        }
        contextTempl.clearRect(this.x, 0, this.width, this.height);
        contextTempl.drawImage(bufferTempl, this.x, 0, this.width, this.height);
    }
}
// Метод срабатывающий на нажатие кнопки мыши
function mouseDownTempLog(evt) {
    selectedTemplate.coordMouseClick = dragRect.x;
    var mouseX = evt.pageX - canvasTempl.offsetLeft;
    var mouseY = evt.pageY - canvasTempl.offsetTop;
    if (mouseX < dragRect.x + dragRect.width && mouseX > dragRect.x) {
        dragTempl = true;
        dragRect.offsetX = mouseX - dragRect.x;
        dragRect.offsetY = mouseY;
        canvasTempl.onmousemove = mouseMoveTempLog;
        canvasTempl.onmouseup = mouseUpTempLog;
    }
}
// Движение мыши
function mouseMoveTempLog(evt) {
    var mouseX = evt.pageX - canvasTempl.offsetLeft;
    if (dragTempl) {
        // Изменение координат фигуры
        dragRect.x = mouseX - dragRect.offsetX;
    }
}
// Отпускаем кнопку мыши
function mouseUpTempLog(evt) {
    dragTempl = false;
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
        bufferTempl.context.drawImage(pic, x, y, 262, 150);
    }
}
// Класс, задающий выбранный шаблон
function TemplateShape() {
    this.numberTemplate = 0;
    this.coordMouseClick = 0;
    this.offsetX = 0;
    this.offsetY = 0;
    this.changeTemplate = function () {
        if (this.numberTemplate) {
            bufferTempl.context.fillStyle = '#000000';
            if (this.numberTemplate % 2 != 0) {
                bufferTempl.context.clearRect(((this.numberTemplate - 1) / 2 * 272) + 6, 6, 270, 158);
                bufferTempl.context.strokeRect(((this.numberTemplate - 1) / 2 * 272) + 9, 9, 264, 152);
                drawTemplate('/Content/Images/Templates/' + this.numberTemplate + '.png', ((this.numberTemplate - 1) / 2 * 272) + 10, 10);
            } else {
                bufferTempl.context.clearRect(((this.numberTemplate - 2) / 2 * 272) + 6, 166, 270, 158);
                bufferTempl.context.strokeRect(((this.numberTemplate - 2) / 2 * 272) + 9, 169, 264, 152);
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
        bufferTempl.context.fillStyle = '#FF0000';
        if (this.numberTemplate % 2 != 0) {
            bufferTempl.context.fillRect(((this.numberTemplate - 1) / 2 * 272) + 6, 6, 270, 158);
            drawTemplate('/Content/Images/Templates/' + this.numberTemplate + '.png', ((this.numberTemplate - 1) / 2 * 272) + 10, 10);
        } else {
            bufferTempl.context.fillRect(((this.numberTemplate - 2) / 2 * 272) + 6, 166, 270, 158);
            drawTemplate('/Content/Images/Templates/' + this.numberTemplate + '.png', ((this.numberTemplate - 2) / 2 * 272) + 10, 170);
        }
        template = this.numberTemplate;
        drawTemplateEditLog();
    }
}