const newToDo = document.getElementById('todo-new')
const addBtn = document.getElementById('addToDo')
const main= document.getElementById('toDoList')
const taskDone = document.getElementsByClassName('task')
const alertArea = document.getElementById('alert')

let toDoList = []
let oldToDoList = []

populateUI()
updateDOM()

// Populate to do list
function populateToDo(){
  let todo = newToDo.value.trim()
  oldToDoList = [...toDoList]

  if(todo === null || todo === '' ){
    alertArea.innerHTML = `<p class="alert">You must write something</p>`
  } else {
    toDoList.push(todo) 
    // Add each task to localstorage
    localStorage.setItem('ToDoList', JSON.stringify(toDoList))

    populateUI()
    updateDOM()
  }

}

// Get data from local storage and populate UI
function populateUI(){
    const toDoListInStorage = JSON.parse(localStorage.getItem('ToDoList'))
    
    if(toDoListInStorage !== null && toDoListInStorage.length > 0)
       toDoList = [...toDoListInStorage]
    
}

//Update DOM
function updateDOM(){
    // Check if items already exist
    toDoList.forEach(item => {
        if(!oldToDoList.includes(item)){
            let task = document.createElement('div')
            task.classList.add('task')
            task.innerHTML = `<label><input type="checkbox" >${item}</label><br>`
            main.append(task)
    
            task.addEventListener('change', () => task.classList.toggle('task-complete'))
            }
    })

    newToDo.value = ''  
    alertArea.innerHTML = ''

}

// Event listeners
addBtn.addEventListener('click', populateToDo)
newToDo.addEventListener('keydown', (e) => {
    if(e.code === 'Enter'){
       e.preventDefault()
       populateToDo()
    }
})