
const AFTER_LETTER_DELAY = 75;
const AFTER_VERSE_DELAY = 200;
const AFTER_STANZA_DELAY = 500;

function main() {
  displayMenu('', true);
}

function displayMenu(selected, enabled) {
  let elem = document.getElementById("menu");
  clearElem(elem);

  let table = document.createElement("table");
  let row_size = 4;
  for (let i = 0; i < NAMES.length; i += row_size) {
    let row = document.createElement("tr");
    for (let j = 0; j < row_size; j++) {
      let t = i + j;
      let name = NAMES[t];
      //if (j !== 0 && i % row_size === 0) {
      //  elem.appendChild(BR());
      //} else if (i !== 0) {
      //  elem.appendChild(SPAN1('space', TEXT(' ')));
      //}
      let cell = document.createElement('td');
      if (selected === name) {
        cell.appendChild(SPAN1('selected', TEXT(name)));
      } else if (enabled) {
        cell.appendChild(A_onclick(TEXT(name), function () {
          start(name);
        }));
      } else {
        cell.appendChild(SPAN1('disabled', TEXT(name)));
      }
      row.appendChild(cell);
    }
    table.appendChild(row);
    elem.appendChild(table);
  }
}

function start(name) {
  displayMenu(name, false);
  let stanzabox = document.getElementById("stanzabox");
  clearElem(stanzabox);
  let searchText = document.getElementById("searchtext");
  clearElem(searchText);
  hideSuggestion();
  setTimeout(
    function() { write(name, [...VERSES[name]]); },
    AFTER_LETTER_DELAY
  );
}

function write(name, verses) {
  if (verses.length === 0) {
    displayMenu(name, true);
    return;
  }
  let firstVerse = verses.shift();
  if (firstVerse == '') {
    setTimeout(
      function() {
        let elem = document.getElementById("stanzabox");
        elem.appendChild(BR());
        write(name, verses);
      },
      AFTER_STANZA_DELAY
    );
  } else {
    writeVerse(name, "", firstVerse, verses);
  }
}

function writeVerse(name, prefix, suffix, verses) {
  let elem = document.getElementById("searchtext");
  clearElem(elem);
  elem.appendChild(TEXT(prefix));
  if (suffix === "") {
    hideSuggestion();
    setTimeout(
      function() {
        let elem = document.getElementById("stanzabox");
        elem.appendChild(A(P1(TEXT(prefix)), 'https://www.google.com/search?q=' + prefix));
        write(name, verses);
      },
      AFTER_VERSE_DELAY*1.7
    );
  } else {
    displaySuggestion(prefix);
    setTimeout(
      function() { writeVerse(name, prefix + suffix[0], suffix.substr(1), verses); },
      AFTER_LETTER_DELAY*1.7
    );
  }
}


function displaySuggestion(prefix) {
  let elem = document.getElementById("suggestionbox");
  clearElem(elem);
  let suggestions = get_suggestions(prefix);
  for (let suggestion of suggestions) {
    elem.appendChild(P([
      TEXT(suggestion.substr(0, prefix.length)),
      SPAN1('suggestion', TEXT(suggestion.substr(prefix.length)))
    ]));
  }
  if (suggestions.length > 0) {
    elem.style.visibility = 'visible';
  } else {
    elem.style.visibility = 'hidden';
  }
}

function hideSuggestion() {
  let elem = document.getElementById("suggestionbox");
  elem.style.visibility = 'hidden';
}

