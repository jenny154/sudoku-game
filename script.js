// 30 關預設題目（簡單、中等、困難各 10 關）
// 0 代表空格
const LEVELS = {
    easy: [
        {
            puzzle: "530070000600195000098000060800060003400803001700020006060000280000419005000080079",
            solution: "534678912672195348198342567859761423426853791713924856961537284287419635345286179"
        },
        // 可依此類推新增 10 關（此處先用預設測資填充 10 關）
        ...Array(9).fill({
            puzzle: "000260701680070090190004500820100040004602900050003028009300074040050036703018000",
            solution: "435269781682571493197834562826195347374682915951743628519326874248957136763418259"
        })
    ],
    medium: Array(10).fill({
        puzzle: "000000012000000003002300400001800005060070080000009000008500000900040500470006000",
        solution: "635498712187254963942317458291835674364172089578649231718523694926741583453986127"
    }),
    hard: Array(10).fill({
        puzzle: "000000000000003085001020000000507000004000100090000000500000073002010000000040009",
        solution: "987654321246193785351827496123547869864932157795861234518279673472316958639745819"
    })
};

let currentBoard = [];
let currentSolution = [];
let selectedCellIndex = null;

// 初始化頁面
window.onload = () => {
    loadLevelList();
};

// 載入關卡下拉清單
function loadLevelList() {
    const levelSelect = document.getElementById('level');
    levelSelect.innerHTML = '';
    
    for (let i = 1; i <= 10; i++) {
        const opt = document.createElement('option');
        opt.value = i - 1;
        opt.textContent = `第 ${i} 關`;
        levelSelect.appendChild(opt);
    }
    startLevel();
}

// 開始關卡
function startLevel() {
    const diff = document.getElementById('difficulty').value;
    const levelIdx = parseInt(document.getElementById('level').value);
    
    const data = LEVELS[diff][levelIdx];
    currentBoard = data.puzzle.split('').map(Number);
    currentSolution = data.solution.split('').map(Number);
    selectedCellIndex = null;

    renderBoard();
}

// 繪製棋盤
function renderBoard() {
    const boardEl = document.getElementById('sudoku-board');
    boardEl.innerHTML = '';

    currentBoard.forEach((val, idx) => {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        
        // 判斷是否為初始給定數字
        const diff = document.getElementById('difficulty').value;
        const levelIdx = parseInt(document.getElementById('level').value);
        const originalVal = LEVELS[diff][levelIdx].puzzle[idx];

        if (originalVal !== '0') {
            cell.classList.add('given');
        }

        cell.textContent = val !== 0 ? val : '';
        
        if (selectedCellIndex === idx) {
            cell.classList.add('selected');
        }

        cell.onclick = () => selectCell(idx);
        boardEl.appendChild(cell);
    });
}

// 選擇單元格
function selectCell(index) {
    selectedCellIndex = index;
    renderBoard();
}

// 輸入數字
function inputNumber(num) {
    if (selectedCellIndex === null) return;

    const diff = document.getElementById('difficulty').value;
    const levelIdx = parseInt(document.getElementById('level').value);
    const originalVal = LEVELS[diff][levelIdx].puzzle[selectedCellIndex];

    // 不能修改題目預設數字
    if (originalVal !== '0') return;

    currentBoard[selectedCellIndex] = num;
    renderBoard();
}

// 檢查答案
function checkAnswer() {
    let isCorrect = true;
    let isFilled = true;

    const cells = document.querySelectorAll('.cell');

    currentBoard.forEach((val, idx) => {
        if (val === 0) {
            isFilled = false;
        } else if (val !== currentSolution[idx]) {
            isCorrect = false;
            cells[idx].classList.add('wrong');
        }
    });

    if (!isFilled) {
        alert("還沒填完喔！請繼續努力。");
    } else if (isCorrect) {
        alert("🎉 恭喜你！成功通關！");
    } else {
        alert("❌ 答案有誤（紅色標示處），再檢查看看吧！");
    }
}