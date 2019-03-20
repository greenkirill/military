var pgz_form = [
  {
    type: "text",
    label: "X<sub>ОП</sub>",
    required: true,
    field: "xop",
    inputmode: "numeric"
  },
  {
    type: "text",
    label: "Y<sub>ОП</sub>",
    required: true,
    field: "yop",
    inputmode: "numeric"
  },
  {
    type: "text",
    label: "alpha",
    required: true,
    field: "a",
    inputmode: "numeric"
  },
  {
    type: "text",
    label: "D",
    required: true,
    field: "d",
    inputmode: "numeric"
  }
];

function clearAll_pgz() {
  var r = confirm("ТОЧНО!??!?!?!");
  if (r)
    $("main#pgz > form input").each(function(i, obj) {
      let id = $(this).attr("id");
      $(this).val("");
      saveInputValue("pgz" + id, "");
      $(this)
        .parent()
        .removeClass("is-filled");
    });
}

function calculatepgz() {
  let vals = getObj("pgz");
  let ans = pgz(vals["xop"], vals["yop"], vals["a"], vals["d"]);
  clearResult();
  appendResult({ title: "x", value: ans["x"] });
  appendResult({ title: "y", value: ans["y"] });
  goto("#result");
}
