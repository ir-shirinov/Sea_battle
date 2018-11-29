export default function (fieldArr, fieldElement) {

  for (let i = 0; i < fieldArr.length; i++) {
    for (let j = 0; j < fieldArr.length; j++) {
      const status = fieldArr[i][j];

      if ((status <= 5) && (status >= 1)) {
        const row = fieldElement.querySelectorAll('.app__row')[i];
        const cell = row.querySelectorAll('.app__cell')[j];
        cell.classList.add('app__ship');
      }
    }
  }
};