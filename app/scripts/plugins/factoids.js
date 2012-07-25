
define(['plugins/factoids'], function() {
    var fs = require('fs');
    console.log(fs);
    var factoids = {};

    function readLines(input, func) {
        var remaining = '';

        input.on('data', function(data) {
            remaining += data;
            var index = remaining.indexOf('\n');
            var last = 0;
            while (index > -1) {
                var line = remaining.substring(last, index);
                last = index + 1;
                func(line);
                index = remaining.indexOf('\n', last);
            }

            remaining = remaining.substring(last);
        });

        input.on('end', function() {
            if (remaining.length > 0) {
                func(remaining);
            }
        });
    }


    function buildArray(data) {
        var split = data.split(/=>/, 2);
        console.log(split[0] + " ...is... " + split[1]);
        factoids[split[0]] = split[1];
    }

    var input = fs.createReadStream('factoids.txt');
    readLines(input, buildArray);


    return {
        name: 'factoids',
        reply: function(args) {
            var result = factoids[args.rawInput];
            if (result) {
                return [1, result]
            } else {
                return [0, 'Sorry!'];
            }
        }
    }
}
);
