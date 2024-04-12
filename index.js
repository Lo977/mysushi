document.addEventListener("DOMContentLoaded", () => {
  fetchData();
});
// Global Variables
const topDisplay = document.getElementById("topDisplay");

// Fetch Data
function fetchData() {
  fetch("http://localhost:3000/rolls")
    .then((resp) => resp.json())
    .then((rollsData) => {
      rollsData.forEach((roll) => renderRolls(roll));
    });
}
// Render Roll
function renderRolls(roll) {
  const topCard = document.createElement("ul");
  topCard.innerHTML = `
    <button id="deleteBtn" >&#10005</button>
    <img class="topImg" src="${roll.img_url}"/>
    <h5>${roll.name}</h5>
    `;
  topDisplay.appendChild(topCard);
}
