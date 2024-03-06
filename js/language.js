nav = document.getElementById("navbarScroll");
nav.insertAdjacentHTML(
  "afterbegin",
  `
  <div class="dropdown">
  <button class="btn dropdown-toggle text--green" type="button" data-bs-toggle="dropdown" aria-expanded="false">
    <img src="img/language.png" style="width: 25px; height:25px">
  </button>
  <ul class="dropdown-menu text-center">
   <li class="nav-item"><button class="btn translate" id="es"><img src="img/espana.png" alt="Traducción España"
class="translate__img"></button></li>
<li><button class="btn translate" id="en"><img src="img/reino-unido.png" alt="Traducción Inglés"
class="translate__img"></button></li>
  </ul>
</div>`
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
