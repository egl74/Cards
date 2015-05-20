function initLanguage() {
    var culture = getCookie('culture');
    if (culture === "ru") {
        document.getElementById("ru").valueOf().checked = "checked";
        return;
    }
    if (culture === "en-US") {
        document.getElementById("en-us").valueOf().checked = "checked";
        return;
    }
    if (culture === null) {
        setCookie('culture', 'en-US');
        document.getElementById("en-us").valueOf().checked = "checked";
        return;
    }
}

function setCookie(name, value) {
    date = new Date();
    date.setYear(date.getYear + 1);
    document.cookie = name + "=" + escape(value) + "; expires=" + date.toUTCString();
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