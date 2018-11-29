export default {
  // Рандомное число
  randomInteger: function (min, max) {
    let rand = min - 0.5 + Math.random() * (max - min + 1)
    rand = Math.round(rand);
    return rand;
  },

  // Удаляет в двухмерном массиве повторяющиеся элементы
  deleteRepeatElement: function(arr) {
    for (let i = 0; i < arr.length; i++) {
      for (let j = 0; j < arr.length; j++) {
        if ((i !== j) && (arr[i][0] === arr[j][0]) && (arr[i][1] === arr[j][1])) {
          arr.slice(j, 1);
        }
      }
    }
    return arr;
  },

  // Вывод информации на экран с анимацией, c учетом от кого она(действия врага, действия пользователя, общая информация)
  writeText: function (ele, text, whoIs) {
    const element = document.createElement('P');
    

    switch (whoIs) {
      case 1:
        element.classList.add('app__print', 'app__print--user');
        break;
      case 2: 
        element.classList.add('app__print', 'app__print--enemy');
        break;
      case 3:
        element.classList.add('app__print', 'app__print--info');
        break;
    };

    if (ele.firstElementChild) {
      ele.insertBefore(element, ele.firstElementChild);
    } else {
      ele.appendChild(element);
    };

    // Анимация
    let txt = text.split("");
    let interval = setInterval(function(){
      if(!txt[0]){
        return clearInterval(interval);
      };
      element.innerHTML += txt.shift();
    }, 50);

    // Удаляем сообщения, если их больше 20
    if (ele.childNodes.length > 20) {
      while (ele.childNodes.length > 20) {
        ele.removeChild(ele.lastElementChild);
      };
    };

  }

};
