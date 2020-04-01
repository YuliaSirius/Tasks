import { Clock } from "./clockModel";
/ настройка, инициализация

// создаём все три компонента
let clock = new Clock();
var view = new ManViewWebPage();
var controller = new ManControllerButtons();

// увязываем компоненты друг с другом
// указываем компонентам, в каком DOM им работать
var containerElem = document.getElementById('IManContainer');
man.start(view);
view.start(man, containerElem);
controller.start(man, containerElem);

// инициируем первичное отображение Model во View
man.updateView();
