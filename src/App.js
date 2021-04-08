import React, { useState } from 'react';

function App() {
  const [timeIn, setTimeIn] = useState('');
  const [timeOut, setTimeOut] = useState('');
  const [paymentIn, setPaymentIn] = useState('');
  const [outputCost, setOutputCost] = useState(0);
  const [paymentArray, setPaymentArray] = useState([]);
  const [changeArr, setChangeArr] = useState([]);
  const [outputChange, setOutputChange] = useState('');

  console.log('in: ' + timeIn)
  console.log('out: ' + timeOut)
  console.log('payment: ' + paymentIn)
  console.log('outputCost: ' + outputCost )
  console.log('paymentArray: ' + paymentArray)
  console.log('changeArr: ' + changeArr)
  console.log('outputChange: ' + outputChange)

  function calculateCost(timein, timeout) {
    let timeInArr = timein.split(':');
    let timeOutArr = timeout.split(':');
    let numOfMinsAtEntry = Number((timeInArr[0] * 60)) + Number(timeInArr[1])
    let numOfMinsAtExit = Number((timeOutArr[0] * 60)) + Number(timeOutArr[1])
    //if exit time is the following day, add 24 hours to timeout
    if (Number(timeInArr[0]) <= Number(timeOutArr[0])) {
      let numOfMinsInCarPark = numOfMinsAtExit - numOfMinsAtEntry;
      if(numOfMinsInCarPark > 60) {
        setOutputCost(3 + (numOfMinsInCarPark - 60) / 100);
      } else {
        setOutputCost(3);
      }
    } else {
      let numOfMinsInCarPark = (numOfMinsAtExit + (24 * 60)) - numOfMinsAtEntry;
      setOutputCost(3 + ((numOfMinsInCarPark - 60) / 100));
    }
  }

  function processPaymentInput(input) {
    let inputArray = input.split(', ');
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

  function calculateMinChange(cost, paymentArr) {
    //calculate sum of payment in
    let paymentSum = paymentArr.reduce((a, b) => a + b, 0);
    let change = (paymentSum - cost).toFixed(2)
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

  function formatOutputChange(changeArray) {
    let formattedArray = []
    for (let element of changeArray) {
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
      Payment in:
      <input
        type ="text"
        value={paymentIn}
        onChange={e => setPaymentIn(e.target.value)}
      />
      <br/>
      <br/>
      <button onClick={() => {
        calculateCost(timeIn, timeOut);
        processPaymentInput(paymentIn);
        calculateMinChange(outputCost, paymentArray);
        formatOutputChange(changeArr);
        }}>
      Submit
      </button>
      <br/>
      <br/>
      Output cost: £{outputCost.toFixed(2)}
      <br/>
      <br/>
      Output change: {outputChange}
    </div>
  );
}

export default App;
