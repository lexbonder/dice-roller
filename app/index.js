import document from 'document';
import { me } from 'appbit';
import diceBag from '../common/diceBag';

const tr = document.getElementById('btn-tr');
const br = document.getElementById('btn-br');
const diceTumbler = document.getElementById('diceTumbler');
const qtyTumbler = document.getElementById('qtyTumbler');
const confirmScreen = document.getElementById('confirm');

let chosenDie;
const diceToRoll = []; // [{name: 'd6', qty: 3}, {name: 'd8', qty: 2}]

/******************************
 ********* Select Die **********
 ******************************/

diceTumbler.onclick = () => {
  const selectedIndex = diceTumbler.value;
  const selectedItem = diceTumbler.getElementById('item' + selectedIndex);
  const selectedDie = selectedItem.getElementById('content');
  qtyTumbler.style.display = 'inline';
  diceTumbler.style.display = 'none';
  chosenDie = selectedDie.text;
  console.log('Chosen Die: ' + chosenDie);
};

/******************************
 ********* Select Qty **********
 ******************************/

qtyTumbler.onclick = () => {
  const selectedIndex = qtyTumbler.value;
  const selectedItem = qtyTumbler.getElementById('item' + selectedIndex);
  const selectedQty = selectedItem.getElementById('content');
  qtyTumbler.style.display = 'none';
  confirmScreen.style.display = 'inline';
  diceToRoll.push({ name: chosenDie, qty: parseInt(selectedQty.text, 10) });
  renderConfirmList();
  console.log(
    'result: ' +
      diceToRoll[diceToRoll.length - 1].name +
      ' ' +
      diceToRoll[diceToRoll.length - 1].qty
  );
};

/******************************
 ***** Confirmation Screen *****
 ******************************/

// const mockDice = [
//   { name: 'd6', qty: 1 },
//   { name: 'd8', qty: 2 },
//   { name: 'd6', qty: 3 },
//   { name: 'd8', qty: 4 },
//   { name: 'd6', qty: 5 },
//   { name: 'd8', qty: 6 },
// ];
const renderConfirmList = () => {
  confirmScreen.delegate = {
    getTileInfo: function(index) {
      return {
        type: 'my-pool',
        value: `${diceToRoll[index].name} x ${diceToRoll[index].qty}`,
        index,
      };
    },
    configureTile: function(tile, info) {
      if (info.type == 'my-pool') {
        tile.getElementById('text').text = info.value;
        let touch = tile.getElementById('touch-me');
        touch.onclick = evt => {
          console.log(`touched: ${info.index}`);
        };
      }
    },
  };
  
  confirmScreen.length = diceToRoll.length;
}

/******************************
 ***** Dice Roll Function ******
 ******************************/

const rollDice = dice => {
  return dice.reduce(
    (result, die) => {
      let { qty, name } = die;

      for (let i = 0; i < qty; i++) {
        let roll = Math.floor(Math.random() * diceBag[name].max + 1);
        result.total += roll;
        result.rolledDice.push({ name, roll });
      }
      return result;
    },
    { total: 0, rolledDice: [] }
  );
};

/******************************
 ***** Coin Flip Function ******
 ******************************/

const coinFlip = () => {
  return Math.random() > 0.5 ? 'Heads' : 'Tails';
};

/******************************
 ***** Quick Roll Buttons ******
 ******************************/

tr.onactivate = () => {
  console.log(rollDice([{ name: 'd20', qty: 1 }]).total);
};

br.onactivate = () => {
  console.log(coinFlip());
};

/******************************
 ********* Back Button *********
 ******************************/

document.onkeypress = e => {
  e.preventDefault();
  if (e.key === 'back' && diceTumbler.style.display === 'inline') {
    me.exit();
  } else if (e.key === 'back' && qtyTumbler.style.display === 'inline') {
    qtyTumbler.style.display = 'none';
    diceTumbler.style.display = 'inline';
  } else if (e.key === 'back' && confirmScreen.style.display === 'inline') {
    confirmScreen.style.display = 'none';
    qtyTumbler.style.display = 'inline';
    confirmScreen.length = 0;
  }
};
