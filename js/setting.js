export default {
  // 1,2,3,4 - корабли; 5-попадание в корабль; 6 - попадание в пустую клетку;
  fieldDefault : [
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], 
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], 
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
  ],

  // Количество и длина кораблей
  defaultShips: [4, 3, 3, 2, 2, 2, 1, 1, 1, 1],

  // Возможные враги
  enemyName: ['Капитан Немо', 'Капитан Джэк Воробей', 'Гектор Барбосса', 'Черная Борода', 'Капитан Америка', 'Капитан Крюк', 'Капитан Очевидность'],

  // Возможные имена кораблей 
  shipsName: ['Весёлый Роджер', 'Дункан', 'Испаньола', 'Наутилус', 'Титаник', 'Крейсер Аврора', 'Летучий Голландец', 'Каравелла Колумба', 'Черная Жемчужина', 'Разящий', 'Перехватчик', 'Тихая Мэри', 'Месть королевы Анны', 'Летающий дракон', 'Фрегат Авраам Линкольн', 'Корабль Её Величества «Пинафор»', 'Королевская удача', 'Линкор «Ямато»', 'Линкор «Бисмарк»', 'Крейсер «Петр Великий»'],

  // Возможные фразы удачных попаданий
  userHurtText: ['Капитан, мы сломали им мачту на корабле', 'Капитан, разрешите доложить, попали точно в цель', 'Мы подбили их корабль', 'Капитан, наши пушки разорвали им корпус', 'Капитан, мы из рогатки попали в "Бердянск"'],

  // Возможные фразы удачных попаданий врага
  enemyHurtText: ['Капитан, в нас попали', 'Капитан, вражеская торпеда нанесла нам серьезный урок', 'Капитан, нам пробили корпус, чем будем отвечеть?', 'Капитан, течь на корабле, спасайтесь!!!'],

  // Возможные фразы при победе врага
  enemyWin: ['А кто то сомневался?', 'Йо-хо-хо и бутылка рома!', 'Миссия выполнена, теперь я отправляюсь за сундуком Дейви Джонса', 'Теперь Вы готовы сдаться?'],

  // Возможные фразы при проигрыше врага
  enemyLose: ['Но Крым я Вам все равно не отдам', 'Капитан пощади, у меня 10 детей, 20 внуков, их всех надо кормить', 'Давайте жить дружно...', 'Я еще отыграюсь', 'И на моей улице перевернется камаз с ромом!', 'Может ты и потопил весь мой флот, но сам я не сдамся', 'Какой ты опытный капитан, пойдешь в мою команду?']
}