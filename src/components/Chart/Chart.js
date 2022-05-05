import React from 'react'
import * as d3 from 'd3'
import useD3 from '../CustomHooks/useD3'
import './chart.css'

const height = 140
const width = 550


function Chart({data, pivots, local, type, isSorted}) {

    const pivotPoints = (plotArea) => {

        let allBars = plotArea.selectAll('rect')
            .attr('fill', 'var(--text-color')
        let leftBar = plotArea.selectAll('rect')
        
        let rightBar = plotArea.selectAll('rect'); 
        let sortedBars = plotArea.selectAll('rect'); 
        let pivot = plotArea.selectAll('rect');
        switch(type){
            case 'Bubble' :
                leftBar 
                    .filter((d,i)=> i===pivots.compareIdx)
                    .attr('fill', 'firebrick')
                rightBar 
                    .filter((d,i)=> i===pivots.compareIdx+1)
                    .attr('fill', 'firebrick')

                sortedBars 
                    .filter((d, i)=> i>=data.length-pivots.sorted)
                    .attr('fill', 'green')
                return leftBar, rightBar, sortedBars, allBars
            case 'Quick':
                let area = plotArea.selectAll('rect')
                    .filter((d,i)=> i>=pivots.leftIdx && i<=pivots.rightIdx)
                    // .attr('fill', 'var(--color-primary-3')
                    leftBar 
                        .filter((d,i)=> i===pivots.leftIdx)
                        .attr('fill', 'firebrick')
                    rightBar 
                        .filter((d,i)=> i===pivots.rightIdx)
                        .attr('fill', 'firebrick')
                    pivot  
                        .filter((d,i)=> i===pivots.pivotIdx)
                        .attr('fill', 'orange')

                return  leftBar, rightBar, pivot, area, allBars
        }
    }
    const ref = useD3(
        (svg)=>{

            //Dimensions
            let margin = 10

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

            //Scales
            let xScale = d3.scaleBand()
                .domain(X)
                .rangeRound([margin, width])
                .padding(0.2) //scaleBand only
            let yScale = d3.scaleLinear()
                .domain([0, d3.max(Y)])
                .range([height-margin, margin])

            //Data points
            const plotArea = svg.select('.plot-area')
            plotArea
                .selectAll('rect')
                .data(data)
                .join(
                    (enter)=> enter.append('rect')
                        .attr('width', xScale.bandwidth())
                        .attr('height', height)
                        // .attr('height', d => d)
                        .transition(),
                    // (update) => update.transition(),
                    (update) => update,
                    (exit) => exit.remove()
                )
                .attr('fill', 'white')
                .transition()
                .duration(45)
                .attr('width', xScale.bandwidth())
                .attr('height',d => yScale(-margin)- yScale(d))
                .attr('x', (d,i) => xScale(xAccesor(d,i)))
                .attr('y', d => yScale(yAccesor(d)))
                // .attr('class', 'bars')
                //add class

                title
                    .attr('x', 10)
                    .attr('y', margin*2-5)
                    .attr('fill', 'white')
                    .text(`${type} sort`)
                    .style('font-size', '18px')
                    .classed('algo-title', true)
                    //add class
                    
            //Dynamically render pivot points
            pivotPoints(plotArea)

        },
        [data, pivots]
    )

    return (
        <div className='chart' id='chart-div'>
            {
                data &&
                    <svg ref={ref}
                    viewBox={`0 0 ${width} ${height}`}
                    style={{
                      height: "100%",
                      width:'100%',
                      marginRight: "0px",
                      marginLeft: "0px",
                    }}>
                    <g className="plot-area"/> 
                </svg>
            }
        </div>
    )
}

export default Chart