document.addEventListener('DOMContentLoaded', () => {
  const modal = document.querySelector('.modal');
  const accessBtns = document.querySelectorAll('.js-button-access');
  const closeModalBtn = document.querySelector('.js-close-modal');
  const form = document.querySelector('.modal__content');
  const inputs = form.querySelectorAll('.modal__input-field');
  const privacyCheckbox = form.querySelector('.modal-consent-personal-data');
  const errorElements = form.querySelectorAll('.modal__error');
  const customCheckboxes = form.querySelectorAll('.js-a11y-checkbox');
  const ERROR_TYPE = {
    empty: 'Поле обязательно для заполнения',
    invalid_email: 'Некорректный email',
    invalid_phone_number: 'Формат: +7 (999) 123-45-67',
    unchecked_privacy: 'Необходимо ваше согласие',
    short_name: 'Имя слишком короткое',
    invalid_name: r = 'Только русские буквы, пробелы и дефис'
  };

  customCheckboxes.forEach(checkbox => {
    checkbox.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        checkbox.checked = !checkbox.checked;
      }
    })
  });

  const clearErrors = () => {
    inputs.forEach(input => input.classList.remove('error'));
    errorElements.forEach(el => el.textContent = '');
  };

  const sanitizeHTML = (str) => {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  };

  const validateField = (input) => {
    const name = input.name;
    const value = input.type === 'checkbox' ? input.checked : input.value.trim();
    const errorEl = form.querySelector(`[data-error="${name}"]`);

    let error = '';

    if (!value) {
      error = ERROR_TYPE.empty;
    } else {
      switch (name) {
        case 'name':
          if (value.length < 2) error = ERROR_TYPE.short_name;
          if (!/^[а-яА-ЯёЁ\s-]+$/.test(value)) error = ERROR_TYPE.invalid_name;
          break;

        case 'email':
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!emailRegex.test(value)) error = ERROR_TYPE.invalid_email;
          break;

        case 'tel':
          const phoneRegex = /^\+7\s?\(?\d{3}\)?\s?\d{3}-?\d{2}-?\d{2}$/;
          if (!phoneRegex.test(value)) error = ERROR_TYPE.invalid_phone_number;
          break;
        case 'privacy':
          if (!value) error = ERROR_TYPE.unchecked_privacy;
          break;
      }
    }

    if (error) {
      input.classList.add('error');
      errorEl.innerHTML = sanitizeHTML(error);
      return false;
    } else {
      input.classList.remove('error');
      errorEl.textContent = '';
      return true;
    }
  };

  const validateForm = () => {
    clearErrors();
    let isValid = true;

    inputs.forEach(input => {
      if (!validateField(input)) {
        isValid = false;
      }
    });

    if (!validateField(privacyCheckbox)) {
      isValid = false;
    }

    return isValid;
  };

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    if (validateForm()) {
      const formData = {
        name: sanitizeHTML(inputs[0].value.trim()),
        email: sanitizeHTML(inputs[1].value.trim()),
        phone: sanitizeHTML(inputs[2].value.trim())
      };

      console.log('Данные для отправки:', formData);

      alert('Форма отправлена! Данные в консоли');
      form.reset();
    }
  });

  function openModal() {
    modal.classList.add('modal--visible');
    document.body.classList.add('blocked');
  };

  function closeModal() {
    modal.classList.remove('modal--visible');
    document.body.classList.remove('blocked');
  };

  closeModalBtn.addEventListener('click', closeModal);

  accessBtns.forEach((button) => {
    button.addEventListener('click', () => {
      openModal();
    })
  });
})
