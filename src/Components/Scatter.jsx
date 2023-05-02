
const Scatter = ({setHovered, settooltipData, setRelPos, colorScale, xScale, yScale, data, paddingRight, size}) => {

  return (

    <g transform={`translate(${paddingRight}, 40)`}> 




        { data.map( (d,i)=>{
                return   <circle 
                key={i}
                className="scatter-bubbles" 
                cx={`${xScale(d.density)}`} 
                cy={`${yScale(d.growth)}`} 
                r={`${size(d.density)}`} fill={`${colorScale(d.continent)}`}

                  onMouseEnter= {(e)=>{
                    console.log(e);
                  setRelPos({left:e.pageX, top:e.pageY});
                  settooltipData(d.country);
                  setHovered(true);}}

                onMouseOut={()=> { 
                  setHovered(false);}}/>
        } ) }

    </g>

  )
}

export default Scatter