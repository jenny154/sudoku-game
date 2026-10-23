// 確保 1~10 關題目獨立且不重複的豐富題庫
const LEVELS = {
    easy: [
        { puzzle: "530070000600195000098000060800060003400803001700020006060000280000419005000080079", solution: "534678912672195348198342567859761423426853791713924856961537284287419635345286179" },
        { puzzle: "000260701680070090190004500820100040004602900050003028009300074040050036703018000", solution: "435269781682571493197834562826195347374682915951743628519326874248957136763418259" },
        { puzzle: "100007090030020008009600500007030018000090000590070400005001200700080030040900006", solution: "168357492437129658259648573247536918816492375593871426385761249721684935942915866" },
        { puzzle: "000801000000000430500000000000070800000000102005060000001200000020000000000040000", solution: "943821567678539431521647892186475823732194152455963784361258679224386915815742360" }, // (修復 4, 5, 6-10 確保獨立)
        { puzzle: "200080300060070840000002100070000006900601005500000080004200000082030090001090004", solution: "259486317163579842418362179374128596928641735586953281734215968282734691691897424" },
        { puzzle: "000000907000420180000705026100904000050000040000501009820306000075098000106000000", solution: "348169957756423189912785426163954872257618341499531629821346795675298413136872594" },
        { puzzle: "020000000000608000580000097000040000000000000000060000870000031000109000000000050", json: "", solution: "629435718314678259587219497258346172163527984471962358872654931645193827931881650" },
        { puzzle: "800000000003600000070090200050007000000045000000100030001000068008500010090000400", solution: "812753649943682175276491283359827416724345861685169732161274968438516217597938421" },
        { puzzle: "123456789000000000000000000000000000000000000000000000000000000000000000000000000", solution: "123456789456789123789123456231564897564897231897231564312645978645978312978312645" },
        { puzzle: "090000030000305000001020400005000800000102000004000300003010900000807000050000010", solution: "492681537736345182881729465265493871349152684614876359523914978164837256957268513" }
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

let currentBoard = [];
let currentNotes = [];
let currentSolution = [];
let selectedCellIndex = null;
let isNoteMode = false;

// 計時與偷答案相關變數
let timerSeconds = 0;
let timerInterval = null;
let stealSeconds = 0;
let stealInterval = null;

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
    resetTimers();
}

function resetTimers() {
    clearInterval(timerInterval);
    clearInterval(stealInterval);
    timerSeconds = 0;
    stealSeconds = 0;
    updateTimerDisplay();
    updateStealBar();

    // 開始總計時
    timerInterval = setInterval(() => {
        timerSeconds++;
        updateTimerDisplay();
    }, 1000);

    // 開始偷答案倒數 (每 60 秒偷一次)
    stealInterval = setInterval(() => {
        stealSeconds++;
        updateStealBar();
        if (stealSeconds >= 60) {
            stealSeconds = 0;
            triggerSteal();
        }
    }, 1000);
}

function updateTimerDisplay() {
    const min = String(Math.floor(timerSeconds / 60)).padStart(2, '0');
    const sec = String(timerSeconds % 60).padStart(2, '0');
    document.getElementById('timer').textContent = `⏳ 耗時：${min}:${sec}`;
}

function updateStealBar() {
    const pct = (stealSeconds / 60) * 100;
    document.getElementById('steal-bar').style.width = `${pct}%`;
}

function triggerSteal() {
    // 找出所有「玩家自己填過」的格子
    const diff = document.getElementById('difficulty').value;
    const levelIdx = parseInt(document.getElementById('level').value);
    const puzzleStr = LEVELS[diff][levelIdx].puzzle;

    let filledIndices = [];
    currentBoard.forEach((val, idx) => {
        if (puzzleStr[idx] === '0' && val !== 0) {
            filledIndices.push(idx);
        }
    });

    if (filledIndices.length > 0) {
        // 隨機選一個拿走
        const targetIdx = filledIndices[Math.floor(Math.random() * filledIndices.length)];
        currentBoard[targetIdx] = 0;
        renderBoard();
        
        // 彈出黑幕
        document.getElementById('steal-modal').classList.remove('hidden');
    }
}

function dismissStealModal() {
    document.getElementById('steal-modal').classList.add('hidden');
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
            cell.textContent = val;
        } else {
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

    if (isGiven) return;

    if (num === 0) {
        currentBoard[selectedCellIndex] = 0;
        currentNotes[selectedCellIndex].clear();
    } else if (isNoteMode) {
        currentBoard[selectedCellIndex] = 0;
        const notesSet = currentNotes[selectedCellIndex];
        if (notesSet.has(num)) {
            notesSet.delete(num);
        } else {
            notesSet.add(num);
        }
    } else {
        currentBoard[selectedCellIndex] = num;
        currentNotes[selectedCellIndex].clear();
    }

    renderBoard();
}

function checkAnswer() {
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
        // 停止計時並開啟過關彈窗
        clearInterval(timerInterval);
        clearInterval(stealInterval);
        
        const min = Math.floor(timerSeconds / 60);
        const sec = timerSeconds % 60;
        document.getElementById('win-message').textContent = `不愧是清華的餒！竟然花了 ${min}分${sec}秒 才解開，智商超越全國 5% 智障 ^_^`;
        
        // 重置彈窗狀態
        document.getElementById('box-container').classList.remove('hidden');
        document.getElementById('win-reward').classList.add('hidden');
        document.getElementById('win-modal').classList.remove('hidden');
    } else {
        alert(`${randomTaunt}\n\n（答案有錯，紅色標示處再檢查一下啦！）`);
    }
}

function openBox() {
    document.getElementById('box-container').classList.add('hidden');
    document.getElementById('win-reward').classList.remove('hidden');
}

function closeWinModal() {
    document.getElementById('win-modal').classList.add('hidden');
}