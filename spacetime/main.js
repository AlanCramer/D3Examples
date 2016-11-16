
var width = 400,
    height = 400;

var topDiv = d3.select('body')
    .append('div')
    .classed('top-level-div', true);

var svg = topDiv
    .append('svg')
    .attr('width', width)
    .attr('height', height)
    .classed('board', true)
    .style('background', '#eeeeff');

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

    svg.selectAll('circle .' + name)
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

d3.range(1, 8).forEach(function(d) {
    return makeDots('row' + d, 10, 6, x(d));
});

var rotateDots = function(svg, name, fwd) {

    var dots = svg.selectAll('circle.' + name );

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

d3.range(1, 8).forEach(function(d) {
    window.setInterval(rotateDots, intvl, svg, 'row' + d, d%2===0);
});
