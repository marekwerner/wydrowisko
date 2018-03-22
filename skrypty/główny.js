var SELEKTOR_DUŻEGO_OBRAZU = '[data-typ-obrazu="cel"]'
var SELEKTOR_TYTUŁU_OBRAZU = '[data-typ-obrazu="tytuł"]';
var SELEKTOR_RAMKI_OBRAZU = '[data-typ-obrazu="ramka"]';
var SELEKTOR_MINIATURY = '[data-typ-obrazu="wyzwalacz"]';
var KLASA_UKRYTY_DUŻY_OBRAZ = 'ukryty-duży-obraz';
var REGUŁA_MAŁEGO_OBRAZU = 'bardzo-mały-obraz';
var KLAWISZ_ESC = 27;

function zmieńObraz(urlObrazu, tekstTytułu) {
  'use strict';
  var dużyObraz = document.querySelector(SELEKTOR_DUŻEGO_OBRAZU);
  dużyObraz.setAttribute('src', urlObrazu);
  var tytułObrazu = document.querySelector(SELEKTOR_TYTUŁU_OBRAZU);
  tytułObrazu.textContent = tekstTytułu;
}

function obrazMiniatury(miniatura) {
  'use strict';
  return miniatura.getAttribute('data-url-obrazu');
}

function tytułMiniatury(miniatura) {
  'use strict';
  return miniatura.getAttribute('data-tytuł-obrazu');
}

function zmieńObrazNaPodstMiniatury(miniatura) {
  'use strict';
  zmieńObraz(obrazMiniatury(miniatura), tytułMiniatury(miniatura));
}

function dodajObsługęKliknięciaMiniatury(miniatura) {
  'use strict';
  miniatura.addEventListener('click', function(zdarzenie) {
    zdarzenie.preventDefault();
    zmieńObrazNaPodstMiniatury(miniatura);
    pokażDużyObraz();
  });
}

function odczytajTablicęMiniatur() {
  'use strict';
  var miniatury = document.querySelectorAll(SELEKTOR_MINIATURY);
  var tablicaMiniatur = [].slice.call(miniatury);
  return tablicaMiniatur;
}

function ukryjDużyObraz() {
  'use strict';
  document.body.classList.add(KLASA_UKRYTY_DUŻY_OBRAZ);
}

function pokażDużyObraz() {
  'use strict';
  var ramka = document.querySelector(SELEKTOR_RAMKI_OBRAZU);
  document.body.classList.remove(KLASA_UKRYTY_DUŻY_OBRAZ);
  ramka.classList.add(REGUŁA_MAŁEGO_OBRAZU);
  setTimeout(function() {
    ramka.classList.remove(REGUŁA_MAŁEGO_OBRAZU);
  }, 50);
}

function dodajObsługęKlawiszy() {
  'use strict';
  document.body.addEventListener('keyup', function(event) {
    event.preventDefault();
    console.log(event.keyCode);
    if (event.keyCode === KLAWISZ_ESC) {
      ukryjDużyObraz();
    }

  });
}

function inicjujZdarzenia() {
  'use strict';
  var miniatury = odczytajTablicęMiniatur();
  miniatury.forEach(dodajObsługęKliknięciaMiniatury);
  dodajObsługęKlawiszy();
}

inicjujZdarzenia();
