import React, {useContext} from 'react';
import {AppContext} from '../appContext';

const TimeOut = () => {
  const { timeOut, handleTimeOutChange } = useContext(AppContext);
  console.log('time out :' + timeOut)
  return (
    <div>
      <p>Time out: </p>
        <input
          type ="time"
          value={timeOut}
          onChange={ e => handleTimeOutChange(e.target.value) }
        />
    </div>
  )
}

export default TimeOut;
