const params = new Proxy(new URLSearchParams(window.location.search), {
  get: (searchParams, prop) => searchParams.get(prop),
});

let FRETS = 24

let STRINGS = [
  7, // E
  2, // B
  10, // G
  5, // D
  0, // A
  7, // E
]
let NOTES = [
  "A",
  "A#",
  "B",
  "C",
  "C#",
  "D",
  "D#",
  "E",
  "F",
  "F#",
  "G",
  "G#",
]

let modes = {
  "major-scale": [
    0, 2, 4, 5, 7, 9, 11
  ],
  "minor-scale": [
    0, 2, 3, 5, 7, 8, 10
  ],
  "major-pentatonic-scale": [
    0, 2, 4, 7, 9,
  ],
  "minor-pentatonic-scale": [
    0, 3, 5, 7, 10
  ],
  "ionian-mode": [
    0, 2, 4, 5, 7, 9, 11
  ],
  "dorian-mode": [
    0, 2, 3, 5, 7, 9, 10
  ],
  "phrygian-mode": [
    0, 1, 3, 5, 7, 8, 10
  ],
  "lydian-mode": [
    0, 2, 4, 6, 7, 9, 11
  ],
  "mixolydian-mode": [
    0, 2, 4, 5, 7, 9, 10
  ],
  "aeolian-mode": [
    0, 2, 3, 5, 7, 8, 10
  ],
  "locrian-mode": [
    0, 1, 3, 5, 6, 8, 10
  ],
  "phrygian-dominant-scale": [
    0, 1, 4, 5, 7, 8, 10
  ],
  "harmonic-minor-scale": [
    0, 2, 3, 5, 7, 8, 11
  ],
  "major-chord": [
    0, 4, 7
  ],
  "diminished-chord": [
    0, 3, 6
  ],
  "major-7th-chord": [
    0, 4, 7, 11
  ],
  "minor-7th-chord": [
    0, 3, 7, 10
  ],
  "dominant-7th-chord": [
    0, 4, 7, 10
  ],
  "sus2-chord": [
    0, 2, 7
  ],
  "sus4-chord": [
    0, 4, 7
  ],
  "augmented-chord": [
    0, 4, 8
  ],
  "major-9th-chord": [
    0, 4, 7, 11, 14
  ],
  "minor-9th-chord": [
    0, 3, 7, 10, 14
  ],
  "dominant-9th-chord": [
    0, 4, 7, 10, 14
  ],
}

function loadNotes() {
  let table = $("<table>")
  if (params.strings) {
    STRINGS = params.strings.split(",")
  }
  for (let string of STRINGS) {
    let row = $("<tr>")
    for (let i = 0; i<FRETS + 1; i++) {
      let note = $("<td>")
      note.text(NOTES[(string + i) % 12])
      note.addClass("note-" + (string + i) % 12)
      if (i === 0) {
        note.addClass("open")
      } else {
        note.addClass("not-open")
      }
      row.append(note)
    }
    table.append(row)
  }
  let fretNumberRow = $("<tr>")
  for (let i = 0; i < FRETS + 1; i++) {
    let note = $("<td>")
    note.text(i)
    fretNumberRow.append(note)
  }
  table.append(fretNumberRow)

  $("#fretboard").append(table)
}

window.onload = function() {
  loadNotes()
  $("select").on("change", function(e) {
    let root = parseInt($("#root").val())
    let subset = $("#subset").val()
    if (!modes[subset]) {
      return
    }
    $(".highlighted").removeClass("highlighted")
    for (let note of modes[subset]) {
      $(".note-" + ((note + root) % 12)).addClass("highlighted")
    }
  })
}
