function initCardsRating() {
    $.ajax({
        type: 'POST',
        url: '/Home/GetAllCards',
        dataType: 'json',
        success: function (response) {
            alert(response);
        }
    });
}