import document from "document";
console.log("Hello world!");

const clicker = document.getElementById("clickMe");
const changer = document.getElementById("changeable");

clicker.onclick = () => {
  clicker.style.fill = "green";
  console.log("words!!");
};
let flip = true;
changer.onclick = () => {
  flip ? (changer.text = "Hello") : (changer.text = "World");
  flip = !flip;
};
