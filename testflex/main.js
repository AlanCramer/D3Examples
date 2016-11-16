
var margin = {top: 0, left: 0, right:0, bottom:0},
    width = 100 - margin.left - margin.right,
    height = 100 - margin.top - margin.bottom;

var topDiv = d3.select('body')
    .append('div')
    .classed('top-level-div', true);

var header = topDiv
    .append('div');

var title = header.append('h1')
    .attr('class', 'title')
    .text('The Title');

var board = topDiv
    .append('svg')
    .classed('board', true)
    .attr('viewBox', '0 0 ' +
        (width + margin.left + margin.right) + ' ' +
        (height + margin.top + margin.bottom))
    .attr('preserveAspectRatio', 'xMidYMid')
    .style('background', '#eeeeff')
    .append('g')
    .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

var boardBk = board.append('rect')
    .style('fill', 'bbeeee')
    .attr('width', width)
    .attr('height', height);

var nav = topDiv
    .append('svg')
    .attr('width', width)
    .attr('height', '100px')
    .classed('navbar', true)
    .style('background', '#eeaaff');

board.append('rect')
    .attr('x', '-50')
    .attr('y', '1')
    .attr('width', '50px')
    .attr('height', '50px');

board.append('circle')
    .attr('cx', '30')
    .attr('cy', '30')
    .attr('r', '10');






/*
var colors = ['steelblue', 'chocolate'];

var rowCt = 12;
var dotRad = 9;
var dur = 1000;
var intvl = 1200;

var x = d3.scaleLinear()
    .domain([0, rowCt])
    .range([0, width/2]);

var makeDots = function(name, ct, dotRad, dist) {

    var data = d3.range(ct).map(function(d) {
        return {
            idx: d,
            dotRad: dotRad,
            dist: dist,
            color: colors[Math.floor(Math.random() * colors.length)]
        };
    });

    var r = d3.scaleLinear()
        .domain([0, ct])
        .range([0, 2 * Math.PI]);

    board.selectAll('circle .' + name)
        .data(data)
        .enter()
        .append('circle')
        .classed(name, true)
        .attr('r', function(d) { return d.dotRad})
        .attr('cx', function(d, i) {
            return dist * Math.cos(r(d.idx))+ width/2;
        })
        .attr('cy', function(d){
            return dist * Math.sin(r(d.idx)) + height/2;
        })
        .style('fill', function(d, i) {
            return d.color;
        })
        ;
}
//
// d3.range(1, 8).forEach(function(d) {
//     return makeDots('row' + d, 10, 6, x(d));
// });

var rotateDots = function(svg, name, fwd) {

    var dots = board.selectAll('circle.' + name );

    var diff = fwd ? 1 : -1;

    var r = d3.scaleLinear()
        .domain([0, dots.size()])
        .range([0, 2 * Math.PI]);

    dots
        .each(function(d) {
            var tmp = d3.select(this).data();
            tmp[0].idx = (tmp[0].idx + diff) % dots.size();
        })
        .transition()
        .duration(dur)
        .attr('cx', function(d, i) {
            return d.dist * Math.cos(r(d.idx)) + width/2;
        })
        .attr('cy', function(d){
            return d.dist * Math.sin(r(d.idx)) + height/2;
        });
}

// d3.range(1, 8).forEach(function(d) {
//     window.setInterval(rotateDots, intvl, svg, 'row' + d, d%2===0);
// });
*/
