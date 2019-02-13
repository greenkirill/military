

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
function replaceAt(str, index, replacement) {
    return str.substr(0, index) + replacement + str.substr(index + replacement.length);
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
        if (Math.abs(d-f(D)) < dmin) {
            dmin = Math.abs(d-f(D));
            minI = i;
        }
    }
    return minI;
}