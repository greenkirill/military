var t4_form = [
  {
    type: "text",
    label: "количество орудий, (дефолтно 6)",
    required: true,
    field: "nn",
    inputmode: "numeric"
  },
  {
    type: "text",
    label: "заряд (4,2,п)",
    required: true,
    field: "z",
    inputmode: "numeric"
  },
  {
    type: "text",
    label: "alpha<sub>ОН</sub>",
    required: true,
    field: "a",
    inputmode: "numeric"
  },
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
    label: "Д, Дальности через пробел/тире",
    required: true,
    field: "Ds"
  },
  {
    type: "text",
    inputmode: "numeric",
    label: "deltaD, Поправки дальности через пробел/точку/запятую",
    required: true,
    field: "dDs"
  },
  {
    type: "text",
    inputmode: "numeric",
    label: "deltad, Довороты через пробел/точку/запятую",
    required: true,
    field: "dds"
  },
  {
    type: "text",
    inputmode: "numeric",
    label: "Фронт",
    required: true,
    field: "f"
  },
  {
    type: "text",
    inputmode: "numeric",
    label: "Глубина",
    required: true,
    field: "g"
  },
  {
    type: "text",
    inputmode: "numeric",
    label: "D<sub>ц</sub> (если есть)",
    required: true,
    field: "dt"
  },
  {
    type: "text",
    inputmode: "numeric",
    label: "alpha<sub>ц</sub> (если есть)",
    required: true,
    field: "at"
  },
  {
    type: "text",
    inputmode: "numeric",
    label: "X<sub>ц</sub>",
    required: true,
    field: "xt"
  },
  {
    type: "text",
    inputmode: "numeric",
    label: "Y<sub>ц</sub>",
    required: true,
    field: "yt"
  },
  {
    type: "text",
    inputmode: "numeric",
    label: "h<sub>ц</sub>",
    required: true,
    field: "ht"
  },
  {
    type: "text",
    inputmode: "numeric",
    label: "Расход снарядов",
    required: true,
    field: "n"
  },
  {
    type: "text",
    inputmode: "numeric",
    label: "Число установок угломера (дефолтно 1)",
    required: true,
    field: "nyy"
  },
  // {
  //   type: "text",
  //   inputmode: "numeric",
  //   label: "Номер цели",
  //   required: true,
  //   field: "nt"
  // }
];

function clearAll_kr4() {
  var r = confirm("ТОЧНО!??!?!?!");
  if (r)
    $("main#kr4 > form input").each(function(i, obj) {
      let id = $(this).attr("id");
      $(this).val("");
      saveInputValue("kr4" + id, "");
      $(this)
        .parent()
        .removeClass("is-filled");
    });
}

function calculatekr4() {
  let vals = getObj("kr4");
  vals["nn"] = vals["nn"] ? vals["nn"] : 6;
  vals["Ds"] = splitStringToNum(vals["Ds"]);
  vals["dDs"] = splitStringToNum(vals["dDs"]);
  vals["dds"] = splitStringToNum(vals["dds"]);
  console.log(vals);
  if (vals["dt"] && vals["at"]) {
    let xy = pgz(vals["xknp"], vals["yknp"], vals["at"], vals["dt"]);
    vals["xt"] = xy.x;
    vals["yt"] = xy.y;
  }

  let da = ogz(vals["xop"], vals["yop"], vals["xt"], vals["yt"]);
  let Dst = [];
  for (let i = 0; i < vals["Ds"].length; i++) {
    const elem = vals["Ds"][i];
    Dst.push(elem - vals["dDs"][i]);
  }
  let dD = Math.round(approx(Dst, vals["dDs"], da["d"]));
  let dd = Math.round(approx(Dst, vals["dds"], da["d"]));
  let d = da["a"] - vals["a"];
  console.log(d, da["a"], vals["a"]);
  let Z = {};
  if (vals["z"] == 2) {
    Z = _2z;
  } else if (vals["z"] == 4) {
    Z = _4z;
  } else {
    Z = _pz;
  }
  let di = da["d"] + dD;

  let p = approx(Z.D, Z.P, di);
  let xt = approx(Z.D, Z.xt, di);

  let eps = Math.round(((vals["ht"] - vals["hop"]) * 1000) / di);

  let dh = vals["g"] / 3;
  let dp = dh / xt;

  let KU = D2d(vals["xknp"], vals["yknp"], vals["xt"], vals["yt"]) / da["d"];
  let iv = Math.round((1000 * vals["f"]) / (da["d"] * vals["nn"]));

  vals["nyy"] = vals["nyy"] ? vals["nyy"] : (iv * 0.001 * di > 25 ? 2 : 1);
  let noru = vals["n"]/(vals["nn"]*3*vals["nyy"])

  clearResult();

  appendResult({ title: "дальность топ", value: da["d"] });
  appendResult({ title: "доворот топ", value: DUtos(d) });
  appendResult({ title: "поправка дальность", value: dD });
  appendResult({ title: "поправка доворот", value: DUtos(dd) });
  appendResult({ title: "дальность исч", value: di });
  appendResult({ title: "доворот исч", value: DUtos(d + dd) });
  appendResult({ title: "альфа с ОП", value: DUtos(da["a"]) });
  appendResult({ title: "прицел", value: p });
  appendResult({ title: "dX тыс", value: xt });
  appendResult({ title: "eps", value: DUtos(eps) });
  appendResult({ title: "dP", value: dp });
  appendResult({ title: "KU", value: KU });
  appendResult({ title: "Iv", value: DUtos(iv) });
  appendResult({ title: "nyy", value: vals["nyy"] });
  appendResult({ title: "снарядов на орудие", value: noru  });

  goto("#result");
}
