const addBtn = document.getElementById("addBtn");
const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");
const themeBtn = document.getElementById("themeBtn");
const priority = document.getElementById("priority");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function saveTasks(){
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function updateStats(){

    const total = tasks.length;

    const completed =
    tasks.filter(task => task.completed).length;

    document.getElementById("taskCount").textContent =
    `Total Tasks: ${total}`;

    document.getElementById("completedCount").textContent =
    `Completed: ${completed}`;
}

function renderTasks(){

    taskList.innerHTML = "";

    tasks.forEach((task,index)=>{

        const li = document.createElement("li");

        const header = document.createElement("div");
        header.classList.add("task-header");

        const span = document.createElement("span");
        span.classList.add("task-text");
        span.textContent =
        `${task.text} (${task.priority})`;

        if(task.completed){
            span.classList.add("completed");
        }

        span.addEventListener("click",()=>{

            tasks[index].completed =
            !tasks[index].completed;

            saveTasks();
            renderTasks();
        });

        const deleteBtn =
        document.createElement("button");

        deleteBtn.textContent = "Delete";
        deleteBtn.classList.add("delete-btn");

        deleteBtn.addEventListener("click",()=>{

            tasks.splice(index,1);

            saveTasks();
            renderTasks();
        });

        header.appendChild(span);
        header.appendChild(deleteBtn);

        const date =
        document.createElement("small");

        date.classList.add("task-date");
        date.textContent = task.date;

        li.appendChild(header);
        li.appendChild(date);

        taskList.appendChild(li);
    });

    updateStats();
}

function addTask(){

    const taskText =
    taskInput.value.trim();

    if(taskText === ""){
        alert("Please enter a task");
        return;
    }

    tasks.push({
        text: taskText,
        priority: priority.value,
        completed:false,
        date:new Date().toLocaleString()
    });

    saveTasks();
    renderTasks();

    taskInput.value="";
}

addBtn.addEventListener("click",addTask);

taskInput.addEventListener("keypress",(e)=>{

    if(e.key==="Enter"){
        addTask();
    }

});

document
.getElementById("clearAll")
.addEventListener("click",()=>{

    if(confirm("Delete all tasks?")){

        tasks=[];

        saveTasks();
        renderTasks();
    }

});

themeBtn.addEventListener("click",()=>{

    document.body.classList.toggle("dark");

});

renderTasks();
