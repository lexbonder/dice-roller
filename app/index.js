import document from 'document';
import { me } from "appbit";
import * as diceBag from '../common/dice-models';

const tr = document.getElementById('btn-tr');
const br = document.getElementById('btn-br');
const diceTumbler = document.getElementById("diceTumbler");
const qtyTumbler = document.getElementById("qtyTumbler");

let chosenDie;
const diceToRoll = []; // [{die: diceBag[d6], qty: 3}, {die: diceBag[d8], qty: 2}]

diceTumbler.onclick = () => {
  const selectedIndex = diceTumbler.value;
  const selectedItem = diceTumbler.getElementById("item" + selectedIndex);
  const selectedDie = selectedItem.getElementById("content");
  qtyTumbler.style.visibility = 'visible';
  diceTumbler.style.visibility = 'hidden';
  chosenDie = selectedDie.text;
  console.log(chosenDie);
}

qtyTumbler.onclick = () => {
  const selectedIndex = qtyTumbler.value;
  const selectedItem = qtyTumbler.getElementById("item" + selectedIndex);
  const selectedQty = selectedItem.getElementById("content");
  // qtyTumbler.style.visibility = "visible";
  // diceTumbler.style.visibility = "hidden";
  diceToRoll.push({die: diceBag[chosenDie], qty: parseInt(selectedQty.text, 10)})
  console.log(diceToRoll[0].die, diceToRoll[0].qty)
};

// Either update this to reflect {die, qty} object or
// modify full array of dice to fit this format
const rollDice = dice => {
  dice.map(die => {
    die.roll = Math.floor(Math.random() * die.max) + 1
    return die
  })
  const total = dice.reduce((total, die) => total + die.roll, 0);
  return { total, roll: dice }
}

const coinFlip = () => {
  return Math.random() > .5 ? 'Heads' : 'Tails';
}

tr.onactivate = () => {
  console.log(rollDice([diceBag.d20]).total)
};

br.onactivate = () => {
  console.log(coinFlip());
};

// Back button flow

document.onkeypress = e => {
  e.preventDefault();
  if (e.key === 'back' && diceTumbler.style.visibility === 'visible') {
    me.exit()
  } else if (e.key === 'back' && qtyTumbler.style.visibility === 'visible') {
    diceTumbler.style.visibility = 'visible';
    qtyTumbler.style.visibility = 'hidden';
  }
}