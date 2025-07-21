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
        let listItems = document.createElement("div");
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
                deleteLocalTodo();
                countedTodo();
        });
        //MARK COMPLETED TODO
        const completedTodo = listItems.querySelector(".completed");
        let spanElement = listItems.querySelector(".text");
        completedTodo.addEventListener('click',()=>{
            console.log("checked");
            spanElement.classList.toggle("line-through");
        });
        //INCREMENT AND COUNT TODO
        countedTodo();

        saveLocalTodo(inputBox.value);

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
    countedTodo();
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
    countedTodo();
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
    countedTodo();
})



//LOCALSTORAGE FOR THE TODO

//SAVE TODO TO LOCALSTORAGE
const saveLocalTodo = (todo)=>{
    let todos;
    if (localStorage.getItem("todos")=== "null") {
        todos =[];
    }else{
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    console.log(localStorage.getItem("todos"))
    console.log(JSON.parse(localStorage.getItem("todos")))
    /* todos = JSON.parse(localStorage.getItem("todos")); */
    todos.push(todo);
    localStorage.setItem("todos",JSON.stringify(todos));
    console.log(todos);
}

//GET TODO FROM LOCALSTORAGE
const getLocalTodo = ()=>{
    let todos;
    if (localStorage.getItem("todos")=== "null") {
        todos =[];
    }else{
        todos = JSON.parse(localStorage.getItem("todos"));
        todos.forEach(todo=>{
        let container = document.getElementById("todo-container");
        let listItems = document.createElement("div");
        listItems.className = "list_items";
        listItems.innerHTML = `<div class="chh">
                                <input type="checkbox" name="" id="checkbox" class="completed">
                            <span class="text">${todo}</span>
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
                countedTodo();
        });
        //MARK COMPLETED TODO
        const completedTodo = listItems.querySelector(".completed");
        let spanElement = listItems.querySelector(".text");
        completedTodo.addEventListener('click',()=>{
            console.log("checked");
            spanElement.classList.toggle("line-through");
        });
        countedTodo();

        });
    }};
//DELETE TODO FROM LOCALSTORAGE
const deleteLocalTodo = (todo)=>{
    let todos;
    if (localStorage.getItem("todos")=== "null") {
        todos =[];
    }else{
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    let todoText = todo.children[0];
    let todoIndex = todos.indexOf(todoText);
    todos.splice(todoIndex,1);
    localStorage.setItem('todos',JSON.stringify(todos))
    console.log(todoText);


}
document.addEventListener('DOMContentLoaded' ,getLocalTodo);
