
console.log(window.localStorage);

class Todo {
    constructor(text, date){
        this.text = text;
        this.date = date;
    }
}

class TodoList  {
    constructor() {
        this.tasks = JSON.parse(window.localStorage.getItem("tasks")) || [];
        this.addTaskArea();
        this.tasksArray = [];
        this.render(this.tasks);
    }

    render(tasksArray) {
        
        this.addListWithTasks(tasksArray);
     
    }

    addTaskArea() {

        const form = document.querySelector('#new-task');

        const input = document.createElement('input')
        input.className = 'add-task-input';
        input.placeholder = "Dodaj zadanie...";
        input.type = 'text';

        const dateInput = document.createElement('input')
        dateInput.className = 'add-date-input'
        dateInput.type = 'date';

        const button = document.createElement('input');
        button.className = 'add-task-button';
        button.type = 'submit';
        button.value = "Dodaj";

        button.addEventListener('click', () => this.addTaskToList(input.value, dateInput.value))

        form.appendChild(input);
        form.appendChild(dateInput);
        form.appendChild(button);
    }

    addTaskToList(text, dateval) {
        this.tasks.push(new Todo(text, dateval))
        this.saveTaskInLocalStorage()
    }

    addListWithTasks(tasksArray) {
        const list = document.querySelector('main');
  

        const ul = document.createElement('ul');
        ul.className = 'task-list';

        list.appendChild(ul);

        tasksArray.forEach((task, taskIndex) => {
            const li = document.createElement('li');
            li.classList.add('task');

            const content = document.createElement('div');
            content.classList.add('content');

            const taskText = document.createElement('input');
            taskText.classList.add('text');
            taskText.type = 'text';
            taskText.setAttribute('readonly', 'readonly');

            const dateTaskText = document.createElement('input');
            dateTaskText.classList.add('date');
            dateTaskText.type = 'date';
            dateTaskText.setAttribute('readonly', 'readonly');

            const taskActions = document.createElement('div');
            taskActions.classList.add('actions');

            const editButton = document.createElement('button');
            editButton.innerText = "Edytuj";
            editButton.classList.add('edit');

            const deleteButton = document.createElement('button');
            deleteButton.innerText = 'Usuń';
            deleteButton.classList.add('delete')
        
            deleteButton.addEventListener('click', () => {
                
                
                this.tasks.splice(taskIndex, 1);
                this.saveTaskInLocalStorage();
                console.log(window.localStorage.tasks)
                ul.removeChild(li);

            })

            editButton.addEventListener('click', () => {
                if (editButton.innerText.toLowerCase() == "edytuj"){
                    editButton.innerText = "Zapisz";
                    taskText.removeAttribute("readonly");
                    taskText.focus();
                    dateTaskText.removeAttribute("readonly");
                
        
                }
                
                else {
                    editButton.innerText = "Edytuj";
                  
                    taskText.setAttribute("readonly", "readonly");
                    dateTaskText.setAttribute('readonly', 'readonly');
                    this.tasks[taskIndex].text = taskText.value;
                    this.tasks[taskIndex].date = dateTaskText.value;
                    this.saveTaskInLocalStorage();
                    
                }

            })

            

            ul.appendChild(li);
            li.appendChild(content);
            li.appendChild(taskActions)
            content.appendChild(taskText);
            content.appendChild(dateTaskText);
            taskActions.appendChild(editButton);
            taskActions.appendChild(deleteButton);

            taskText.value = task.text;
            dateTaskText.value = task.date;
        })

    }

    saveTaskInLocalStorage() {
        window.localStorage.setItem('tasks', JSON.stringify(this.tasks))
    }
}

const todo = new TodoList();
