import * as d3 from 'd3';



const Line = ({xScale, yScale, data, paddingRight}) => {

  let  line = d3.line()
                   .x(function(d) { return xScale(d.year); }) 
                   .y(function(d) { return yScale(d.population); }) 
                   .curve(d3.curveMonotoneX)


  let area = d3.area()
                .x(function(d) { return xScale(d.year) })
                .y0(yScale(0))
                .y1(function(d) { return yScale(d.population) })
                .curve(d3.curveMonotoneX)


  return (

    <g transform={`translate(${paddingRight},40)`}>

      <defs>
        <linearGradient id="MyGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="50%" stopColor="rgba(0, 191, 178, 0.75)" />
          <stop offset="95%" stopColor="rgba(0, 191, 178, 0)" />
        </linearGradient>
      </defs>



      <path d={line(data)} fill="none" stroke='rgba(0, 191, 178, 1)' strokeWidth={3} ></path>

      <path d={area(data)}  fill="url(#MyGradient)" ></path>
        
    </g>

  )
}

export default Line