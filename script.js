// 30 關預設題目（簡單、中等、困難各 10 關）
const LEVELS = {
    easy: [
        { puzzle: "530070000600195000098000060800060003400803001700020006060000280000419005000080079", solution: "534678912672195348198342567859761423426853791713924856961537284287419635345286179" },
        { puzzle: "000260701680070090190004500820100040004602900050003028009300074040050036703018000", solution: "435269781682571493197834562826195347374682915951743628519326874248957136763418259" },
        ...Array(8).fill({ puzzle: "530070000600195000098000060800060003400803001700020006060000280000419005000080079", solution: "534678912672195348198342567859761423426853791713924856961537284287419635345286179" })
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

// 毒舌語錄庫
const TAUNTS = [
    "你這廢物有沒有一點志氣嗎",
    "超爛的啦",
    "你清華的餒？",
    "這也需要提示==?"
];

let currentBoard = [];     // 正式答案
let currentNotes = [];     // 候選筆記 (每個元素是 Set)
let currentSolution = [];
let selectedCellIndex = null;
let isNoteMode = false;     // false: 填答案, true: 填筆記

window.onload = () => {
    loadLevelList();
};

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

function startLevel() {
    const diff = document.getElementById('difficulty').value;
    const levelIdx = parseInt(document.getElementById('level').value);
    
    const data = LEVELS[diff][levelIdx];
    currentBoard = data.puzzle.split('').map(Number);
    currentNotes = Array.from({ length: 81 }, () => new Set());
    currentSolution = data.solution.split('').map(Number);
    selectedCellIndex = null;

    renderBoard();
}

function renderBoard() {
    const boardEl = document.getElementById('sudoku-board');
    boardEl.innerHTML = '';

    const diff = document.getElementById('difficulty').value;
    const levelIdx = parseInt(document.getElementById('level').value);
    const puzzleStr = LEVELS[diff][levelIdx].puzzle;

    currentBoard.forEach((val, idx) => {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        
        const isGiven = puzzleStr[idx] !== '0';

        if (isGiven) {
            cell.classList.add('given');
            cell.textContent = val;
        } else if (val !== 0) {
            // 已填入正式答案
            cell.textContent = val;
        } else {
            // 顯示候選筆記
            const notesSet = currentNotes[idx];
            if (notesSet.size > 0) {
                const notesGrid = document.createElement('div');
                notesGrid.classList.add('notes-grid');
                for (let i = 1; i <= 9; i++) {
                    const noteItem = document.createElement('div');
                    noteItem.classList.add('note-num');
                    noteItem.textContent = notesSet.has(i) ? i : '';
                    notesGrid.appendChild(noteItem);
                }
                cell.appendChild(notesGrid);
            }
        }

        if (selectedCellIndex === idx) {
            cell.classList.add('selected');
        }

        cell.onclick = () => selectCell(idx);
        boardEl.appendChild(cell);
    });
}

function selectCell(index) {
    selectedCellIndex = index;
    renderBoard();
}

function toggleMode() {
    isNoteMode = !isNoteMode;
    const btn = document.getElementById('mode-btn');
    if (isNoteMode) {
        btn.textContent = "✏️ 當前模式：候選筆記";
        btn.className = "btn-mode mode-note";
    } else {
        btn.textContent = "✍️ 當前模式：正式答案";
        btn.className = "btn-mode mode-answer";
    }
}

function inputNumber(num) {
    if (selectedCellIndex === null) return;

    const diff = document.getElementById('difficulty').value;
    const levelIdx = parseInt(document.getElementById('level').value);
    const isGiven = LEVELS[diff][levelIdx].puzzle[selectedCellIndex] !== '0';

    if (isGiven) return; // 題目預設格不可改

    if (num === 0) {
        // 清除
        currentBoard[selectedCellIndex] = 0;
        currentNotes[selectedCellIndex].clear();
    } else if (isNoteMode) {
        // 筆記模式
        currentBoard[selectedCellIndex] = 0; // 清除正式答案
        const notesSet = currentNotes[selectedCellIndex];
        if (notesSet.has(num)) {
            notesSet.delete(num);
        } else {
            notesSet.add(num);
        }
    } else {
        // 正式答案模式
        currentBoard[selectedCellIndex] = num;
        currentNotes[selectedCellIndex].clear(); // 清空筆記
    }

    renderBoard();
}

function checkAnswer() {
    // 隨機選取一句毒舌金句
    const randomTaunt = TAUNTS[Math.floor(Math.random() * TAUNTS.length)];
    
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
        alert(`${randomTaunt}\n\n（還沒填完啦！）`);
    } else if (isCorrect) {
        alert("🎉 算你厲害，竟然真的猜對了！");
    } else {
        alert(`${randomTaunt}\n\n（答案有錯，紅色標示處再檢查一下啦！）`);
    }
}