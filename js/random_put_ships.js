// Случайная расстановка кораблей
import tools from './tools';
import setting from './setting';

// Функция которая возвращает все координаты ячеек, которые занимает корабль. В зависиомости от направления выбирается случайная начальная ячейка с учетом того, чтобы корабль не вылез за пределы поля.
const returnPositionShip = function (orient, lengthShips) {
  const arr = [];
  let x;
  let y;

  if (orient === 0) {
    x = tools.randomInteger(0, 9);
    y = tools.randomInteger(0 + lengthShips - 1, 9);
    for (let j = 0; j < lengthShips; j++) {
      arr.push([x, y - j]);
    };
    return arr;
  }

  if (orient === 1) {
    x = tools.randomInteger(0, 9 - lengthShips + 1);
    y = tools.randomInteger(0, 9);
    for (let j = 0; j < lengthShips; j++) {
      arr.push([x + j, y]);
    };
    return arr;
  }

  if (orient === 2) {
    x = tools.randomInteger(0, 9);
    y = tools.randomInteger(0, 9 - lengthShips + 1);
    for (let j = 0; j < lengthShips; j++) {
      arr.push([x, y + j]);
    };
    return arr;
  }

  x = tools.randomInteger(0 + lengthShips - 1, 9);
  y = tools.randomInteger(0, 9);
  for (let j = 0; j < lengthShips; j++) {
    arr.push([x - j, y]);
  };
  return arr;

};

// Функция добавления соседних клеток. Сперва находим все соседние клетки. Если координаты этих клеток не превышают поле то добавляем их. Возвращаем массив, удаляя повторяющиеся значения
const addPositionNear = function (pos) {
  let posNearAndShip = pos.slice();
  for (let i = 0; i < pos.length; i++) {

    const x = pos[i][0];
    const y = pos[i][1];
    const posNear = [
      [x,     y - 1],
      [x + 1, y - 1],
      [x + 1, y    ],
      [x + 1, y + 1],
      [x,     y + 1],
      [x - 1, y + 1],
      [x - 1, y    ],
      [x - 1, y - 1]
    ];

    for (let j = 0; j < posNear.length; j++) {
      if ( (posNear[j][0] < 10) &&  
           (posNear[j][0] >= 0) &&
           (posNear[j][1] < 10) &&
           (posNear[j][1] >= 0)
          ) {

        posNearAndShip.push(posNear[j]);
      };
    };

  };

  posNearAndShip = tools.deleteRepeatElement(posNearAndShip);
  return posNearAndShip;
};

// Функция проверяет, есть ли в клетках которые мы передали корабли
const crossShips = function (position, battlefield) {
  let flag = false;

  for (let i = 0; i < position.length; i++) {
    const x = position[i][0];
    const y = position[i][1];
    if ((battlefield[y][x] <= 4) && (battlefield[y][x] >= 1)) {
      flag = true;
    }
  }

  return flag;
};

// Добавлении в массив информации о корабле 
const addDataField = function (battlefield, ships) {
  
  for (let i = 0; i < ships.length; i++) {
    const x = ships[i][0];
    const y = ships[i][1];
    battlefield[y][x] = ships.length;
  }
};

// Расставление кораблей в случайно порядке
export default function (battlefield) {
  
  for (let i = 0; i < setting.defaultShips.length; i++) {
    
    let shipsLength = setting.defaultShips[i];
    let orientationShips;
    let positionShip;
    let positionShipAndNear;
    do {
      // Выбираем случайное направление кораблей. 0 - вверх, 1 - вправо, 2 - вниз, 3 - влево
      orientationShips = tools.randomInteger(0, 3);
      positionShip = returnPositionShip(orientationShips, shipsLength);
      positionShipAndNear = addPositionNear(positionShip);
    } while (crossShips(positionShipAndNear, battlefield));
    //Добавляем в массив инфу о корабле
    addDataField(battlefield, positionShip, shipsLength);
  };

  // battlefield.forEach((it)=>{
  //   console.log(it.join('  '));
  // });

  return battlefield;
};

