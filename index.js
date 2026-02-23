let items = [
	"Сделать проектную работу",
	"Полить цветы",
	"Пройти туториал по Реакту",
	"Сделать фронт для своего проекта",
	"Прогуляться по улице в солнечный день",
	"Помыть посуду",
  ];
  
  const listElement = document.querySelector(".to-do__list");
  const formElement = document.querySelector(".to-do__form");
  const inputElement = document.querySelector(".to-do__input");
  
  function loadTasks() {
	const tasks = JSON.parse(localStorage.getItem('tasks'));
  
	if (tasks && tasks.length > 0) {
	  return tasks;
	} else {
	  return items;
	}
  }
  
  const update = () => {
	const items = getTasksFromDOM();
	saveTasks(items);
  }
  
  function createItem(item) {
	const template = document.getElementById("to-do__item-template");
	const clone = template.content.querySelector(".to-do__item").cloneNode(true);
	const textElement = clone.querySelector(".to-do__item-text");
	const deleteButton = clone.querySelector(".to-do__item-button_type_delete");
	const duplicateButton = clone.querySelector(".to-do__item-button_type_duplicate");
	const editButton = clone.querySelector(".to-do__item-button_type_edit");
  
	textElement.textContent = item;
  
	deleteButton.addEventListener('click', () => {
	  clone.remove();
	  update();
	});
	
	duplicateButton.addEventListener('click', () => {
	  const itemName = textElement.textContent;
	  const newItem = createItem(itemName);
  
	  listElement.prepend(newItem);
	  update();
	});
  
	editButton.addEventListener('click', () => {
	  textElement.contentEditable = "true";
	  textElement.focus();
	});
  
	textElement.addEventListener('blur', () => {
	  textElement.contentEditable = "false";
	  update();
	})
  
	return clone;
  }
  
  function getTasksFromDOM() {
	const itemsNamesElements = document.querySelectorAll('.to-do__item-text');
	const tasks = [];
  
	itemsNamesElements.forEach((item) => {
	  const taskText = item.textContent;
	  tasks.push(taskText);
	});
  
	return tasks;
  }
  
  function saveTasks(tasks) {
	localStorage.setItem('tasks', JSON.stringify(tasks));
  }
  
  formElement.addEventListener('submit', (event) => {
	event.preventDefault();
  
	const inputValue = inputElement.value;
	const taskElement = createItem(inputValue);
  
	listElement.prepend(taskElement);
  
	items = getTasksFromDOM();
	saveTasks(items);
  
	formElement.reset();
  })  
  
  items = loadTasks();
  items.forEach((item) => {
	const taskElement = createItem(item);
	listElement.append(taskElement);
  });