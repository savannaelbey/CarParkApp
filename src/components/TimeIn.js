import React, {useContext} from 'react';
import {AppContext} from '../appContext';

const TimeIn = () => {
  const { timeIn, handleTimeInChange } = useContext(AppContext);
  console.log('time in :'+ timeIn)
  return (
    <div>
      <p>Time in: </p>
        <input
          type ="time"
          value={timeIn}
          onChange={ e => handleTimeInChange(e.target.value) }
        />
    </div>
  )
}

export default TimeIn;
