var nzr2_form = [
  {
    type: "text",
    label: "ОП <strong>п</strong>раво или <strong>л</strong>ево?",
    required: true,
    field: "pl"
  },
  {
    type: "text",
    label: "цель <strong>о</strong>ткрытая или <strong>у</strong>крытая?",
    required: true,
    field: "uo"
  },
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
    label: "команды через запятую",
    required: true,
    field: "kk"
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
  let _ = new sc("nzr2");
  // Di, di
  _.c((v) => {
    v["Di"] = v["Dt"] + v["dD"];
    v["di"] = v["dt"] + v["dd"];
  }, (v) => {
    return [{ t: "Исчисленая дальность/доворот", v: `${v["Di"]} / ${DUtos(v["di"])}` }]
  });
  // 
  _.c((v) => {
    v["pl"] = v["pl"].toLowerCase()[0] === "л" ? -1 : 1;
    v["uo"] = v["uo"].toLowerCase()[0] === "о" ? -1 : 1;
    v["Gc"] = v["Gc"] ? v["Gc"] : 1;
    let Z = {};
    if (v["z"] == 2) {
      Z = _2z;
    } else if (v["z"] == 4) {
      Z = _4z;
    } else {
      Z = _pz;
    }
    v["Z"] = Z;
  }, (v) => {
    return [{ t: "ОП / Цель / ПС", v: `ОП ${v["pl"] ? "справа" : "слева"} / цель ${v["uo"] ? "укрытая" : "открытая"} / ПС ${v["pc"] > 500 ? "больше" : "меньше"} 5-00` }]
  });
  // прицел, дХтыс
  _.c((v) => {
    v["p"] = Math.round(approx(v["Z"].D, v["Z"].P, v["Di"]));
    v["xt"] = Math.round(approx(v["Z"].D, v["Z"].xt, v["Di"]));
    v["vd"] = Math.round(approx(v["Z"].D, v["Z"].vd, v["Di"]));
  }, (v) => {
    return [{ t: "прицел/dXтыс/Вд", v: `${v["p"]} / ${v["xt"]} / ${v["vd"]}` }]
  });
  // eps, Ur
  _.c((v) => {
    v["eps"] = Math.round((v["dh"] * 1000) / v["Dt"]);
    v["ur"] = 3000 + v["eps"];
  }, (v) => {
    return [{ t: "eps/уровень", v: `${DUtos(v["eps"])} / ${DUtos(v["ur"])}` }]
  });
  // Ку, Шу
  _.c((v) => {
    v["ku"] = v["Dk"] / v["Dt"];
    v["shu"] = Math.round((v["ps"] * 100) / v["Dt"]);
    v.Iv = Math.round((v["Fc"] * v.ku) / (6));
    v.sk = v.Gc / (3 * v.xt);
  }, (v) => {
    return [
      { t: "Ку/Шу", v: `${v["ku"]} / ${v["shu"]}` },
      { t: "Скачек", v: `${v["sk"]}` },
      { t: "Iв / Iв * Di * 0.001", v: `${DUtos(v.Iv)} / ${v.Iv * v.Di / 1000}` }]
  });
  _.c((v) => {
    v["kk"] = splitStringToKom(v["kk"]);
    calc_kk(v);
  }, (v) => {
    let res = [];
    for (let i = 0; i < v.kk.length; i++) {
      const k = v.kk[i];
      res.push({ t: `${i + 1} Прицел / доворот`, v: `${k.res.P} / ${DUtos(k.res.d)}` })
    }
    for (let i = 0; i < v.kk.length; i++) {
      const k = v.kk[i];
      res.push({
        t: `${i + 1} Прицел / доворот (пс > 5-00)`, v: `${k.res2.P} / ${DUtos(k.res2.d)} `
      })
    }
    return res;
  });
  _.cr();
}
