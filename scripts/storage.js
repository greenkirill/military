
function getItem(key) {
    let item = window.localStorage.getItem(key);
    if (item)
        return JSON.parse(item);
    return item;
}

function setItem(key, item) {
    window.localStorage.setItem(key, JSON.stringify(item));
}

let inputStorage = {}

function saveInputValue(key, val) {
    inputStorage[key] = val;
    setItem("input" + key, val);
}

function getInputValue(key) {
    let val = inputStorage[key];
    if (!val) {
        val = getItem("input" + key);
    }
    return val;
}