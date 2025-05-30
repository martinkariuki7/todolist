const newToDo = document.getElementById("todo-new");
const addBtn = document.getElementById("addToDo");
const main = document.getElementById("toDoList");
const alertArea = document.getElementById("alert");
const quotesWrapper = document.getElementById("quotes");

let toDoList = [];
let oldToDoList = [];
let stopDoingList = [{ name: "Being lazy", status: true }];

const quotes = [
  // (same quote array)
];

populateUI();
updateDOM();
getRandomPhoto();

quotesWrapper.textContent = getRandomValueFromArray(quotes);

function populateToDo() {
  const todo = newToDo.value.trim();
  oldToDoList = [...toDoList];

  if (!todo) {
    alertArea.innerHTML = `<p class="alert">You must write something</p>`;
    return;
  }

  toDoList.push({ name: todo, status: true });
  updateLocalStorage();
  updateDOM();
}

function populateUI() {
  const toDoListInStorage = JSON.parse(localStorage.getItem("ToDoList"));
  if (Array.isArray(toDoListInStorage) && toDoListInStorage.length > 0) {
    toDoList = [...toDoListInStorage];
  }
}

function updateDOM() {
  main.innerHTML = "";

  toDoList.forEach((item) => {
    const li = document.createElement("li");
    li.className = "task";

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = !item.status;
    checkbox.setAttribute(
      "aria-label",
      item.status
        ? `Mark task '${item.name}' as complete`
        : `Mark task '${item.name}' as incomplete`
    );

    const label = document.createElement("label");
    label.append(checkbox, ` ${item.name}`);

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "×";
    deleteBtn.className = "delete";
    deleteBtn.setAttribute("aria-label", `Delete task '${item.name}'`);

    li.append(label, deleteBtn);
    if (!item.status) li.classList.add("task-complete");
    main.appendChild(li);

    checkbox.addEventListener("change", () => {
      item.status = !item.status;
      updateLocalStorage();
      updateDOM();
    });

    deleteBtn.addEventListener("click", () => {
      toDoList = toDoList.filter((t) => t !== item);
      updateLocalStorage();
      updateDOM();
    });
  });

  newToDo.value = "";
  alertArea.innerHTML = "";
}

function updateLocalStorage() {
  localStorage.setItem("ToDoList", JSON.stringify(toDoList));
  localStorage.setItem("StopDoingList", JSON.stringify(stopDoingList));
}

async function getRandomPhoto() {
  try {
    const response = await fetch(
      "https://api.unsplash.com/photos/random/?client_id=46W-inHpmr-R2SV169f_qUj42NSMFOGXbKNikPlSO8M"
    );
    const data = await response.json();
    document.getElementById("unplash-credit").innerHTML = `
      <p>
        Photo by <a href="${data.user.links.html}" target="_blank">${data.user.name}</a> on 
        <a href="https://unsplash.com" target="_blank">Unsplash</a>
      </p>
    `;
    document.body.style.backgroundImage = `url(${data.urls.regular})`;
  } catch (error) {
    console.error("Failed to fetch image from Unsplash", error);
  }
}

function getRandomValueFromArray(array) {
  return array[Math.floor(Math.random() * array.length)];
}

addBtn.addEventListener("click", () => {
  populateToDo();
});
newToDo.addEventListener("keydown", (e) => {
  if (e.code === "Enter") {
    e.preventDefault();
    populateToDo();
  }
});
