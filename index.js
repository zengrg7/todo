///SELECTORS
var todoInput = document.querySelector(".todo-input");
var todoButton = document.querySelector(".todo-button");
var todoList = document.querySelector(".todo-list");
var completeButton,trashButton,todoDiv;
var filterList = document.querySelector(".filter");

///EVENT LISTENER
document.addEventListener("DOMContentLoaded",gettodos);
todoButton.addEventListener("click",addTodo);
todoList.addEventListener("click",todoButtonAction);
filterList.addEventListener("change",filter);


function addTodo(event){
    ///PREVENTING DEFAULT
    event.preventDefault();

    ///CREATING TODO-DIV
    todoDiv = document.createElement("div");
    todoDiv.classList.add("todo-div");
    var todoLi = document.createElement("li");
    todoLi.innerText = todoInput.value;
    todoDiv.classList.add("todo-list");
    todoDiv.appendChild(todoLi);

    ///COMPLETED BUTTON
    completeButton = document.createElement("button");
    completeButton.classList.add("complete-button");
    completeButton.innerHTML = '<i class="fas fa-check"></i>';
    todoDiv.appendChild(completeButton);

    ///TRASH BUTTON
    trashButton = document.createElement("button");
    trashButton.classList.add("trash-button");
    trashButton.innerHTML = '<i class="fas fa-trash"></i>';
    todoDiv.appendChild(trashButton);

    ///ADDING TODO-DIV TO LIST 
    todoList.appendChild(todoDiv);

    ///VALIDATING THE PASSED VALUE
    if (todoInput.value==""){
        todoList.removeChild(todoList.lastElementChild);
    }
    else{
        ///ADD TODOS TO LOCAL STORAGE
        saveLocalTodo(todoInput.value);
    }

    ///CLEAR INPUT VALUE
    todoInput.value='';
}

///FUNCTION TO MARK AS COMPLETED AND DELETED TODO LIST
function todoButtonAction(e){
    const item = e.target;
    if (item.classList[0] ==="trash-button")
    {
        const buttonAction =  item.parentElement;
        buttonAction.classList.add("fall");
        removeLocalTodo(item.parentElement.firstChild.innerText);
        buttonAction.addEventListener("transitionend",function(){
        buttonAction.remove();
        })
    }
    if (item.classList[0] ==="complete-button")
    {
        const buttonAction =  item.parentElement;
        buttonAction.classList.toggle("completed");
    }
}

///FUNCTION TO FILTER THE LIST
function filter(e){
    const todos = todoList.childNodes;
    todos.forEach(function(todoDiv){
        switch(e.target.value){
            case "all":
                todoDiv.style.display = "flex";
                break;
            
            case "completed":
                if(todoDiv.classList.contains("completed")){
                    todoDiv.style.display = "flex";
                }
                else{
                    todoDiv.style.display = "none";
                }
                break;
            
            case "uncompleted":
                if(todoDiv.classList.contains("completed")){
                    todoDiv.style.display = "none";
                }
                else{
                    todoDiv.style.display = "flex";
                }
                break;
        }

    })
}

function saveLocalTodo(todo){
    let todos=[];
    if(localStorage.getItem("todos")===null){
        todos = [];
    }
    else{
        let todosObj = JSON.parse(localStorage.getItem("todos"));
        todos = Object.values(todosObj);
    }

    todos.push(todo);
    localStorage.setItem("todos",JSON.stringify(todos));
}

function gettodos(todo){
    let todos=[];
    if(localStorage.getItem("todos")===null){
        todos = [];
    }
    else{
        let todosObj = JSON.parse(localStorage.getItem("todos"));
        todos = Object.values(todosObj);
    }
    todos.forEach(function(todo){
        ///CREATING TODO-DIV
        todoDiv = document.createElement("div");
        todoDiv.classList.add("todo-div");
        var todoLi = document.createElement("li");
        todoLi.innerText = todo;
        todoDiv.classList.add("todo-list");
        todoDiv.appendChild(todoLi);
    
        ///COMPLETED BUTTON
        completeButton = document.createElement("button");
        completeButton.classList.add("complete-button");
        completeButton.innerHTML = '<i class="fas fa-check"></i>';
        todoDiv.appendChild(completeButton);
    
        ///TRASH BUTTON
        trashButton = document.createElement("button");
        trashButton.classList.add("trash-button");
        trashButton.innerHTML = '<i class="fas fa-trash"></i>';
        todoDiv.appendChild(trashButton);
    
        ///ADDING TODO-DIV TO LIST 
        todoList.appendChild(todoDiv);
    
        ///CLEAR INPUT VALUE
        todoInput.value='';
        })
}

function removeLocalTodo(todo){
    let todos=[];
    if(localStorage.getItem("todos")===null){
        todos = [];
    }
    else{
        let todosObj = JSON.parse(localStorage.getItem("todos"));
        todos = Object.values(todosObj);
    }
    todos.splice(todos.indexOf(todo),1);
    localStorage.setItem("todos",JSON.stringify(todos));
}