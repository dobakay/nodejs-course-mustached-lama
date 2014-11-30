var fs = require('fs');
var CalculationStream = require('./calculationStream');

var numberCalculationStream = new CalculationStream();

fs.createReadStream('dump-file').pipe(numberCalculationStream);
