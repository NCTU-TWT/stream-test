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
    
    
    var data    = {};
    
    
    
    setInterval(function () {
    
        // value
        data.sinusoid   = generator.sinusoid();
        data.foo        = generator.foo();
        
        if (socket.writable) {
            for(key in data)
                socket.write(JSON.stringify(data[key]));
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
    sinusoid: function () {
        var now = (new Date).getTime();
        return {
            name: 'Sinusoid',
            value: Math.sin(now/200),
            unit: '',
            upperBound: 1,
            lowerBound: -1
        };
    },
    foo: function () {
        var now = (new Date).getTime();
        return {
            name: 'Foo',
            value: Math.sin(now/100),
            unit: '',
            upperBound: 1,
            lowerBound: -1
        };
    }
};

