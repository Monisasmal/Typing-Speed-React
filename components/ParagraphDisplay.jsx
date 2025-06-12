import React from 'react'

const ParagraphDisplay = ({text}) => {
  return (
    <div className="paragraph-box">
      <p>{text || "Click start to begin typing..."}</p>
      </div>
  )
}

export default ParagraphDisplay