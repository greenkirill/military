var nzr_form = [
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

function clearAll_nzr() {
  var r = confirm("ТОЧНО!??!?!?!");
  if (r)
    $("main#nzr > form input").each(function(i, obj) {
      let id = $(this).attr("id");
      $(this).val("");
      saveInputValue("nzr" + id, "");
      $(this)
        .parent()
        .removeClass("is-filled");
    });
}

function calculatenzr() {
  let vals = getObj("nzr");
  let Di = vals["Dt"] + vals["dD"];
  let di = vals["dt"] + vals["dd"];
  vals["pl"] = vals["pl"][0] === "л" ? -1 : 1; 
  vals["Gc"] = vals["Gc"] ? vals["Gc"] : 99;
  let Z = {};
  if (vals["z"] == 2) {
    Z = _2z;
  } else if (vals["z"] == 4) {
    Z = _4z;
  } else {
    Z = _pz;
  }
  let p = Math.round(approx(Z.D, Z.P, Di));
  let xt = Math.round(approx(Z.D, Z.xt, Di));

  let eps = Math.round((vals["dh"] * 1000) / Di);
  let ur = 3000 + eps;

  let ku = vals["Dk"] / vals["Dt"];
  let shu = Math.round((vals["ps"] * 100) / vals["Dt"]);

  let Iv = Math.round((vals["Fc"] * ku) / (6));
  let vd = Math.round(approx(Z.D, Z.vd, Di));

  let smena_znaka = false;
  let ssmena_znaka = false;

  clearResult();

  appendResult({ title: "D<sub>и</sub>", value: Di });
  appendResult({ title: "d<sub>и</sub>", value: DUtos(di) });
  appendResult({ title: "П", value: p });
  appendResult({ title: "Ку", value: ku });
  appendResult({ title: "Шу", value: DUtos(shu) });
  appendResult({ title: "dX<sub>тыс</sub>", value: xt });
  appendResult({ title: "Вд", value: vd });

  appendResult({ title: "Ур", value: ur });
  appendResult({ title: "Iv", value: DUtos(Iv) });
  if (vals["kk"]) {
    vals["kk"] = splitStringToKom(vals["kk"]);
    const fkom = vals["kk"][0];
    let skom = {};
    for (let i = 0; i < vals["kk"].length; i++) {
      const kom = vals["kk"][i];
      if (kom.z * fkom.z === -1) {
        smena_znaka = true;
        skom = kom;
      }
      if (vals["Gc"] <= 100 && smena_znaka && kom.z * skom.z === -1) {
        ssmena_znaka = true;
      }
      let delta = ssmena_znaka ? 2 : smena_znaka ? 4 : 8;
      let DD = -1 * kom.z * vd * delta;
      let dP = Math.round(DD / xt);
      let dd = Math.round(-1 * kom.pl * ku*kom.d + vals["pl"]* (DD * shu) / 100);
      console.log(kom,  (DD * shu) / 100);
      p += dP;
      appendResult({
        title: i + 1 + "я команда: П(deltaП), deltad",
        value: p+"("+dP + ")," + DUtos(dd)
      });
    }
    appendResult({title: "пример команды", value: "«Вишня». Стой. Цель 61-я, пехота укрытая. Осколочно-фугасным. Взрыватель осколочный. Заряд четвертый. Прицел 261. Уровень    30-00. Основное направление, правее 1-10. Основному один снаряд. Огонь"})
    appendResult({title: "пример команды", value: "Прицел 249 (прицел больше 4), левее 0-03 Огонь"});
  }
  goto("#result");
}
