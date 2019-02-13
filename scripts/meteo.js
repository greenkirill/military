
function clearALl_meteo() {
    $('input[id^="meteo-"]').each(function(i) {
        $(this).val("");
        let id = $(this).attr("id");
        saveInputValue(id, "");
    });
}