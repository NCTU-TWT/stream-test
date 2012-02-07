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
    
    
    setInterval(function () {
    
        var data = JSON.stringify(generator.sinusoid());
       
        client.write(data);
    }, 100);
    
    
});

client.on('error', function (err) {
    console.log(err);
});

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
    }
};

