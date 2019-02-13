$(function () {
    console.log("asdsad");
    goto(window.location.hash);

    $(".routerLink").click(function (e) {
        e.preventDefault();
        goto(this.hash);
    })

    $("input[id]").each(function (item) {
        let id = $(this).attr("id");
        let val = getInputValue(id);
        if (val)
            $(this).val(val);
    });
    $("input[id]").change(function (e) {
        let id = $(this).attr("id");
        saveInputValue(id, $(this).val());
    })
    $("textarea[id]").each(function (item) {
        let id = $(this).attr("id");
        let val = getInputValue(id);
        if (val)
            $(this).val(val);
    });
    $("textarea[id]").change(function (e) {
        let id = $(this).attr("id");
        saveInputValue(id, $(this).val());
    })
});