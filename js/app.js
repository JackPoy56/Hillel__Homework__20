function loadData() {
    return fetch('./data/db.json').then(res => res.json());
}

let todoItems = [];
let curentCards = 0;

if (!localStorage.getItem('todoItems')) {    
    loadData().then(items => {
        todoItems = items;       
        curentCards = +todoItems[todoItems.length - 1].id + 1;
        localStorage.setItem('todoItems', JSON.stringify(todoItems));
        renderTodoItems(todoItems);
    });
} else {
    todoItems = JSON.parse(localStorage.getItem('todoItems')); 
    renderTodoItems(todoItems);    

    if (todoItems.length === 0){
        curentCards = 1;
    } else {
        curentCards = +todoItems[todoItems.length - 1].id + 1;
    }
}

document.querySelector('#addNewCard > button').addEventListener('click', addNewCard);

function addNewCard() {
    let inputTitlValue = document.querySelector('#newCardTitle').value;
    if (inputTitlValue.trim() == '') {
        document.querySelector('#newCardTitle').style.border = "1px solid red";
        return;
    } else {
        document.querySelector('#newCardTitle').style.border = "1px solid black";
    }

    let inputDescripValue = document.querySelector('#newCardDescription').value;
    if (inputDescripValue.trim() == '') {
        document.querySelector('#newCardDescription').style.border = "1px solid red";
        return;
    } else {
        document.querySelector('#newCardDescription').style.border = "1px solid black";  
    }

    const selectCardPriorValue = document.querySelector('#newCardPrior').value;
    const satusNewCard = 'Todo';

    renderCard(`${curentCards}`, `${inputTitlValue}`, `${inputDescripValue}`, `${selectCardPriorValue}`, `${satusNewCard}`);
    const newCard = {
        id: `${curentCards}`,
        title: `${inputTitlValue}`,
        description: `${inputDescripValue}`,
        status: "Todo",
        priority: `${selectCardPriorValue}`
    }

    let arrLocStor = JSON.parse(localStorage.getItem('todoItems'));
    arrLocStor.push(newCard);

    const jsonValue = JSON.stringify(arrLocStor);
    localStorage.setItem('todoItems', jsonValue);

    curentCards ++ ;
       
    document.querySelector('#newCardTitle').value = '';
    document.querySelector('#newCardDescription').value = '';  
    document.querySelector('#newCardPrior').value = 'Low'; 
}

function renderTodoItems(todoItems) {
    for (let item of todoItems) {
        renderCard(`${item.id}`, `${item.title}`, `${item.description}`, `${item.priority}`, `${item.status}`);
    }
}
    
function renderCard(id, title, description, priority, status) {
    const cardsEl = document.querySelector('#cards');
    
    const divCardNewEl = new TagElement('div', '', {name: 'class', value:'card'}, {name: 'id', value:`cards${id}`}); 
    divCardNewEl.render(cardsEl);
    
    const divCardEl = document.querySelector(`#cards${id}`);
    const divContainerNewEl = new TagElement('div', '', {name: 'class', value:'container'});
    divContainerNewEl.render(divCardEl);
        
    const divContainerEl = document.querySelector(`#cards${id} > .container`);
    const pTitleNewEl = new TagElement('p', `${title}`, {name: 'class', value:'title'}, {name: 'contenteditable', value:'true'});
    pTitleNewEl.render(divContainerEl);
     
    addBlockPriority();
    addBlockStatus();
    addBlockDescrip();
    addBlockControl();

    function addBlockPriority() {  
        const divPriorityNewEl = new TagElement('div', '', {name: 'class', value:'priority'});
        divPriorityNewEl.render(divContainerEl);

        const divPriorityEl = document.querySelector(`#cards${id} > .container > .priority`);
        const selectPriorityNewEl = new TagElement('select', '');
        selectPriorityNewEl.render(divPriorityEl);

        const selectPriorityEl = document.querySelector(`#cards${id} > .container > .priority > select`);
        
        const optionPriorFirstEl = new TagElement('option', 'Low', {name: 'value', value:'Low'});
        optionPriorFirstEl.render(selectPriorityEl);
        
        const optionPriorSecondEl = new TagElement('option', 'Medium', {name: 'value', value:'Medium'});
        optionPriorSecondEl.render(selectPriorityEl);

        const optionPriorLastEl = new TagElement('option', 'High', {name: 'value', value:'High'});
        optionPriorLastEl.render(selectPriorityEl);

        const select =  selectPriorityEl.getElementsByTagName('option');
        for (let i = 0; i < select.length; i++) {
            if (select[i].value === `${priority}`) select[i].selected = true;
        }
    }

    function addBlockStatus() {
        const divStatusNewEl = new TagElement('div', '', {name: 'class', value:'status'});
        divStatusNewEl.render(divContainerEl);
        
        const divStatusEl = document.querySelector(`#cards${id} > .container > .status`);
    
        const selectStatusNewEl = new TagElement('select', '');
        selectStatusNewEl.render(divStatusEl);
    
        const selectStatusEl = document.querySelector(`#cards${id} > .container > .status > select`);
    
        const optionStatusFirstEl = new TagElement('option', 'Todo', {name: 'value', value:'Todo'});
        optionStatusFirstEl.render(selectStatusEl);
    
        const optionStatusSecondEl = new TagElement('option', 'In progress', {name: 'value', value:'In progress'});
        optionStatusSecondEl.render(selectStatusEl);
    
        const optionStatusLastEl = new TagElement('option', 'Done', {name: 'value', value:'Done'});
        optionStatusLastEl.render(selectStatusEl);

        const select =  selectStatusEl.getElementsByTagName('option');
        for (let i = 0; i < select.length; i++) {
            if (select[i].value === `${status}`) select[i].selected = true;
        }
    }

    function addBlockDescrip() {
        const divDescriptoionNewEl = new TagElement('p', `${description}`, {name: 'class', value:'description'}, {name: 'contenteditable', value:'true'});
        divDescriptoionNewEl.render(divCardEl);
    }

    function addBlockControl() {
        const divControlsNewEl = new TagElement('div', '', {name: 'class', value:'controls'});
    
        divControlsNewEl.render(divCardEl);
        const divControlsEl = document.querySelector(`#cards${id} > .controls`);
    
        const buttonFirstNewEl = new TagElement('button', 'Edit');
        buttonFirstNewEl.render(divControlsEl);

        const btnFirstEl = document.querySelector(`#cards${id} > .controls > button:first-child`);       
        btnFirstEl.addEventListener('click', () => {
            for(let i = 0; i < localStorage.length; i++) {                    
                let key = localStorage.key(i);                            
                let arrLocStor = JSON.parse(localStorage.getItem(`${key}`));
                                    
                arrLocStor.forEach((obj) => {
                    if (obj.id == id) {      
                        const titleValue = document.querySelector(`#cards${id} > .container > .title`).textContent;
                        obj.title = titleValue;
                        
                        const descriptionValue = document.querySelector(`#cards${id} > .description`).textContent;
                        obj.description = descriptionValue 

                        const priorityValue = document.querySelector(`#cards${id} > .container > .priority > select`).value;
                        obj.priority = priorityValue;

                        const statusValue = document.querySelector(`#cards${id} > .container > .status > select`).value;
                        obj.status = statusValue;

                        const jsonValue = JSON.stringify(arrLocStor);
                        localStorage.setItem('todoItems', jsonValue);
                    }
                });
            }
        });
       
        const buttonLastNewEl = new TagElement('button', 'Delete');
        buttonLastNewEl.render(divControlsEl);

        const btnLasttEl = document.querySelector(`#cards${id} > .controls > button:last-child`);       
        btnLasttEl.addEventListener('click', event => {
            const element = event.target.closest(`#cards${id}`);

            for(let i = 0; i < localStorage.length; i++) {                    
                let key = localStorage.key(i);                            
                let arrLocStor = JSON.parse(localStorage.getItem(`${key}`));
                                    
                arrLocStor.forEach((obj) => {
                    if (obj.id == id) {   
                        const indexObj = arrLocStor.indexOf(obj);  
                        arrLocStor.splice(indexObj, 1); 
                        const jsonValue = JSON.stringify(arrLocStor);
                        localStorage.setItem('todoItems', jsonValue);
                    }
                });
            }
            element.remove();
        });
    }
}