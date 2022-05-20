import React, { useState, useEffect } from 'react'
import * as d3 from 'd3'
import useD3 from '../CustomHooks/useD3'
import './chart.css'



//make them dynamic depends on screenSize
const height = 150
const width = 750



function Chart({inputSpeed, data, pivots, local, type, isSorted}) {


    let duration = 45
    if(inputSpeed<45)duration=25

    const pivotPoints = ( plotArea) => {

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
            // let margin = 10

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
                .rangeRound([0, width])
                .padding(0.2) //scaleBand only
            let yScale = d3.scaleLinear()
                .domain([0, d3.max(Y)])
                .range([height-20, 20])

            //Data points
            const plotArea = svg.select('.plot-area')

            //store animations chain
            //creating a sequence:
            //old bars removed -> next bars added
            const exitTransition = d3.transition().duration(500) //incapsulating 

            plotArea
                .selectAll('rect')
                .data(data)
                .join(
                    (enter)=> enter.append('rect')
                        .attr('width', xScale.bandwidth(width))
                        .attr('height', 0)
                        .attr('y', height)
                        .attr('x', xScale.bandwidth(width))
                        .transition().duration(duration/2),
                    (update) => update.transition().duration(duration),
                    (exit) => exit.remove()
                )
                .transition().duration(duration)
                .attr('width', xScale.bandwidth())
                .attr('height',d => yScale(-20)- yScale(d)) // margin-bottom: -10 
                .attr('x', (d,i) => xScale(xAccesor(d,i)))
                .attr('y', d => yScale(yAccesor(d)))

                title
                    .attr('x', 10)
                    .attr('y', 10*2-5)
                    .attr('fill', 'white')
                    .text(`${type} sort`)
                    .style('font-size', '18px')
                    .classed('algo-title', true)
                    //add class
                    
            //Dynamically render pivot points
            if(pivots)pivotPoints(plotArea);
        },
        [data, pivots]
    )

    return (
        <div className='chart' id='chart-div'>
            { data &&
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