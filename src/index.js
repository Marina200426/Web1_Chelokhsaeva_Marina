"use strict";

/**
 * Объект DTO с настройками игры по умолчанию, которые можно будет поменять при инициализации игры.
 * @property {int} rowsCount Количество строк.
 * @property {int} colsCount Количество колонок.
 * @property {int} speed Скорость змейки.
 * @property {int} winLength Длина змейки для победы.
 */
const settings = {
  rowsCount: 21,
  colsCount: 21,
  speed: 4,
  winFoodCount: 5,
};


/**
 * Объект конфига игры, содержащий методы получения настроек и проверки этих настроек.
 * @property {settings} settings Настройки игры.
 */
const config = {
  settings,

  /**
   * Инициализация настроек игры.
   * @param {Object} userSettings Объект с пользовательскими настройками игры.
   */
  init(userSettings) {
    // Записываем переданные настройки в те, которые будут использоваться.
    Object.assign(this.settings, userSettings);
  },

  /**
   * @returns {int} Отдает количество строк в игре.
   */
  getRowsCount() {
    return this.settings.rowsCount;
  },

  /**
   * @returns {int} Отдает количество колонок в игре.
   */
  getColsCount() {
    return this.settings.colsCount;
  },

  /**
   * @returns {int} Отдает скорость змейки в игре.
   */
  getSpeed() {
    return this.settings.speed;
  },

  /**
   * @returns {int} Отдает количество еды, которое надо съесть для победы.
   */
  getWinFoodCount() {
    return this.settings.winFoodCount;
  },

  /**
   * Проверка значений настроек игры.
   * @returns {{isValid: boolean, errors: Array}} Результат валидации в виде объекта с ошибками.
   */
  validate() {
    /**
     * Объект DTO с результатами валидации.
     * @property {boolean} isValid true, если настройки валидны, иначе false.
     * @property {string[]} errors массив со всеми ошибками настроек.
     */
    const result = {
      isValid: true,
      errors: [],
    };

    if (this.settings.rowsCount < 10 || this.settings.rowsCount > 30) {
      result.isValid = false;
      result.errors.push(
        "Неверные настройки, значение rowsCount должно быть в диапазоне [10, 30]."
      );
    }

    if (this.settings.colsCount < 10 || this.settings.colsCount > 30) {
      result.isValid = false;
      result.errors.push(
        "Неверные настройки, значение colsCount должно быть в диапазоне [10, 30]."
      );
    }

    if (this.settings.speed < 1 || this.settings.speed > 10) {
      result.isValid = false;
      result.errors.push(
        "Неверные настройки, значение speed должно быть в диапазоне [1, 10]."
      );
    }

    if (this.settings.winFoodCount < 5 || this.settings.winFoodCount > 50) {
      result.isValid = false;
      result.errors.push(
        "Неверные настройки, значение winLength должно быть в диапазоне [5, 50]."
      );
    }

    return result;
  },
};

/**
 * Объект карты с методами отображения и создания игрового поля.
 * @property {Object} cells Объект содержащий все ячейки игры.
 * @property {Array} usedCells Массив содержащий все занятые ячейки игры.
 */
const map = {
  cells: null,
  usedCells: null,

  /**
   * Метод инициализирует и выводит карту для игры.
   * @param {int} rowsCount Количество строк в карте.
   * @param {int} colsCount Количество колонок в карте.
   */
  init(rowsCount, colsCount) {
    // Контейнер, где будут наши ячейки, первоначально его очистим.
    const table = document.getElementById("game");
    table.innerHTML = "";
    // Объект-хранилище всех клеток пока пустой.
    this.cells = {};
    // Массив со всеми занятыми элементами на карте пока тоже пустой.
    this.usedCells = [];
    // Цикл запустится столько раз, сколько у нас количество строк.
    for (let row = 0; row < rowsCount; row++) {
      // Создаем строку, добавляем ей класс, после добавляем ее в таблицу.
      const tr = document.createElement("tr");
      tr.classList.add("row");
      table.appendChild(tr);
      // Цикл запустится столько раз, сколько у нас количество колонок.
      for (let col = 0; col < colsCount; col++) {
        // Создаем ячейку, добавляем ячейке класс cell.
        const td = document.createElement("td");
        td.classList.add("cell");
        // Записываем в объект всех ячеек новую ячейку.
        this.cells[`x${col.toString()}_y${row.toString()}`] = td;
        // Добавляем ячейку в строку.
        tr.appendChild(td);
      }
    }
  },

  /**
   * Отображает все объекты на карте.
   * @param {{x: int, y: int}[]} snakePointsArray Массив с точками змейки.
   * @param {{x: int, y: int}} foodPoint Точка еды.
   * @see {@link https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach|Array.prototype.forEach()}
   */
  render(snakePointsArray, foodPoint) {
    // Чистим карту от предыдущего рендера, всем занятым ячейкам оставляем только класс cell.
    for (const cell of this.usedCells) {
      //console.log(cell);
      cell.className = "cell";
    }
    // Очищаем массив с занятыми ячейками, при отображении сейчас его соберем заново.
    this.usedCells = [];
    // Отображаем змейку.
    snakePointsArray.forEach((point, idx) => {
      // Получаем элемент ячейки змейки по точке point.
      const snakeCell = this.cells[`x${point.x}_y${point.y}`];
      // Если первый элемент массива, значит это голова, иначе тело.
      snakeCell.classList.add(idx === 0 ? "snakeHead" : "snakeBody");
      // Добавляем элемент ячейки змейки в массив занятых точек на карте.
      this.usedCells.push(snakeCell);
    });
    // Получаем элемент ячейки с едой по точке foodPoint.
    const foodCell = this.cells[`x${foodPoint.x}_y${foodPoint.y}`];
    // Отображаем еду.
    foodCell.classList.add("food");
    // Добавляем элемент ячейки еды в массив занятых точек на карте.
    this.usedCells.push(foodCell);
    //Отрисовываем счетчик игрока
    document.querySelector("#schet").innerHTML = snake.bodyLenght;
  },
};

/**
 * Объект змейки.
 * @property {{x: int, y: int}[]} body Массив с точками тела змейки.
 * @property {string} direction Направление, куда пользователь направил змейку.
 * @property {string} lastStepDirection Направление, куда сходила змейка прошлый раз.
 */
const snake = {
  body: null,
  direction: null,
  lastStepDirection: null,
  bodyLenght: 0,

  /**
   * Инициализирует змейку, откуда она будет начинать и ее направление.
   * @param {{x: int, y: int}[]} startBody Начальная позиция змейки.
   * @param {string} direction Начальное направление игрока.
   */
  init(startBody, direction) {
    this.body = startBody;
    this.direction = direction;
    this.lastStepDirection = direction;
  },

  /**
   * Отдает массив со всеми точками змейки.
   * @return {{x: int, y: int}[]};
   */
  getBody() {
    return this.body;
  },
  setBodyLength() {
    this.bodyLenght = this.getBody().length - 1;
    console.log(this.bodyLenght);
  },
  /**
   * Отдает прошлое направление змейки.
   */
  getLastStepDirection() {
    return this.lastStepDirection;
  },

  /**
   * Проверяет содержит ли змейка переданную точку.
   * @see {@link https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Array/some|Array.prototype.some()}
   * @param {{x: int, y: int}} point Точка, которую проверяем.
   * @returns {boolean} true, если змейка содержит переданную точку, иначе false.
   */
  isOnPoint(point) {
    return this.body.some(
      (snakePoint) => snakePoint.x === point.x && snakePoint.y === point.y
    );
  },

  /**
   * Двигает змейку на один шаг.
   */
  makeStep() {
    const head = this.body[0];
    const newHead = this.getNextStepHeadPoint();
    this.body.unshift(newHead);
    if (!food.isOnPoint(newHead)) {
      this.body.pop();
    }
    this.lastStepDirection = this.direction;
  },

  /**
   * Возвращает точку головы после следующего шага.
   * @returns {{x: int, y: int}} Точка головы змейки после шага.
   */
  getNextStepHeadPoint() {
    const head = this.body[0];
    switch (this.direction) {
      case "up":
        return { x: head.x, y: head.y - 1 };
      case "down":
        return { x: head.x, y: head.y + 1 };
      case "left":
        return { x: head.x - 1, y: head.y };
      case "right":
        return { x: head.x + 1, y: head.y };
      default:
        return head;
    }
  },
};

/**
 * Объект еды.
 * @property {int} x Координаты по оси X.
 * @property {int} y Координаты по оси Y.
 */
const food = {
  x: null,
  y: null,

  /**
   * Создание еды в случайной точке.
   * @param {{x: int, y: int}} coordinates Точка, где будет размещена еда.
   */
  create(coordinates) {
    this.x = coordinates.x;
    this.y = coordinates.y;
  },

  /**
   * Проверка, съела ли змейка еду.
   * @param {{x: int, y: int}} point Точка змейки.
   * @returns {boolean} true, если еда съедена, иначе false.
   */
  isOnPoint(point) {
    return this.x === point.x && this.y === point.y;
  },
};

/**
 * Объект игры.
 * @property {gameConfig} config Конфигурация игры.
 * @property {snake} snake Объект змейки.
 * @property {food} food Объект еды.
 */
const game = {
  config: config,
  snake: snake,
  food: food,

  /**
   * Инициализация игры, установка настроек и создание карты.
   */
  init() {
    // Проверяем настройки игры.
    const validation = this.config.validate();
    if (!validation.isValid) {
      alert(validation.errors.join("\n"));
      return;
    }
    // Инициализируем карту с настройками.
    map.init(this.config.getRowsCount(), this.config.getColsCount());
    // Создаем начальную змейку.
    this.snake.init(
      [
        { x: 10, y: 10 },
        { x: 9, y: 10 },
        { x: 8, y: 10 },
      ],
      "right"
    );
    // Создаем начальную еду.
    this.food.create(this.getRandomFreeCoordinates());
  },

  /**
   * Проверяет можно ли сделать следующий шаг.
   * @returns {boolean} true, если шаг возможен, иначе false.
   */
  canMakeStep() {
    const nextHeadPoint = this.snake.getNextStepHeadPoint();

    if (
      nextHeadPoint.x < 0 ||
      nextHeadPoint.x >= this.config.getColsCount() ||
      nextHeadPoint.y < 0 ||
      nextHeadPoint.y >= this.config.getRowsCount()
    ) {
      return false;
    }

    if (this.snake.isOnPoint(nextHeadPoint)) {
      return false;
    }
    return true;
  },

  /**
   * Получить случайную точку для еды.
   * @returns {{x: int, y: int}} Точка для еды.
   */
  getRandomFreeCoordinates() {
    let coordinates;
    do {
      coordinates = {
        x: Math.floor(Math.random() * this.config.getColsCount()),
        y: Math.floor(Math.random() * this.config.getRowsCount()),
      };
    } while (this.snake.isOnPoint(coordinates));
    return coordinates;
  },

  /**
   * Проверка победы.
   * @returns {boolean} true, если игра выиграна.
   */
  isGameWon() {
    return this.snake.body.length >= this.config.getWinFoodCount();
  },

  /**
   * Можно ли изменить направление.
   * @param {string} direction Новое направление.
   * @returns {boolean} true, если направление можно изменить.
   */
  canSetDirection(direction) {
    const oppositeDirections = {
      up: "down",
      down: "up",
      left: "right",
      right: "left",
    };

    return direction !== oppositeDirections[this.snake.getLastStepDirection()];
  },
};
