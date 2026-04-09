const icons = ['⚡', '🔥', '💧', '🍃', '❄️', '🌈', '⭐', '🍎'];
let cardsData = [...icons, ...icons].sort(() => Math.random() - 0.5);
let flippedCards = [];
let matchedCount = 0;

const board = document.getElementById('game-board');
const terminal = document.getElementById('terminal-content');

// Hàm hiện chữ lên Terminal
function log(msg) {
    const p = document.createElement('p');
    p.innerText = `> ${msg}`;
    terminal.appendChild(p);
    terminal.scrollTop = terminal.scrollHeight;
}

// Tạo thẻ bài
cardsData.forEach((icon, index) => {
    const card = document.createElement('div');
    card.classList.add('card');
    card.dataset.icon = icon;
    card.innerText = '?';
    card.onclick = () => flip(card);
    board.appendChild(card);
});

log("Hệ thống đã sẵn sàng. Hãy tìm cặp bài!");

function flip(card) {
    if (flippedCards.length < 2 && !card.classList.contains('flipped')) {
        card.classList.add('flipped');
        card.innerText = card.dataset.icon;
        flippedCards.push(card);

        if (flippedCards.length === 2) {
            checkMatch();
        }
    }
}

function checkMatch() {
    const [card1, card2] = flippedCards;
    if (card1.dataset.icon === card2.dataset.icon) {
        log("Chính xác! +1 cặp.");
        card1.classList.add('matched');
        card2.classList.add('matched');
        matchedCount += 2;
        flippedCards = [];
        if (matchedCount === cardsData.length) {
            log("CHÚC MỪNG! BẠN ĐÃ THẮNG.");
            alert("Bạn đã thắng!");
        }
    } else {
        log("Sai rồi. Thử lại nhé.");
        setTimeout(() => {
            card1.classList.remove('flipped');
            card2.classList.remove('flipped');
            card1.innerText = '?';
            card2.innerText = '?';
            flippedCards = [];
        }, 800);
    }
}