const newToDo = document.getElementById("todo-new");
const addBtn = document.getElementById("addToDo");
const main = document.getElementById("toDoList");
const alertArea = document.getElementById("alert");
const quotesWrapper = document.getElementById("quotes");

let toDoList = [];
let oldToDoList = [];

let quotes = [
  "Dreams without goals are just dreams and ultimately they fuel dissapointment. On the road to achieving your dreams, you must apply discpline but more importantly commitment & consistency, because without commitment you’ll never start & without consistency you’ll never finish.",
  "You never grow in good times.",
  "Slow is smooth & smooth is fast.",
  "Stay hungry, stay foolish.",
  "Hang with clowns, expect a circus.",
  "if it doesn't hang from a tree, grow in the ground, or have a mother, don't eat it.",
  "be who you are and say what you feel, because those who mind don't matter and those who matter don't mind.",
  "Sometimes when you are in a dark place you think you've been buried, but actually you've been planted.",
  "The only way to do great work is to love what you do.",
  "The doorway to success swings inwards.",
  "The reasonable man adapts himself to the world. The unreasonable man persists in trying to adapt the world to himself. Therefore all progress depends on the unreasonable man.",
  "The devil can't read your thoughts, so keep your negative thoughts to yourself, or better yet, get rid of them before they manifest into words and actions.",
];

populateUI();
updateDOM();
getRandomPhoto();

quotesWrapper.innerHTML = getRandomValueFromArray(quotes);

// Populate to do list
function populateToDo() {
  let todo = newToDo.value.trim();
  oldToDoList = [...toDoList];

  // Store todos in object
  const toDoObject = {
    name: todo,
    status: true,
  };

  if (todo === null || todo === "") {
    alertArea.innerHTML = `<p class="alert">You must write something</p>`;
  } else {
    toDoList.push(toDoObject);
    updateLocalStorage();
    updateDOM();
  }
}

// Get data from local storage and populate UI
function populateUI() {
  const toDoListInStorage = JSON.parse(localStorage.getItem("ToDoList"));

  if (toDoListInStorage !== null && toDoListInStorage.length > 0)
    toDoList = [...toDoListInStorage];
}

//Update DOM
function updateDOM() {
  // Show the latest task
  toDoList.filter((item) => {
    if (!oldToDoList.includes(item)) {
      // Show task on the front
      let task = document.createElement("div");
      task.classList.add("task");
      task.innerHTML = `
                              <label><input type="checkbox" >${item.name}</label>
                              <span class="delete">x</span>
                              `;

      // Mark completed items
      if (!item.status) {
        task.querySelector("input").checked = true;
        task.classList.toggle("task-complete");
      }

      main.append(task);

      // Toggle items as done/ not done
      task.addEventListener("change", () => {
        // Update toDoObject
        item.status
          ? (item.status = false)
          : !item.status
          ? (item.status = true)
          : item.status;

        task.classList.toggle("task-complete");
        updateLocalStorage();
      });

      // Remove items from DOM and array
      task.querySelector(".delete").addEventListener("click", () => {
        let index = toDoList.indexOf(item);
        if (index > -1) {
          toDoList.splice(index, 1); // 2nd parameter means remove one item only
          updateLocalStorage();
          checkRowContent();
        }
        task.remove();
      });
    }
  });

  newToDo.value = "";
  alertArea.innerHTML = "";
}

//Update local Storage
function updateLocalStorage() {
  localStorage.setItem("ToDoList", JSON.stringify(toDoList));
}

// Get a random photo from unsplash
async function getRandomPhoto() {
  const response = await fetch(
    "https://api.unsplash.com/photos/random/?client_id=46W-inHpmr-R2SV169f_qUj42NSMFOGXbKNikPlSO8M"
  );
  const data = await response.json();
  console.log(data);
  let imageCredit = document.getElementById("unplash-credit");
  imageCredit.innerHTML = `
    <p>
       Photo by <a href="${data.user.links.html}" target="_Blank">${data.user.name}</a> randomly picked from <a href="https://unsplash.com"> Unsplash</a>  
    </p>
  `;
  const imageSource = data.urls.regular;

  document.body.style.backgroundImage = `url(${imageSource})`;
}

//Get random item from array
function getRandomValueFromArray(array) {
  return array[Math.floor(Math.random() * array.length)];
}

function checkRowContent() {
  const row = document.querySelector(".row");

  if (row.scrollHeight > row.offsetHeight) {
    row.classList.add("has-content");
  } else {
    row.classList.remove("has-content");
  }

  console.log(row.scrollHeight, row.clientHeight);
}

// Event listeners
addBtn.addEventListener("click", () => {
  populateToDo();
  checkRowContent();
});
newToDo.addEventListener("keydown", (e) => {
  if (e.code === "Enter") {
    e.preventDefault();
    populateToDo();
    checkRowContent();
  }
});
