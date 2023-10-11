let fields = [
  null, null, null,
  null, null, null,
  null, null, null
];

let currentPlayer = 'circle'; // 'circle' oder 'cross'

function init() {
  render();
}

function renderCell(index) {
  const cell = document.querySelector(`[data-index="${index}"]`);

  if (cell) {
    cell.innerHTML = ''; // Löschen Sie den Inhalt des Zellelements

    const symbolDiv = document.createElement('div');
    symbolDiv.className = 'symbol';

    if (fields[index]) {
      // Wenn das Feld nicht null ist, fügen Sie das entsprechende Symbol hinzu
      symbolDiv.innerHTML = fields[index] === 'circle' ? generateCircleSVG() : generateCrossSVG();
    } else {
      // Wenn das Feld null ist, fügen Sie das onclick-Attribut hinzu
      cell.setAttribute('onclick', `handleClick(${index})`);
    }

    cell.appendChild(symbolDiv);
  }
}

function checkGameOver() {
  // Array mit den möglichen Gewinnkombinationen
  const winningCombinations = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Horizontale Reihen
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Vertikale Reihen
    [0, 4, 8], [2, 4, 6]              // Diagonalen
  ];

  for (const combination of winningCombinations) {
    const [a, b, c] = combination;
    if (fields[a] && fields[a] === fields[b] && fields[a] === fields[c]) {
      // Ein Spieler hat gewonnen
      return combination; // Die gewinnende Kombination zurückgeben
    }
  }

  // Überprüfen, ob es unentschieden ist
  if (fields.every(field => field)) {
    return 'tie'; // Das Spiel ist unentschieden
  }

  return null; // Das Spiel läuft noch
}


function drawWinningLine(winningCombination) {
  if (winningCombination === 'tie') {
    return; // Unentschieden, keine Linie zeichnen
  }

  // Gewinnende Kombination enthält die Indexe der gewinnenden Felder
  const [a, b, c] = winningCombination;

  // Erstellen Sie eine Linie
  const line = document.createElement('div');
  line.className = 'winning-line';

  // Bestimmen Sie die Art der Linie basierend auf den gewinnenden Indexen
  if ((a === 0 && c === 8) || (a === 8 && c === 0)) {
    // Diagonale von links oben nach rechts unten oder umgekehrt
    line.style.transform = 'rotate(48.3052deg)';
    line.style.width = '100%';
    line.style.height = '10px';
    line.style.position = 'absolute';
  } else if ((a === 2 && c === 6) || (a === 6 && c === 2)) {
    // Diagonale von rechts oben nach links unten oder umgekehrt
    line.style.transform = 'rotate(132.3052deg)';
    line.style.width = '100%';
    line.style.height = '10px';
    line.style.position = 'absolute';
  } else if (a === 0 && c === 2)  {
    // Horizontale Linie (Felder 0 bis 2 )
    line.style.transform = 'rotate(0deg)';
    line.style.height = '10px';
    line.style.width = '100%';
    line.style.top = '80px';
    
  } else if (a === 3 && c === 5)  {
    // Horizontale Linie (Felder 3 bis 5 )
    line.style.transform = 'rotate(0deg)';
    line.style.height = '10px';
    line.style.width = '100%';
    line.style.top = '259px';
    line.style.position = 'absolute';
    } 
 else if (a === 6 && c === 8) {
    // Horizontale Linie (Felder 6 bis 8)
    line.style.transform = 'rotate(0deg)';
    line.style.height = '10px';
    line.style.width = '100%'; 
    line.style.top = '434px';
  
    line.style.position = 'absolute';
  } else if (a === 0 && c === 6) {
    // Vertikale Linie (Felder 0 bis 6)
    
    line.style.width = '10px';
    line.style.height = '100%';
    line.style.position = 'absolute';
    line.style.left = '72px';
  } else if (a === 1 && c === 7) {
    
    line.style.width = '10px';
    line.style.height = '100%';
    line.style.position = 'absolute';
    line.style.left = '229px';
  } else if (a === 2 && c === 8) {
    // Vertikale Linie (Felder 2 bis 8)
    
    line.style.width = '10px';
    line.style.height = '100%';
    line.style.position = 'absolute';
    line.style.right = '71px';
  }

  // Fügen Sie die Linie zum "Content"-Element hinzu
  const contentDiv = document.getElementById('Content');
  contentDiv.appendChild(line);
}

function restartGame() {
  fields = [ // Setzen Sie das Spielfeld zurück
    null, null, null,
    null, null, null,
    null, null, null
  ];

  // Entfernen Sie die bestehenden Linien und Symbole
  const contentDiv = document.getElementById('Content');
  contentDiv.innerHTML = '';

  // Rendern Sie das Spielfeld erneut und fügen Sie das onclick-Attribut hinzu
  render();
}



// Funktion zur Berechnung des Winkels basierend auf den gewinnenden Feldern
function getAngleForLine(a, b, c) {
  if ((a === 0 && c === 8) || (a === 8 && c === 0)) {
    return '48.3052deg'; // Diagonale von links oben nach rechts unten oder umgekehrt
  } else if ((a === 2 && c === 6) || (a === 6 && c === 2)) {
    return '132.3052deg'; // Diagonale von rechts oben nach links unten oder umgekehrt
  } else if (a === 0 || a === 1 || a === 2) {
    return '0deg'; // Horizontale Linie (von links nach rechts)
  } else if (a === 0 || a === 3 || a === 6) {
    return '90deg'; // Vertikale Linie (von oben nach unten)
  } else {
    return '0deg'; // Standardfall (horizontale Linie)
  }
}

function handleClick(index) {
  if (!fields[index]) {
    fields[index] = currentPlayer;
    currentPlayer = currentPlayer === 'circle' ? 'cross' : 'circle';
    const cell = document.querySelector(`[data-index="${index}"]`);
    if (cell) {
      cell.removeAttribute('onclick');
    }
    renderCell(index);

    // Überprüfen, ob das Spiel vorbei ist
    const gameOver = checkGameOver();
    if (gameOver) {
      // Wenn das Spiel vorbei ist, zeichnen Sie die gewinnende Linie
      drawWinningLine(gameOver);

      // Sperren Sie das Spielfeld, um weitere Symbole zu setzen
      for (let i = 0; i < fields.length; i++) {
        const cell = document.querySelector(`[data-index="${i}"]`);
        if (cell) {
          cell.removeAttribute('onclick');
        }
      }

      // Aktualisieren Sie die Punkte der Spieler
      const player1Score = document.getElementById('player1Score');
      const player2Score = document.getElementById('player2Score');
      if (gameOver === 'tie') {
        // Unentschieden
        // Keine Punkte hinzufügen
      } else {
        // Ein Spieler hat gewonnen
        if (fields[gameOver[0]] === 'circle') {
          player1Score.textContent = parseInt(player1Score.textContent) + 1;
        } else {
          player2Score.textContent = parseInt(player2Score.textContent) + 1;
        }
      }
    }
  }
}

function render() {
  const contentDiv = document.getElementById('Content');
  const table = document.createElement('table');

  for (let i = 0; i < 3; i++) {
    const row = table.insertRow(i);

    for (let j = 0; j < 3; j++) {
      const index = i * 3 + j;

      // Erstellen Sie ein <td> Element mit einem data-index Attribut
      const cell = document.createElement('td');
      cell.setAttribute('data-index', index);

      // Fügen Sie das onclick-Attribut hinzu
      cell.setAttribute('onclick', `handleClick(${index})`);

      row.appendChild(cell);
    }
  }

  contentDiv.innerHTML = '';
  contentDiv.appendChild(table);
}


function generateCircleSVG() {
    const svgCode = `
      <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100">
        <circle cx="50" cy="50" r="40" fill="transparent" stroke="#00B0EF" stroke-width="20">
          <animate attributeName="stroke-dasharray" from="0 251.2" to="251.2 0" dur="0.200s" begin="0s" fill="freeze" />
        </circle>
      </svg>
    `;
    return svgCode;
}

function generateCrossSVG() {
    const svgCode = `
      <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100">
        <line x1="0" y1="0" x2="100" y2="100" stroke="#FFC000" stroke-width="20">
          <animate attributeName="stroke-dasharray" from="0 141.4" to="141.4 0" dur="0.200s" begin="0s" fill="freeze" />
        </line>
        <line x1="100" y1="0" x2="0" y2="100" stroke="#FFC000" stroke-width="20">
          <animate attributeName="stroke-dasharray" from="0 141.4" to="141.4 0" dur="0.200s" begin="0s" fill="freeze" />
        </line>
      </svg>
    `;
    return svgCode;
  }

