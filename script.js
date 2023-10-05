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

function init(){
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
  
        if (fields[index] === 'circle') {
          cell.innerText = 'o';
        } else if (fields[index] === 'cross') {
          cell.innerText = 'x';
        } else {
          cell.innerText = '';
        }
      }
    }
  
    contentDiv.innerHTML = '';
    contentDiv.appendChild(table);
  }

