var nzr2_form = [
  {
    type: "text",
    label: "Д<sub>к</sub>",
    required: true,
    field: "Dk",
    inputmode: "numeric"
  },
  {
    type: "text",
    label: "Д<sub>т</sub>",
    required: true,
    field: "Dt",
    inputmode: "numeric"
  },
  {
    type: "text",
    label: "delta<sub>т</sub>",
    required: true,
    field: "dt",
    inputmode: "numeric"
  },
  {
    type: "text",
    label: "ПС",
    required: true,
    field: "ps",
    inputmode: "numeric"
  },
  {
    type: "text",
    label: "dh",
    required: true,
    field: "dh",
    inputmode: "numeric"
  },
  {
    type: "text",
    label: "Ф<sub>ц</sub>",
    required: true,
    field: "Fc",
    inputmode: "numeric"
  },
  {
    type: "text",
    label: "Г<sub>ц</sub> (дефолт 1)",
    required: true,
    field: "Gc",
    inputmode: "numeric"
  },
  {
    type: "text",
    label: "заряд (4,2,п)",
    required: true,
    field: "z"
  },
  {
    type: "text",
    label: "dD",
    required: true,
    field: "dD",
    inputmode: "numeric"
  },
  {
    type: "text",
    label: "delta d",
    required: true,
    field: "dd",
    inputmode: "numeric"
  },
  {
    type: "text",
    label: "команды через запятую (команда:л25-,п133+)",
    required: true,
    field: "kk"
  },
  {
    type: "text",
    label: "ОП право или лево?",
    required: true,
    field: "pl"
  }
];

function clearAll_nzr2() {
  var r = confirm("ТОЧНО!??!?!?!");
  if (r)
    $("main#nzr2 > form input").each(function (i, obj) {
      let id = $(this).attr("id");
      $(this).val("");
      saveInputValue("nzr2" + id, "");
      $(this)
        .parent()
        .removeClass("is-filled");
    });
}

function calculatenzr2() {
  let _ = sc("nzr2");
  _.c((v) => {
    v["Di"] = v["Dt"] + v["dD"];
    v["di"] = vals["dt"] + vals["dd"];
  }, (v) => {
    return [{t: "Исчисленая дальность/доворот", v: `${v["Di"]}/${DUtos(v["di"])}`}]
  });
  _.cr();
}
