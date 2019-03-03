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
  let d = (x2 - x1) / Math.cos(a);
  return { a: du, d: Math.abs(d) };
}

function DUtos(du) {
  let f = Math.floor(du / 100);
  let s = (du + 6000) % 100;
  s = s < 10 ? "0" + s : s;
  return f + "-" + s;
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
