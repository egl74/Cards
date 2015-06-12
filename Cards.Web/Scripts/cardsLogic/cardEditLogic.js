// template
// width, height
// canvas, context, drag
// textBlocks
// clickedShape
function initCanvas() {
    width = 565;
    height = 340;
    document.getElementById("canv1").width = width;
    document.getElementById("canv1").height = height;
    drawTemplateEditLog();
    canvas = document.getElementById("canv2");
    context = canvas.getContext("2d");
    canvas.width = width;
    canvas.height = height;
    textBlocks = new Array();
    clickedShape = -1;
    drag = false; // переменная истинная, когда зажата кнопка мыши
    canvas.onmousedown = mouseDown;
    setInterval(draw, 1000 / 60);
}
// Метод отрисовки
function draw() {
    var length = textBlocks.length;
    context.clearRect(0, 0, width, height);
    for (i = 0; i < length; i++)
        context.drawImage(textBlocks[i].buffer, textBlocks[i].x, textBlocks[i].y);
}
// Метод срабатывающий на нажатие кнопки мыши
function mouseDown(evt) {
    var mouseX = evt.pageX - canvas.offsetLeft;
    var mouseY = evt.pageY - canvas.offsetTop;
    if (whatShapeClicked(mouseX, mouseY)) {
        drag = true;
        textBlocks[clickedShape].offsetX = mouseX - textBlocks[clickedShape].x;
        textBlocks[clickedShape].offsetY = mouseY - textBlocks[clickedShape].y;
        canvas.onmousemove = mouseMove;
        canvas.onmouseup = mouseUp;
    }
}
// Движение мыши
function mouseMove(evt) {
    var mouseY = evt.pageY - canvas.offsetTop;
    var mouseX = evt.pageX - canvas.offsetLeft;
    if (drag) {
        // Изменение координат фигуры
        textBlocks[clickedShape].x = mouseX - textBlocks[clickedShape].offsetX;
        textBlocks[clickedShape].y = mouseY - textBlocks[clickedShape].offsetY;
    }
}
// Отпускаем кнопку мыши
function mouseUp(evt) {
    drag = false;
    if (textBlocks[clickedShape].x < 5) {
        textBlocks[clickedShape].x = 5;
    }
    if (textBlocks[clickedShape].x > 450) {
        textBlocks[clickedShape].x = 450;
    }
    if (textBlocks[clickedShape].y < 5) {
        textBlocks[clickedShape].y = 5;
    }
    if (textBlocks[clickedShape].y > 275) {
        textBlocks[clickedShape].y = 275;
    }
    clickedShape = -1;
}
/////////////////////////////////////////////////////
// Отрисовка конкретного изображения-шаблона
function drawTemplateEditLog() {
    var pic = new Image();
    pic.src = '/Content/Images/Templates/' + template + '.png';
    pic.onload = function () {
        document.getElementById("canv1").getContext("2d").drawImage(pic, 20, 20);
    }
}
// Класс, задающий один текстовый блок
function Shape(infoId,infoType,infoContent) {
    this.infoId = infoId;
    this.infoType = infoType;
    this.infoContent = infoContent;
    this.buffer = document.createElement('canvas');
    this.x = 20;
    this.y = 20;
    this.offsetX = 0;
    this.offsetY = 0;
}
//добавление нового текстового блока на редактируемую визитку
function addTextBlock(infoId,infoType,infoContent) {
    textBlocks.push(new Shape(infoId, infoType, infoContent));
    var item = textBlocks.length - 1;
    textBlocks[item].buffer.width = 525;
    textBlocks[item].buffer.context = textBlocks[item].buffer.getContext('2d');
    textBlocks[item].buffer.context.fillStyle = "#000000";
    textBlocks[item].buffer.context.textBaseline = "top";
    textBlocks[item].buffer.context.textAlign = "start";
    textBlocks[item].buffer.context.font = "bold 22px Arial";
    textBlocks[item].buffer.context.fillText(infoType + ": " + infoContent, 15, 15);
    addDragIcon(textBlocks[item].buffer.context);
}
//добавление на текстовый блок иконки перетаскивания
function addDragIcon(context) {
    var pic = new Image();
    pic.src = '/Content/Images/dnd-icon.png';
    pic.onload = function () {
        context.drawImage(pic, 0, 0, 20, 20);
    }
}
//какая фигура была нажата
function whatShapeClicked(mouseX, mouseY) {
    var length = textBlocks.length;
    for (i = length-1; i >= 0; i--) {
        if (mouseX < textBlocks[i].x + 20 && mouseX > textBlocks[i].x && mouseY < textBlocks[i].y + 20 && mouseY > textBlocks[i].y) {
            clickedShape = i;
            return true;
        }
    }
    return false;
}
//проверка всех кнопок на активность
function checkAllButtons() {
    var length = textBlocks.length;
    var delbtn = '';
    for (i = 0; i < length; i++) {
        delbtn = '<button class="btn btn-danger btn-xs" id="del-btn" onclick="delTextBlock(' + textBlocks[i].infoId + ')"><i class="glyphicon glyphicon-minus"></i></button>';
        addText('action-' + textBlocks[i].infoId, delbtn);
    }
}
//удаление текстового блока с canvas
function delTextBlock(infoId) {
    var length = textBlocks.length;
    var addbtn = '';
    for (i = 0; i < length; i++) {
        if (textBlocks[i].infoId === infoId) {
            addbtn = '<button class="btn btn-success btn-xs" id="add-btn" onclick="preAddTextBlock(' + infoId + ')"><i class="glyphicon glyphicon-plus"></i></button>';
            addText('action-' + infoId, addbtn);
            textBlocks.splice(i,1);
            break;
        }
    }
}