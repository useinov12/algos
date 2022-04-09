import React, { useEffect } from 'react'
import * as d3 from 'd3'
import useD3 from '../useD3'
import './chart.css'

function Chart({data, comparingIdx, sorted, local, type}) {
    // console.log(data)
    useEffect(() => {
        console.log('mounted')
        return () => {
            console.log('unmounted')
        }
    }, [])

    
    const ref = useD3(
        (svg)=>{
            //Dimensions
            let width 
            let height 
            let margin
            if(local){
                width = 700
                height = 135
                margin = 10
            } else {
                width = 800
                height = 200
                margin = 30
            }

            //Accesors
            const xAccesor = (d, i) => i //accessing index
            const yAccesor = (d) => d //accessing value

            //Compute values for scales
            const X = d3.map(data, xAccesor)
            const Y = d3.map(data, yAccesor)

            //Initial plot area
            svg
                .attr('height', height)
                .attr('width', width)
            
            svg.selectAll('text').remove()
            let title = svg.append('text')

            const plotArea = svg.select('.plot-area')
                .attr('height', height-(margin*2))
                .attr('width', width-margin*2)
                // .attr('y', height-margin*2)

            //Scales
            const xScale = d3.scaleBand()
                .domain(X)
                .rangeRound([0, width])
                .padding(0.2) //scaleBand only
            const yScale = d3.scaleLinear()
                .domain([0, d3.max(Y)])
                .range([height-margin, 0])

            //Data points
            plotArea
                .selectAll('rect')
                .data(data)
                .join(
                    (enter)=> enter.append('rect')
                        .attr('width', xScale.bandwidth())
                        .attr('height', height)
                        .transition(),
                    (update) => update.transition(),
                    (exit) => exit.remove()
                )
                .attr('fill', 'steelblue')
                // .transition()
                .attr('width', xScale.bandwidth())
                .attr('height', height)
                .attr('x', (d,i) => xScale(xAccesor(d,i)))
                .attr('y', d => yScale(yAccesor(d)))

                title
                    .attr('x', 10)
                    .attr('y', margin*2-5)
                    .attr('fill', 'white')
                    .text(`${type} sort`)
                    .style('font-size', '18px')
                    
            let leftBar
            let rightBar
            let sortedBars

            //if target data is array then ...  
            //else ...  
            leftBar = plotArea.selectAll('rect')
                .filter((d,i)=> i===comparingIdx)
                .attr('fill', 'red')
            rightBar = plotArea.selectAll('rect')
                .filter((d,i)=> i===comparingIdx+1)
                .attr('fill', 'red')

            sortedBars = plotArea.selectAll('rect')
                .filter((d, i)=> i>=data.length-sorted)
                .attr('fill', 'green')
        },
        [data]
    )

    return (
        <div className='chart'>
            {
                data &&
                    <svg 
                        ref={ref}
                        style={{padding:"3px",}}
                    >
                    <g className="plot-area"/> /*  */
                </svg>
            }
        </div>
    )
}

export default Chart

// <g className="plot-area"/> 
// <g className="x-axis"/> 
// <g className="y-axis"/> 
