import document from 'document';
import { me } from 'appbit';
import diceBag from '../common/diceBag';

const tr = document.getElementById('btn-tr');
const br = document.getElementById('btn-br');
const diceTumbler = document.getElementById('diceTumbler');
const qtyTumbler = document.getElementById('qtyTumbler');
const confirmScreen = document.getElementById('confirm');

// ////////
// let list = document.getElementById('my-list');
// let items = list.getElementsByClassName('tile-list-item');

// items.forEach((element, index) => {
//   let touch = element.getElementById('touch-me');
//   touch.onclick = evt => {
//     console.log(`touched: ${index}`);
//   };
// });

// ////////

let chosenDie;
const diceToRoll = []; // [{name: 'd6', qty: 3}, {name: 'd8', qty: 2}]

diceTumbler.onclick = () => {
  const selectedIndex = diceTumbler.value;
  const selectedItem = diceTumbler.getElementById('item' + selectedIndex);
  const selectedDie = selectedItem.getElementById('content');
  qtyTumbler.style.visibility = 'visible';
  diceTumbler.style.visibility = 'hidden';
  chosenDie = selectedDie.text;
  console.log('Chosen Die: ' + chosenDie);
};

qtyTumbler.onclick = () => {
  const selectedIndex = qtyTumbler.value;
  const selectedItem = qtyTumbler.getElementById('item' + selectedIndex);
  const selectedQty = selectedItem.getElementById('content');
  qtyTumbler.style.visibility = 'hidden';
  // confirmScreen.style.visibility = 'visible';
  diceToRoll.push({ name: chosenDie, qty: parseInt(selectedQty.text, 10) });
  console.log('result: ' + diceToRoll[0].name + ' ' + diceToRoll[0].qty);
};

const rollDice = dice => {
  return dice.reduce((result, die) => {
    let { qty, name } = die;

    for (let i = 0; i < qty; i++) {
      let roll = Math.floor((Math.random() * diceBag[name].max) + 1)
      result.total += roll;
      result.rolledDice.push({ name, roll })
    }
    return result;
  }, { total: 0, rolledDice: [] })
};

const coinFlip = () => {
  return Math.random() > 0.5 ? 'Heads' : 'Tails';
};

tr.onactivate = () => {
  console.log(rollDice([{ name: 'd20', qty: 1 }]).total);
};

br.onactivate = () => {
  console.log(coinFlip());
};

// Back button flow

document.onkeypress = e => {
  e.preventDefault();
  if (e.key === 'back' && diceTumbler.style.visibility === 'visible') {
    me.exit();
  } else if (e.key === 'back' && qtyTumbler.style.visibility === 'visible') {
    qtyTumbler.style.visibility = 'hidden';
    diceTumbler.style.visibility = 'visible';
  } else if (e.key === 'back' && confirmScreen.style.visibility === 'visible') {
    confirmScreen.style.visibility = 'hidden';
    qtyTumbler.style.visibility = 'visible';
  }
};
