window.addEventListener('load', () => {
    const form = document.querySelector('#new-task-form');
    const input = document.querySelector('#new-task-input');
    const list_el = document.querySelector('#tasks');
    
    // Load tasks from local storage if available
    const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];

    savedTasks.forEach((taskText) => {
        const task_el = createTaskElement(taskText);
        list_el.appendChild(task_el);
    });

    form.addEventListener('submit', (event) => {
        event.preventDefault();

        const task = input.value;

        if (!task) {
            alert('Please fill out the task');
            return;
        }

        const task_el = createTaskElement(task);
        list_el.appendChild(task_el);

        // Save tasks to local storage
        const tasksInLocalStorage = JSON.parse(localStorage.getItem('tasks')) || [];
        tasksInLocalStorage.push(task);
        localStorage.setItem('tasks', JSON.stringify(tasksInLocalStorage));

        input.value = '';
    });

    function createTaskElement(taskText) {
        const task_el = document.createElement('div');
        task_el.classList.add('task');

        const task_content_el = document.createElement('div');
        task_content_el.classList.add('content');

        task_el.appendChild(task_content_el);

        const task_input_el = document.createElement('input');
        task_input_el.type = 'text';
        task_input_el.classList.add('text');
        task_input_el.value = taskText;
        task_input_el.setAttribute('readonly', 'readonly');

        task_content_el.appendChild(task_input_el);

        const task_actions_el = document.createElement('div');
        task_actions_el.classList.add('actions');

        const task_edit_el = document.createElement('button');
        task_edit_el.classList.add('edit');
        task_edit_el.innerHTML = 'Edit';

        const task_delete_el = document.createElement('button');
        task_delete_el.classList.add('delete');
        task_delete_el.innerHTML = 'Delete';

        task_actions_el.appendChild(task_edit_el);
        task_actions_el.appendChild(task_delete_el);

        task_el.appendChild(task_actions_el);

        task_edit_el.addEventListener('click', () => {
            if (task_edit_el.innerText.toLowerCase() === 'edit') {
                task_input_el.removeAttribute('readonly');
                task_input_el.focus();
                task_edit_el.innerText = 'Save';
            } else {
                task_input_el.setAttribute('readonly', 'readonly');
                task_edit_el.innerText = 'Edit';
                // Update the task in local storage when saved
                const tasksInLocalStorage = JSON.parse(localStorage.getItem('tasks')) || [];
                const index = tasksInLocalStorage.indexOf(taskText);
                if (index !== -1) {
                    tasksInLocalStorage[index] = task_input_el.value;
                    localStorage.setItem('tasks', JSON.stringify(tasksInLocalStorage));
                }
            }
        });

        task_delete_el.addEventListener('click', () => {
            list_el.removeChild(task_el);

            // Remove the task from local storage when deleted
            const tasksInLocalStorage = JSON.parse(localStorage.getItem('tasks')) || [];
            const index = tasksInLocalStorage.indexOf(taskText);
            if (index !== -1) {
                tasksInLocalStorage.splice(index, 1);
                localStorage.setItem('tasks', JSON.stringify(tasksInLocalStorage));
            }
        });

        return task_el;
    }
});