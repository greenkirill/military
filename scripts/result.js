function clearResult() {
    $("main#result > table > tbody").html("");
}

function appendResult(obj) {
    let newtr = copyFromTemplate("trresulttemplate");
    newtr.children("td.title").text(obj["title"]);
    newtr.children("td.value").text(obj["value"]);
    $("main#result > table > tbody").append(newtr);
}