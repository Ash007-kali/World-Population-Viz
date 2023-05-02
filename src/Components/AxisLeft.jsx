import React from 'react'

const AxisLeft = ({label,height, suffix, paddingRight, y, yScale, xScale, x, ymin}) => {

    const ticks = [];

    let increment = Math.floor((y-ymin)/5)
    for (let index = ymin; index <= y; index+=increment) {
        ticks.push(index)
      }

      let rem = ticks.shift();

  return (

    <g transform= {`translate(${paddingRight},40)`}>


      <g transform= {`translate(-40,${height/2}) rotate(-90)`} > <text  className='yaxis-text' fontSize={12} fill="gray"> {label} </text> </g>


        { ticks.map((tick,i) => {
          
          return ( <>
                    
                    <g transform= {`translate(0,${yScale(tick)})`}>
                            <line className='yaxis_dots'  x1="-40" y1="0" x2={`${xScale(x)}`} y2="0" stroke='black'></line>
                          </g>

                    <g transform= {`translate(-10,${yScale(tick)})`}>
                        <g transform='translate(-2,-4)'>
                            <text textAnchor="end" className='yaxis-text' fontSize={12} fill="gray" > { parseFloat(tick).toPrecision(1)} {suffix} </text>
                        </g>
                    </g>
                    
                    </>

                )

        } )}


    </g>

  )
}

export default AxisLeft