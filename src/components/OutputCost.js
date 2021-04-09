import React, {useContext, useEffect} from 'react';
import {AppContext} from '../appContext';

const OutputCost = () => {
  const { timeIn, timeOut, calculateCost, outputCost  } = useContext(AppContext);

  useEffect(() => {
    calculateCost();
  }, [calculateCost]);


  console.log('cost :' + outputCost)

  return (
    <div>
      <p>Output cost: </p>
       £{outputCost || outputCost === 0 ? outputCost.toFixed(2) : '0.00'}
    </div>
  )
}

export default OutputCost;
