function initLanguage() {
    var culture = getCookie('culture');
    if (culture === "ru") {
        document.getElementById("langonoffswitch").valueOf().checked = false;
        changeLanguage(culture);
        return;
    }
    if (culture === "en-US") {
        document.getElementById("langonoffswitch").valueOf().checked = true;
        changeLanguage(culture);
        return;
    }
    if (culture === null) {
        document.getElementById("langonoffswitch").valueOf().checked = true;
        setCookie();
        return;
    }
}

function setCookie() {
    var value = "";
    date = new Date();
    date.setYear(date.getYear + 1);
    if (document.getElementById("langonoffswitch").valueOf().checked) {
        value = "en-US";
    } else {
        value = "ru";
    }
    document.cookie = "culture=" + escape(value) + "; expires=" + date.toUTCString() + "; path=" + escape("/");
    changeLanguage(value);
}

function getCookie(name) {
    var cookie = " " + document.cookie;
    var search = " " + name + "=";
    var setStr = null;
    var offset = 0;
    var end = 0;
    if (cookie.length > 0) {
        offset = cookie.indexOf(search);
        if (offset != -1) {
            offset += search.length;
            end = cookie.indexOf(";", offset)
            if (end == -1) {
                end = cookie.length;
            }
            setStr = unescape(cookie.substring(offset, end));
        }
    }
    return (setStr);
}

function changeLanguage(value) {
    $.ajax({
        url: '/Base/SetCulture',
        data: {
            'culture': value
        },
        success: function (data) {
        }
    });
}

function initTheme(theme) {
    $.ajax({
        url: '/Base/SetTheme',
        data: {
            'theme': theme
        },
        success: function (data) {
            if (data === "white") {
                $('body').css("color", '#676767');
                $('body').css("background-color", '#efefef');
                $('.navbar').css("background-color", '#444');
                $('.navbar2').css("background-color", '#777');
            }
            if (data === "black") {
                $('body').css("color", '#D8D8D8');
                $('body').css("background-color", '#3D3D3D');
                $('.navbar').css("background-color", '#222');
                $('.navbar2').css("background-color", '#333');
            }
        }
    });
}

function setTheme() {
    var value = "";
    if (document.getElementById("styleonoffswitch").valueOf().checked) {
        value = "black";
    } else {
        value = "white";
    }
    initTheme(value)
}