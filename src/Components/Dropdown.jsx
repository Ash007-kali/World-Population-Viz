import React from 'react'

const Dropdown = ({data, displayYear, setdisplay, yearsData, changeScatter }) => {
  return (

    <div id="select-container">
    
        <div style={{paddingRight:20, fontSize:32, fontWeight:'bold', color:"#028090"}}>
            {displayYear}
        </div>

        <label htmlFor="years" style={{paddingRight:20, fontSize:12}}>Choose an Year :  </label>
        <select name="years" id="dropdown" onChange={(e)=>{ 
            setdisplay(e.target.value)
            changeScatter(yearsData.get(parseInt(e.target.value)))
            }} defaultValue={displayYear}>
                    
                    {data.map((element,i) => {
                            return  <option key={i} value={`${element}`} >{element}</option>
                      
                    })}
                    

      </select>
  </div>

  )
}

export default Dropdown