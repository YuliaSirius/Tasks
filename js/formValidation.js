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
        divRadio.classList.add('radio');
        divRadio.id = 'idRadio';
        for (let item of key.options) {
          let input = document.createElement('input');
          divRadio.appendChild(input);
          input.name = 'position';
          input.type = 'radio';
          input.id = ++i;
          let labelRadio = document.createElement('label');
          divRadio.appendChild(labelRadio);
          labelRadio.innerText = item.text;
          labelRadio.value = item.value;
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
      if (key.kind === 'check') input.checked = 'checked';
      if (key.kind === 'submit') input.value = key.label;
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

let forms = document.querySelectorAll('form');
forms.forEach(item => {
  for (let elem of item) {
    elem.addEventListener('blur', () => validateAll(elem));
  }
  item.addEventListener('submit', () => {
    for (let elem of item) {
      validateAll(elem);
    }
    let allErrorsInForm = item.querySelectorAll('.error');
    if (allErrorsInForm[0]) {
      event.preventDefault();
      allErrorsInForm[0].focus();
    }
  });
});
function validateAll(item) {
  removeError(item);
  switch (item.tagName) {
    case 'INPUT':
      let type = item.type;
      switch (type) {
        case 'text':
          validateValue(item);
          break;
        case 'email':
          validateEmail(item);
          break;
        case 'number':
          validateValue(item);
          validateNumber(item);
          break;
        case 'radio':
          validateRadio();
          break;
      }
      break;
    case 'TEXTAREA':
      validateValue(item);
      break;
  }
}
function validateValue(item) {
  if (!item.value) {
    addError(item, 'Enter value');
  }
}
function validateEmail(item) {
  if (!(item.value.includes('@') && item.value.includes('.'))) {
    addError(item, 'Enter the correct email');
  }
}
function validateNumber(item) {
  if (Number(item.value) < 0) {
    addError(item, 'Enter a positive number');
  }
}
function validateRadio() {
  let allRadio = document.querySelectorAll('[type="radio"]');
  let checked = [...allRadio].some(item => item.checked);
  let divRadio = document.querySelector('.radio');
  removeError(divRadio);
  if (!checked) {
    addError(divRadio, 'Must choose');
  }
}
function removeError(item) {
  if (item.type === 'radio') return;
  let error = document.querySelector('.error');
  if ((error = item.nextSibling)) {
    error.remove();
    item.style.borderColor = '';
  }
}
function createError(elem, text) {
  let message = document.createElement('label');
  message.classList.add('error');
  message.append(document.createTextNode(text));
  message.htmlFor = elem.id;
  elem.style.borderColor = 'red';
  return message;
}
function addError(item, text) {
  item.after(createError(item, text));
}
