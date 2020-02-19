'use strict';
function createForm(form, formDef) {
  let i = 0;
  for (let key of formDef) {
    let div = document.createElement('div');
    let label = document.createElement('label');

    form.appendChild(div).classList.add('div_style');
    div.appendChild(label).classList.add('label_style');
    label.innerText = key.label;
    switch (key.kind) {
      case 'longtext':
        createElem('text');
        break;
      case 'shorttext':
        createElem('email');
        break;
      case 'number':
        createElem('number');
        break;
      case 'check':
        createElem('checkbox');
        break;
      case 'combo':
        let select = document.createElement('select');
        div.appendChild(select).classList.add('select_style');
        select.name = key.name;
        select.id = select.name + ++i;
        label.htmlFor = select.id;
        for (let item of key.options) {
          let option = document.createElement('option');
          select.appendChild(option);
          option.innerText = item.text;
          option.value = item.value;
        }
        break;
      case 'radio':
        let divRadio = document.createElement('div');
        div.appendChild(divRadio);
        for (let item of key.options) {
          let input = document.createElement('input');
          divRadio.appendChild(input);
          input.name = 'position';
          input.type = 'radio';
          input.id = ++i;
          let labelRadio = document.createElement('label');
          divRadio.appendChild(labelRadio);
          labelRadio.innerText = item.text;
          labelRadio.value = item.value; // не работает
          labelRadio.htmlFor = i;
        }
        break;
      case 'memo':
        let textarea = document.createElement('textarea');
        div.appendChild(textarea).classList.add('textarea_style');
        textarea.name = key.name;
        textarea.id = textarea.name + ++i;
        label.htmlFor = textarea.id;
        break;
      case 'submit':
        createElem('submit');
        div.removeChild(label);
        div.classList.remove('div_style');
        break;
    }
    function createElem(type) {
      let input = document.createElement('input');
      div.appendChild(input).classList.add('input_style');
      input.id = form.name + ++i;
      label.htmlFor = input.id;
      input.type = type;
      input.name = key.name;
      if (key.kind === 'check') {
        input.checked = 'checked';
      }
      if (key.kind === 'submit') {
        input.value = key.label;
      }
    }
  }
  document.body.appendChild(form);
}

let receivedForm = document.createElement('form');
receivedForm.action = 'http://fe.it-academy.by/TestForm.php';
receivedForm.method = 'POST';
receivedForm.name = 'name1';
receivedForm.style.cssText = 'display: flex; flex-direction: column;';
let received = document.forms.name;
received.style.cssText = 'display: flex; flex-direction: column;';

let formDef1 = [
  { label: 'Название сайта:', kind: 'longtext', name: 'sitename' },
  { label: 'URL сайта:', kind: 'longtext', name: 'siteurl' },
  { label: 'Посетителей в сутки:', kind: 'number', name: 'visitors' },
  { label: 'E-mail для связи:', kind: 'shorttext', name: 'email' },
  {
    label: 'Рубрика каталога:',
    kind: 'combo',
    name: 'division',
    options: [
      { text: 'здоровье', value: 1 },
      { text: 'домашний уют', value: 2 },
      { text: 'бытовая техника', value: 3 }
    ]
  },
  {
    label: 'Pазмещение:',
    kind: 'radio',
    name: 'payment',
    options: [
      { text: 'бесплатное', value: 1 },
      { text: 'платное', value: 2 },
      { text: 'VIP', value: 3 }
    ]
  },
  { label: 'Разрешить отзывы:', kind: 'check', name: 'votes' },
  { label: 'Описание сайта:', kind: 'memo', name: 'description' },
  { label: 'Опубликовать', kind: 'submit' }
];
let formDef2 = [
  { label: 'Фамилия:', kind: 'longtext', name: 'lastname' },
  { label: 'Имя:', kind: 'longtext', name: 'firstname' },
  { label: 'Отчество:', kind: 'longtext', name: 'secondname' },
  { label: 'Возраст:', kind: 'number', name: 'age' },
  { label: 'Зарегистрироваться', kind: 'submit' }
];
createForm(receivedForm, formDef1);
createForm(received, formDef2);

// Validation

let inputText = document.querySelectorAll('input[type="text"]');
let inputNumber = document.querySelectorAll('input[type="number"]');
let inputEmail = document.querySelector('input[type="email"]');

[...inputText, ...inputNumber].forEach(item => {
  item.addEventListener('blur', function() {
    let error = item.parentNode.querySelector('.error');
    if (error) {
      item.parentNode.removeChild(error);
    }
    if (!item.value) {
      item.parentNode.append(createMessageError(item, 'Enter value'));
    }
  });
});

inputEmail.addEventListener('blur', function() {
  if (!inputEmail.value.includes('@')) {
    inputEmail.parentNode.append(
      createMessageError(inputEmail, 'Enter the correct email')
    );
  }
});

inputEmail.addEventListener('focus', function() {
  let error = inputEmail.parentNode.querySelector('.error');
  if (error) {
    inputEmail.parentNode.removeChild(error);
  }
});

function createMessageError(elem, text) {
  let message = document.createElement('span');
  message.classList.add('error');
  let coords = getCoords(elem);
  message.style.left = coords.right + 5 + 'px';
  message.style.top = coords.top + 'px';
  message.innerHTML = text;
  return message;
}

function getCoords(elem) {
  let box = elem.getBoundingClientRect();
  return {
    top: box.top,
    right: box.right
  };
}
