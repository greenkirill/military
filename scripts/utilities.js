function copyFromTemplate(id) {
  let newelem = $("#" + id).clone(true, true);
  newelem.removeClass("template");
  newelem.removeAttr("id");
  return newelem;
}

function inputFromObj(o) {
  let ne = copyFromTemplate("inputtemplate");
  let label = ne.children("label");
  let input = ne.children("input");
  label.attr("for", o["field"]);
  label.html(o["label"]);
  input.attr("type", o["type"]);
  input.attr("id", o["field"]);
  if (o["inputmode"]) input.attr("inputmode", o["inputmode"]);
  input
    .focus(function() {
      ne.addClass("is-focused");
    })
    .focusout(function() {
      ne.removeClass("is-focused");
    })
    .change(function() {
      let val = $(this).val();
      if (val) ne.addClass("is-filled");
      else ne.removeClass("is-filled");
    });
  // input.attr("placeholder", o["label"]);
  return ne;
}

function makeForm(main, o) {
  let maine = $(main);
  for (let i = 0; i < o.length; i++) {
    const elem = o[i];
    maine.append(inputFromObj(elem));
  }
}

function splitString(str) {
  let separators = ["-", ",", ".", " ", ":", ";", "/", "|", "\\"];
  str = str.trim();
  str = str.replace(/\s+/gm, " ");
  for (const sep of separators) {
    if (str.indexOf(sep) > -1) {
      return str.split(sep);
    }
  }
}
function splitStringToNum(str) {
  let separators = ["-", ",", ".", " ", ":", ";", "/", "|", "\\"];
  str = str.trim();
  str = str.replace(/\s+/gm, " ");
  let res = [];
  for (const sep of separators) {
    if (str.indexOf(sep) > -1) {
      res = str.split(sep);
      break;
    }
  }
  for (let i = 0; i < res.length; i++) {
    const elem = res[i];
    res[i] = parseInt(elem);
  }
  return res;
}
function replaceAt(str, index, replacement) {
  return (
    str.substr(0, index) + replacement + str.substr(index + replacement.length)
  );
}

function parseMeteoInt(str) {
  let n = false;
  if (parseInt(str[0]) >= 5) {
    str = replaceAt(str, 0, parseInt(str[0]) - 5);
  }
  return (n ? -1 : 1) * parseInt(str);
}

function getMinIVbyDelta(arr, d, f) {
  let dmin = 100000;
  let minI = 0;
  for (let i = 0; i < arr.length; i++) {
    const D = arr[i];
    if (Math.abs(d - f(D)) < dmin) {
      dmin = Math.abs(d - f(D));
      minI = i;
    }
  }
  return minI;
}

function getObj(form) {
  let ret = {};
  $("main#" + form + " input").each(function(i, obj) {
    let id = $(this).attr("id");
    let val = $(this).val();
    ret[id] =
      parseInt(val) && !/[\s\.\,\|\-]/gm.test(val) ? parseInt(val) : val;
  });
  return ret;
}
