import React from 'react'

const StatsDisplay = ({timeLeft, wpm, accuracy, mistake}) => {
  return (
    <div className="stats">
      <p>TIme Left : {timeLeft}</p>
      <p>WPM:{wpm}</p>
      <p>Accuracy: {accuracy}%</p>
      <p>Mistakes: {mistake}</p>
    </div>
  )
}

export default StatsDisplay