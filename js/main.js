let n = null;
let result = 0;
alert(
  'Приветствуем вас на странице с нашей игрой. Для победы необходимо отыскать все пары одинаковых карточек за отведенное время. Время будет отображаться в правом верхнем углу экрана. Количество отведенного времени будет зависеть от заданного количества карточек. Для старта нажмите "Начать игру"'
);

document.querySelector('.button').addEventListener('click', function() {
  if (n === null) {
    n = +prompt(
      'Введите количество карточек (значение будет автоматически увеличено на 1 при вводе нечетного числа)',
      20
    ); //количество карточек
    if (n % 2 != 0) {
      n += 1;
    }

    //запускаем таймер
    let time;
    time = n * 3;

    let timeOut = setInterval(() => {
      if (time >= 0) {
        document.querySelector('.timer').innerHTML = `${time}`;
        time--;
      } else {
        alert(
          'К сожалению Вы не успели выполнить задание за отведенное время...'
        );
        document.querySelectorAll('.card-item').forEach(function(value) {
          value.remove();
        });
        clearInterval(timeOut);
      }
    }, 1000);

    //создаем массив картинок
    let picturesAmount = 20;
    let arrPictures = [];

    for (let i = 1; i <= picturesAmount; i++) {
      arrPictures.push(`/images/${i}.jpg`);
    }

    while (arrPictures.length < n / 2) {
      arrPictures.push(
        arrPictures[Math.round(Math.random() * (picturesAmount - 1))]
      );
    }

    shuffle(arrPictures);

    //функция перемешивания массива
    function shuffle(array) {
      array.sort(() => Math.random() - 0.5);
    }

    //выбираем используемые картинки
    let arrCards = [];

    for (let i = 0; i < n / 2; i++) {
      arrCards[i] = arrPictures[i];
    }

    arrCards.forEach(function(value) {
      arrCards.push(value);
    });

    shuffle(arrCards);

    arrCards.forEach(function() {
      $cardsItem = document.createElement('div');
      $cardsItem.classList.add('card-item');
      $cardsItem.classList.add('cover');
      $cardsItem.classList.add('appear');
      document.querySelector('.cards').appendChild($cardsItem);
    });

    let $cards = document.querySelectorAll('.appear');

    $cards.forEach(function(value, index) {
      setTimeout(() => {
        value.classList.remove('appear');
      }, index * 100);
    });

    let count = 0;
    let $firstCard = [];
    let $secondCard = [];

    $cards.forEach(function(value, index) {
      value.addEventListener('click', () => {
        if (count < 2) {
          count++;
          value.style.transform = 'rotateY(90deg)';
          if (value.classList.contains('cover')) {
            setTimeout(() => {
              value.style.backgroundImage = `url(${arrCards[index]})`;
              value.style.transform = 'rotateY(0)';
              value.classList.remove('cover');
            }, 300);
          } else {
            count = 0;
            setTimeout(() => {
              value.style.backgroundImage = '';
              value.style.transform = 'rotateY(0)';
              value.classList.add('cover');
            }, 300);
          }
          if (count == 1) {
            $firstCard[0] = value;
            $firstCard[1] = arrCards[index];
          }
          if (count == 2) {
            $secondCard[0] = value;
            $secondCard[1] = arrCards[index];

            setTimeout(() => {
              if ($firstCard[1] == $secondCard[1]) {
                $firstCard[0].style.transform = 'rotateY(810deg)';
                $secondCard[0].style.transform = 'rotateY(810deg)';
                result += 2;
                count = 0;
                // Сообщение о победе
                if (result === n) {
                  setTimeout(() => {
                    alert('Ура, вы победили!');
                    clearInterval(timeOut);
                  }, 300);
                }
              } else {
                setTimeout(() => {
                  $firstCard[0].style.backgroundImage = '';
                  $secondCard[0].style.backgroundImage = '';
                  $firstCard[0].style.transform = 'rotateY(90deg)';
                  $secondCard[0].style.transform = 'rotateY(90deg)';
                  $firstCard[0].classList.add('cover');
                  $secondCard[0].classList.add('cover');
                  setTimeout(() => {
                    $firstCard[0].style.transform = 'rotateY(0)';
                    $secondCard[0].style.transform = 'rotateY(0)';
                    count = 0;
                  }, 300);
                }, 300);
              }
            }, 500);

            // setTimeout(() => {
            //   count = 0;
            // }, 900);
          }
        }
      });
    });
  } else if (confirm('Вы хотите начать заново?')) {
    window.location.reload();
  }
});
