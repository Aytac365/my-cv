let originalData = {};

async function loadData() {
  const saved = localStorage.getItem('cvData');
  if (saved) {
    originalData = JSON.parse(saved);
    renderAll();
  } else {
    const res = await fetch('data.json');
    originalData = await res.json();
    localStorage.setItem('cvData', JSON.stringify(originalData));
    renderAll();
  }
}

function renderAll() {
  for (let key in originalData) {
    document.getElementById(`${key}-text`).innerText = originalData[key];
  }
}

function editSection(sectionId) {
  const textElement = document.getElementById(`${sectionId}-text`);
  const parent = document.getElementById(`${sectionId}-section`);
  const currentText = textElement.innerText;

  const textarea = document.createElement('textarea');
  textarea.value = currentText;

  const saveBtn = document.createElement('button');
  saveBtn.textContent = 'Yadda saxla';
  saveBtn.onclick = function () {
    originalData[sectionId] = textarea.value;
    localStorage.setItem('cvData', JSON.stringify(originalData));
    renderAll();
  };

  parent.innerHTML = `<h2>${sectionId.toUpperCase()}</h2><hr class="right-line" />`;
  parent.appendChild(textarea);
  parent.appendChild(saveBtn);
}

function resetAll() {
  localStorage.removeItem('cvData');
  loadData();
}

window.onload = loadData;
