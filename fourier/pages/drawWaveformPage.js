
let drawWaveformPage = function(divSel) {

    let spinnerLabel = divSel
        .append('text')
        .text('Number of Circles ')

    let spinner = divSel
        .append('input')
        .attr('id', 'circleCount')
        .attr('type', 'number')
        .attr('min', '0')
        .attr('value', '0')
        .on('input', () => resetAll(+ d3.select('#circleCount').node().value))

    let svgdiv = divSel
        .append('div')

    svgdiv.append('svg')
        .attr('width', 800)
        .attr('height', 400)

    let svg = d3.select('svg')
        width = +svg.attr('width')
        height = +svg.attr('height')
        svgg = svg.append('g')
            .attr('transform', 'translate (' + width/4 + ',' + height/2 + ') scale(1)')

    let sawToothFn = i => ({ freq: i, amp: 1/i})
    let squareWvFn = i => ({ freq: 2*i-1, amp: 1/(2*i -1)})

    let animateTimer = null;

    function resetAll(circCt) {

        svgg.selectAll("*").remove();

        let scale = d3.scaleLinear()
            .domain([0, 3])
            .range([0, height/2]);

        let fourierCircs = d3.range(1, circCt+1).map( squareWvFn )

        fourierCircs.forEach( c => {
            c.ctr = {};
            c.mkr = {};

            c.ctr.x = c.mkr.x = 0;
            c.ctr.y = c.mkr.y = 0;
        })

        let ptCt = 1000
        let wfpts = d3.range(ptCt).map( (d,i) => ({ x: 5*i/ptCt + 3, y:0 }) )

        let updateWaveformData = function(wfpts, newPty) {

            for (let ipt = wfpts.length -1; ipt > 0; ipt--) {

                let curpt = wfpts[ipt];
                let prvpt = wfpts[ipt-1];

                curpt.y = prvpt.y
            }

            wfpts[0].y = newPty;
        }

        let updateWvPtData = function(wfpts, newPtx) {

            wfpts[0].y = newPty;
        }

        let animateWavePts = function (t) {

            let tSec = t/10000;

            // update the data
            fourierCircs.forEach( (d, i) => {

                if (i > 0) {
                    d1 = fourierCircs[i-1]
                    d.ctr.x = d1.mkr.x
                    d.ctr.y = d1.mkr.y
                }

                d.mkr.x = d.amp * Math.cos(tSec * 2* Math.PI * d.freq) + d.ctr.x
                d.mkr.y = -d.amp * Math.sin(tSec * 2* Math.PI * d.freq) + d.ctr.y
            })

            let lastCir = fourierCircs[fourierCircs.length-1]

            updateWaveformData(wfpts, lastCir.mkr.y)

            // render
            updateCircleDom(svgg, scale, fourierCircs)
            //updateCircleDom(svgg2, fourierCircs)

            updateWaveformDom(svgg, scale, wfpts)
        }

        createCircleDom(svgg, scale, fourierCircs)
        //createCircleDom(svgg2, fourierCircs);

        createWaveformDom(svgg, scale, wfpts)

        if (animateTimer) {
            animateTimer.stop()
        }

        animateTimer = d3.timer(animateWavePts)
    }
}
