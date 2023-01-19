import React from 'react'

const Tooltip = ({hovered, tooltipData, relPos}) => {

    let left = relPos.left 
    let top = relPos.top 

    console.log(left, top);

  return (
    <div id="tooltip"
     style={{position:'absolute', left:left, top:top, display:`${hovered? "block" : "none"}` }}>
        {tooltipData}
    </div>
  )
}

export default Tooltip