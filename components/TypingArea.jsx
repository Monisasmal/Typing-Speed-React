import React from 'react'

const TypingArea = ({input, setInput, text, setMistake, isRunning}) => {
 const handleChange = (e) =>{
  if (!isRunning) return;
const value = e.target.value;
setInput(value);

let mistake = 0;
value.split('').forEach((char,i) => {
  if(char !== text[i])
    mistake++;
});
setMistake(mistake);
 }


  return (
    <textarea rows="4"  value={input} onChange={handleChange} placeholder='Start Typing Here...'/>
  )
}

export default TypingArea