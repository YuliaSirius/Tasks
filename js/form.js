'use strict';

function createForm(form, formDef) {
  //   form.classList.add('form');
  for (let key of formDef) {
    let label = document.createElement('label');
    form.appendChild(label);
    label.innerText = key.label;
    if (key.kind == 'longtext' || key.kind == 'memo') {
      let textarea = document.createElement('textarea');
      label.appendChild(textarea);
      textarea.name = key.name;
    }
    if (key.kind == 'shorttext') {
      input.call(label, 'email');
      
    }
    if (key.kind == 'number') {
      input.call(label, 'number');
    }
    if (key.kind == 'combo') {
      let select = document.createElement('select');
      label.appendChild(select);
      for (let item of key.options) {
        let option = document.createElement('option');
        select.appendChild(option);
        option.innerText = item.text;
      }
    }
    if (key.kind == 'radio') {
      let i = 0;
      for (let item of key.options) {
        input.call(label, 'radio', ++i);
        let labelRadio = document.createElement('label');
        label.appendChild(labelRadio);
        labelRadio.innerText = item.text;
        labelRadio.htmlFor = i;
      }
    }
    if (key.kind == 'check') {
      input.call(label, 'checkbox', 'checked');
    }
    if (key.kind == 'submit') {
      input.call(label, 'submit', key.label);
    }
      }

  function input(inputType, value) {
    let input = document.createElement('input');
    this.appendChild(input);
    input.type = inputType;
    if (inputType == 'radio') {
      input.id = value;
      input.name = 'position';
    }
    if (inputType == 'checkbox') {
      input.checked = value;
          }
    if (inputType == 'submit') {
      input.value = value;
    }
  }
  console.log(form);

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
  { label: 'Фамилия', kind: 'longtext', name: 'lastname' },
  { label: 'Имя', kind: 'longtext', name: 'firstname' },
  { label: 'Отчество', kind: 'longtext', name: 'secondname' },
  { label: 'Возраст', kind: 'number', name: 'age' },
  { label: 'Зарегистрироваться', kind: 'submit' }
];
createForm(receivedForm, formDef1);
createForm(received, formDef2);

// innerText	Задает или возвращает текстовое содержимое узла и его потомков
// textContent 	Задает или возвращает текстовое содержимое узла и его потомков
/* <form action="#">
        <div>
          <label><input type="text" autocomplete="on" required placeholder="What is your name:">Name</label>
          <label><input type="text" autocomplete="on" required placeholder="Your phone number:">Phone</label>
          <label><input type="submit" value="SUBMIT"></label>
        </div>
        <input type="checkbox" id="check" checked>
        <label for="check">I agree to the processing of personal data</label>
      </form> */

// <form action="#">
//   <p>have any questions?</p>
//   <div>
//     <label><input type="text" autocomplete="on" required placeholder="What is your name:">Name</label>
//     <label><input type="text" autocomplete="on" required placeholder="Your phone number:">Phone</label>
//   </div>
//   <label><input type="text" placeholder="I want to know:">Question</label>
//   <input type="checkbox" id="checkkk" checked>
//   <label for="checkkk">I agree to the processing of personal data</label>
//   <input type="submit" value="submit">
// </form>
