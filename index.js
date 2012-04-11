var Socket  = require('./socket').Socket,
    V1      = require('./test').V1;


var port = 4900,
    host = 'localhost',
    version = undefined;
    

    
// argv
if (process.argv.length === 3) {

    version = process.argv[2];
    port = process.argv[3];
    
} else if (process.argv.length === 5) {

    version = process.argv[2];
    port = process.argv[3];
    host = process.argv[4];
    
}

var v1 = new V1;

var socket = new Socket;
socket.connect(port, host);



socket.tick(function (s) {
    
    s.write(v1.x());
    
})








