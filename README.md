# 🎃 Gostosuras ou Travessuras - Halloween Challenge

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)
![Status](https://img.shields.io/badge/Status-Completed-success?style=for-the-badge)

## 📖 Sobre o Desafio

**🎃 Gostosuras ou Travessuras**

A noite de Halloween chegou, e criaturas mágicas estão prontas para a grande Caça às Guloseimas! Sua missão é escolher as melhores guloseimas espalhadas pelo bairro para formar o saco de doces mais recheado possível. Mas cuidado: se errar na escolha, travessuras sombrias podem acontecer! Selecione cuidadosamente para garantir o maior número de gostosuras, sem ultrapassar o limite de casas visitadas.

### 🔧 Desafio Técnico

Você recebeu uma lista de guloseimas e o número de pontos mágicos (doces especiais) disponíveis em cada casa durante o Halloween. Seu desafio é encontrar a combinação de guloseimas que maximiza o número total de pontos mágicos, sem exceder a quantidade máxima de casas visitadas. Cada guloseima só pode ser coletada uma vez por casa.

#### 📋 Entrada

- **candies**: Uma lista de tuplas, onde cada tupla contém o nome da guloseima (casa) e o número de pontos mágicos disponíveis lá.
- **max_houses**: Um inteiro que representa o número máximo de casas (guloseimas) que podem ser visitadas na Caça às Guloseimas.

#### 📤 Saída Esperada

Retorne uma lista com os nomes das guloseimas escolhidas, que maximize o número total de pontos mágicos.

#### 👻 Travessuras

Se não conseguir montar o saco de gostosuras mais cheio possível, uma mensagem de travessura aparece: *"Travessura! Uma bruxa apareceu e encheu seu saco de aranhas..."*

### 📝 Exemplo

```javascript
candies = [
    ('Pirulito Sangrento', 5),
    ('Bala Fantasma', 8),
    ('Chocolate de Abóbora', 3),
    ('Cookie da Caveira', 6),
    ('Goma Azeda', 4)
]

max_houses = 3

// Saída Esperada: ['Bala Fantasma', 'Cookie da Caveira', 'Pirulito Sangrento']
```

---

## 🧠 Lógica de Solução

O desafio foi solucionado utilizando um **algoritmo guloso (greedy algorithm)** baseado no problema clássico de **Knapsack 0/1** simplificado, onde cada item tem peso unitário.

### 🔍 Abordagem Técnica

A solução implementada segue os seguintes passos:

1. **Ordenação Decrescente**: Os itens (guloseimas) são ordenados em ordem decrescente de valor (poder mágico), garantindo que os itens mais valiosos sejam considerados primeiro.

2. **Seleção Gulosa**: Seleciona-se os `k` primeiros itens da lista ordenada, onde `k = max_houses`, maximizando o valor total sem violar a restrição de capacidade.

3. **Complexidade**:
   - **Tempo**: O(n log n) devido à ordenação
   - **Espaço**: O(n) para armazenar a cópia ordenada do array

### 💻 Função Principal

```javascript
function solveChallenge(candies, maxHouses) {
    // Ordenar por poder mágico (decrescente)
    const sortedCandies = [...candies].sort((a, b) => b.power - a.power);
    
    // Selecionar os melhores (top k)
    const selected = sortedCandies.slice(0, maxHouses);
    
    // Calcular total de pontos
    const totalPower = selected.reduce((sum, candy) => sum + candy.power, 0);
    
    // Retornar nomes das guloseimas selecionadas
    return selected.map(c => c.name);
}
```

### 🎯 Por que esta abordagem funciona?

Como cada guloseima tem "peso" unitário (cada casa conta como 1) e queremos maximizar o valor total, a estratégia gulosa de sempre escolher os itens de maior valor é **ótima** para este problema específico. Este é um caso especial do Knapsack onde a solução gulosa garante o resultado ótimo.

### ⚠️ Limitações

Esta abordagem funciona perfeitamente quando:
- Cada item tem peso/custo unitário (1 casa = 1 item)
- Queremos maximizar valor total
- Não há dependências entre itens

Para problemas de Knapsack com pesos variados, seria necessário usar **Programação Dinâmica**.

---

## 💼 Aplicações em Projetos Reais

Este algoritmo pode ser aplicado em diversos cenários do mundo real:

### 1. **Sistemas de Recomendação**
- Selecionar os `n` produtos com melhor avaliação/popularidade
- Mostrar top itens dentro de um limite de exibição

### 2. **E-commerce e Marketing**
- Otimização de campanhas: escolher produtos com melhor ROI
- Seleção de cupons/ofertas com maior valor percebido

### 3. **Gestão de Recursos**
- Alocação de tarefas prioritárias dentro de um limite de tempo
- Seleção de projetos com maior retorno financeiro

### 4. **Análise de Dados**
- Filtrar top K registros por métricas específicas
- Dashboards executivos com KPIs principais

### 5. **Sistemas de Pontuação/Gamificação**
- Otimizar recompensas em jogos e aplicativos
- Sistemas de ranking e leaderboards

---

## 🚀 Como Executar

1. Clone o repositório:
```bash
git clone https://github.com/luizfxdev/desafio_322.git
cd desafio_322
```

2. Adicione os arquivos de mídia na pasta `assets/`:
   - `background.mp4`
   - `theme.mp3`

3. Abra o arquivo `index.html` em seu navegador

---

## 🎨 Tecnologias Utilizadas

- **HTML5**: Estrutura semântica
- **CSS3**: Animações avançadas, Grid/Flexbox, design responsivo
- **JavaScript ES6+**: Arrow functions, destructuring, array methods
- **Design Pattern**: Algoritmo Guloso (Greedy Algorithm)

---

## 📂 Estrutura do Projeto

```
desafio_322/
│
├── index.html          # Estrutura HTML principal
├── styles.css          # Estilos e animações
├── script.js           # Lógica e algoritmo de solução
├── README.md           # Documentação
│
└── assets/
    ├── background.mp4  # Vídeo de fundo temático
    └── theme.mp3       # Música ambiente
```

---

## 🎯 Funcionalidades

✅ Interface temática de Halloween com animações  
✅ Adicionar guloseimas dinamicamente  
✅ Validação completa de entrada  
✅ Algoritmo de otimização (Greedy)  
✅ Exibição passo a passo do cálculo  
✅ Design totalmente responsivo  
✅ Controles de áudio integrados  
✅ Mensagens de erro personalizadas  

---

## 📝 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

---

## 👨‍💻 Autor

**Luiz Felipe de Oliveira**

- GitHub: [@luizfxdev](https://github.com/luizfxdev)
- Linkedin: [in/luizfxdev](https://www.linkedin.com/in/luizfxdev)
- Portfólio: [luizfxdev.com.br](https://luizfxdev.com.br)

---

## 🌟 Contribuições

Contribuições são bem-vindas! Sinta-se à vontade para abrir issues e pull requests.

---

***Doces ou travessuras? Melhor escolher com sabedoria ou ficar com os dois!***
