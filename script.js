let fields = [
    null,
    'circle',
    'circle',
    'circle',
    null,
    null,
    'cross',
    'cross',
    null,
];

function init() {
    render();
}


function render() {
    const contentDiv = document.getElementById('Content');
    const table = document.createElement('table');

    for (let i = 0; i < 3; i++) {
        const row = table.insertRow(i);

        for (let j = 0; j < 3; j++) {
            const cell = row.insertCell(j);
            const index = i * 3 + j;

            // Erstellen Sie ein <div> Element für das Symbol
            const symbolDiv = document.createElement('div');
            symbolDiv.className = 'symbol';

            if (fields[index] === 'circle') {
                // Fügen Sie das Kreis-Symbol hinzu
                symbolDiv.innerHTML = generateCircleSVG();
            } else if (fields[index] === 'cross') {
                // Fügen Sie das Kreuz-Symbol hinzu
                symbolDiv.innerHTML = generateCrossSVG();
            }

            cell.appendChild(symbolDiv);
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

