

let createCircleDom = function(svgg, scale, fourierCircs) {
    let fcirsG = svgg.selectAll('.fourCir')
        .data(fourierCircs)
        .enter()
            .append('g')
            .attr('class', 'fourCir');

    fcirsG.append('circle')
        .attr('class', 'fourBnd')
        .attr('r' , d => scale(d.amp) )

    fcirsG.append('line')
        .attr('class', 'fourLn')

    let markers = fcirsG.append('circle')
        .attr('class', 'fourMkr')
        .attr('r', d => 5)

    markers.filter( (d,i) => i === fourierCircs.length-1)
        .classed('lastMarker', true)
        .style('fill', 'red')
        .style('fill-opacity', 1)
}

let updateCircleDom = function(svgg, scale, fourierCircs) {
    // render
    let jn = svgg.selectAll('.fourCir')
        .data(fourierCircs)
        .join('.fourCir')

    jn.select('.fourBnd')
        .attr('cx', d => scale(d.ctr.x))
        .attr('cy', d => scale(d.ctr.y))
    jn.select('.fourMkr')
        .attr('cx', d => scale(d.mkr.x))
        .attr('cy', d => scale(d.mkr.y))
    jn.select('.fourLn')
        .attr('x1', d => scale(d.ctr.x))
        .attr('y1', d => scale(d.ctr.y))
        .attr('x2', d => scale(d.mkr.x))
        .attr('y2', d => scale(d.mkr.y))

    let lastMrkr = jn.selectAll('.fourMkr')
         .filter(function (d, i) { return i === fourierCircs.length-1;})
         .style('fill', 'red');
}
