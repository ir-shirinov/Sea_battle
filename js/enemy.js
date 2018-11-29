// Действия врага
import gf from './game_function';
import tools from './tools';
import setting from './setting';
import showShips from './show_ships';

// Вспомогательная функция, возвращает координаты по которым нужно стрелять
const getPointShoot = function (set, field) {
  // Если есть последний удачный выстрел(подбили корабль но не потопили) и он один, то обстреливаем соседние клетки
  if ((set.positionEnemy[0][0] !== -1) && (set.positionEnemy.length === 1)) {
    let xGoodShoot = set.positionEnemy[0][0];
    let yGoodShoot = set.positionEnemy[0][1];
    if ( ((yGoodShoot - 1) >= 0) && (field[yGoodShoot - 1][xGoodShoot] < 5)) {
      return [xGoodShoot, yGoodShoot - 1];
    }

    if ( ((xGoodShoot + 1) < 10) && (field[yGoodShoot][xGoodShoot + 1] < 5) ) {
      return [xGoodShoot + 1, yGoodShoot];
    }

    if ( ((yGoodShoot + 1) < 10) && (field[yGoodShoot + 1][xGoodShoot] < 5) ) {
      return [xGoodShoot, yGoodShoot + 1];
    }

    if ( ((xGoodShoot - 1) >= 0) && (field[yGoodShoot][xGoodShoot - 1] < 5)) {
      return [xGoodShoot - 1,yGoodShoot];
    }
  }

  // Если есть последний удачный выстрел и он не один, то обстреливаем соседние клетки с учетом направления
  if ((set.positionEnemy[0][0] !== -1) && (set.positionEnemy.length !== 1)) {
    let xGoodShootOne = set.positionEnemy[0][0];
    let yGoodShootOne = set.positionEnemy[0][1];
    let xGoodShootTwo = set.positionEnemy[1][0];
    let yGoodShootTwo = set.positionEnemy[1][1];
    
    // Корабль лежит вертикально
    if (xGoodShootOne === xGoodShootTwo) {
      let arrY = [];
      for (let i= 0; i < set.positionEnemy.length; i++) {
        arrY.push(set.positionEnemy[i][1]);
      }
      let maxY = Math.max.apply(null, arrY);
      let minY = Math.min.apply(null, arrY);

      if ( ((maxY + 1) < 10) && (field[maxY + 1][xGoodShootOne] < 5) ) {
        return [xGoodShootOne, maxY + 1];
      }

      if ( ((minY - 1) >= 0) && (field[minY - 1][xGoodShootOne] < 5)) {
        return [xGoodShootOne, minY - 1];
      }
    };

    // Корабль лежит горизнотально
    if (yGoodShootOne === yGoodShootTwo) {
      let arrX = [];
      for (let i= 0; i < set.positionEnemy.length; i++) {
        arrX.push(set.positionEnemy[i][0]);
      }
      let maxX = Math.max.apply(null, arrX);
      let minX = Math.min.apply(null, arrX);

      if ( ((maxX + 1) < 10) && (field[yGoodShootOne][maxX + 1] < 5) ) {
        return [maxX + 1, yGoodShootOne];
      }

      if ( ((minX - 1) >= 0) && (field[yGoodShootOne][minX - 1] < 5)) {
        return [minX - 1,yGoodShootOne];
      }
    }
  };

  // Если нет последнего удачного выстрела возвращаем случайные координаты в зависимости от сложности.Генерируем случайное число. Если оно больше числа hard(сложность игры) то выбираем случайную клетку, если меньше то Выбираем клетку с кораблем

  let xShoot, yShoot;
  if (tools.randomInteger(1, 10) >= set.hard ) {
    do {
      xShoot = tools.randomInteger(0, 9);
      yShoot = tools.randomInteger(0, 9);
    } while (field[yShoot][xShoot] > 4);

  } else {
    do {
      xShoot = tools.randomInteger(0, 9);
      yShoot = tools.randomInteger(0, 9);
    } while ((field[yShoot][xShoot] > 4) || (field[yShoot][xShoot] < 1));
  }

  return [xShoot, yShoot];
}


// Один ход врага
const enemyStep = function (settingCurrentGame, elemFieldUser, info, elemFieldEnemy) {

  // Выбираем случайную клетку для обстрела, отсекая уже обстреленные клетки
  let [x, y] = getPointShoot(settingCurrentGame, settingCurrentGame.fieldUser);  

  const cellElement = elemFieldUser.querySelectorAll('.app__row')[y].querySelectorAll('.app__cell')[x];

  if ((settingCurrentGame.fieldUser[y][x] <= 4) && (settingCurrentGame.fieldUser[y][x] >= 1)) {
    // Записываем данные о попадании в массив и отрисовываем на карте
    settingCurrentGame.fieldUser[y][x] = 5;
    cellElement.classList.add('app__hard');

    // Проверяем есть ли не подбитые клетки этого корабля со всех сторон (верх, вправо, низ, влево). Если нет, то корабль подбит.
    let shipIsDead = gf.getShipsDead(x, y, settingCurrentGame.fieldUser);
 
    if (shipIsDead) {
      // Потопили корабль
      tools.writeText(info, `${settingCurrentGame.enemyName} потопил Ваш корабль:  ${settingCurrentGame.shipsName.pop()}`, 2);
      // Добавляем информацию об убитом корабле в массив, и перекрашиваем соседние клетки. Удаялем инфу о последнем удачном попадании
      gf.paintAndAdd(x, y, settingCurrentGame.fieldUser, elemFieldUser);
      settingCurrentGame.positionEnemy = [[-1, -1]];

      // Просматриваем последний ли это корабль
      --settingCurrentGame.shipsUserNumber;
      if (settingCurrentGame.shipsUserNumber >= 1) {
        // Ход врага
        settingCurrentGame.flagUser = false;
      } else {
        // Конец игры, выйграл враг
        settingCurrentGame.flagUser = true;
      }


    } else {
      tools.writeText(info, setting.enemyHurtText[tools.randomInteger(0, setting.enemyHurtText.length - 1)], 2);
      settingCurrentGame.flagUser = false;
      // Записываем данные удачного попадания и удаляем первоначальные значения
      if (settingCurrentGame.positionEnemy[0][0] === -1) {
        settingCurrentGame.positionEnemy.splice(0,1,[x, y]);
      } else {
        settingCurrentGame.positionEnemy.push([x, y]);
      };
    };

  // Удар по пустой клетке
  } else if (settingCurrentGame.fieldUser[y][x] === 0) {
    tools.writeText(info, `${settingCurrentGame.enemyName} промахнулся - ваш ход`, 2);
    elemFieldEnemy.classList.add('app__field--active');
    // Записываем данные о промахе в массив и отрисовываем на карте
    settingCurrentGame.fieldUser[y][x] = 6;
    cellElement.classList.add('app__miss');
    // Передаем ход пользователю
    settingCurrentGame.flagUser = true;
  }
};



// Ходит враг
export default function (settingCurrentGame, elemFieldUser, info, elemFieldEnemy) {
  // Запускаем ход компьютера с разными задержками, чтобы создать ощущения как будто Враг думает как живой, то быстро то медленно. 
  setTimeout(function run() {
    enemyStep(settingCurrentGame, elemFieldUser, info, elemFieldEnemy);

    // Если после хода врага, у игрока больше нет кораблей, значит выйграл Враг
    if (settingCurrentGame.shipsUserNumber === 0) {
      settingCurrentGame.flagUser = false;
      gf.paintAllCellsPoint(elemFieldUser);
      tools.writeText(info, 'Вы проиграли', 3);
      tools.writeText(info, `${settingCurrentGame.enemyName}:  ${setting.enemyWin[tools.randomInteger(0, setting.enemyWin.length - 1)] }`, 3);
      // Отрисуем поле, если выйграл ПК
      showShips(settingCurrentGame.fieldEnemy, elemFieldEnemy);
    } else if (!settingCurrentGame.flagUser) {
      setTimeout(run, tools.randomInteger(1500, 2000));
    };

  }, 1500);
};