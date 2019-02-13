
function clearALl_meteo() {
    $('input[id^="meteo-"]').each(function (i) {
        $(this).val("");
        let id = $(this).attr("id");
        saveInputValue(id, "");
    });
}

var meteo_data = {};
var group_data = {};
var meteo_result_data = {};

function clearData() {
    meteo_data = {};
    group_data = {};
    meteo_result_data = {};
}

function init_group1(groups) {

}
function init_group2(groups) {

}
function init_group3(groups) {
    meteo_data.h = parseInt(groups[2]);
}
function init_group4(groups) {
    meteo_data.p = parseMeteoInt(groups[3].substr(0, 3));
    meteo_data.dt = parseMeteoInt(groups[3].substr(3, 2));
}

function init_lastgroup(groups) {
    let lg = groups[groups.length - 2];
    meteo_data.maxh_t = parseInt(lg.substr(0, 2)) * 1000;
    meteo_data.maxh_w = parseInt(lg.substr(2, 2)) * 1000;
}

function init_othergroups(groups) {
    meteo_data.main = [];
    for (let i = 4; i < groups.length - 1; i += 2) {
        const g1 = groups[i];
        const g2 = groups[i + 1];
        let h = parseInt(g1.substr(0, 2)) * 100;
        let pp = 0;
        if (g1.length > 2)
            pp = parseMeteoInt(g1.substr(2, 2));

        let dt = parseMeteoInt(g2.substr(0, 2));
        let d = parseInt(g2.substr(2, 2));
        let w = parseInt(g2.substr(4, 2));

        meteo_data.main.push({ h, pp, dt, d, w, inp: g1 + ' ' + g2 });
    }
    console.log(meteo_data.main);
}

function init_group() {
    let groups = splitString(meteo_data["groups"]);
    if (groups.length % 2 === 0)
        groups.push("0000");
    init_group1(groups);
    init_group2(groups);
    init_group3(groups);
    init_group4(groups);
    init_lastgroup(groups);
    init_othergroups(groups);
}

function init_result() {
    $("div#meteoR-group").text(meteo_result_data.g.inp);
}


function calculateMeteoForD2(D) {
    let imin = getMinIVbyDelta(_2z_D, D, (a) => a);
    let Y = _2z_Y[imin];
    let imin_G = getMinIVbyDelta(meteo_data.main, Y, (a) => a.h);
    let g = meteo_data.main[imin_G];
    meteo_result_data.g = g;
}

function calculateMeteo() {
    clearData();
    reinitStorage();
    goto("#meteoResult");
    console.log(inputStorage);
    for (const key in inputStorage) {
        if (inputStorage.hasOwnProperty(key) && /^meteo\-/.test(key)) {
            const val = inputStorage[key];
            meteo_data[key.slice(6)] = val;
        }
    }
    console.log(meteo_data);
    init_group();
    meteo_data["D0"] = splitString(meteo_data["m"]).map(a => parseInt(a));
    calculateMeteoForD2(meteo_data["D0"][0]);
    init_result();
}

