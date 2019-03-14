var routerTasks = {
  kr4: [
    () => {
      $("main#kr4 > form").html("");
    },
    () => {
      makeForm("main#kr4 > form", t4_form);
    },
    () => {
        $("main#kr4 > form input").each(function (i, obj) {
            let id = $(this).attr("id");
            let val = getInputValue("kr4"+id);
            $(this).val(val);
            if (val)
                $(this).parent().addClass("is-filled");
            $(this).change(function (e) {
                saveInputValue("kr4"+id, $(this).val());
            })
        });
    }
  ],
  c1: [
    () => {
      $("main#c1 > form").html("");
    },
    () => {
      makeForm("main#c1 > form", c1_form);
    },
    () => {
        $("main#c1 > form input").each(function (i, obj) {
            let id = $(this).attr("id");
            let val = getInputValue("c1"+id);
            $(this).val(val);
            if (val)
                $(this).parent().addClass("is-filled");
            $(this).change(function (e) {
                saveInputValue("c1"+id, $(this).val());
            })
        });
    }
  ],nzr: [
    () => {
      $("main#nzr > form").html("");
    },
    () => {
      makeForm("main#nzr > form", nzr_form);
    },
    () => {
        $("main#nzr > form input").each(function (i, obj) {
            let id = $(this).attr("id");
            let val = getInputValue("nzr"+id);
            $(this).val(val);
            if (val)
                $(this).parent().addClass("is-filled");
            $(this).change(function (e) {
                saveInputValue("nzr"+id, $(this).val());
            })
        });
    }
  ],
  pgz: [
    () => {
      $("main#pgz > form").html("");
    },
    () => {
      makeForm("main#pgz > form", pgz_form);
    },
    () => {
        $("main#pgz > form input").each(function (i, obj) {
            let id = $(this).attr("id");
            let val = getInputValue("pgz"+id);
            $(this).val(val);
            if (val)
                $(this).parent().addClass("is-filled");
            $(this).change(function (e) {
                saveInputValue("pgz"+id, $(this).val());
            })
        });
    }
  ],
  ogz: [
    () => {
      $("main#ogz > form").html("");
    },
    () => {
      makeForm("main#ogz > form", ogz_form);
    },
    () => {
        $("main#ogz > form input").each(function (i, obj) {
            let id = $(this).attr("id");
            let val = getInputValue("ogz"+id);
            $(this).val(val);
            if (val)
                $(this).parent().addClass("is-filled");
            $(this).change(function (e) {
                saveInputValue("ogz"+id, $(this).val());
            })
        });
    }
  ],
  c2: [
    () => {
      $("main#c2 > form").html("");
    },
    () => {
      makeForm("main#c2 > form", c2_form);
    },
    () => {
        $("main#c2 > form input").each(function (i, obj) {
            let id = $(this).attr("id");
            let val = getInputValue("c2"+id);
            $(this).val(val);
            if (val)
                $(this).parent().addClass("is-filled");
            $(this).change(function (e) {
                saveInputValue("c2"+id, $(this).val());
            })
        });
    }
  ]
};

function goto(hash) {
  if (!hash) {
    hash = "#home";
  }
  hash = hash.split("#")[1];
  window.location.hash = hash;

  $("main").hide();
  $("main#" + hash).show();
  if (routerTasks[hash]) {
    for (let i = 0; i < routerTasks[hash].length; i++) {
      const task = routerTasks[hash][i];
      task();
    }
  }
}
