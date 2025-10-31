// Variáveis globais
let candyList = [];

// Elementos do DOM
const candyInput = document.getElementById('candy-input');
const maxHousesInput = document.getElementById('max-houses');
const addCandyBtn = document.getElementById('add-candy');
const candyListDiv = document.getElementById('candy-list');
const chooseBtn = document.getElementById('choose-btn');
const returnBtn = document.getElementById('return-btn');
const resultContent = document.getElementById('result-content');
const themeAudio = document.getElementById('theme-audio');
const playAudioBtn = document.getElementById('play-audio');
const pauseAudioBtn = document.getElementById('pause-audio');

// Controles de áudio
playAudioBtn.addEventListener('click', () => {
  themeAudio.play();
  playAudioBtn.style.opacity = '0.5';
  pauseAudioBtn.style.opacity = '1';
});

pauseAudioBtn.addEventListener('click', () => {
  themeAudio.pause();
  playAudioBtn.style.opacity = '1';
  pauseAudioBtn.style.opacity = '0.5';
});

// Adicionar doce à lista
addCandyBtn.addEventListener('click', addCandy);
candyInput.addEventListener('keypress', e => {
  if (e.key === 'Enter') {
    addCandy();
  }
});

function addCandy() {
  const input = candyInput.value.trim();

  if (!input) {
    alert('Por favor, insira o nome do doce e o poder mágico!');
    return;
  }

  // Parse da entrada: "Nome do Doce, Poder"
  const parts = input.split(',').map(part => part.trim());

  if (parts.length !== 2) {
    alert('Formato inválido! Use: Nome do Doce, Poder Mágico\nExemplo: Pirulito Sangrento, 5');
    return;
  }

  const candyName = parts[0];
  const candyPower = parseInt(parts[1]);

  if (isNaN(candyPower) || candyPower <= 0) {
    alert('O poder mágico deve ser um número positivo!');
    return;
  }

  // Adicionar à lista
  candyList.push({ name: candyName, power: candyPower });

  // Renderizar lista
  renderCandyList();

  // Limpar input
  candyInput.value = '';
  candyInput.focus();
}

function renderCandyList() {
  if (candyList.length === 0) {
    candyListDiv.innerHTML = '';
    return;
  }

  candyListDiv.innerHTML = candyList
    .map(
      (candy, index) => `
        <div class="candy-item">
            <span>🍬 ${candy.name} - ${candy.power} pontos</span>
            <button class="remove-btn" onclick="removeCandy(${index})">Remover</button>
        </div>
    `
    )
    .join('');
}

function removeCandy(index) {
  candyList.splice(index, 1);
  renderCandyList();
}

// Botão ESCOLHER
chooseBtn.addEventListener('click', () => {
  const maxHouses = parseInt(maxHousesInput.value);

  // Validações
  if (candyList.length === 0) {
    showError('Adicione pelo menos um doce à lista!');
    return;
  }

  if (isNaN(maxHouses) || maxHouses <= 0) {
    showError('Insira um número válido de casas!');
    return;
  }

  if (maxHouses > candyList.length) {
    showError(`Você só tem ${candyList.length} doces disponíveis!`);
    return;
  }

  // Resolver o desafio
  solveChallenge(candyList, maxHouses);
});

// Botão RETORNAR
returnBtn.addEventListener('click', () => {
  candyList = [];
  maxHousesInput.value = '';
  renderCandyList();
  resultContent.innerHTML = '<p class="waiting-message">Aguardando seleção das guloseimas...</p>';
});

// Resolver o desafio (Algoritmo Guloso - Knapsack)
function solveChallenge(candies, maxHouses) {
  let resultHTML = '';

  // Passo 1: Mostrar lista original
  resultHTML += `<div class="calculation-step">
        <strong>📋 Passo 1: Lista Original de Guloseimas</strong><br>
        ${candies.map(c => `${c.name}: ${c.power} pontos`).join('<br>')}
    </div>`;

  // Passo 2: Ordenar por poder mágico (decrescente)
  const sortedCandies = [...candies].sort((a, b) => b.power - a.power);

  resultHTML += `<div class="calculation-step">
        <strong>🔄 Passo 2: Ordenação por Poder Mágico (Maior para Menor)</strong><br>
        ${sortedCandies.map(c => `${c.name}: ${c.power} pontos`).join('<br>')}
    </div>`;

  // Passo 3: Selecionar os melhores
  const selected = sortedCandies.slice(0, maxHouses);
  const totalPower = selected.reduce((sum, candy) => sum + candy.power, 0);

  resultHTML += `<div class="calculation-step">
        <strong>✨ Passo 3: Seleção dos ${maxHouses} Melhores</strong><br>
        ${selected.map((c, i) => `${i + 1}. ${c.name}: ${c.power} pontos`).join('<br>')}
    </div>`;

  // Passo 4: Cálculo total
  resultHTML += `<div class="calculation-step">
        <strong>🧮 Passo 4: Cálculo Total de Pontos Mágicos</strong><br>
        ${selected.map(c => c.power).join(' + ')} = ${totalPower} pontos
    </div>`;

  // Resultado final
  const candyNames = selected.map(c => c.name);

  resultHTML += `<div class="final-result">
        <h3>🎃 Resultado Final</h3>
        <p><strong>Guloseimas Escolhidas:</strong></p>
        <p style="font-size: 1.1em; margin-top: 10px;">[${candyNames.map(n => `'${n}'`).join(', ')}]</p>
        <p style="margin-top: 15px;"><strong>Total de Pontos Mágicos:</strong> ${totalPower} 🌟</p>
    </div>`;

  resultContent.innerHTML = resultHTML;
}

// Mostrar erro
function showError(message) {
  resultContent.innerHTML = `
        <div class="error-message">
            <strong>👻 Travessura!</strong><br>
            ${message}<br>
            <em style="margin-top: 10px; display: block;">Uma bruxa apareceu e encheu seu saco de aranhas... 🕷️</em>
        </div>
    `;
}
