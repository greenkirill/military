

function goto(hash) {
    if (!hash) {
        hash = "#home";
    }
    hash = hash.split("#")[1];
    window.location.hash = hash;
    $("main").hide();
    $("main#"+hash).show();
}