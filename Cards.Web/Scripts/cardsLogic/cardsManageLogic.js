// cardsCount, cardsBlocks
// infoesCount, infoesBlocks
// width, height
function initCardsRating(cardsCnt, data) {
    cardsCount = cardsCnt;
    cardsBlocks = new Array();
    infoesBlocks = new Array();
    width = 525;
    height = 300;
    data = data.replace(new RegExp('\n', 'g'), "");
    data = data.replace(new RegExp("  ", 'g'), "");
    data = data.replace(new RegExp("<tr>", 'g'), "");
    data = data.replace(new RegExp("</tr>", 'g'), "&");
    data = data.replace(new RegExp("<td>", 'g'), "");
    data = data.replace(new RegExp("</td>", 'g'), "|");
    var tmp = ['', '', '', '', '', '', '', ''], i = 0, j = 0;
    while (i < data.length) {
        while (data[i] != '&') {
            while (data[i] != '|') {
                tmp[j] += data[i];
                i++;
            }
            j++;
            i++;
        }
        j = 0;
        i++;
        setData(tmp);
        tmp = ['', '', '', '', '', '', '', ''];
    }
    infoesCount = infoesBlocks.length;
    initMainTable();
    initImages(0);
    initRating();
}
// Класс, задающий одну визитку
function Card(cardId, cardTemplate, cardName, cardRating) {
    this.cardId = cardId;
    this.cardTemplate = cardTemplate;
    this.cardName = cardName;
    this.cardRating = cardRating;
    this.buffer = document.createElement('canvas');
}
// Класс, задающий информацию на визитке
function CardInfo(cardId, infoType, infoContent, infoPositionX, infoPositionY) {
    this.cardId = cardId;
    this.infoType = getTypeInfo(infoType);
    this.infoContent = infoContent;
    this.infoPositionX = infoPositionX;
    this.infoPositionY = infoPositionY;
}
// Метод для получения типа контента на визитке
function getTypeInfo(num) {
    var types = ['Phone', 'Address', 'Email', 'Fax', 'Skype', 'Url', 'Name', 'Position', 'Job'];
    return types[num];
}
// Метод для занесения данных в массив визиток
function setData(data) {
    var length = cardsBlocks.length;
    var cardId = -1;
    for (i = 0; i < length; i++) {
        if (data[0] === cardsBlocks[i].cardId) {
            cardId = i;
            break;
        }
    }
    if (cardId === -1) {
        cardsBlocks.push(new Card(data[0], data[1], data[2], data[3]));
    }
    infoesBlocks.push(new CardInfo(data[0], data[4], data[5], data[6], data[7]));
}
/////////////////////////////////////////////////////
// Метод прорисовки главной таблицы
function initMainTable() {
    var tbl = '<table class="mainTable"><tbody>';
    var i = 0;
    while (i < cardsCount) {
        tbl += '<tr><td>'
            + '<div class="cardInfo" id="cardInfo-' + i + '">'
            + '</td></tr><tr><td>'
            + '<div class="canvases">'
            + '<img name="piccard-' + i + '" id="piccard-' + i + '" class="piccards" src="" width="355" height="200" border="0" />'
            + '</div>'
            + '</div>'
            + '</td></tr>';
        i++;
    }
    tbl += '</tbody></table>';
    addText('mainDiv', tbl);
}
// Метод для отрисовки всех изображений из буфера
function initImages(i) {
    if (i < cardsCount) {
        var pic = new Image();
        pic.src = '/Content/Images/Templates/' + cardsBlocks[i].cardTemplate + '.png';
        pic.onload = function () {
            cardsBlocks[i].buffer.width = width;
            cardsBlocks[i].buffer.height = height;
            cardsBlocks[i].buffer.context = cardsBlocks[i].buffer.getContext('2d');
            cardsBlocks[i].buffer.context.drawImage(pic, 0, 0, width, height);
            cardsBlocks[i].buffer.context.fillStyle = "#000000";
            cardsBlocks[i].buffer.context.textBaseline = "top";
            cardsBlocks[i].buffer.context.textAlign = "start";
            cardsBlocks[i].buffer.context.font = "bold 22px Arial";
            for (j = 0; j < infoesCount; j++) {
                if (cardsBlocks[i].cardId === infoesBlocks[j].cardId) {
                    cardsBlocks[i].buffer.context.fillText(infoesBlocks[j].infoType + ": " + infoesBlocks[j].infoContent, infoesBlocks[j].infoPositionX, infoesBlocks[j].infoPositionY);
                }
            }
            document.getElementById('piccard-' + i).valueOf().src = cardsBlocks[i].buffer.toDataURL("image/png");
            i++;
            initImages(i);
        }
    }
}
// Метод для отображения названий визиток и рейтинга
function initRating() {
    var txt = "";
    var i = 0;
    while (i < cardsCount) {
        txt = "";
        txt += '<table style="width: 100%;"><tbody><tr><td>'
            + '<h5>' + cardsBlocks[i].cardName + '</h5>'
            + '</td><td>'
            + '<h5>' + cardsBlocks[i].cardRating + '</h5>'
            + '</td></tr></tbody></table>';
        addText('cardInfo-' + i, txt);
        i++;
    }
}