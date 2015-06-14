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
    var tmp = ['', '', '', '', '', '', '', '', '', '', ''], i = 0, j = 0;
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
        tmp = ['', '', '', '', '', '', '', '', '', '', ''];
    }
    infoesCount = infoesBlocks.length;
    initMainTable();
    initImages(0);
    initRating();
    initRatingButtons();
}
// Класс, задающий одну визитку
function Card(userId, userEmail, cardId, cardTemplate, cardName, cardRating) {
    this.userId = userId;
    this.userEmail = userEmail;
    this.cardId = cardId;
    this.cardTemplate = cardTemplate;
    this.cardName = cardName;
    this.cardRating = cardRating;
    this.buffer = document.createElement('canvas');
}
// Класс, задающий информацию на визитке
function CardInfo(cardId, infoId, infoType, infoContent, infoPositionX, infoPositionY) {
    this.cardId = cardId;
    this.infoId = infoId;
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
        cardsBlocks.push(new Card(data[10], data[9], data[0], data[1], data[2], data[3]));
    }
    infoesBlocks.push(new CardInfo(data[0], data[4], data[5], data[6], data[7], data[8]));
}
/////////////////////////////////////////////////////
// Метод прорисовки главной таблицы
function initMainTable() {
    var tbl = '<table class="mainTable"><tbody>';
    var i = 0;
    while (i < cardsCount) {
        tbl += '<tr>'
            + '<td>'
            + '<div class="canvases"><a href="/Card/ViewCard?card=' + cardsBlocks[i].cardId + '" >'
            + '<img name="piccard-' + i + '" id="piccard-' + i + '" class="piccards" src="" width="355" height="200" border="0" />'
            + '</a></div>'
            + '</td>'
            + '<td style="width: 250px;">'
            + '<div class="cardInfo" id="cardInfo-' + i + '">'
            + '</div>'
            + '</td>'
            + '</tr>';
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
// Метод для отображения названий визиток, рейтинга и автора
function initRating() {
    var txt = "";
    var i = 0;
    while (i < cardsCount) {
        txt = "";
        txt += '<h3>' + cardsBlocks[i].cardName + '</h3>'
            + '<table class="tableRating"><tbody><tr><td id="minus-btn-' + cardsBlocks[i].cardId + '">'
            + '<button class="btn btn-danger btn-xs" onclick="changeRating(\'down\',' + cardsBlocks[i].cardId + ')"><i class="glyphicon glyphicon-minus"></i></button>'
            + '</td><td><div class="cardRating" id="rating-num-' + cardsBlocks[i].cardId + '">' + cardsBlocks[i].cardRating + '</div>'
            + '</td><td id="plus-btn-' + cardsBlocks[i].cardId + '"><button class="btn btn-success btn-xs" onclick="changeRating(\'up\',' + cardsBlocks[i].cardId + ')"><i class="glyphicon glyphicon-plus"></i></button>'
            + '</td></tr></tbody></table>'
            + '<h5>Автор: <a href="/Account/ViewProfile?userId=' + cardsBlocks[i].userId + '">' + cardsBlocks[i].userEmail + '</a></h5>';
        addText('cardInfo-' + i, txt);
        i++;
    }
}
// Изменение рейтинга визитки
function changeRating(todo,cardId) {
    $.ajax({
        type: 'POST',
        url: '/Card/ChangeRating',
        dataType: 'json',
        data: {
            ToDo: todo,
            CardId: cardId
        },
        success: function (response) {
            if (response === "up") {
                changeNumberRating(1, cardId);
            }
            if (response === "down") {
                changeNumberRating(-1, cardId);
            }
            if (response) {
                changeButtons(cardId);
            }
        }
    });
}
// Изменение кнопок на визитках при нажатии
function changeButtons(cardId) {
    var txt = '<button class="btn btn-info btn-xs"><i class="glyphicon glyphicon-ok-circle"></i></button>';
    addText('minus-btn-' + cardId, txt);
    txt = '<button class="btn btn-info btn-xs"><i class="glyphicon glyphicon-ok-circle"></i></button>';
    addText('plus-btn-' + cardId, txt);
}
// Изменение значения рейтинга
function changeNumberRating(val, cardId) {
    var rating = getRatingById(cardId);
    var txt = parseInt(rating) + parseInt(val);
    addText('rating-num-' + cardId, txt);
}
// Получить рейтинг визитки по её Id
function getRatingById(cardId) {
    var i = 0;
    while (i < cardsCount) {
        if (cardsBlocks[i].cardId == cardId) {
            return cardsBlocks[i].cardRating;
        }
        i++;
    }
}
// Проверка, какие визитки пользователь уже оценил
function initRatingButtons() {
    var ids = "";
    var i = 0;
    while (i < cardsCount) {
        ids += cardsBlocks[i].cardId + "|";
        i++;
    }
    $.ajax({
        type: 'POST',
        url: '/Card/CheckRatingButtons',
        dataType: 'json',
        data: {
            Count: cardsCount,
            CardIds: ids
        },
        success: function (response) {
            var tmp = "", i = 0;
            while (i < response.length) {
                tmp = "";
                while (response[i] != '|') {
                    tmp += response[i];
                    i++;
                }
                changeButtons(tmp);
                i++;
            }
        }
    });
}