import document from 'document';
import { me } from 'appbit';
import diceBag from '../common/diceBag';

const diceTumbler = document.getElementById('diceTumbler');
const qtyTumbler = document.getElementById('qtyTumbler');
const confirmScreen = document.getElementById('confirm');
const diceList = document.getElementById('dice-list');

const moreDiceBtn = document.getElementById('more-dice-btn');
const rollBtn = document.getElementById('roll-btn');

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
    `result: ${diceToRoll[diceToRoll.length - 1].name} ${
      diceToRoll[diceToRoll.length - 1].qty
    }`
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
  diceList.delegate = {
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

  diceList.length = diceToRoll.length;
};

/******************************
 ** Add Dice and Roll buttons **
 ******************************/

moreDiceBtn.onclick = backButton;

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

/*******************************
 ****** Physical Buttons *******
 ******************************/

document.onkeypress = e => {
  e.preventDefault();
  if (e.key === 'back') {
    backButton();
  } else if (e.key === 'up') {
    quickRollBtn();
  } else if (e.key === 'down') {
    coinFlipBtn();
  }
};

/*******************************
 ***** Quick Roll Buttons ******
 ******************************/

function quickRollBtn() {
  console.log(rollDice([{ name: 'd20', qty: 1 }]).total);
}

function coinFlipBtn() {
  console.log(coinFlip());
}

/*******************************
 ********* Back Button *********
 ******************************/

function backButton() {
  if (diceTumbler.style.display === 'inline') {
    me.exit();
  } else if (qtyTumbler.style.display === 'inline') {
    qtyTumbler.style.display = 'none';
    diceTumbler.style.display = 'inline';
  } else if (confirmScreen.style.display === 'inline') {
    confirmScreen.style.display = 'none';
    diceTumbler.style.display = 'inline';
  }
}
