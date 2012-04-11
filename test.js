
var V1 = function () {
    
};

V1.prototype.x = function () {
    return  {
        name: "x-axis",
        value: Math.sin(Date.now()/200)*40 + 50,
        unit: "",
        waveform: true,
        upperBound: 100,                                              
        lowerBound: 0,
        upperThreshold: 90,
        lowerThreshold: 10,
        reference: 50
    }
}


module.exports.V1 = V1;
