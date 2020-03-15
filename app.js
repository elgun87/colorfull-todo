let main_div = document.querySelector('.container');

let form = document.querySelector('#todo-form');

let todoInput = document.querySelector('#todo');

let todoList = document.querySelector('.list-group');

let firstCardBody = document.querySelectorAll('.card-body')[0];

let SecondCardBody = document.querySelectorAll('.card-body')[1];

let filter = document.querySelector('#filter');

let clearButton = document.querySelector('#clear-todos');



let colors = ['#B0BF1A','#F0F8FF','#7CB9E8','#B284BE','#EFDECD','#FFBF00','#F19CBB','#B0BF1A','#F0F8FF','#7CB9E8','#B284BE','#EFDECD','#FFBF00','#F19CBB','#B0BF1A','#F0F8FF','#7CB9E8','#B284BE','#EFDECD','#FFBF00','#F19CBB','#B0BF1A','#F0F8FF','#7CB9E8','#B284BE','#EFDECD','#FFBF00','#F19CBB'];

let index = -1;

function indexColors(){
    index ++;
    return index;
};

let countForAlert = 0;



///// TODO PROJECT OBJECT/////////
var todoProject = {

    todos: [],

    checkLocal: function(){
        let localStorage = window.localStorage.getItem('todos');
        
        if(localStorage !== null){
            this.todos = JSON.parse(localStorage);
            return this.todos;
        }
        else{
            return this.todos;
        }
    },

    addTodo: function(){
        let newArray = this.checkLocal();
        let todoInputValue = todoInput.value.trim();
        todoInput.value = '';
        newArray.push(todoInputValue)
        
        window.localStorage.setItem('todos',JSON.stringify(newArray));/// storing array to local storage

        return newArray; 
    },
    createList: function(arr){
        for(let i = 0;i < arr.length;i++){
            let list = document.createElement('li');
            list.className = "list-group-item d-flex justify-content-between";
            list.appendChild(document.createTextNode(arr[i]));
            list.style.backgroundColor = colors[i];
            let link = document.createElement('a');
            link.innerHTML = '<i class = "fa fa-remove"></i>';
            link.href = '#';
            link.className = 'delete-item';
            list.appendChild(link);
            todoList.appendChild(list);
        }
    },
    createElement: function(){
        let valueFromAddTodo = this.addTodo();
        todoList.innerHTML = '';
        this.createList(valueFromAddTodo);
        this.succesAlert();
    },
    checkInputValue: function(){
        if(todoInput.value === ''){
            this.alertEmptyTodo();
        }
        else{
            this.createElement();
        }
    },
    alertEmptyTodo: function(){
        countForAlert ++;
        if(countForAlert === 1){
            let div = document.createElement('div');
            div.className = 'alert alert-danger';
            div.setAttribute('role','alert');
            div.innerHTML = "Please enter a todo ...";
            let br = document.createElement('br');
            firstCardBody.appendChild(br);
            firstCardBody.appendChild(div);
            setTimeout( function(){
                div.remove();
                br.remove();
                countForAlert = 0;
            },1500);
        }
        else{
            return false;
        }
    },

    succesAlert: function(){
        let div = document.createElement('div');
        div.className = 'alert alert-success';
        div.setAttribute('role','alert');
        div.innerHTML = "Successly added a todo...";
        let br = document.createElement('br');
        firstCardBody.appendChild(br);
        firstCardBody.appendChild(div);
        setTimeout( function(){
            div.remove();
            br.remove();
        },1500);
    },

    displayIfLocalFull: function(){
        let localStorage = JSON.parse(window.localStorage.getItem('todos'));
        if(localStorage !== null){
            this.createList(localStorage);
        }
    },

    todoFilter: function(e){
        let filterValue = e.target.value.toLowerCase();
        let listItems = document.querySelectorAll('.list-group-item');
        listItems.forEach(function(items){
            let text = items.textContent.toLowerCase();
            if(text.indexOf(filterValue) === -1){
                items.setAttribute('style','display: none !important')
            }
        });
    },

    removeTodo: function(e){
        let localStorage = JSON.parse(window.localStorage.getItem('todos'));
        if(e.target.className === 'fa fa-remove'){
            let value = e.target.parentElement.parentElement.textContent;
            e.target.parentElement.parentElement.remove();
            localStorage.forEach(function(item,index){
                if(value === item){
                    localStorage.splice(index,1);
                };
            });
            window.localStorage.setItem('todos',JSON.stringify(localStorage));
        }
    },

    changeBackground: function(){
        let color = ['#5F4B8BFF','#5B84B1FF','#D6ED17FF','#2BAE66FF'];
        let body = document.querySelector('body');
        if(index === color.length-1){
            index = -1;
        }
        body.style.backgroundColor = color[indexColors()];
    }
};


// TODO PROJECT OBJECT ENDS HERE ////////
$(document).ready(function(){
    todoProject.displayIfLocalFull();
});

$('#add-todo').on('click', function(e){
    todoProject.checkInputValue();
    e.preventDefault();
})

SecondCardBody.addEventListener('click', function(e){
    todoProject.removeTodo(e);
});

SecondCardBody.addEventListener("keyup", function(e){
    todoProject.todoFilter(e);
});

$('#change-color').on('click', function(){
    todoProject.changeBackground();
});

clearButton.addEventListener('click', function(){
    window.localStorage.clear();
    location.reload(true);
});

$('#reload').on('click', function(){
    location.reload(true);
});