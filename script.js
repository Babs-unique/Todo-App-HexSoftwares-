let toggleBtn = document.getElementById("toggleBtn");
let toggleMode = document.getElementById("toggleMode");

//LIGHT-MODE TOGGLE
toggleBtn.addEventListener("click",()=>{
    let body = document.querySelector("body");
    toggleMode.innerHTML = `<img src="./images/icon-sun.svg" alt="Light Mode Toggle" id="toggleMode">`
    body.classList.toggle("light-mode");
    if (body.className === "light-mode") {
            toggleMode.src= "./images/icon-moon.svg"
    }
    else{
        toggleMode.src= "./images/icon-sun.svg"
    }
});




//GET VALUE FROM THE INPUT BOX

let inputBox = document.getElementById("input");
let listContainer =  document.getElementById("todo-container");

//ADD TODO
function addTodo(event){
    if (event.key === "Enter") {
        if(inputBox.value === ""){
            alert("Enter Text...");
        }else{
        console.log(inputBox.value);
        let container = document.getElementById("todo-container");
        let listItems = document.createElement("li");
        listItems.className = "list_items";
        listItems.innerHTML = `<div class="chh">
                                <input type="checkbox" name="" id="checkbox" class="completed">
                            <span class="text">${inputBox.value}</span>
                            </div>
                            <div class="cr">
                                <img src="./images/icon-cross.svg" alt="Cancel todo" id="cancel-todo" class="cancel-btn">
                            </div>`
                container.appendChild(listItems);

            
            //DELETE TODO
            /*     let container = document.getElementById("todo-container"); */
            const cancelBtn = listItems.querySelector(".cancel-btn")
            cancelBtn.addEventListener('click',()=>{
                    listItems.remove();
                    saveTodosToLocal();
                    countedTodo();
            });
        //MARK COMPLETED TODO
        const completedTodo = listItems.querySelector(".completed");
        let spanElement = listItems.querySelector(".text");
        completedTodo.addEventListener('click',()=>{
            console.log("checked");
            spanElement.classList.toggle("line-through");
            saveTodosToLocal();
        });
        //INCREMENT AND COUNT TODO
        countedTodo();
        //REMOVE TEXT IN TE INPUT BOX AFTER CLICKING ENTER
        inputBox.value = "";
    }
    }
}
//EVENT LISTENER FOR OUR ADD TODO AND CALLING OF OUR FUNCTION
inputBox.addEventListener("keydown",addTodo);

//COUNT TODO
let todoCount = document.getElementById("countTodo");
function countedTodo(){
    let todoItem = document.querySelectorAll(".list_items");
    todoCount.innerHTML = `<p>${todoItem.length} items left</p>`;
}
function countedVisibleTodo() {
    let visibleTodos = Array.from(document.querySelectorAll(".list_items"))
        .filter(item => item.style.display !== "none");
    todoCount.innerHTML = `<p>${visibleTodos.length} items left</p>`;
}

//CLEAR ALL COMPLETED TODO
let clearCompleted = document.getElementById("clearComplete");
    clearCompleted.addEventListener('click',()=>{
    const completedTodos = document.querySelectorAll(".list_items");
    completedTodos.forEach((listItem)=>{
        let todoComplete = listItem.querySelector(".text")
        if (todoComplete.classList.contains("line-through")){
            listItem.remove();
        }
    })
    countedTodo();
});

//FILTER BETWEEN COMPLETED AND ACTIVE TODO'S
let allTodos = document.getElementById("allTodos");
let completedTodos = document.getElementById("completedTodos");
let activeTodos = document.getElementById("activeTodos");

allTodos.addEventListener('click',()=>{
    document.querySelectorAll(".list_items").forEach((item)=>{
        item.style.display = "flex";
    })
    countedVisibleTodo();
})
completedTodos.addEventListener('click',()=>{
    document.querySelectorAll(".list_items").forEach((item) =>{
        const text = item.querySelector(".text");
        if(text.classList.contains("line-through")){
            item.style.display = "flex";
        }else{
            item.style.display = "none";
        }
    })
    countedVisibleTodo();
})
activeTodos.addEventListener('click',()=>{
    document.querySelectorAll(".list_items").forEach((item) =>{
        const text = item.querySelector(".text");
        if(!text.classList.contains("line-through")){
            item.style.display = "flex";
        }else{
            item.style.display = "none";
        }
    })
    countedVisibleTodo();
})



//LOCALSTORAGE FOR THE TODO
// Save all todos to localStorage
function saveTodosToLocal() {
    const todos = [];
    document.querySelectorAll(".list_items").forEach(item => {
        const text = item.querySelector(".text").textContent;
        const checked = item.querySelector(".completed").checked;
        todos.push({ text, checked });
    });
    localStorage.setItem("todos", JSON.stringify(todos));
}

// Load todos from localStorage
function loadTodosFromLocal() {
    const todos = JSON.parse(localStorage.getItem("todos")) || [];
    const container = document.getElementById("todo-container");
    container.innerHTML = "";
    todos.forEach(todo => {
        let listItems = document.createElement("li");
        listItems.className = "list_items";
        listItems.innerHTML = `<div class="chh">
                                <input type="checkbox" class="completed" ${todo.checked ? "checked" : ""}>
                                <span class="text">${todo.text}</span>
                            </div>
                            <div class="cr">
                                <img src="./images/icon-cross.svg" alt="Cancel todo" class="cancel-btn">
                            </div>`;
        container.appendChild(listItems);

        // Delete todo
        listItems.querySelector(".cancel-btn").addEventListener('click', () => {
            listItems.remove();
            saveTodosToLocal();
            countedTodo();
        });

        // Mark completed
        const completedTodo = listItems.querySelector(".completed");
        let spanElement = listItems.querySelector(".text");
        if (todo.checked) {
            spanElement.classList.add("line-through");
        }
        completedTodo.addEventListener('click', () => {
            spanElement.classList.toggle("line-through");
            saveTodosToLocal();
        });
    });
    countedTodo();
}

// Call saveTodosToLocal after every change
document.addEventListener("DOMContentLoaded", loadTodosFromLocal);
document.getElementById("input").addEventListener("keydown", function(event) {
    if (event.key === "Enter" && inputBox.value !== "") {
        setTimeout(saveTodosToLocal, 0);
    }
});
document.getElementById("clearComplete").addEventListener("click", saveTodosToLocal);

