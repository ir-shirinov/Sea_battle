Начинается игра, требуется ввести имена пользователей. 
// Оставил ввод имени только игрока, т.к. с компьютером все аналогично. Решил сделать более интересно - имя компьютера - случайное имя из массива имен.

Необходимо отображение чей ход. 
// В консоли пишется чей ход. При ходе врага, у пользователя не подсвечиваются клетки для обстрела.
Расстановка кораблей случайная для игрока и для компьютера.

Требования к выполнению задачи
    1. Задача должна быть решена с использованием следующих технологий: HTML, CSS, Javascript 
    // Чистый HTML, CSS, JS(ES6)
    2. Разрешается использование стороннего фреймворка jQuery 
    // Фреймворки не использовались
    3. Код программы с необходимыми комментариями 
    // Весь код разделен на блоки, добавил максимум комментариев
    4. Обеспечить выполнение программы на IE8+, Opera, Chrome, Firefox 
    // Протестировал на IE11, Opera, Chrome, Firefox. Подключен Babel
    5. Вывод графики должен быть реализован средствами CSS и JavaScript, минимальное использование растровых картинок. 
    // Вся графика через CSS
    6. Интерфейс должен быть приятен пользователю и вызвать желание играть снова и снова 
    // Интерфейс формата старинных экранов, шрифты старых ПК, "интересные фразы в консоли"
    7. Игра должна выглядеть законченным продуктом, целостно  
    // Продукт полностью рабочий, подключены минифакаторы HTML, CSS, JS.

Срок выполнения 3-4 дня. 
//Выполнил за 2.5 дня.

// Все требования выполнены, еще есть много идей как доработать продукт (изображения пользователей, случайные бонусы при обстреле, дополнительная анимация, скорость анимации, скорость действий врага и т.д.) - но остановился на текущем состоянии, т.к. дорабатывать и улучшать можно до бесконечности)))

//Игра сделана под экран FullHD (высота приложения 600px). Так как не было требования по адаптивности, то эту сторону я не трогал.

//Компьютер изначально бьет в случайную клетку. Если он попал в корабль, то он бьет в соседние клетки(верх, справа, низ, слева), пока не потопит весь корабль. Если он попал в две клетки корабля, то бьет только по направлению корабля. Если выбрана сложность "Легче легкого" - то корабль выбирает случайную клетку, если "Средне" - то каждые 30% ударова будут в корабль, остальные 70% - случайно выбранная клетка(может попасть и в корабль и в пустую клетку). "Нереально трудно" - 50% в корабль, остальные 50% - случайно выбранная клетка. 