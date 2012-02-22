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
    
    
    var header  = {},
        data    = {};
    
    
    //
    //  headers
    //
    
    header.sinusoid = generator.sinusoid.header();
    header.foo      = generator.foo.header();
    
    if (socket.writable) {
        for(key in header)
            socket.write(JSON.stringify(header[key]));
    }
    
    //
    //  headers
    //
    
    setInterval(function () {
    
        // value
        data.sinusoid   = generator.sinusoid.data(header.sinusoid.stream.sinusoid);
        data.foo        = generator.foo.data(header.foo.stream.foo);
        
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
    sinusoid: {
        header: function () {
            return {
                session: IDGenerator(),
                name: 'sinusoid',
                stream: {
                    'sinusoid': IDGenerator()
                },
                upperBound: 1,
                lowerBound: -1,
                reference: 0
            }
        },
        data: function (id) {
            var now = (new Date).getTime();
            return {
                id: id,
                value: Math.sin(now/200),
                time: now            
            }
        }
    },
    foo: {
        header: function () {
            return {
                session: IDGenerator(),
                name: 'foo',
                stream: {
                    'foo': IDGenerator()
                },
                upperBound: 1,
                lowerBound: -1,
                reference: 0
            }
        },
        data: function (id) {
            var now = (new Date).getTime();
            return {
                id: id,
                value: Math.round(Math.sin(now/200)) * 0.8,
                time: now            
            }
        }
    }
};

