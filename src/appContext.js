import React, { Component } from 'react';

// Create a context object
const AppContext = React.createContext();

class AppProvider extends Component {
  state = {
    timeIn: '',
    timeOut: '',
    paymentIn: '',
    outputCost: 0,
    paymentArray: [],
    changeArr: [],
    outputChange: ''
  }

  componentDidMount() {
    this.calculateCost();
  }
  calculateCost = () => {
    let timeInArr = this.state.timeIn.split(':');
    let timeOutArr = this.state.timeOut.split(':');
    let numOfMinsAtEntry = Number((timeInArr[0] * 60)) + Number(timeInArr[1])
    let numOfMinsAtExit = Number((timeOutArr[0] * 60)) + Number(timeOutArr[1])
    //if exit time is the following day, add 24 hours to timeout
    if (Number(timeInArr[0]) <= Number(timeOutArr[0])) {
      let numOfMinsInCarPark = numOfMinsAtExit - numOfMinsAtEntry;
      if(numOfMinsInCarPark > 60) {

        this.setState({ outputCost: 3 + (numOfMinsInCarPark - 60) / 100 });
      } else if (numOfMinsInCarPark <= 60) {
        this.setState({ outputCost: 3 });
      }
    } else {
      let numOfMinsInCarPark = (numOfMinsAtExit + (24 * 60)) - numOfMinsAtEntry;

      this.setState({ outputCost: 3 + ((numOfMinsInCarPark - 60) / 100) });
    }
  }

  processPaymentInput = async () => {
    let inputArray = this.state.paymentIn.split(', ');
    let processedInputArray = [];
    for (let element of inputArray) {
      if (element[0] === '£') {
        processedInputArray.push(Number(element.slice(1)));
      } else {
        processedInputArray.push(element.match(/\d+/g) / 100);
      }
    }
    this.setState({ paymentArray: processedInputArray});
  }

  calculateMinChange = async () => {
    //calculate sum of payment in
    let paymentSum = this.state.paymentArray.reduce((a, b) => a + b, 0);
    let change = (paymentSum - this.state.outputCost).toFixed(2)
    let coins = [0.01, 0.02, 0.05, 0.10, 0.20, 0.50, 1, 5, 10, 20]
    let descCoins = coins.sort((a,b) => b-a);
    let changeArray = []
    for (let i = 0; i < descCoins.length; i++) {
      while (descCoins[i] <= change ) {
        changeArray.push(descCoins[i]);
        change = (change - descCoins[i]).toFixed(2)
      }
    }
    this.setState({changeArr: changeArray});
  }

  formatOutputChange = async () => {
    let formattedArray = []
    for (let element of this.state.changeArr) {
      if (element < 1) {
        formattedArray.push(element * 100 + 'p')
      } else {
        formattedArray.push('£' + element)
      }
    }
    this.setState({outputChange: formattedArray.join(', ')});
  }

  handleTimeInChange = async (input) => {
    this.setState({timeIn: input});

  }

  handleTimeOutChange = async (input) => {
    this.setState({timeOut: input});

  }


  render() {
    return (
      <AppContext.Provider
        value={{
          ...this.state,
          calculateCost: this.calculateCost,
          processPaymentInput: this.processPaymentInput,
          calculateMinChange: this.calculateMinChange,
          formatOutputChange: this.formatOutputChange,
          handleTimeInChange: this.handleTimeInChange,
          handleTimeOutChange: this.handleTimeOutChange,
        }}
      >
        {this.props.children}
      </AppContext.Provider>
    );
  }

  }


export { AppContext};
export default AppProvider;
