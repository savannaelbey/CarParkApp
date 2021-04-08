import React, { useState, useEffect } from 'react';

function App() {
  const [timeIn, setTimeIn] = useState('');
  const [timeOut, setTimeOut] = useState('');
  const [paymentIn, setPaymentIn] = useState('');
  const [outputCost, setOutputCost] = useState(0);
  const [paymentArray, setPaymentArray] = useState([]);
  const [changeArr, setChangeArr] = useState([]);
  const [outputChange, setOutputChange] = useState('');

  useEffect(() => {
    calculateCost();
  });

  console.log('in: ' + timeIn)
  console.log('out: ' + timeOut)
  console.log('payment: ' + paymentIn)
  console.log('outputCost: ' + outputCost )
  console.log('paymentArray: ' + paymentArray)
  console.log('changeArr: ' + changeArr)
  console.log('outputChange: ' + outputChange)

  function calculateCost() {
    let timeInArr = timeIn.split(':');
    let timeOutArr = timeOut.split(':');
    let numOfMinsAtEntry = Number((timeInArr[0] * 60)) + Number(timeInArr[1])
    let numOfMinsAtExit = Number((timeOutArr[0] * 60)) + Number(timeOutArr[1])
    //if exit time is the following day, add 24 hours to timeout
    if (Number(timeInArr[0]) <= Number(timeOutArr[0])) {
      let numOfMinsInCarPark = numOfMinsAtExit - numOfMinsAtEntry;
      if(numOfMinsInCarPark > 60) {
        setOutputCost(3 + (numOfMinsInCarPark - 60) / 100);
      } else if (numOfMinsInCarPark <= 60) {
        setOutputCost(3);
      }
    } else {
      let numOfMinsInCarPark = (numOfMinsAtExit + (24 * 60)) - numOfMinsAtEntry;
      setOutputCost(3 + ((numOfMinsInCarPark - 60) / 100));
    }
  }

  function processPaymentInput() {
    let inputArray = paymentIn.split(', ');
    let processedInputArray = [];
    for (let element of inputArray) {
      if (element[0] === '£') {
        processedInputArray.push(Number(element.slice(1)));
      } else {
        processedInputArray.push(element.match(/\d+/g) / 100);
      }
    }
    setPaymentArray(processedInputArray);
  }

  function calculateMinChange() {
    //calculate sum of payment in
    let paymentSum = paymentArray.reduce((a, b) => a + b, 0);
    let change = (paymentSum - outputCost).toFixed(2)
    let coins = [0.01, 0.02, 0.05, 0.10, 0.20, 0.50, 1, 5, 10, 20]
    let descCoins = coins.sort((a,b) => b-a);
    let changeArray = []
    for (let i = 0; i < descCoins.length; i++) {
      while (descCoins[i] <= change ) {
        changeArray.push(descCoins[i]);
        change = (change - descCoins[i]).toFixed(2)
      }
    }
    setChangeArr(changeArray);
  }

  function formatOutputChange() {
    let formattedArray = []
    for (let element of changeArr) {
      if (element < 1) {
        formattedArray.push(element * 100 + 'p')
      } else {
        formattedArray.push('£' + element)
      }
    }
    setOutputChange(formattedArray.join(', '));
  }

  // function processCarParkingCharge(timeIn, timeOut, paymentIn, outputCost, paymentArray, changeArr) {
  //   calculateCost(timeIn, timeOut);
  //   processPaymentInput(paymentIn);
  //   calculateMinChange(outputCost, paymentArray);
  //   formatOutputChange(changeArr);
  // }

  return (
    <div className="App">
      Time in:
      <input
        type ="time"
        value={timeIn}
        onChange={e => setTimeIn(e.target.value)}
      />
      <br/>
      <br/>
      Time out:
      <input
        type ="time"
        value={timeOut}
        onChange={e => setTimeOut(e.target.value)}
      />
      <br/>
      <br/>
      Output cost: £{outputCost || outputCost === 0 ? outputCost.toFixed(2) : '0.00'}
      <br/>
      <br/>
      Payment in:
      <input
        type ="text"
        value={paymentIn}
        onChange={e => setPaymentIn(e.target.value)}
      />
      <br/>
      <br/>
      <button onClick={() => {
        processPaymentInput();
        calculateMinChange();
        formatOutputChange();
      }}>
      Calculate minimum change
      </button>
      <br/>
      <br/>
      Output change: {outputChange}
    </div>
  );
}

export default App;
