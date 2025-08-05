let tasksList = [
    { taskName: 'Go for a Walk', taskStatus: true, taskDate: '10:37:47AM, 17/04/2024' },
    { taskName: 'Read a Book', taskStatus: true, taskDate: '10:37:47AM, 17/04/2024' },
    { taskName: 'Try a New Recipe', taskStatus: false, taskDate: '10:37:47AM, 17/04/2024' },
    { taskName: 'Practice Meditation or Mindfulness', taskStatus: false, taskDate: '10:37:47AM, 17/04/2024' }
];

let showTasks = (customList = tasksList) => {
    let tasksContainer = document.querySelector('.taskHolder');
    tasksContainer.innerHTML = '';
    customList.forEach((el, index) => {
        tasksContainer.innerHTML += `
                        <div class="taskAdded">
                            <div class="checkDiv d-flex align-items-center justify-content-between p-2 position-relative">
                                <label class="taskNameHolder d-flex flex-column" for="el-${index}">
                                    <p class="taskName">${el.taskName}</p>
                                    <p class="taskTime">${el.taskDate}</p>
                                </label>
                                <div class="checkboxWrapper">
                                    <input class="chkBox" type="checkbox" id="el-${index}" ${el.taskStatus ? 'checked' : ''}/>
                                    <span class="checkmark"></span>
                                </div>
                            </div>
                        </div>
                    `;
    });
    let allCheckboxes = document.querySelectorAll('.chkBox');
    allCheckboxes.forEach(chk => {
        chk.addEventListener('change', (e) => {
            let i = e.target.getAttribute('data-index');
            let taskName = e.target.closest('.checkDiv').querySelector('.taskName').innerText;

            let foundIndex = tasksList.findIndex(t => t.taskName === taskName);
            if (foundIndex !== -1) {
                tasksList[foundIndex].taskStatus = e.target.checked;
            }
        });
    })
    document.querySelector(`.ShowCompleteBtn`).classList.remove('activebtn');
    document.querySelector(`.showToDoBtn`).classList.remove('activebtn');
    document.querySelector(`.showAllBtn`).classList.add('activebtn');

    document.querySelector('.addtaskDiv h1').innerText = 'All';

    document.querySelector(`.showAllSmallScreen`).classList.add("activeStatus")
    document.querySelector(`.showToDoSmallScreen`).classList.remove("activeStatus")
    document.querySelector(`.showCompletedSmallScreen`).classList.remove("activeStatus")



}

showTasks();

let addNewTask = () => {
    let taskInput = document.getElementById('newTaskName');
    let NewtaskName = taskInput.value;

    if (NewtaskName !== '') {
        let newObj = { taskName: NewtaskName, taskStatus: false, taskDate: '10:37:47AM, 17/04/2024' };
        tasksList.push(newObj);
        showTasks();

        taskInput.value = '';
        let modalElement = document.getElementById('NewTaskModal');
        let modal = bootstrap.Modal.getInstance(modalElement);
        modal.hide();
    } else {
        alert('Please enter a task name');
    }
}

let showCompleteTasks = () => {

    let result = tasksList.filter((el, index) => {
        if (el.taskStatus === true) {
            return true;
        } else {
            return false;
        }
    });
    showTasks(result);
    document.querySelector(`.showAllBtn`).classList.remove('activebtn');
    document.querySelector(`.showToDoBtn`).classList.remove('activebtn');
    document.querySelector(`.ShowCompleteBtn`).classList.add('activebtn');

    document.querySelector('.addtaskDiv h1').innerText = 'Completed';

    document.querySelector(`.showAllSmallScreen`).classList.remove("activeStatus")
    document.querySelector(`.showToDoSmallScreen`).classList.remove("activeStatus")
    document.querySelector(`.showCompletedSmallScreen`).classList.add("activeStatus")

}


let showToDoTasks = () => {
    let result = tasksList.filter((el, index) => {
        if (el.taskStatus === false) {
            return true;
        } else {
            return false;
        }
    });
    showTasks(result);
    showTasks(result);
    document.querySelector(`.showAllBtn`).classList.remove('activebtn');
    document.querySelector(`.ShowCompleteBtn`).classList.remove('activebtn');
    document.querySelector(`.showToDoBtn`).classList.add('activebtn');

    document.querySelector('.addtaskDiv h1').innerText = 'To Do';

    document.querySelector(`.showAllSmallScreen`).classList.remove("activeStatus")
    document.querySelector(`.showToDoSmallScreen`).classList.add("activeStatus")
    document.querySelector(`.showCompletedSmallScreen`).classList.remove("activeStatus")
}

