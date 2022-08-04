const newToDo = document.getElementById('todo-new')
const addBtn = document.getElementById('addToDo')
const main= document.getElementById('toDoList')
const alertArea = document.getElementById('alert')

let toDoList = []
let oldToDoList = []

populateUI()
updateDOM()

// Populate to do list
function populateToDo(){
  let todo = newToDo.value.trim()
  oldToDoList = [...toDoList]

  // Store todos in object
  const toDoObject = {
    name: todo,
    status: true
  }

  if(todo === null || todo === '' ){
    alertArea.innerHTML = `<p class="alert">You must write something</p>`
  } else {
    toDoList.push(toDoObject) 
    localStorage.setItem('ToDoList', JSON.stringify(toDoList))
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

    // Show the latest task
    toDoList.filter(item => {
        if(!oldToDoList.includes(item)){ 
          
            // Show task on the front
            let task = document.createElement('div')
            task.classList.add('task')
            task.innerHTML = `<label><input type="checkbox" >${item.name}</label><br>`
            
            // Mark completed items
            if(!item.status){
                task.querySelector('input').checked = true
                task.classList.toggle('task-complete')
            }

            main.append(task)
            
            // Toggle items as done/ not done
            task.addEventListener('change', () => {
                // Update toDoObject
                item.status ? item.status = false
                : !item.status ? item.status = true 
                : item.status              

                task.classList.toggle('task-complete')
                localStorage.setItem('ToDoList', JSON.stringify(toDoList))
                
            })

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