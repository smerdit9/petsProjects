(function () { // Техническая функция, нужная для того, чтобы не воздействовать на глобальный объект window (сразу вызывается)
  // Создаем и возвращаем заголовок приложения
  function createAppTitle (title) {
      let  appTitle = document.createElement('h2'); // Создаем DOM-элемент h2 в переменной
      appTitle.innerHTML = title; // Помещаем в переменную значение аргумента, который указан в head в каждом отдельном HTML файле
      return appTitle; // Возвращаем переменную с заголовком
  };

  // Создаем и возврвщаем форму для создани дела
  function createTodoItemForm () {
    // Создаем DOM-элементы: form, input, div(обертка для кнопки), button
    let form = document.createElement('form');
    let input = document.createElement('input');
    let buttonWrapper = document.createElement('div');
    let button = document.createElement('button');

    // Присваиваем классы созданным выше элементам, добавляем placeholder для поля ввода и текст для кнопки
    form.classList.add('input-group', 'mb-3');
    input.classList.add('form-control');
    input.placeholder = 'Введите название нового дела';
    buttonWrapper.classList.add('input-group-append');
    button.classList.add('btn', 'btn-primary');
    button.textContent = 'Добавить дело'

    // Создаем форму: помещаем button в обертку и после в элемент формы добавляем input и button в обертке
    buttonWrapper.append(button);
    form.append(input);
    form.append(buttonWrapper);

    button.disabled = true; // Делаем кнопку неактивной

    // Создаем событие input при котром кнопка будет становиться активной, если в поле для ввода что-то написано
    input.addEventListener('input', function () {
      button.disabled = false;
    });

    // Возвращаем переменую form с input и button внутри. А так же input и button отдельно
    return {
      form,
      input,
      button,
    };
  };

  // Создаем и возвращаем список элементов
  function createTodoList () {
    let list = document.createElement('ul'); // Создаем DOM-элемент ul в переменной (список)
    list.classList.add('list-group'); // Присваиваем класс списку
    return list; // Возвращаем список
  };

  // Создаем и возвращаем элемент списка
  function createTodoItem (obj) { //name - аргумент, в которорый помещается текст из поля для ввода (input)
    // Создаем DOM-элементы: li, div(обертка для кнопок), button(delete), button(done)
    let item = document.createElement('li');
    let buttonGroup = document.createElement('div');
    let doneButton = document.createElement('button');
    let deleteButton = document.createElement('button');

    item.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-item-center'); // присваиваем элементу li классы
    item.textContent = obj.name; // Помещаем текст из name(текст введенный пользователем в поле для ввода) в li элемент

    // Присваиваем кнопкам классы и текст внутри
    buttonGroup.classList.add('btn-group', 'btn-group-sm');
    doneButton.classList.add('btn', 'btn-success');
    doneButton.textContent = 'Готово';
    deleteButton.classList.add('btn', 'btn-danger');
    deleteButton.textContent = 'Удалить';

    // Группируем элемент списка: две кнопки помещаем в обертку, а ее в элемент li (переменная item)
    buttonGroup.append(doneButton);
    buttonGroup.append(deleteButton);
    item.append(buttonGroup);

    // Возвращаем готовый элемент списка item, включающий в себя deleteButton и doneButton. А так же обе кнопки по отдельности
    return {
      item,
      doneButton,
      deleteButton,
    };
  };

  // Функция, которая добавляет данные в Local Storage
  function setLsData (key, data) {
    localStorage.setItem(key, JSON.stringify(data));
  };

  // Функция, которая возвращает данные из Local Storage
  function getLsData (key) {
    let LsData = JSON.parse(localStorage.getItem(key));
    return LsData;
  };

  // Итого
  // После четырех функций мы имеем ряд переменых:
  // appTitle - Заголовок
  // form - Форма с полем для ввода и кнопкой
  // input - Поле для ввода из формы
  // button - Кнопка(Добавить дело) из формы
  // list - Список дел
  // item - Элемент списка дел
  // doneButton - Кнопка(Выполнено) из списка дел
  // deleteButton - Кнопка(Удалить) из списка дел

  // Функция, которая объединяет в себе предыдущие четыре функции, добавляет созданные элементы в DOM-дерево и оживляет приложение
  function createTodoApp (container, title = 'Список дел', key) { // Аргументы container и title получаем из head в HTML файле при вызове события
    // Помещаем функции в переменные
    let todoAppTitle = createAppTitle(title); // Функция создания заголовка
    let todoItemForm = createTodoItemForm(); // Функция создания формы
    let todoList = createTodoList(); // Функция создания списка

    // Помещаем все созданные элементы в container
    container.append(todoAppTitle);
    container.append(todoItemForm.form); // Из функции создания формы берем именно переменную с формой
    container.append(todoList);

    let todoArray = [];
    if (localStorage.getItem(key) === null) setLsData(key, todoArray);

    let localStorageData = getLsData(key);
    for (let i = 0; i < localStorageData.length; ++i) {
      createTodoItemTemp(localStorageData[i]);
    };

    function createTodoItemTemp(obj) {

      // Создаем переменную и помещаем туда функцию создания элемента списка с аргументом(obj) - данными из поля для ввода
      let todoItem = createTodoItem(obj);

      // Добавляем события click для кнопок done и delete
      todoItem.doneButton.addEventListener('click', function () {
        todoItem.item.classList.toggle('list-group-item-success'); // При нажатии на кнопку добавляется класс. Из-за метода toggle, при повторном нажатии класс уберется
        for (let item of todoArray) {
          if (item.id === obj.id) obj.done = !obj.done;
        };
        setLsData(key, todoArray);
      });
      todoItem.deleteButton.addEventListener('click', function () {
        if (confirm('Вы уверены?')) { // confirm выводит на экран модальное окно с подтверждением действия
          todoItem.item.remove(); // Если действие подтверждается, элемент списка(item) удаляется
          // todoArray = todoArray.filter(item => item.id !== todoItemObject.id);
          todoArray = getLsData(key).filter(item => item.id !== obj.id);
          setLsData(key, todoArray);
        };
      });

        if (obj.done === true) todoItem.item.classList.toggle('list-group-item-success');
        todoList.prepend(todoItem.item); // Помещаем готовый элемент списка в список
        todoArray.push(obj);
        todoItemForm.input.value = ''; // Очищаем поле ввода
        todoItemForm.button.disabled = true; // Делаем кнопку неактивной
        setLsData(key, todoArray);
    };

    // Вызываем событие submit
    todoItemForm.form.addEventListener('submit', function(e) {
      e.preventDefault(); //Метод, с помощь которого, убирается базовое поведение браузера при отправке формы(обновление страницы)

      //Услловный оператор, который определяет написано ли что-то в поле для ввода. Если нет, то функция завершается(Элемент списка не добавится)
      if (!todoItemForm.input.value) {
        return;
      };

      let todoItemObject = {
      id: getId(todoArray),
      name: todoItemForm.input.value,
      done: false,
      };

      function getId (arr) {
      let maxId = 0;
      for (let i of arr) {
        if (i.id >= maxId) {
          maxId = i.id
        };
      };
      return maxId + 1;
      };

      createTodoItemTemp(todoItemObject);
    });
  };
  window.createTodoApp = createTodoApp; // Регистрируем функцию в глобальнов объекте window для того, чтобы иметь доступ к ней доступ из других скриптов
})();
