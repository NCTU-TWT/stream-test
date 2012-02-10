var net = require('net');


var port = 4900,
    host = 'localhost';
    
    
// argv
if (process.argv.length === 3) {
    port = process.argv[2];
} else if (process.argv.length === 4) {
    port = process.argv[2];
    host = process.argv[3];
}

// connection
var client = net.connect(port, host, function () {

    console.log('connection to ' + host + ':' + port + ' established'); 
    
    
    // chart
    var chart = generator.sinusoid.chart();
    client.write(JSON.stringify(chart));
    
    setInterval(function () {
    
        var value = generator.sinusoid.value(chart.value.sinusoid);
       client.write(JSON.stringify(value));
       
    }, 100);
    
    
});

client.on('error', function (err) {
    console.log(err);
});

var IDGenerator = function () {
    return Math.floor((Math.random() * 100000000))
};

// data generator
var generator = {
    sinusoid: {
        chart: function () {
            return {
                session: IDGenerator(),
                name: 'sinusoid',
                value: {
                    'sinusoid': IDGenerator()
                },
                upperBound: 1,
                lowerBound: -1,
                reference: 0
            }
        },
        value: function (id) {
            var now = (new Date).getTime();
            return {
                id: id,
                value: Math.sin(now/200),
                time: now            
            }
        }
    }
};

