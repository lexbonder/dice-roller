import document from 'document';
import {d20} from '../common/dice-models';

const tr = document.getElementById('btn-tr');
const br = document.getElementById("btn-br");
const tumbler = document.getElementById("tumbler");

tumbler.onclick = () => {
  const selectedIndex = tumbler.value;
  const selectedItem = tumbler.getElementById("item" + selectedIndex);
  const selectedDie = selectedItem.getElementById("content");
  console.log(selectedDie.text)
}

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
  console.log(rollDice([d20]).total)
};

br.onactivate = () => {
  console.log(coinFlip());
};