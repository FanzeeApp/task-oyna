let input = document.getElementById("input");
let addBtn = document.getElementById("add-btn");
let taskOyna = document.querySelector(".tasks-section .task-list");
let chizilganOyna = document.querySelector(".done-section .task-list");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

// holatni yngilab borish ucun
function localArr() {
  taskOyna.innerHTML = "";
  chizilganOyna.innerHTML = "";

  tasks.forEach((task, index) => {
    let taskItem = document.createElement("div");
    taskItem.classList.add("task-item");
    if (task.completed) taskItem.classList.add("completed");

    let taskText = document.createElement("p");
    taskText.textContent = task.text;
    taskItem.appendChild(taskText);

    let actions = document.createElement("div");
    actions.classList.add("actions");

    let checkBtn = document.createElement("button");
    checkBtn.innerHTML = '<img src="./images/Check.svg" alt="Complete" />';
    checkBtn.onclick = () => javobFunk(index);
    actions.appendChild(checkBtn);

    let deleteBtn = document.createElement("button");
    deleteBtn.innerHTML = '<img src="./images/Vector (1).svg" alt="Delete" />';
    deleteBtn.onclick = () => deleteTask(index);
    actions.appendChild(deleteBtn);

    taskItem.appendChild(actions);

    if (task.completed) {
      chizilganOyna.appendChild(taskItem);
    } else {
      taskOyna.appendChild(taskItem);
    }
  });

  localSaqlovchi();
}

addBtn.addEventListener("click", () => {
  let taskText = input.value.trim();
  if (taskText) {
    tasks.push({ text: taskText, completed: false });
    input.value = "";
    localArr();
  }
});

//  bu task degi ptichka ni qoshilgan bolsa ayirish ayiligan bolsa qoshish uchun
function javobFunk(index) {
  tasks[index].completed = !tasks[index].completed;
  localArr();
}

// ochirib tashlash ucun funksiya
function deleteTask(index) {
  tasks.splice(index, 1);
  localArr();
}
// local storage ga saqlab borish uchun

function localSaqlovchi() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

localArr();
