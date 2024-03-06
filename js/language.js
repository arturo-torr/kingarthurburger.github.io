nav = document.getElementById("navbarScroll");
nav.insertAdjacentHTML(
  "afterbegin",
  `<button class="btn translate" id="es"><img src="img/espana.png" alt="Traducción España"
class="translate__img"></button>
<button class="btn translate" id="en"><img src="img/reino-unido.png" alt="Traducción Inglés"
class="translate__img"></button>`
);
$.getJSON("js/lang.json", function (json) {
  //Lenguaje por defecto de la página sessionStorage.setItem("lang", "idioma")"
  if (!localStorage.getItem("lang")) {
    localStorage.setItem("lang", "en");
  }
  var lang = localStorage.getItem("lang");
  var doc = json;
  $(".lang").each(function (index, element) {
    $(this).text(doc[lang][$(this).attr("key")]);
  }); //Each

  $(".translate").click(function () {
    localStorage.setItem("lang", $(this).attr("id"));
    var lang = $(this).attr("id");
    var doc = json;
    $(".lang").each(function (index, element) {
      $(this).text(doc[lang][$(this).attr("key")]);
    }); //Each
  }); //Funcion click
}); //Get json AJAX
