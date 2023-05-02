import React from 'react'

const Legends = ({listContinents, colorScale}) => {
  return (
    <div id="legends">

        {listContinents.map((d)=>{
            return( 
                <div style={{marginTop:12, display:"flex", justifyContent:"space-between", alignItems:"center"}}>
                    <div > {d} </div> 
                    <div> - </div>
                    <div id="legends-color" style={{backgroundColor:`${colorScale(d)}`, marginRight:60, width:24, height:24, borderRadius:20}}>  </div> 
                </div>
            )
        })}


    </div>
  )
}

export default Legends