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

function handleClick(index) {
  if (!fields[index]) {
    // Wenn das Feld leer ist
    fields[index] = currentPlayer;
    currentPlayer = currentPlayer === 'circle' ? 'cross' : 'circle';

    // Entfernen Sie das onclick-Attribut, um weitere Klicks zu verhindern
    const cell = document.querySelector(`[data-index="${index}"]`);
    if (cell) {
      cell.removeAttribute('onclick');
    }

    // Aktualisieren Sie nur das angeklickte Feld
    renderCell(index);
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

