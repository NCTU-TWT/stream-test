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
var socket = new net.Socket;

socket.connect(port, host);

socket.on('connect', function () {

    console.log('connection to ' + host + ':' + port + ' established'); 
    
    
    // chart
    var chart = generator.sinusoid.chart();
    
    if (socket.writable) {
        socket.write(JSON.stringify(chart));
    }
    
    setInterval(function () {
    
        // value
        var value = generator.sinusoid.value(chart.value.sinusoid);
        
        if (socket.writable) {
            socket.write(JSON.stringify(value));
        }
       
    }, 500);
        
    
});

var reconnect = function () {
    setTimeout(function () {
        console.log('reconnect in 3 secs');
        socket.connect(port, host);
        
    }, 3000);
};


socket.on('error', function (err) {
    console.log(err);
    reconnect();
});

socket.on('end', function (err) {
    console.log('socket end');
    reconnect();
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

