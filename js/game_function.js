// Функции игры
export default {

  // Функция возвращает подбит ли корабль целиком, или только поподание
  getShipsDead : function (x, y, fieldEnemy) {
    let shipIsDead = true;
    // Проверяем есть ли не подбитые клетки этого корабля сверху
    let nextY = y;
    let nextCell;
    if (--nextY < 0) {
      nextCell = 6;
    } else {
     nextCell = fieldEnemy[nextY][x];
    }
    while ((nextCell) && (nextCell !== 0) && (nextCell !== 6)) {
      if ((nextCell <= 4) && (nextCell >= 1))  {
        shipIsDead = false;  
      };
      if (--nextY < 0) {
        nextCell = 6;
      } else {
       nextCell = fieldEnemy[nextY][x];
      }
    };

    // Проверяем есть ли не подбитые клетки этого корабля справа
    let nextX = x;
    nextCell = fieldEnemy[y][++nextX] || 6;
    while ((nextCell) && (nextCell !== 0) && (nextCell !== 6)) {
      if ((nextCell <= 4) && (nextCell >= 1))  {
        shipIsDead = false;  
      };
      nextCell = fieldEnemy[y][++nextX] || 6;
    };

    // Проверяем есть ли не подбитые клетки этого корабля снизу
    nextY = y;
    if (++nextY > 9) {
      nextCell = 6;
    } else {
      nextCell = fieldEnemy[nextY][x];
    }
    while ((nextCell) && (nextCell !== 0) && (nextCell !== 6)) {
      if ((nextCell <= 4) && (nextCell >= 1))  {
        shipIsDead = false;  
      };
      if (++nextY > 9) {
        nextCell = 6;
      } else {
       nextCell = fieldEnemy[nextY][x];
      }
    };

    // Проверяем есть ли не подбитые клетки этого корабля слева
    nextX = x;
    nextCell = fieldEnemy[y][--nextX] || 6;
    while ((nextCell) && (nextCell !== 0) && (nextCell !== 6)) {
      if ((nextCell <= 4) && (nextCell >= 1))  {
        shipIsDead = false;  
      };
      nextCell = fieldEnemy[y][--nextX] || 6;
    };

    return shipIsDead;
  },

  // Вспомогательная функция, для paintAndAdd. Закращивает соседние клетки от текущей клекти потопленного корабля и добавляет инфу в массив.
  paintNearCells: function (xCell, yCell, fieldCell, elemField) {
    const posNear = [
      [xCell,     yCell - 1],
      [xCell + 1, yCell - 1],
      [xCell + 1, yCell    ],
      [xCell + 1, yCell + 1],
      [xCell,     yCell + 1],
      [xCell - 1, yCell + 1],
      [xCell - 1, yCell    ],
      [xCell - 1, yCell - 1]
    ];

    for (let i = 0; i < posNear.length; i++) {
      const xField = posNear[i][0];
      const yField = posNear[i][1];
      let fieldCellNear;

      if ((yField < 0) || (yField > 9)) {
        fieldCellNear  = 5;
      } else {
        fieldCellNear = fieldCell[yField][xField];
      };

      if ((fieldCellNear === 6) || (fieldCellNear === 0)) {
        fieldCellNear = 6;
        elemField.querySelectorAll('.app__row')[yField].querySelectorAll('.app__cell')[xField].classList.add('app__miss');
      };
    };
  },

  // Функция закрашивает все соседние клетки потопленного корабля и добавляет информацию в массив
  paintAndAdd: function (x, y, field, elementField) {

    // Просматриваем соседние ячейки вокруг последней точки удара по кораблю
    this.paintNearCells (x, y, field, elementField);

    // Просматриваем соседние ячейки выше от последней точки удара по кораблю
    let nextY = y;
    let nextCell;
    if (--nextY < 0) {
      nextCell = 6;
    } else {
     nextCell = field[nextY][x];
    }
    while (nextCell === 5) {
      this.paintNearCells (x, nextY, field, elementField);
      if (--nextY < 0) {
        nextCell = 6;
      } else {
       nextCell = field[nextY][x];
      }
    };

    // Просматриваем соседние ячейки справа от последней точки удара по кораблю
    let nextX = x;
    nextCell = field[y][++nextX] || 6;
    while (nextCell === 5) {
      this.paintNearCells (nextX, y, field, elementField);
      nextCell = field[y][++nextX] || 6;
    };

    // Просматриваем соседние ячейки снизу от последней точки удара по кораблю
    nextY = y;
    if (++nextY > 9) {
      nextCell = 6;
    } else {
      nextCell = field[nextY][x];
    }
    while (nextCell === 5) {
      this.paintNearCells (x, nextY, field, elementField);
      if (++nextY > 9) {
        nextCell = 6;
      } else {
       nextCell = field[nextY][x];
      }
    };

    // Просматриваем соседние ячейки слева от последней точки удара по кораблю
    nextX = x;
    nextCell = field[y][--nextX] || 6;
    while (nextCell === 5) {
      this.paintNearCells (nextX, y, field, elementField);
      nextCell = field[y][--nextX] || 6;
    };
  },

  // Очищаем поля от отображения кораблей и попаданий в них
  clearHtml: function () {
    const fields = document.querySelector('#fields');
    const shipsHard = fields.querySelectorAll('.app__hard');
    const shipsMiss = fields.querySelectorAll('.app__miss');
    const ships = fields.querySelectorAll('.app__ship');

    for (let i = 0; i < shipsHard.length; i++) {
      shipsHard[i].classList.remove('app__hard'); 
    }
    for (let i = 0; i < shipsMiss.length; i++) {
      shipsMiss[i].classList.remove('app__miss'); 
    }
    for (let i = 0; i < ships.length; i++) {
      ships[i].classList.remove('app__ship'); 
    } 
  },

  // Очистка консоли
  clearConsole: function (info) {
    while (info.firstElementChild) {
      info.removeChild(info.firstElementChild);
    };
  },

  // Закрашивает пустые клетки попаданием в конце игры
  paintAllCellsPoint: function (fieldElement) {
    const cells = fieldElement.querySelectorAll('.app__cell');
    for (let i = 0; i < cells.length; i++) {
      if ((!cells[i].classList.contains('app__miss')) && (!cells[i].classList.contains('app__ship'))) {
        cells[i].classList.add('app__miss');
      }
    }
  }
}