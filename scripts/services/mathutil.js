function D2d(x1, y1, x2, y2) {
  return Math.sqrt((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2));
}

function DUtoRad(du) {
  du = (du + 6000) % 6000;
  return (2 * Math.PI * du) / 6000;
}

function RadtoDU(rad) {
  return (Math.round((6000 * rad) / (2 * Math.PI)) + 6000) % 6000;
}

function atanDU(dx, dy) {
  return RadtoDU(Math.atan2(dy, dx));
}

function pgz(x, y, a, d) {
  let rad = DUtoRad(a);
  let dx = d * Math.cos(rad);
  let dy = d * Math.sin(rad);
  return { x: Math.round(x + dx), y: Math.round(y + dy) };
}


function ogz(x1, y1, x2, y2) {
  let a = Math.atan2(y2 - y1, x2 - x1);
  let du = RadtoDU(a);
  let d = (y2 - y1) / Math.sin(a);
  console.log(x1, y1, x2, y2, d)
  return { a: du, d: D2d(x1, y1, x2, y2) };
}



function DUtos(du) {
  let pm = du > 0;
  let f = Math.floor(Math.abs(du) / 100);
  let s = (Math.abs(du) + 6000) % 100;
  s = s < 10 ? "0" + s : s;
  return (pm ? "+" : "-") + f + "-" + s;
}

function approx(xs, ys, x) {
  let i1 = 0,
    i2 = 1;
  if (x < xs[0]) {
  } else if (x > xs[xs.length - 1]) {
    i1 = xs.length - 2;
    i2 = xs.length - 1;
  } else {
    for (let i = 1; i < xs.length; i++) {
      const el = xs[i];
      if (x < el) {
        i1 = i - 1;
        i2 = i;
        break;
      }
    }
  }
  return ((ys[i2] - ys[i1]) * (x - xs[i1])) / (xs[i2] - xs[i1]) + ys[i1];
}

function Dd_to_xtyt(vals) {
  // if (vals[fn.xknp] && vals[fn.yknp])
  let xy = pgz(vals["xknp"], vals["yknp"], vals["at"], vals["dt"]);
  vals["xt"] = xy.x;
  vals["yt"] = xy.y;
}


function calc_D(v, D, z) {
  let DD = 0;
  if (D.tp === 0) {
    if (z === -1 || z === 1)
      DD = -8 * v.vd * D.z;
    else if (z === 2 || z === 4)
      DD = -4 * v.vd * D.z;
    else
      DD = -2 * v.vd * D.z;
  }
  else if (D.tp === 1) {
    if (v.Gc >= 100)
      DD = -1 * v.Gc * D.z;
    else
      DD = -50 * D.z;
  }
  else if (D.tp === 2) {
    if (v.Gc >= 100)
      DD = -2 * v.Gc * D.z / 3;
    else
      DD = -25 * D.z;
  }
  else if (D.tp === 3) {
    if (v.Gc >= 100)
      DD = -1 * v.Gc * D.z / 2;
    else
      DD = 0;
  }
  return DD;
}

function calc_dD(v, c) {
  let res = {};
  res.P = Math.round(c.D / v.xt);
  res.d = Math.round(v.pl * c.D * v.shu / 100 - v.ku * c.d);
  return res;
}

function calc_dD2(v, c) {
  let res = {};
  let cosec = 1 / Math.sin(DUtoRad(v.ps));
  let secan = 1 / Math.cos(DUtoRad(v.ps));
  res.D = c.D / secan + c.d * 0.001 * v.Dk / cosec;
  res.P = res.D / v.xt;
  res.d = v.pl * (c.D * secan / (0.001 * v.Di * cosec * cosec)) - c.d * (0.001 * v.Dk) / (secan * 0.001 * v.Di);
  res.P = Math.round(res.P);
  res.d = Math.round(res.d);
  return res;
}

// z == 0 знаков вообще не было
// z == 1/-1 первый знак
// z == 2 Г<100 4Вд
// z == 3 Г<100 2Вд
// z == 4 Г>100 4Вд 
function calc_kk(v) {
  let z = 0;
  for (let i = 0; i < v["kk"].length; i++) {
    const elem = v.kk[i];
    elem.c = { D: 0, d: 0, f: -1 };
    if (elem.D) {
      if (z === 0)
        z = elem.D.z;
      else if (z < 2) {
        if (z * elem.D.z === -1) {
          if (v.Gc >= 100)
            z = 4;
          else
            z = 2;
        }
      }
      else if (z == 2)
        z = 3;
      elem.c.D = calc_D(v, elem.D, z);
    }
    if (elem.d)
      elem.c.d = elem.d.d;
    if (elem.f)
      elem.c.f = elem.f.f;
    elem.res = calc_dD(v, elem.c);
    elem.res2 = calc_dD2(v, elem.c);
  }
}