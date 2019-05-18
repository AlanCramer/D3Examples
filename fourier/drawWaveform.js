let createWaveformDom = function(svgg, wfpts) {
    svgg.selectAll('.wfpt')
        .data(wfpts)
        .enter()
            .append('circle')
            .attr('class', 'wfpt')
            .attr('r',  d => 1)
            .attr('cx', d => scale(d.x))
            .attr('cy', d => scale(d.y))
}

let updateWaveformDom = function(svgg, wfpts) {
    svgg.selectAll('.wfpt')
        .data(wfpts)
        .join('.wfpt')
            .attr('r',  d => 1)
            .attr('cx', d => scale(d.x))
            .attr('cy', d => scale(d.y))

}
