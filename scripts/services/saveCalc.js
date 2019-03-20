function sc(vals) {
    this.v = {}
    if (typeof vals === "string")
        this.v = getObj(vals);
    else
        this.v = vals;
    this.r = [];
    this.c = function (cf, rf) {
        try {
            //console.log(1);
            cf(this.v);
            let r = rf(this.v);
            //console.log(2);
            this.r = this.r.concat(r);
            //console.log(3);
        }
        catch (e) {
            console.log(e); 
        }
    }
    this.cr = function () {
        //console.log(5);
        clearResult();
        //console.log(6);
        for (let i = 0; i < this.r.length; i++) {
            //console.log(7);
            const r = this.r[i];
            appendResult({ title: r.t, value: r.v });
        }
        //console.log(8);
        goto("#result");
    }
}