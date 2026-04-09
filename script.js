const icons = ['⚡', '🔥', '💧', '🍃', '❄️', '🌈', '⭐', '🍎'];
let cardsData = [...icons, ...icons]; // Tạo 8 cặp (16 thẻ)
let flippedCards = [];
let matchedPairs = 0;
let canClick = true; // Chống người chơi click quá nhanh

const board = document.getElementById('game-board');

// 1. Hàm trộn bài (Fisher-Yates Shuffle)
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

// 2. Khởi tạo game
function initGame() {
    shuffle(cardsData);
    board.innerHTML = ''; // Xóa bảng cũ
    
    cardsData.forEach((icon) => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.innerHTML = `<span>${icon}</span>`; // Cho icon vào thẻ span để xoay
        card.addEventListener('click', () => flipCard(card));
        board.appendChild(card);
    });
}

// 3. Logic lật bài
function flipCard(card) {
    if (!canClick || card.classList.contains('flipped') || card.classList.contains('matched')) return;

    card.classList.add('flipped');
    flippedCards.push(card);

    if (flippedCards.length === 2) {
        canClick = false; // Tạm dừng click để kiểm tra
        checkMatch();
    }
}

// 4. Kiểm tra cặp bài
function checkMatch() {
    const [card1, card2] = flippedCards;
    const icon1 = card1.querySelector('span').innerText;
    const icon2 = card2.querySelector('span').innerText;

    if (icon1 === icon2) {
        // Giống nhau
        setTimeout(() => {
            card1.classList.add('matched');
            card2.classList.add('matched');
            matchedPairs++;
            flippedCards = [];
            canClick = true;

            if (matchedPairs === icons.length) {
                alert("Bạn đỉnh quá! Đã tìm hết các cặp Pikachu!");
                location.reload(); // Chơi lại
            }
        }, 600);
    } else {
        // Khác nhau -> Úp lại
        setTimeout(() => {
            card1.classList.remove('flipped');
            card2.classList.remove('flipped');
            flippedCards = [];
            canClick = true;
        }, 1000);
    }
}

// Chạy game
initGame();