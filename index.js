document.addEventListener("DOMContentLoaded", () => {
  fetchData();
});

// Global Variables

const topDisplay = document.getElementById("topDisplay");
const mainDisplay = document.getElementById("mainDisplay");
const input = document.getElementById("input");
const listDisplay = document.getElementById("listDisplay");
const resetBtn = document.getElementById("resetBtn");

let datas;
// console.log(datas);
// Fetch Data
function fetchData() {
  fetch("http://localhost:3000/rolls")
    .then((resp) => resp.json())
    .then((rollsData) => {
      datas = rollsData;
      rollsData.forEach((roll) => renderRolls(roll));
    });
}
// Render Roll on Top Display
function renderRolls(roll) {
  const topCard = document.createElement("ul");
  topCard.innerHTML = `
    <img class="topImg" src="${roll.img_url}"/>
    <h5>${roll.name}</h5>
    `;
  topDisplay.appendChild(topCard);
  const topImg = topCard.querySelector(".topImg");
  topImg.addEventListener("click", () => {
    mainDisplay.innerHTML = "";
    renderMainDisplay(roll);
  });
}
// Render Roll On Main Display
function renderMainDisplay(roll) {
  const mainCard = document.createElement("ul");
  mainCard.innerHTML = `
  <div id="create">
  <form id="create-form">
  <input type="text" id="name" placeholder="name here.."/>
  <input type="text" id="image" placeholder="img_url">
  <input type="text" id="description" placeholder="description">
  <input type="submit" id="submitBtn"/>
</form>
  </div>

    <img class="topImg" src="${roll.img_url}"/>
    <h4>${roll.name}</h4>
    <p><h5>description:</h5> ${roll.description}</p>
    <button id="createBtn">Create</button>
    <button id="likeBtn">Likes:&#x1F44D </button> <h3 id="likes">${roll.likes}</h3>
    
    `;
  mainDisplay.appendChild(mainCard);
  // Like Even Listener
  const likeBtn = mainCard.querySelector("#likeBtn");
  likeBtn.addEventListener("click", () => {
    mainCard.querySelector("#likes").textContent++;
  });
  //   Create Card
  const createDiv = mainCard.querySelector("#create");
  createDiv.style.display = "none";
  const createBtn = mainCard.querySelector("#createBtn");
  createBtn.addEventListener("click", () => {
    createDiv.style.display = "";
    createBtn.style.display = "none";
  });
  //   Handle Submit
  const form = mainCard.querySelector("#create-form");
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    createDiv.style.display = "none";
    createBtn.style.display = "";
    const rollObj = {
      name: e.target.name.value,
      img_url: e.target.image.value,
      description: e.target.description.value,
      likes: 0,
    };
    handleCreate(rollObj);
  });
}
// Search Input
resetBtn.style.display = "none";
input.addEventListener("keypress", (e) => {
  mainDisplay.innerHTML = "";
  topDisplay.innerHTML = "";
  listDisplay.innerHTML = "";
  resetBtn.style.display = "";
  const inputValue = e.target.value.toLowerCase();
  const filterData = datas.filter((data) => {
    if (e.key === "Enter") return data.name.toLowerCase().includes(inputValue);
  });
  handleSearchValue(filterData);
});

// Handle Search Values Function
function handleSearchValue(yummyRolls) {
  yummyRolls.forEach((roll) => {
    const listCard = document.createElement("ul");
    listCard.innerHTML = `
        <img class="topImg" src="${roll.img_url}"/>
        <h5>${roll.name}</h5>
        `;
    listDisplay.appendChild(listCard);
    listCard.querySelector("img").addEventListener("click", () => {
      listDisplay.innerHTML = "";
      mainDisplay.innerHTML = "";
      renderMainDisplay(roll);
    });
  });
}
// Reset Page
resetBtn.addEventListener("click", () => {
  listDisplay.innerHTML = "";
  mainDisplay.innerHTML = "";
  fetchData();
  resetBtn.style.display = "none";
});
// Handle Create
function handleCreate(rollObj) {
  fetch(`http://localhost:3000/rolls`, {
    method: "POST",
    headers: {
      "Content-Type": "application.json",
    },
    body: JSON.stringify(rollObj),
  })
    .then((res) => res.json())
    .then((data) => console.log(data));
}
