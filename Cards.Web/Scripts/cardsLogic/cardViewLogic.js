// card, template, name
function initCard() {
    initMainTable();
    getInfo();
}
// Метод прорисовки главной таблицы
function initMainTable() {
    var tbl = '<table class="mainTable"><tbody><tr><td class="tdHeader">';
    tbl += '<div class="viewHeader" id="viewHeader">'
        + '<div>'
        + '</td></tr><tr><td style="height: 10px;"></td></tr><tr><td>'
        + '<img name="piccard" id="piccard" class="piccards" src="" width="525" height="300" border="0" />'
        + '</td></tr><tr><td style="height: 10px;"></td></tr><tr><td class="tdFooter">'
        + '<div class="viewFooter" id="viewFooter">'
        + '</div>'
        + '</td></tr></tbody></table>';
    addText('mainDiv', tbl);
}
// Изменение рейтинга визитки
function getInfo() {
    $.ajax({
        type: 'POST',
        url: '/Card/GetInfoCardById',
        dataType: 'json',
        data: {
            CardId: card
        },
        success: function (response) {
            if (response) {
                parseData(response);
            } else {
                document.location.replace("/");
            }
        }
    });
}
// Парсинг информации о визитке
function parseData(data) {
    var i = 0;
    name = "";
    template = "";
    while (data[i] != '|') {
        template += data[i];
        i++;
    }
    i++;
    while (data[i] != '|') {
        name += data[i];
        i++;
    }
    i++;
    var buffer = document.createElement('canvas');
    var pic = new Image();
    pic.src = '/Content/Images/Templates/' + template + '.png';
    pic.onload = function () {
        buffer.width = 525;
        buffer.height = 300;
        buffer.context = buffer.getContext('2d');
        buffer.context.drawImage(pic, 0, 0, 525, 300);
        buffer.context.fillStyle = "#000000";
        buffer.context.textBaseline = "top";
        buffer.context.textAlign = "start";
        buffer.context.font = "bold 22px Arial";
        var j = 0, tmp = ['', '', '', ''];
        while (i < data.length) {
            while (data[i] != '$') {
                while (data[i] != '|') {
                    tmp[j] += data[i];
                    i++;
                }
                j++;
                i++;
            }
            j = 0;
            i++;
            buffer.context.fillText(getTypeInfo(tmp[0]) + ": " + tmp[1], tmp[2], tmp[3]);
            tmp = ['', '', '', ''];
        }
        document.getElementById('piccard').valueOf().src = buffer.toDataURL("image/png");
        initHeader();
        initFooter();
    }
}
// Метод для получения типа контента на визитке
function getTypeInfo(num) {
    var types = ['Phone', 'Address', 'Email', 'Fax', 'Skype', 'Url', 'Name', 'Position', 'Job'];
    return types[num];
}
// Инициализация шапки
function initHeader() {
    var txt = "<h4>" + name + "</h4>";
    addText('viewHeader', txt);
}
// Инициализация нижнего колонтитула
function initFooter() {
    var txt = '<table style="width: 100%;"><tbody><tr><td colspan="3" style="height: 10px;"></td></tr><tr><td>'
        + '<button type="submit" class="btn btn-default btn-lg" id="get-link" onclick=""><span class="glyphicon glyphicon-link"></span></button>'
        + '</td><td>'
        + '<button type="submit" class="btn btn-default btn-lg" id="get-qr" onclick=""><span class="glyphicon glyphicon-qrcode"></span></button>'
        + '</td><td>'
        + '<button type="submit" class="btn btn-default btn-lg" id="get-pdf" onclick=""><span class="glyphicon glyphicon-file"></span></button>'
        + '</td></tr><tr><td colspan="3" style="height: 10px;"></td></tr></tbody></table>';
    addText('viewFooter', txt);
}