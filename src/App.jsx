import './App.css';
import { AxisBottom } from './Components/AxisBottom';
import AxisLeft from './Components/AxisLeft';
import Scatter from './Components/Scatter';
import * as d3 from 'd3'
import {useRef, useState, useEffect } from 'react';
import { useContainerDimensions } from './CustomHooks/Dimensions';
import PopulationGrowth from './Components/PopulationGrowth';
import AxisBottomLine from './Components/AxisBottomLine';
import Line from './Components/Line';
import { useContainerDimensionsLine } from './CustomHooks/DimensionsLine';
import Dropdown from './Components/Dropdown';
import mainData from'./DataLoader/file.csv';
import worldData from'./DataLoader/WorldAvg.csv';
import {csv} from 'd3';
import Legends from './Components/Legends';
import Tooltip from './Components/Tooltip';


function App() {



  const refScatter = useRef(null);
  const refLine = useRef(null);


  const { width } = useContainerDimensions(refScatter);
  //rel cordinates for tooltip
  const [relPos, setRelPos] = useState({left:0, top:0})

  //display data for tooltip
  const [tooltipData, settooltipData] = useState("")

  //hover state for tooltip
  const [hovered, setHovered] = useState(false);


  const { widthL } = useContainerDimensionsLine(refLine);


let listContinents = ["Africa", "Americas", "Asia", "Europe","NA","Oceania"];



  const marginTop = 40;
  const marginLeft = width*0.10;
  const graphHeight = 500;
  const marginLeftLine = widthL*0.10;



  //data points for dropdown 
  let years = []
  for (let i = 1950; i < 2022; i++) {
    years.push(i)
  }

  const [selectedYear, setSelectedYear] = useState(years[0])

 
  //load data grouping Years
  const [yearlyData , setyearlyData] = useState(new d3.InternMap([]));

  const [worldAvg, setworldAvg] = useState([])


  //create state for scatter plot 
  const [scatterData, setscatterData] = useState([])


  useEffect(()=>{

    csv(mainData, function(d) {
        return {  year: +d.Year , country: d.Country, density: +d.Den, growth: +d.Growth, population: +d.Population, continent: d.Continent};}).then(function(data) {
          let temp = d3.group(data, d => d.year);
          setyearlyData(temp);
        });


    csv(mainData, function(d) {
          return {  year: +d.Year , country: d.Country, density: +d.Den, growth: +d.Growth, population: +d.Population, continent: d.Continent};}).then(function(data) {
            let temp = d3.group(data, d => d.year);
            setscatterData(temp.get(selectedYear));
          });


    csv(worldData, function(d) {
      return {year: +d.Year, density: +d.Den, growth: +d.Growth, population: +d.Population}
    }).then((data) =>{
      setworldAvg(data.sort((a, b) => {
        return a.year - b.year;
      }))
    })

  }, [])




  let xMax = d3.max(scatterData, d => d.density);
  let sMax = d3.max(scatterData, d => d.population);
  let yMax = d3.max(scatterData, d => d.growth);
  let yMin = d3.min(scatterData, d => d.growth) - 2;


  const xScale = d3.scaleSqrt()
                   .domain([0,xMax])
                   .range([0,width-150]).nice();

  const sSize = d3.scaleSqrt()
                   .domain([0,sMax])
                   .range([6,44]).nice();


  const yScale = d3.scaleLinear()
                   .domain([yMin, yMax])
                   .range([graphHeight,0]).nice();

  //color scale
  var colorScale = d3.scaleOrdinal()
                    .domain(listContinents)
                    .range(["#D8973C", "#C3423F", "#63D471", "#241E4E","#114B5F","#119DA4"]);



 const xScaleLine = d3.scaleLinear()
                   .domain([1950,2021])
                   .range([0,widthL-100]);


  //pop max
  let popMax = d3.max(worldAvg, d => d.population);


  const yScaleLine = d3.scaleLinear()
                  .domain([0,popMax])
                  .range([300,0])



  //start animating

  const initial = useRef(1950);
  const [play, stop] = useState(false);
  //interval id 
  const [intervalID, setIntervalID] = useState(0);

  useEffect(()=> {

    if (play) {
      let timerID = null;
      timerID = setInterval(() => {

        initial.current = initial.current + 1
        console.log(initial.current);

        setSelectedYear(initial.current)

      //change scatter data
      setscatterData(yearlyData.get(initial.current));
      //check if we have reached the last limit and loop back
      if (initial.current === 2021){
        initial.current = 1950;
      };

      }, 1000)


      
      setIntervalID(timerID);

    } else {
      initial.current = 1950;
      clearInterval(intervalID)
    }

  }, [play])


  return (
    <div className="App">

          <div id="heading-container">
            <div id="heading">
              WORLD'S POPULATION <br></br> GROWTH
            </div>
            <div style={{padding:40, fontStyle:'italic'}} >created by: Abhishek</div>
          </div>

          <div id="filter-container">

            <Dropdown yearsData = {yearlyData} data={years} displayYear={selectedYear} setdisplay={setSelectedYear} changeScatter={setscatterData} />

            <button style={{paddingLeft:"40px", color:"#4DCCBD"}}> 
            { play ? <i onClick={()=>{stop(false);}}  className="fa-regular fa-circle-stop"></i>  : <i onClick={()=>{stop(true);}}  className="fa-solid fa-play"></i> }
            </button>

            <div>

            </div>

          </div>


          <div id="viz-container">

              <div id="region-container" >

                  <div id="fact">On 15 November 2022, the world’s population
                    is projected to reach  <span style={{fontSize: '20px'}}> 8 billion </span>  people,
                      a milestone in human development.
                  </div>

                  <Legends listContinents={listContinents} colorScale={colorScale}/>

              </div>



            <div id="scatter" ref={refScatter} style={{width:{width}, minWidth:500, minHeight:500}}>
              <Tooltip hovered={hovered} tooltipData={tooltipData}  relPos={relPos}/>

              <svg height='600px' width='100%' id='svgcan' >
                <AxisLeft ymin={yMin} paddingRight={marginLeft} yScale={yScale} y={10} xScale={xScale} x={xMax} />  
                <Scatter 
                setRelPos={setRelPos} settooltipData={settooltipData} setHovered={setHovered}
                colorScale={colorScale} size={sSize} xScale={xScale} yScale={yScale} 
                data={scatterData} paddingRight={marginLeft}/>
                <AxisBottom x={xMax} paddingRight={marginLeft} xScale={xScale} disyY={marginTop+graphHeight} />
              </svg>
            </div>




            <div ref={refLine} id="line-container" >

              <div id="kpi-indicator">

              <PopulationGrowth title={"Density"} value={"61.9"}/>

              <PopulationGrowth title={"Growth"} value={"0.84%"}/>
              </div>

              <div id="line-graph-container">
                  <svg height={400} width="100%">

                    <AxisLeft suffix={"Bn"} ymin={0} paddingRight={marginLeftLine} yScale={yScaleLine} y={popMax} xScale={xScaleLine} x={2022} />  
                    <Line xScale={xScaleLine} yScale={yScaleLine} data={worldAvg} paddingRight={marginLeftLine} />
                    <AxisBottomLine x={2022} paddingRight={marginLeftLine} xScale={xScaleLine} disyY={marginTop+300}  />
                  </svg>
              </div>

            </div>

          </div>



    </div>
  );
}

export default App;
