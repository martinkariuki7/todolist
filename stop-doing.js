const newToDo = document.getElementById("todo-new");
const addBtn = document.getElementById("addToDo");
const main = document.getElementById("toDoList");
const alertArea = document.getElementById("alert");
const quotesWrapper = document.getElementById("quotes");

let stopDoingList = [];
let oldStopDoingList = [];

const quotes = [
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

quotesWrapper.textContent = getRandomValueFromArray(quotes);

function populateToDo() {
  const todo = newToDo.value.trim();
  oldStopDoingList = [...stopDoingList];

  if (!todo) {
    alertArea.innerHTML = `<p class="alert">You must write something</p>`;
    return;
  }

  stopDoingList.push({ name: todo, status: true });
  updateLocalStorage();
  updateDOM();
}

function populateUI() {
  const stopDoingListInStorage = JSON.parse(
    localStorage.getItem("StopDoingList")
  );
  if (
    Array.isArray(stopDoingListInStorage) &&
    stopDoingListInStorage.length > 0
  ) {
    stopDoingList = [...stopDoingListInStorage];
  }
}

function updateDOM() {
  main.innerHTML = "";

  stopDoingList.forEach((item) => {
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
      stopDoingList = stopDoingList.filter((t) => t !== item);
      updateLocalStorage();
      updateDOM();
    });
  });

  newToDo.value = "";
  alertArea.innerHTML = "";
}

function updateLocalStorage() {
  //localStorage.setItem("ToDoList", JSON.stringify(toDoList));
  localStorage.setItem("StopDoingList", JSON.stringify(stopDoingList));
}

console.log(localStorage.getItem("StopDoingList"));

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
