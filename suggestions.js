let SUGGESTIONS = [

“soñé que volvía nati”,
“soñé tantas veces que manejaba sin saber”,
“soñé toda la noche con una señora”,
“soñé toda la noche cosas horribles”,
“soñé un mar muy transparente”,
“soñé un videojuego”,
“soñé x y se me enrareció la vida”,
“también soñé con pokèmon”,
“también soñé que vermelho era verde”,
“tb soñé que había una luciérnaga adentro de la casa”,
“tengo lo que soñé en la punta de la lengua”,
“todavía no soñé con ella”,
“tres siestas soñé que sabía chino”,
  
];

SUGGESTIONS.sort(function (x, y) {
  return strcmp(x, y);
});

function normalize(str) {
  return str.replace(/á/gi, 'a')
            .replace(/é/gi, 'e')
            .replace(/í/gi, 'i')
            .replace(/ó/gi, 'o')
            .replace(/ú/gi, 'u');
}

function strcmp(str1, str2) {
  return normalize(str1).localeCompare(normalize(str2));
}

function strle(str1, str2) {
  return strcmp(str1, str2) <= 0;
}

function streq(str1, str2) {
  return strcmp(str1, str2) === 0;
}

let MAX_RESULTS = 10;
function get_suggestions(prefix) {
  let i = 0;
  let j = SUGGESTIONS.length;
  while (i + 1 < j) {
    let m = Math.floor((i + j) / 2);
    if (strle(SUGGESTIONS[m], prefix)) {
      i = m;
    } else {
      j = m;
    }
  }
  let res = [];
  for (let k = i; k < SUGGESTIONS.length && k < i + MAX_RESULTS; k++) {
    if (streq(SUGGESTIONS[k].substr(0, prefix.length), prefix)) {
      res.push(SUGGESTIONS[k]);
    }
  }
  return res;
}

