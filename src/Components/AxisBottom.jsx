

export const AxisBottom = ({x,paddingRight,xScale, disyY}) => {

  const ticks = [];

  for (let index = 0; index <= x; index+=Math.floor(x/5)) {
    ticks.push(index)
  }

  let mid = Math.floor( xScale(x)/2);

  return (

    <g transform= {`translate(${paddingRight}, ${disyY})`}> 

    {/*   {<line x1="0" y1="0" x2={`${xScale(400)}`} y2="0" stroke='black' />} */}

        { ticks.map((tick,i) => {
          
          return         <g key={i} transform= {`translate(${xScale(tick)},0)`}>
                            <line x1="0" y1="0" x2="0" y2="12" stroke='black' ></line>

                            <text transform='translate(0,25)' textAnchor="middle" fontSize={12} fill="gray" > {tick}  </text>
                          </g>
        } )}

      
    <text transform= {`translate(${mid},48)`} textAnchor="middle" fontSize={12} fill="gray" > Population Density (people per sq.km ) </text>

    </g>

  )
}
