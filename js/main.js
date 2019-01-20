const btnAdd = document.querySelector('#add');
const ul = document.querySelector('#lista');
var tasksSize = document.querySelector('#tasks-size');
const emptyError = document.querySelector('#emptyTask');



var tarefas = {
    size: 0,
    changeText() {
        if (tarefas.getSize() === 0) {
            tasksSize.textContent = `Nenhuma tarefa :)))`;
        }

        else {
            tasksSize.textContent = `Você possui ${tarefas.size} tarefas`;
        }
    },

    getSize() {
        return this.size;
    },

    setSize(size) {
        this.size = size;
        this.changeText();
    },

};

if (tarefas.getSize() === 0) {
    tasksSize.textContent = `Nenhuma tarefa :)))`;
}

// ao clicar no Botão de Adicionar ele chama a função de nova tarefa
btnAdd.addEventListener('click', newTarefa);

// escuta se foi clicado o checkbox, se sim muda a classe da div pra
// 'completed', se ele clicar de volta volta pra classe comum 'task'
// aqui também ao dar um check diminui o tamanho da lista
ul.addEventListener('click', function (ev) {
    if (ev.target.checked === true) {
        ev.target.parentElement.setAttribute('class', 'task completed');
        tarefas.setSize(tarefas.size - 1);
    }
    else if (ev.target.checked === false) {
        ev.target.parentElement.setAttribute('class', 'task');
        tarefas.setSize(tarefas.size + 1);
    }

}, false);

// adiciona uma nova tarefa na lista 'ul' 
// aumenta o tamanho da variável 'tarefas'
// e por último apaga o que estiver escrito no input após clicar no botão
function newTarefa() {
    let item = document.querySelector('#tarefaTxt').value;

    if (checkItem(item) === true) {

        let taskDiv = document.createElement('div');
        taskDiv.setAttribute('class', 'task');

        let para = document.createElement('p');
        para.textContent = item;

        let checkbox = document.createElement('input');
        checkbox.setAttribute('type', 'checkbox');
        checkbox.setAttribute('class', 'checked')

        let closeButton = document.createElement('button');
        closeButton.textContent='\u00D7';
        closeButton.setAttribute('class', 'close');
        closeButton.addEventListener('click', function(){
            removeTask(item);
        });

        taskDiv.appendChild(checkbox);
        taskDiv.appendChild(para);
        taskDiv.appendChild(closeButton);



        let li = document.createElement("li");

        li.appendChild(taskDiv);
        ul.appendChild(li);

        tarefas.setSize(ul.children.length);

        document.querySelector('#tarefaTxt').value = '';
    }
}

// Vê se o usuário não digitou nada no input da tarefa
function checkItem(item) {
    if (item === '') {
        emptyError.textContent = "Não é possível adicionar tarefas vazias";
        return false;
    }
    return true;
}


function removeTask(task) {
    let tasks = document.querySelectorAll('li');

    for(let i = 0; i < tasks.length; i++){
        let position = tasks[i];

        if(task === position.firstChild.children[1].textContent){
            console.log(position.parentNode.removeChild(position));
            tarefas.setSize(ul.children.length);
        }
    }
}


