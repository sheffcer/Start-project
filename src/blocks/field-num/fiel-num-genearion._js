    // Функция для создания элемента с полем числа
    function createFieldNum(props) {
        if (!props) props = {};
    
        let allMods = '';
    
        // Генерация модификаторов
        if (props.mods) {
          let modsList = props.mods.split(',');
          modsList.forEach(mod => {
            allMods += ' field-num--' + mod.trim();
          });
        }
        if (props.attrs && props.attrs.disabled) {
          allMods += ' field-num--disabled';
        }
    
        let val = parseInt(props.val);
        if (isNaN(val)) val = 0;
    
        // Создание блока
        const fieldNumElement = document.createElement('div');
        fieldNumElement.className = 'field-num' + allMods;
    
        // Заголовок
        if (props.title) {
          const titleElement = document.createElement('span');
          titleElement.className = 'field-num__name';
          titleElement.textContent = props.title;
          fieldNumElement.appendChild(titleElement);
        }
    
        // Обёртка для поля ввода и кнопок
        const inputWrapElement = document.createElement('div');
        inputWrapElement.className = 'field-num__input-wrap';
    
        const inputAndBtnsElement = document.createElement('div');
        inputAndBtnsElement.className = 'field-num__input-and-btns';
    
        const minusButton = document.createElement('button');
        minusButton.className = 'field-num__btn field-num__btn--minus';
        minusButton.type = 'button';
        minusButton.textContent = '-';
    
        const plusButton = document.createElement('button');
        plusButton.className = 'field-num__btn field-num__btn--plus';
        plusButton.type = 'button';
        plusButton.textContent = '+';
    
        // Поле ввода числа
        const inputElement = document.createElement('input');
        inputElement.className = 'field-num__input';
        inputElement.type = 'number';
        inputElement.value = val;
        for (let attr in props.attrs) {
          inputElement.setAttribute(attr, props.attrs[attr]);
        }
    
        inputAndBtnsElement.appendChild(minusButton);
        inputAndBtnsElement.appendChild(plusButton);
        inputAndBtnsElement.appendChild(inputElement);
    
        inputWrapElement.appendChild(inputAndBtnsElement);
    
        // Помощь
        if (props.helpText) {
          const helpTextElement = document.createElement('span');
          helpTextElement.className = 'field-num__help-text';
          helpTextElement.textContent = props.helpText;
          inputWrapElement.appendChild(helpTextElement);
        }
    
        fieldNumElement.appendChild(inputWrapElement);
    
        return fieldNumElement;
      }
    
      // Пример использования функции для создания блока field-num
      document.body.appendChild(createFieldNum({
        title: 'Количество',
        helpText: 'От 1 до 10, шаг 1',
        mods: 'error',
        val: '9',
        attrs: {
          name: 'quantity',
          max: '10',
          min: '1',
          step: '1',
        }
      }));
    
      document.body.appendChild(createFieldNum({
        mods: 'disabled',
        attrs: {
          name: 'quantity',
          disabled: 'true',
        }
      }));