var c1_form = [
  {
    type: "text",
    label: "X<sub>ОП</sub>",
    required: true,
    field: "xop",
    inputmode: "numeric"
  },
  {
    type: "text",
    inputmode: "numeric",
    label: "Y<sub>ОП</sub>",
    required: true,
    field: "yop"
  },
  {
    type: "text",
    inputmode: "numeric",
    label: "h<sub>ОП</sub>",
    required: true,
    field: "hop"
  },
  {
    type: "text",
    inputmode: "numeric",
    label: "X<sub>КНП</sub>",
    required: true,
    field: "xknp"
  },
  {
    type: "text",
    inputmode: "numeric",
    label: "Y<sub>КНП</sub>",
    required: true,
    field: "yknp"
  },
  {
    type: "text",
    inputmode: "numeric",
    label: "h<sub>КНП</sub>",
    required: true,
    field: "hknp"
  },
  {
    type: "text",
    inputmode: "numeric",
    label: "alpha<sub>ОН</sub>",
    required: true,
    field: "a"
  }
];

function clearAll_c1() {
  var r = confirm("ТОЧНО!??!?!?!");
  if (r)
    $("main#c1 > form input").each(function(i, obj) {
      let id = $(this).attr("id");
      $(this).val("");
      saveInputValue("c1" + id, "");
      $(this)
        .parent()
        .removeClass("is-filled");
    });
}

function calculatec1() {
  let vals = getObj("c1");
  let t = pgz(vals["xknp"], vals["yknp"], vals["a"], 3000);
  let da = ogz(vals["xop"], vals["yop"], t["x"], t["y"]);

  clearResult();
  appendResult({ title: "D", value: da["d"] });
  appendResult({ title: "deltad", value: DUtos(vals["a"] - da["a"]) });
  goto("#result");
}
