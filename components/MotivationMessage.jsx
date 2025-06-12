import React from 'react'

const MotivationMessage = ({wpm}) => {
   let message = "Keep practicing!";
    if (wpm > 60) message = "🔥 You're a pro!";
  else if (wpm > 40) message = "🚀 Great speed!";
  else if (wpm > 20) message = "👍 Good job!";
  return  <h3>{message}</h3>;
  
}

export default MotivationMessage