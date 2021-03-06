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
    field: "z"
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
    label: "Д, Дальности через запятую/точку",
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
  {
    type: "text",
    inputmode: "numeric",
    label: "Огневой налет в минутах (если есть)",
    required: true,
    field: "t"
  },
  {
    type: "text",
    inputmode: "numeric",
    label: "Беглым (дефолтно 4)",
    required: true,
    field: "nb"
  }
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
    $("main#kr4 > form input").each(function (i, obj) {
      let id = $(this).attr("id");
      $(this).val("");
      saveInputValue("kr4" + id, "");
      $(this)
        .parent()
        .removeClass("is-filled");
    });
}

function calckr4() {
  let cf = sc("kr4");
  cf.c((vals) => {
    
  }, (vals) => {

  })
  cf.c((vals) => {

  }, (vals) => {

  })
}

function calculatekr4() {
  let vals = getObj("kr4");
  vals["nn"] = vals["nn"] ? vals["nn"] : 6;
  vals["nb"] = vals["nb"] ? vals["nb"] : 4;
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

  vals["nyy"] = vals["nyy"] ? vals["nyy"] : iv * 0.001 * di > 25 ? 2 : 1;
  let noru = vals["n"] / (vals["nn"] * 3 * vals["nyy"]);
  let ska = vals["g"] / (xt * 3);
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
  appendResult({ title: "dП", value: dp });
  appendResult({ title: "Ку", value: KU });
  appendResult({ title: "Iв", value: DUtos(iv) });
  appendResult({ title: "nyy", value: vals["nyy"] });
  appendResult({ title: "снарядов на орудие", value: noru });
  appendResult({ title: "скачек", value: ska });
  if (vals["t"]) {
    let nvs = ((vals["t"] - 1) * 60) / (vals["n"] - vals["nn"] * vals["nb"]);
    nvs = Math.floor(nvs);
    appendResult({ title: "снаряд раз в ___ сек", value: nvs });
  }

  let kom = "СУПЕРЛЕНЬ: «Вишня». Стой. Цель 52-я, командный пункт укрытый. Заряд второй, шкала тысячных. Прицел 266. Скачок 4. Уровень 30-02. Основное направление, левее 1-12. Веер 0-05, установок две. По два снаряда беглый (остальные 7 секунд выстрел). Огонь»."

  appendResult({ title: "типа рандомная команда", value: kom });
  goto("#result");
}
