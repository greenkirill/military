function sc(vals) {
    this.v = {}
    if (typeof vals === "string")
        this.v = getObj(vals);
    else
        this.v = vals;
    this.r = [];
    this.c = function (cf, rf) {
        try {
            cf(this.v);
            let r = rf(this.v);
            this.r = this.r.concat(r);
        }
        catch (e) { }
    }
    this.cr = function () {
        clearResult();
        for (let i = 0; i < this.r.length; i++) {
            const r = this.r[i];
            appendResult({ title: r.t, value: r.v });
        }
        goto("#result");
    }
}