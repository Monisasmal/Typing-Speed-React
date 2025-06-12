import React from 'react'

const LevelSelector = ({level, setLevel}) => {
  return (
    <div>
      <label>Select Level: </label>
    <select value={level} onChange={e => setLevel(Number(e.target.value))}>
      <option value={1}>Easy</option>
      <option value={2}>Medium</option>
      <option value={3}>Hard</option>
    </select>
    </div>
  )
}

export default LevelSelector