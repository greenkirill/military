var t4_form = [
  {
    type: "text",
    label: "ОП название",
    required: false,
    field: "op_name"
  },
  {
    type: "text",
    label: "X<sub>ОП</sub>",
    required: true,
    field: "xop",
    inputmode: "numeric"
  },
  {
    type: "text",
    inputmode: "numeric",
    label: "Y<sub>ОП</sub>",
    required: true,
    field: "yop"
  },
  {
    type: "text",
    inputmode: "numeric",
    label: "h<sub>ОП</sub>",
    required: true,
    field: "hop"
  },
  {
    type: "text",
    label: "КНП название",
    required: false,
    field: "knp_name"
  },
  {
    type: "text",
    inputmode: "numeric",
    label: "X<sub>КНП</sub>",
    required: true,
    field: "xknp"
  },
  {
    type: "text",
    inputmode: "numeric",
    label: "Y<sub>КНП</sub>",
    required: true,
    field: "yknp"
  },
  {
    type: "text",
    inputmode: "numeric",
    label: "h<sub>КНП</sub>",
    required: true,
    field: "hknp"
  },
  {
    type: "text",
    inputmode: "numeric",
    label: "Д, Дальности через пробел/тире",
    required: true,
    field: "D"
  },
  {
    type: "text",
    inputmode: "numeric",
    label: "deltaD, Поправки дальности через пробел/тире",
    required: true,
    field: "dD"
  },
  {
    type: "text",
    inputmode: "numeric",
    label: "deltad, Довороты через пробел/тире",
    required: true,
    field: "dd"
  },
  {
    type: "text",
    inputmode: "numeric",
    label: "Фронт(ы через пробел/тире)",
    required: true,
    field: "f"
  },
  {
    type: "text",
    inputmode: "numeric",
    label: "Глубина(ы через пробел/тире)",
    required: true,
    field: "g"
  },
  {
    type: "text",
    inputmode: "numeric",
    label: "X<sub>ц</sub>(через пробел/тире)",
    required: true,
    field: "xt"
  },
  {
    type: "text",
    inputmode: "numeric",
    label: "Y<sub>ц</sub>(через пробел/тире)",
    required: true,
    field: "yt"
  },
  {
    type: "text",
    inputmode: "numeric",
    label: "h<sub>ц</sub>(через пробел/тире)",
    required: true,
    field: "ht"
  },
  {
    type: "text",
    inputmode: "numeric",
    label: "Расход снарядов(через пробел/тире)",
    required: true,
    field: "n"
  }
];

function clearAll_kr4() {
  var r = confirm("ТОЧНО!??!?!?!");
  if (r)
    $("main#kr4 > form input").each(function(i, obj) {
      let id = $(this).attr("id");
      $(this).val("");
      saveInputValue("kr4" + id, "");
      $(this)
        .parent()
        .removeClass("is-filled");
    });
}
