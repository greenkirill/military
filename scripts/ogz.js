var ogz_form = [
  {
    type: "text",
    label: "x<sub>1</sub>",
    required: true,
    field: "x1",
    inputmode: "numeric"
  },
  {
    type: "text",
    label: "Y<sub>1</sub>",
    required: true,
    field: "y1",
    inputmode: "numeric"
  },
  {
    type: "text",
    label: "h<sub>1</sub>",
    required: true,
    field: "h1",
    inputmode: "numeric"
  },
  {
    type: "text",
    label: "x<sub>2</sub>",
    required: true,
    field: "x2",
    inputmode: "numeric"
  },
  {
    type: "text",
    label: "Y<sub>2</sub>",
    required: true,
    field: "y2",
    inputmode: "numeric"
  },
  {
    type: "text",
    label: "h<sub>2</sub>",
    required: true,
    field: "h2",
    inputmode: "numeric"
  }
];

function clearAll_ogz() {
  var r = confirm("ТОЧНО!??!?!?!");
  if (r)
    $("main#ogz > form input").each(function(i, obj) {
      let id = $(this).attr("id");
      $(this).val("");
      saveInputValue("ogz" + id, "");
      $(this)
        .parent()
        .removeClass("is-filled");
    });
}

function calculateogz() {
  let vals = getObj("ogz");
  console.log(vals);
  let ans = ogz(vals["x1"], vals["y1"], vals["x2"], vals["y2"]);
  clearResult();
  appendResult({ title: "a", value: DUtos(ans["a"]) });
  appendResult({ title: "d", value: ans["d"] });
  if (vals["h2"] && vals["h1"]) {
    let eps = (vals["h2"] - vals["h1"]) / (0.001 * ans["d"]);
    eps = Math.round(eps);
    appendResult({ title: "eps", value: DUtos(eps) });
  }
  goto("#result");
}
