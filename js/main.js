import setting from './setting';
import putShips from './random_put_ships';
import showShips from './show_ships';
import tools from './tools';
import gf from './game_function';
import goEnemy from './enemy';

// Окно для отображения информации 
const info = document.querySelector('#info');
// HTML поля пользователя и врага
const elemFieldUser = document.querySelector('.app__field--user');
const elemFieldEnemy = document.querySelector('.app__field--enemy');
// Настройки текущей игры
let settingCurrentGame;
// Окно ввода и поле ввода имени
const nameWindow = document.querySelector('.app__poppup');
const name = document.querySelector('#name');
// Сложность игры
let hardGame;

// Обработка событий при выстреле пользователя
elemFieldEnemy.addEventListener('click', function(evt) {
  // Если ход игрока то обрабатываем событие
  if (settingCurrentGame.flagUser) {
    const cell = evt.target;
    const x = +cell.dataset.cell;
    const y = +cell.parentElement.dataset.row;

    // Пользователь попал в корабль
    if ((settingCurrentGame.fieldEnemy[y][x] <= 4) && (settingCurrentGame.fieldEnemy[y][x] >= 1)) {
      // Записываем данные о попадании в массив и отрисовываем на карте
      settingCurrentGame.fieldEnemy[y][x] = 5;
      cell.classList.add('app__hard');

      // Проверяем есть ли не подбитые клетки этого корабля со всех сторон (верх, вправо, низ, влево). Если нет, то корабль подбит.
      let shipIsDead = gf.getShipsDead(x, y, settingCurrentGame.fieldEnemy);
   
      if (shipIsDead) {
        // Потопили корабль
        tools.writeText(info, `Вы потопили корабль: ${settingCurrentGame.shipsName.pop()}`, 1);
        // Добавляем информацию об убитом корабле в массив, и перекрашиваем соседние клетки
        gf.paintAndAdd(x, y, settingCurrentGame.fieldEnemy, elemFieldEnemy);

        // Если это последний корабль врага, то выйграл игрок
        --settingCurrentGame.shipsEnemyNumber;
        if (settingCurrentGame.shipsEnemyNumber === 0) {
          settingCurrentGame.flagUser = false;
          showShips(settingCurrentGame.fieldEnemy,elemFieldEnemy);
          tools.writeText(info, 'Конец игры, Вы выйграли', 3);
          tools.writeText(info, `${settingCurrentGame.enemyName}:  ${setting.enemyLose[tools.randomInteger(0, setting.enemyLose.length - 1)] }`, 3);
          gf.paintAllCellsPoint(elemFieldEnemy);
        }

      } else {
        // Пользователь попал в корабль
        tools.writeText(info, setting.userHurtText[tools.randomInteger(0, setting.userHurtText.length - 1)], 1);
      }
    
    // Пользователь не попал в корабль
    } else if (settingCurrentGame.fieldEnemy[y][x] === 0) {
      tools.writeText(info, `Вы промахнулись - ходит ${settingCurrentGame.enemyName}`, 1);
      elemFieldEnemy.classList.remove('app__field--active');
      //Запрещаем ход игроку
      settingCurrentGame.flagUser = false;
      // Записываем данные о промахе в массив и отрисовываем на карте
      settingCurrentGame.fieldEnemy[y][x] = 6;
      cell.classList.add('app__miss');
      // Передаем ход врагу
      goEnemy(settingCurrentGame, elemFieldUser, info, elemFieldEnemy);
    }
  }
});

// Функция начала игры
const startNewGame = function () {
  // Очищаем отображение полей от прошлых кораблей и очищаем консоль
  gf.clearHtml();
  gf.clearConsole(info);

  // Иницируем новые настройки игры
  settingCurrentGame = {
    // Массив поля пользователя и врага c расставленными кораблями. Т.к. массив - это массив с массивами, их нужно глубоко копипровать, поэтому используем трюк с JSON
    fieldUser: putShips(JSON.parse(JSON.stringify(setting.fieldDefault))),
    fieldEnemy: putShips(JSON.parse(JSON.stringify(setting.fieldDefault))),
    // Количество кораблей у игроков
    shipsUserNumber: setting.defaultShips.length,
    shipsEnemyNumber: setting.defaultShips.length,
    //Имя врага
    enemyName: setting.enemyName[tools.randomInteger(0, setting.enemyName.length -1)],
    // Имена кораблей в случайно отсортированном порядке
    shipsName: setting.shipsName.slice().sort(() => Math.random() - 0.5),
    // Флаг, который запускает обработку событий, если ходит именно игрок
    flagUser: false,
    // Сложность игры
    hard: hardGame || 0,
    // Последний удачные ход пк, если его нет, то записываем -1, -1
    positionEnemy: [[-1, -1]],
    // Выбираем кто делает первый ход (0 - пользователь)
    number: tools.randomInteger(0, 1)
  };

  // Отрисовка кораблей пользователя, имени врага
  showShips(settingCurrentGame.fieldUser,elemFieldUser);
  document.querySelector('.app__enemy').textContent = settingCurrentGame.enemyName;

  // Отдаем право первого хода случаному игроку
  if (settingCurrentGame.number === 0) {
    settingCurrentGame.flagUser = true;
    elemFieldEnemy.classList.add('app__field--active');
    tools.writeText(info, 'Первым ходите Вы', 3);
  } else {
    tools.writeText(info, `Первым ходит ${settingCurrentGame.enemyName}`, 3);
    goEnemy(settingCurrentGame, elemFieldUser, info, elemFieldEnemy);
  };
}

// Обработка событий при нажатии Новая игра. Имя игрока записываем над полем
const newGameBtn = document.querySelector('#new');
newGameBtn.addEventListener('click', function() {
  document.querySelector('.app__user').textContent = name.value || 'Неизвестный игрок';
  name.value = '';
  nameWindow.classList.add('app__hidden');
  // Находим какую сложность выбрал игрок
  let hardRadio = document.querySelector('input[type="radio"]:checked');
  switch (hardRadio.id) {
    case 'easy': {
      hardGame = 0;
      break;
    }
    case 'middle': {
      hardGame = 3;
      break;
    }
    case 'heavy': {
      hardGame = 5;
      break;
    }  
  }
  startNewGame();
})

// Обработка события если игрок нажал Enter введя имя
name.addEventListener('keypress', function(evt) {
  if (evt.keyCode === 13) {
    newGameBtn.click();
  };
});

// Обработка событий при нажатии Начать сначала
const restartGameBtn = document.querySelector('#restart');
restartGameBtn.addEventListener('click', function() {
  nameWindow.classList.remove('app__hidden');
})

