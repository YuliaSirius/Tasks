'use strict';
function createForm(form, formDef) {
  //   form.classList.add('form');
  for (let key of formDef) {
    let label = document.createElement('label');
    form.appendChild(label);
    label.innerText = key.label;
    let input = document.createElement('input');
    input.name = key.name;
    if (key.kind == 'longtext') {
      label.appendChild(input);
      input.type = 'text';
    }
    if (key.kind == 'shorttext') {
      label.appendChild(input);
      input.type = 'email';
    }
    if (key.kind == 'number') {
      label.appendChild(input);
      input.type = 'number';
    }
    if (key.kind == 'combo') {
      let select = document.createElement('select');
      label.appendChild(select);
      select.name = key.name;
      for (let item of key.options) {
        let option = document.createElement('option');
        select.appendChild(option);
        option.innerText = item.text;
        option.value = item.value;
      }
    }
    if (key.kind == 'radio') {
      let i = 0;
      for (let item of key.options) {
        let input = document.createElement('input');
        label.appendChild(input);
        input.name = 'position';
        input.type = 'radio';
        input.id = ++i;
        let labelRadio = document.createElement('label');
        label.appendChild(labelRadio);
        labelRadio.innerText = item.text;
        labelRadio.value = item.value; // не работает
        labelRadio.htmlFor = i;
      }
    }
    if (key.kind == 'check') {
      label.appendChild(input);
      input.type = 'checkbox';
      input.checked = 'checked';
    }
    if (key.kind == 'memo') {
      let textarea = document.createElement('textarea');
      label.appendChild(textarea);
      textarea.name = key.name;
    }
    if (key.kind == 'submit') {
      label.innerText = '';
      label.appendChild(input);
      input.type = 'submit';
      input.value = key.label;
    }
  }
  document.body.appendChild(form);
}

let receivedForm = document.createElement('form');
receivedForm.action = 'http://fe.it-academy.by/TestForm.php';
receivedForm.method = 'POST';
receivedForm.style.cssText = 'display: flex; flex-direction: column;';
let received = document.forms.formsName;
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
