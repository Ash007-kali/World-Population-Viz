

const PopulationGrowth = ({title, value}) => {
  return (

    <div style={{display:"flex", alignItems:"baseline" }}>
            <div style={{fontSize:12}} >

                World's Avg Population {title} : 

            </div>

            <div className="dot" style={{fontWeight:"bold", color:"#028090"}}>

                {value}
                 
            </div>
  </div>

  )
}

export default PopulationGrowth