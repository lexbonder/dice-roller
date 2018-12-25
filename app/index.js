import document from 'document';
import { me } from 'appbit';
import diceBag from '../common/diceBag';

const diceTumbler = document.getElementById('diceTumbler');
const qtyTumbler = document.getElementById('qtyTumbler');
const confirmScreen = document.getElementById('confirm');
const resultsScreen = document.getElementById('results');
const coinFlipScreen = document.getElementById('coin-flip');

const diceList = document.getElementById('dice-list');
const diceBreakdown = document.getElementById('dice-breakdown');

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
  const selectedDie = selectedItem.getElementById('content' + selectedIndex);
  chosenDie = selectedDie.text;
  qtyTumbler.style.display = 'inline';
  diceTumbler.style.display = 'none';
};

/******************************
 ********* Select Qty **********
 ******************************/

qtyTumbler.onclick = () => {
  const selectedIndex = qtyTumbler.value;
  const selectedItem = qtyTumbler.getElementById('item' + selectedIndex);
  const selectedQty = selectedItem.getElementById('content' + selectedIndex);
  diceToRoll.push({ name: chosenDie, qty: parseInt(selectedQty.text, 10) });
  qtyTumbler.style.display = 'none';
  confirmScreen.style.display = 'inline';
  renderConfirmList();
};

/******************************
 ***** Confirmation Screen *****
 ******************************/

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
        // let touch = tile.getElementById('touch-me');
        // touch.onclick = evt => {
        //   console.log(`touched: ${info.index}`);
        // };
      }
    },
  };

  diceList.length = diceToRoll.length;
};

/******************************
 ******* Results Screen ********
 ******************************/

const renderResults = results => {
  qtyTumbler.style.display = 'none';
  confirmScreen.style.display = 'none';
  diceTumbler.style.display = 'none';
  coinFlipScreen.style.display = 'none';
  resultsScreen.style.display = 'inline';
  const rollTotal = resultsScreen.getElementById('roll-total');
  rollTotal.text = results.total;
  renderBreakdown(results.rolledDice);
  diceToRoll.length = 0;
};

const renderBreakdown = dice => {
  diceBreakdown.delegate = {
    getTileInfo: function(index) {
      return {
        type: 'my-pool',
        value: `${dice[index].name} = ${dice[index].roll}`,
        index,
      };
    },
    configureTile: function(tile, info) {
      if (info.type == 'my-pool') {
        tile.getElementById('text').text = info.value;
        // let touch = tile.getElementById('touch-me');
        // touch.onclick = evt => {
        //   console.log(`touched: ${info.index}`);
        // };
      }
    },
  };

  diceBreakdown.length = dice.length;
};

/******************************
 ***** Dice Roll Function ******
 ******************************/

const rollDice = dice => {
  const results = dice.reduce(
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
  renderResults(results);
};

/******************************
 ***** Coin Flip Function ******
 ******************************/

const renderCoinFlip = () => {
  qtyTumbler.style.display = 'none';
  confirmScreen.style.display = 'none';
  diceTumbler.style.display = 'none';
  resultsScreen.style.display = 'none';
  coinFlipScreen.style.display = 'inline';
};

const coinFlip = () => {
  const flip = Math.random() > 0.5 ? 'Heads' : 'Tails';
  const flipResult = coinFlipScreen.getElementById('coin-flip-result');
  flipResult.text = flip;
  renderCoinFlip();
};

/******************************
 ** Add Dice and Roll buttons **
 ******************************/

moreDiceBtn.onclick = backButton;

rollBtn.onclick = () => {
  rollDice(diceToRoll);
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
  rollDice([{ name: 'd20', qty: 1 }]);
}

function coinFlipBtn() {
  coinFlip();
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
  } else if (resultsScreen.style.display === 'inline') {
    resultsScreen.style.display = 'none';
    diceTumbler.style.display = 'inline';
  } else if (coinFlipScreen.style.display === 'inline') {
    coinFlipScreen.style.display = 'none';
    diceTumbler.style.display = 'inline';
  }
}
