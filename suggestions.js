let SUGGESTIONS = [
  “soñé que tenía diócesis”,
“soñe con vos pasabas con un globo naranja de los que flotan parecías contento”, 
“soñé que me mudaba”, 
“soñé que el auto estaba lleno de papeles que me tapaban la cara”, 
“soñé que el mar crecía y no había forma de subir al acantilado”, 
“soñé que flavia y rodrigo me saludaban desde un auto”, 
“soñé que en luro y san juan había una frontera la cruzábamos de la mano”, 
“soñé que juan ariel gomez me decía sos un embole en blanco y negro”, 
“soñé con un lugar mágico al que podía acceder desde mi casa”, 
“dormí siete minutos y soñé que tenía que bajar once pisos por una escalera hecha con sogas”, 
“soñé que discutía sobre si Horacio Quiroga era argentino o uruguayo”, 
“soñé que había una aplicación para ubicar contenedores en la ciudad”,
“soñé con san cayetano me hablaba pero tenía cuerpo de estatua”,
“soñé que tenía que rendir hispano III”,
“soñé algo horrible”,
“soñé que me tiraba de un acantilado”,
“soñé que la tortuga era un ser expresivo que me quería estábamos en el patio”,
“soñé que ponía Chubby Checker para bailar y alguien lo cambiaba y ponía una canción triste de Calamaro y se reía de mí”,
“soñé que escribía un libro sobre la nieve”,
“soñé que era el 2066 y caminaba sola en un supermercado Toledo”,
“soñé que corría desquiciadamente para recuperar un paraguas blanco”,
“soñé que tomaba horas para trabajar en el baño de un boliche”,
“soñé con ropa vintage”,
“soñé con un lobo marino re lindo”,
“soñé con Sartre pero no puedo recordar qué”,
“soñé que Mario Ortiz me decía el año que viene se van a usar los aparatos sin dientes”,

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

