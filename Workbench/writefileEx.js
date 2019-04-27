var fs = require('fs');

var obj = JSON.parse(fs.readFileSync('all_stream_specs.json', 'utf8'));

console.log('here');

// var activeSpecs = obj.filter(function(spec) {
//     return spec.active;
// });

fs.writeFile("./allSpecs.json", JSON.stringify(obj, null, '  '), function(err) {
    if(err) {
        return console.log(err);
    }

    console.log("The file was saved!");
});
