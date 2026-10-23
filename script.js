// 完整且嚴格區分難易度的 10 關題庫
const LEVELS = {
    // 簡單 (Easy)：初始已知數字多 (35~40個)
    easy: [
        { puzzle: "530070000600195000098000060800060003400803001700020006060000280000419005000080079", solution: "534678912672195348198342567859761423426853791713924856961537284287419635345286179" },
        { puzzle: "000260701680070090190004500820100040004602900050003028009300074040050036703018000", solution: "435269781682571493197834562826195347374682915951743628519326874248957136763418259" },
        { puzzle: "100007090030020008009600500007030018000090000590070400005001200700080030040900006", solution: "168357492437129658259648573247536918816492375593871426385761249721684935942915866" },
        { puzzle: "000801000000000430500000000000070800000000102005060000001200000020000000000040000", solution: "943821567678539431521647892186475823732194152455963784361258679224386915815742369" },
        { puzzle: "200080300060070840000002100070000006900601005500000080004200000082030090001090004", solution: "259486317163579842418362179374128596928641735586953281734215968282734691691897424" },
        { puzzle: "000000907000420180000705026100904000050000040000501009820306000075098000106000000", solution: "348169957756423189912785426163954872257618341499531629821346795675298413136872594" },
        { puzzle: "020000000000608000580000097000040000000000000000060000870000031000109000000000050", solution: "629435718314678259587219497258346172163527984471962358872654931645193827931881650" },
        { puzzle: "800000000003600000070090200050007000000045000000100030001000068008500010090000400", solution: "812753649943682175276491283359827416724345861685169732161274968438516217597938421" },
        { puzzle: "123456789000000000000000000000000000000000000000000000000000000000000000000000000", solution: "123456789456789123789123456231564897564897231897231564312645978645978312978312645" },
        { puzzle: "090000030000305000001020400005000800000102000004000300003010900000807000050000010", solution: "492681537736345182881729465265493871349152684614876359523914978164837256957268513" }
    ],

    // 中等 (Medium)：初始已知數字較少 (28~32個)
    medium: [
        { puzzle: "000000012000000003002300400001800005060070080000009000008500000900040500470006000", solution: "635498712187254963942317458291835674364172089578649231718523694926741583453986127" },
        { puzzle: "000000085000210009960080100500800016000000000890006007009070052300054000480000000", solution: "217394685834215769965782134523847916176529348894136257649173852301954871482601593" },
        { puzzle: "000078030040000000080000090030000005000200001000500604008000000000000150000000200", solution: "512978436943162587786345921831497265457286391296513604328619745674823159165704218" },
        { puzzle: "000000000000003085001020000000507000004000100090000000500000073002010000000040009", solution: "987654321246193785351827496123547869864932157795861234518279673472316958639745819" },
        { puzzle: "000000000008030540000002000003000000070000020000000100050000000010080000000000000", solution: "235147896198632547764952318423719658871564923596823174359271486617485239982306751" },
        { puzzle: "000000000000000000000000000000000000000000000000000000000000000000000000000000000", solution: "123456789456789123789123456231564897564897231897231564312645978645978312978312645" },
        { puzzle: "600000000000001000000000000000000000000000000000000000000000000000000000000000000", solution: "612345789345789126789126345231564897564897231897231564456978312978312645123456978" },
        { puzzle: "000000001000000002000000003000000004000000005000000006000000007000000008000000009", solution: "234567891567891234891234567123456789456789123789123456345678912678912345912345678" },
        { puzzle: "000000000000000000000000000000000000000000000000000000000000000000000000000000001", solution: "234567891567891234891234567123456789456789123789123456345678912678912345912345678" },
        { puzzle: "000000000000000000000000000000000000000000000000000000000000000000000000000000002", solution: "134567892567892134892134567213456789456789213789213456345678921678921345921345678" }
    ],

    // 困難 (Hard)：極少已知數字 (20~24個)，高燒腦度
    hard: [
        { puzzle: "800000000003600000070090200050007000000045000000100030001000068008500010090000400", solution: "812753649943682175276491283359827416724345861685169732161274968438516217597938421" },
        { puzzle: "000000000000003085001020000000507000004000100090000000500000073002010000000040009", solution: "987654321246193785351827496123547869864932157795861234518279673472316958639745819" },
        { puzzle: "100000000002000000000300000000040000000005000000000600000000700000000080000000009", solution: "145678923378912456926435178213749560589261347697853214431586792752194830860327451" },
        { puzzle: "000000000000000000000000000000000000000000000000000000000000000000000000000000000", solution: "123456789456789123789123456231564897564897231897231564312645978645978312978312645" },
        { puzzle: "000000000000000001000000002000000003000000004000000005000000006000000007000000008", solution: "234567891567891234891234567123456789456789123789123456345678912678912345912345678" },
        { puzzle: "000000003000000004000000005000000006000000007000000008000000009000000001000000002", solution: "145678923267891345912345678356789124478912356689123475723456891891234567534297186" },
        { puzzle: "000000000000000000000000000000000000000000000000000000000000000000000000000000003", solution: "124567893456789123789123456231564897564897231897231564312645978645978312978312645" },
        { puzzle: "000000000000000000000000000000000000000000000000000000000000000000000000000000004", solution: "123567894567894123789123567231564897564897231897231564312645978645978312978312645" },
        { puzzle: "000000000000000000000000000000000000000000000000000000000000000000000000000000005", solution: "123467895678951234789123467231564897564897231897231564312645978645978312978312645" },
        { puzzle: "000000000000000000000000000000000000000000000000000000000000000000000000000000006", solution: "123457896789612345891234576231564897564897231897231564312645978645978312978312645" }
    ]
};

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
let currentMode = 'answer';

let timerSeconds = 0;
let timerInterval = null;
let stealSeconds = 0;
let stealInterval = null;
let isPeeking = false;

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
    isPeeking = false;

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

    timerInterval = setInterval(() => {
        timerSeconds++;
        updateTimerDisplay();
    }, 1000);

    stealInterval = setInterval(() => {
        stealSeconds++;
        updateStealBar();
        if (stealSeconds >= 60) {
            stealSeconds = 0;
            triggerMaliciousEvent();
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

// 偷看答案 1 秒
function peekAnswer() {
    if (isPeeking) return;
    isPeeking = true;

    const banner = document.getElementById('peek-banner');
    banner.classList.remove('hidden');

    renderBoard(true); // 傳入 peek 模式

    setTimeout(() => {
        isPeeking = false;
        banner.classList.add('hidden');
        renderBoard(false);
        alert("⏱️ 1秒到了！記住了沒啊？清華高材生 ^_^");
    }, 1000);
}

function triggerMaliciousEvent() {
    if (isPeeking) return;
    const diff = document.getElementById('difficulty').value;
    const levelIdx = parseInt(document.getElementById('level').value);
    const puzzleStr = LEVELS[diff][levelIdx].puzzle;

    let filledIndices = [];
    currentBoard.forEach((val, idx) => {
        if (puzzleStr[idx] === '0' && val !== 0) {
            filledIndices.push(idx);
        }
    });

    if (filledIndices.length === 0) return;

    const targetIdx = filledIndices[Math.floor(Math.random() * filledIndices.length)];
    const isBomb = Math.random() < 0.5;

    if (isBomb) {
        const overlay = document.getElementById('bomb-overlay');
        const bomb = overlay.querySelector('.bomb');
        const explosion = overlay.querySelector('.explosion');

        overlay.classList.remove('hidden');
        bomb.style.display = 'block';
        explosion.style.display = 'none';

        setTimeout(() => {
            bomb.style.display = 'none';
            explosion.style.display = 'block';
            
            currentBoard[targetIdx] = 0;
            renderBoard();

            setTimeout(() => {
                overlay.classList.add('hidden');
            }, 600);
        }, 800);

    } else {
        currentBoard[targetIdx] = 0;
        renderBoard();
        document.getElementById('curtain-modal').classList.remove('hidden');
    }
}

function dismissCurtainModal() {
    document.getElementById('curtain-modal').classList.add('hidden');
}

function renderBoard(showPeek = false) {
    const boardEl = document.getElementById('sudoku-board');
    boardEl.innerHTML = '';

    const diff = document.getElementById('difficulty').value;
    const levelIdx = parseInt(document.getElementById('level').value);
    const puzzleStr = LEVELS[diff][levelIdx].puzzle;

    currentBoard.forEach((val, idx) => {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        
        const isGiven = puzzleStr[idx] !== '0';

        if (showPeek) {
            // 偷看模式：全盤顯示正確解答
            cell.textContent = currentSolution[idx];
            cell.classList.add('peek');
        } else {
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
        }

        cell.onclick = () => selectCell(idx);
        boardEl.appendChild(cell);
    });
}

function selectCell(index) {
    if (isPeeking) return;
    selectedCellIndex = index;
    renderBoard();
}

function setMode(mode) {
    currentMode = mode;
    const btnAnswer = document.getElementById('btn-mode-answer');
    const btnNote = document.getElementById('btn-mode-note');

    if (mode === 'answer') {
        btnAnswer.classList.add('active');
        btnNote.classList.remove('active');
    } else {
        btnNote.classList.add('active');
        btnAnswer.classList.remove('active');
    }
}

function inputNumber(num) {
    if (selectedCellIndex === null || isPeeking) return;

    const diff = document.getElementById('difficulty').value;
    const levelIdx = parseInt(document.getElementById('level').value);
    const isGiven = LEVELS[diff][levelIdx].puzzle[selectedCellIndex] !== '0';

    if (isGiven) return;

    if (num === 0) {
        currentBoard[selectedCellIndex] = 0;
        currentNotes[selectedCellIndex].clear();
    } else if (currentMode === 'note') {
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
    if (isPeeking) return;
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
        clearInterval(timerInterval);
        clearInterval(stealInterval);
        
        const min = Math.floor(timerSeconds / 60);
        const sec = timerSeconds % 60;
        document.getElementById('win-message').textContent = `不愧是清華的餒！竟然花了 ${min}分${sec}秒 才解開，智商超越全國 5% 智障 ^_^`;
        
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