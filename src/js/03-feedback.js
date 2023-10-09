import '../css/common.css';

import '../css/03-feedback.css';

import throttle from 'lodash.throttle';

const links = {
  form: document.querySelector('.feedback-form'),
  email: document.querySelector('input'),
  message: document.querySelector('textarea'),
};

links.form.addEventListener('submit', onFormSubmit);
links.form.addEventListener('input', throttle(onFormInput, 500));

const STR_KEY = 'feedback-form-state';

let formData = {
email: '',
message: '',
};
 
processingForm();

function onFormSubmit(evt) {
    evt.preventDefault();
    localStorage.removeItem(STR_KEY);
    formData.email = links.email.value;
    formData.message = links.message.value;
    evt.currentTarget.reset();
    
    console.log(formData);
}
 function onFormInput(evt) {
   formData[evt.target.name] = evt.target.value;
   localStorage.setItem(STR_KEY, JSON.stringify(formData));
 }

function processingForm() {
    const formValues = localStorage.getItem(STR_KEY);
    const objectValues = JSON.parse(formValues);

    if (objectValues) {
        formData = objectValues;
        links.email.value = objectValues.email || '';
        links.message.value = objectValues.message || '';
    
    }
}