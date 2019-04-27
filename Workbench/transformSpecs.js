var fs = require('fs');

var activeSpecs = JSON.parse(fs.readFileSync('allActiveSpecs.json', 'utf8'));

var reportStreams = {

    // TC
    'e3d': '57050e74e4b029be4da0dfc5',
    'irs': '56e57229e4b0d23d758d60cb',
    'irc': '56e57292e4b0d23d758d60e6',
    'obs': '56fac936e4b0d76ca0b71942',
    'wac': '56e4d7b9e4b0d23d758d1d73',

    // from jeffp
    'r180-time-per-seg': '593a18ffc77b5a2995994013',
    'r180-time-per-seg-per-day': '593a19a14a37053d094997de',
    'r180-daily-time-session': '593a1a06c77b5a2995994015',
    'r180-daily-time-per-student': '593a1a7e6d3896014c48e9f1',
    'r180-student-current-level': '591b38db82913425e6549989',

    'district': {
        'summary': '586fbdf04fb6b86d0bf901fc',
        'details': '586fbe124fb6b86d0bf901fe',
        'dailyAvgSessions': '587febab69e77a55ca727b01',
        'csv': '586fbe324fb6b86d0bf90200/csv'
    },
    'school': {
        'summary': '586fbdb04fb6b86d0bf901f8',
        'details': '586fbdcf4fb6b86d0bf901fa',
        'dailyAvgSessions': '587feb7a69e77a55ca727af3'
    },
    'class': {
        'summary': '586fbd2f4fb6b86d0bf901f4',
        'details': '586fbd914fb6b86d0bf901f6',
        'dailyAvgSessions': '587feb1c69e77a55ca727ad6'
    },
    'student': {
        'summary': '586eec177e33ea3647fdff87'
    }
};

console.log()

var result = buildHierarchy(reportStreams['e3d']);

function findSpec(specs, uuid) {
    return specs.find(function(spec) {
        return spec.uuid === uuid;
    });
}

function findSpecByName(specs, name) {
    var ret = specs.find(function(spec) {
        return spec.name === name;
    });

    // see if it's the outputCollection of some stream
    if (!ret) {
        ret = specs.find(function(spec) {
            var jobSpec = spec.intellistreamJobSpec;
            var outCol =  jobSpec ? jobSpec.outputCollection : null;

            return outCol ? (outCol === name) : false;
        })
    }

    return ret;
}

function buildHierarchy(specId) {

    var ret = {};
    var childHier, childSpec, childRec;

    var spec = findSpec(activeSpecs, specId)

    if (!spec) {
        return {
            name: '??',
            uuid: specId,
        };
    }

    ret.name = spec.name;
    ret.type = spec.type;
    ret.uuid = spec.uuid;
    ret.children = [];

    if (spec.type === 'dynamic') {
        var searchJSONObj = JSON.parse(spec.searchJSON);

        if (searchJSONObj.indices) {

            searchJSONObj.indices.forEach(function(child) {

                childHier = buildHierarchy(child.uuid);
                ret.children.push(childHier);

            })
        }
    }

    if (spec.type === 'computed') {
        var jobSpec = spec.intellistreamJobSpec;
        var pipelineSpec = jobSpec.pipelineSpec;
        var processingSpecs = pipelineSpec.processingSpecs;

        if (processingSpecs) {
            ret['_procsType'] = processingSpecs.type;

            processingSpecs.forEach(function(child) {
                if (child.primaryStream) {

                    childSpec = findSpecByName(activeSpecs, child.primaryStream.streamName);
                    if (childSpec) {
                        childRec = {
                            name: childSpec.name,
                            uuid: childSpec.uuid,
                            type: childSpec.type,
                            children: []
                        };
                        grandchildHier = buildHierarchy(childSpec.uuid);
                        childRec.children.push(grandchildHier);
                    } else {

                        childRec = {
                            name: child.primaryStream.streamName,
                            procSpecType: 'primaryStream'
                        };
                    }
                    ret.children.push(childRec);
                }

                if (child.joinStreams) {
                    child.joinStreams.forEach(function(joinStream) {
                        // childHier = buildHierarchy
                        childSpec = findSpecByName(activeSpecs, child.streamName);

                        if (childSpec) {
                            childRec = {
                                name: childSpec.name,
                                uuid: childSpec.uuid,
                                type: childSpec.type,
                                children: []
                            };
                            grandchildHier = buildHierarchy(childSpec.uuid);
                            childRec.children.push(grandchildHier);

                        } else {
                            childRec = {
                                name: joinStream.streamName,
                                procSpecType: 'joinStream'
                            };
                        }

                        ret.children.push(childRec);
                    });
                }
            })
        }
    }

    return ret;
}


fs.writeFile("./curSpec.json", JSON.stringify(result, null, '  '), function(err) {
    if(err) {
        return console.log(err);
    }

    console.log("The file was saved!");
});
