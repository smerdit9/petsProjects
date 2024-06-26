(function () { 
const game = document.getElementById('game');

function startGame (cardsCount) { // Функция, запускающая игру
    let button = document.getElementById('btn');

    const out = setTimeout(function () { // alert, который будет выведен на экран спустя 1 мин после начала игры (таймер)
        alert('Время вышло');
        game.innerHTML = ''; // Очистка игрового поля
        button.style.display = 'block'; // Отображение кнопки перезапуска игры
      }, 62 * 1000);

    button.onclick = () => { // Функция, которая запускается при нажатии на кнопку перезапуска игры
        game.innerHTML = ''; // Очистка игрового поля
        clearTimeout(); // Выключение alerta для таймера
        startGame(cardsCount); // Запуск функции начала игры
        button.style.display = 'none'; // Отмена отображения кнопки перезапуска
    };
    // Ниже две функции создания и перемешивания массива случайных чисел
    function createNumbersArray(count) {
    let arr = [];
    for (let i = 1; i <= count; ++i) {
      arr.push(i);
      arr.push(i);
    }
    return arr;
    }
  
    function shuffle(arr) {
        for (let i = 0; i < arr.length; ++i) {
            let j = Math.floor(Math.random() * (i + 1));
            let temp = arr[i];
            arr[i] = arr[j];
            arr[j] = temp;
        };
        return arr;
    }
    // Переменная с готовым массивом
    shufflePairedNumbers = shuffle(createNumbersArray(cardsCount));

    // Две переменные для сравнения карточек в игре
    let firstCard = null;
    let secondCard = null;

    //Объект с классами
    const classMap = {
        1: 'comet',
        2: 'saturn',
        3: 'astronaut',
        4: 'earth',
        5: 'rocket',
        6: 'satellite',
        7: 'stars',
        8: 'alien',
        9: 'sun',
        10: 'moon',
    }
    // Добавление класса карточке
    function setCardClass (card) {
        card.classList.add(`background-${classMap[card.id]}`, 'open');
    }
    // Удаление класса карточки
    function removeCardClass (card) {
        card.classList.remove(`background-${classMap[card.id]}`, 'open');
    }
    // Добавление класса карточкам при совпадении
    function successCardClass (card) {
        card.classList.add(`background-${classMap[card.id]}-success`, 'success');
    }

    // Создание карточек
    for (const cardNumber of shufflePairedNumbers) {
        let card = document.createElement('div');
        card.id = cardNumber;
        card.classList.add('list-item');

        card.addEventListener('click', () => { // Событие при клике на какую-либо карточку
            // Проверка на наличие классов open и success (будут, если карточки отображаются)
            if (
                card.classList.contains('open') ||
                card.classList.contains('success')
            ) {
                alert('Найдите пару!');
                return;
            }

            //Удааение стилей карточек, если они не совпали
            if (firstCard !== null && secondCard !== null) {
                removeCardClass(firstCard);
                removeCardClass(secondCard);
                // Очещение значений у переменных для сравнения
                firstCard = null; 
                secondCard = null;
            }

            // Отображение стилей при нажатии на карточку
            setCardClass(card);

            // Присваивание значений переменным для сравнения по порядку
            if (firstCard === null) {
                firstCard = card;
              } else {
                secondCard = card;
            }
            
            //Сравнение карточек
            if (firstCard !== null && secondCard !== null) {
                let firstCardNumber = firstCard.id; // Id первой открытой карточки
                let secondCardNumber = secondCard.id; // Id второй открытой карточки
        
                if (firstCardNumber === secondCardNumber) { //Если карточки равны, то применяются соответствующие стили
                    successCardClass(firstCard);
                    successCardClass(secondCard);
                }
            }

            //Конец игры
            if  (shufflePairedNumbers.length === document.querySelectorAll('.success').length) { // Если длина перемешанного массива чесел совпадает с кол-вом элементов с классом success
                button.style.display = 'block'; // Отображение кнопки перезапуска
                clearInterval(int); // Остановка таймера
                clearTimeout(out); // Сброс alerta таймера
                setTimeout(function () {
                    alert('ПОБЕДА!');
                }, 400); //Таймер для того, чтобы конец игры был позже чем откроется последняя карточка
            }
        })
        game.append(card); // Добавление карточки в DOM дерево, после события click
    }
    // Визуализация таймера
    let counter = 60;
    const countDownEl = document.getElementById('counter');
    const int = setInterval(updateCountdown, 1000);
    function updateCountdown() {
      let minutes = Math.floor(counter / 60);
      let seconds = counter % 60;
      seconds = seconds < 10 ? '0' + seconds : seconds;
      countDownEl.innerHTML = `${minutes} : ${seconds}`;
      if (counter <= 0) clearInterval(int);
      counter--;
    }
};

// Отображение алерта с выбором кол-ва пар карточек перед запуском функции startGame
let cardsCount = Number(prompt('Выберите сложность игры', 8)); // Стандартное значение - 8
if (cardsCount % 2 != 0 || cardsCount > 10) {
  cardsCount = 8;
}
if (cardsCount === 10) {
    game.classList.add('gameTen'); // Другие стили при выборе 10 пар (нужно, чтобы уместить в экран)
}

startGame(cardsCount);  // Запуск игры после выбора кол-ва пар карточек
})();