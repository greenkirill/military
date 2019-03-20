function typicalRouterTasks(form, formid) {
  return [
    () => {
      $(`main#${formid} > form`).html("");
    },
    () => {
      makeForm(`main#${formid} > form`, form);
    },
    () => {
        $(`main#${formid} > form input`).each(function (i, obj) {
            let id = $(this).attr("id");
            let val = getInputValue(formid+id);
            $(this).val(val);
            if (val)
                $(this).parent().addClass("is-filled");
            $(this).change(function (e) {
                saveInputValue(formid+id, $(this).val());
            })
        });
    }
  ]
}

var routerTasks = {
  kr4: typicalRouterTasks(t4_form, "kr4"),
  c1: typicalRouterTasks(c1_form, "c1"),
  nzr: typicalRouterTasks(nzr_form, "nzr"),
  nzr2: typicalRouterTasks(nzr2_form, "nzr2"),
  pgz: typicalRouterTasks(pgz_form, "pgz"),
  ogz: typicalRouterTasks(ogz_form, "ogz"),
  c2: typicalRouterTasks(c2_form, "c2"),
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
