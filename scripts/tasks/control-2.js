var c2_form = [
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
  },
  {
    type: "text",
    inputmode: "numeric",
    label: "Дальности поправок, через тире",
    required: true,
    field: "Ds"
  },
  {
    type: "text",
    inputmode: "numeric",
    label: "Поправки, через тире",
    required: true,
    field: "dDs"
  },
  {
    type: "text",
    inputmode: "numeric",
    label: "Поправка на доворот, через тире",
    required: true,
    field: "dds"
  }
];

function clearAll_c2() {
  var r = confirm("ТОЧНО!??!?!?!");
  if (r)
    $("main#c2 > form input").each(function(i, obj) {
      let id = $(this).attr("id");
      $(this).val("");
      saveInputValue("c2" + id, "");
      $(this)
        .parent()
        .removeClass("is-filled");
    });
}

function calculatec2() {
  let vals = getObj("c2");
  console.log(vals);
  vals["Ds"] = splitStringToNum(vals["Ds"]);
  vals["dDs"] = splitStringToNum(vals["dDs"]);
  vals["dds"] = splitStringToNum(vals["dds"]);

  let t = pgz(vals["xknp"], vals["yknp"], vals["a"], 3000);
  let da = ogz(vals["xop"], vals["yop"], t["x"], t["y"]);
  let Dst = [];
  for (let i = 0; i < vals["Ds"].length; i++) {
    const elem = vals["Ds"][i];
    Dst.push(elem - vals["dDs"][i]);
  }
  let dD = Math.round(approx(Dst, vals["dDs"], da["d"]));
  let dd = Math.round(approx(Dst, vals["dds"], da["d"]));
  let d = vals["a"] - da["a"];
  clearResult();
  appendResult({ title: "дальность топ", value: da["d"] });
  appendResult({ title: "доворот топ", value: DUtos(d) });
  appendResult({ title: "поправка дальность", value: dD });
  appendResult({ title: "поправка доворот", value: DUtos(dd) });
  appendResult({ title: "дальность исч", value: da["d"] + dD });
  appendResult({ title: "доворот исч", value: DUtos(d + dd) });
  goto("#result");
}
