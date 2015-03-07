var Layer = require('./Layer');
var WeightMatrix = require('./WeightMatrix');
var TrainingElement = require('./TrainingElement');

var weights = new Array();
var layers = new Array();
var trainingSet = new Array();
var layerCount = 1;



function MultilayerPerceptron(inputDimension, outputDimension) {

	if ( !(typeof inputDimension == 'number' && inputDimension % 1 == 0 && inputDimension > 0) ) {
		throw new TypeError( 'MultilayerPerceptron: inputDimension has to be a positive integer!' );
	}

	if ( !(typeof outputDimension == 'number' && outputDimension % 1 == 0 && outputDimension > 0) ) {
		throw new TypeError( 'MultilayerPerceptron: outputDimension has to be a positive integer!' );
	}

	this.inputDimension = inputDimension;
	this.outputDimension = outputDimension;

	layers.push(new Layer(this.inputDimension));
}



MultilayerPerceptron.prototype.addHiddenLayer = function(layerDimension) {

	if ( !(typeof layerDimension == 'number' && layerDimension % 1 == 0 && layerDimension > 0) ) {
		throw new TypeError( 'MultilayerPerceptron::addHiddenLayer: layerDimension has to be a positive integer!' );
	}

	layers.push(new Layer(layerDimension));
	layerCount++;
}



MultilayerPerceptron.prototype.addToTrainingSet = function(input, output) {

	if ( !(Array.isArray(input) && input.length == this.inputDimension) ) {
		throw new TypeError( 'MultilayerPerceptron::addToTrainingSet: input has to be an array of input dimension!' );
	}

	if ( !(Array.isArray(output) && output.length == this.outputDimension) ) {
		throw new TypeError( 'MultilayerPerceptron::addToTrainingSet: output has to be an array of output dimension!' );
	}

	trainingSet.push(new TrainingElement(input, output));
}



MultilayerPerceptron.prototype.init = function() {
	layers.push(new Layer(this.outputDimension));
	layerCount++;
	this.resetWeights();
}



MultilayerPerceptron.prototype.resetWeights = function() {
	weights.length = 0;
	for (var i=0; i<layerCount-1; ++i) {
		var dim0 = layers[i].dimension;
		var dim1 = layers[i+1].dimension;
		var wm = new WeightMatrix(dim0, dim1, 1.0);
		weights.push(wm);
	}
}



MultilayerPerceptron.prototype.classify = function(x) {

	if ( !(Array.isArray(x) && x.length == this.inputDimension) ) {
		throw new TypeError( 'MultilayerPerceptron::classify: element has to be an array of input dimension!' );
	}

	for (var i=0; i<this.inputDimension; ++i) {
		layers[0].output[i] = x[i];
	}
	for (var h=1; h<layerCount; ++h) {
		calcLayerInput(h);
		calcLayerOutput(h);
	}

	return layers[layerCount-1].output;
}



MultilayerPerceptron.prototype.train = function(eta) {

	if ( !(typeof eta == 'number' && eta > 0) ) {
		throw new TypeError( 'MultilayerPerceptron::train: learn rate has to be a positive number!' );
	}

	var trainingSetError = 0;
	for (var t=0; t<trainingSet.length; ++t) {
	
		var te = trainingSet[t];
		var x = te.input;
		var y_desired = te.output;
		var y_actual = this.classify(x);

		var err = 0;
		for (var i=0; i<y_actual.length; ++i) {
			err +=(y_desired[i] - y_actual[i]) * (y_desired[i] - y_actual[i]);
		}

		trainingSetError += err * err;

		for (var i=0; i<layers[layerCount-1].dimension; ++i) {
			layers[layerCount-1].error[i] = y_desired[i] - y_actual[i];
		}

		for (var h=layerCount-2; h>=0; h--) {
			calcLayerError(h);
		}

		for (var h=1; h<layerCount; ++h) {
			updateWeights(h, eta);
		}
	}
	return Math.sqrt(trainingSetError);
}



function calcLayerInput(h) {

	if ( !(typeof h == 'number' && h % 1 == 0 && h >= 0) ) {
		throw new TypeError( 'MultilayerPerceptron::calcLayerInput: h has to be a non-negative integer!' );
	}

	if(h>0 && h<layerCount) {
		var weightMatrix = weights[h-1];
		for(var i=0; i<layers[h].dimension; ++i) {
			layers[h].input[i] = 0;
			for(var j=0; j<layers[h-1].dimension; ++j) {
				layers[h].input[i] += layers[h-1].output[j] * weightMatrix.w[i * weightMatrix.inputDimension + j];
			}
		}
	}
}



function calcLayerOutput(h) {

	if ( !(typeof h == 'number' && h % 1 == 0 && h >= 0) ) {
		throw new TypeError( 'MultilayerPerceptron::calcLayerOutput: h has to be a non-negative integer!' );
	}

	for (var i=0; i<layers[h].dimension; ++i) {
		layers[h].output[i] = psi( layers[h].input[i] );
	}
}



function calcLayerError(h) {

	if ( !(typeof h == 'number' && h % 1 == 0 && h >= 0) ) {
		throw new TypeError( 'MultilayerPerceptron::calcLayerError: h has to be a non-negative integer!' );
	}

	var weightMatrix = weights[h];
	for (var i=0; i<layers[h].dimension; ++i) {
		var sum = 0;
		for (var j=0; j<layers[h+1].dimension; ++j) {
			sum += weightMatrix.w[j * weightMatrix.inputDimension + i] * layers[h+1].error[j];
		}
		layers[h].error[i] = dpsidx( layers[h].input[i] ) * sum;
	}
}



function updateWeights(h, eta) {

	if ( !(typeof h == 'number' && h % 1 == 0 && h >= 0) ) {
		throw new TypeError( 'MultilayerPerceptron::updateWeights: h has to be a non-negative integer!' );
	}

	if ( !(typeof eta == 'number' && eta > 0) ) {
		throw new TypeError( 'MultilayerPerceptron::updateWeights: eta has to be a positive number!' );
	}

	var weightMatrix = weights[h-1];
	for (var i=0; i<weightMatrix.outputDimension; ++i) {
		for (var j=0; j<weightMatrix.inputDimension; ++j) {
			var dw = eta * ( layers[h].error[i] * layers[h-1].output[j] );
			weightMatrix.w[i * weightMatrix.inputDimension + j] += dw;
		}
	}
}



function psi(x) {

	if ( !(typeof x == 'number') ) {
		throw new TypeError( 'MultilayerPerceptron::psi: x has to be a number!' );
	}

	var a = 0.5;
	return 1.0 / (1.0+Math.exp(-a*x));
}



function dpsidx(x) {

	if ( !(typeof x == 'number') ) {
		throw new TypeError( 'MultilayerPerceptron::dpsidx: x has to be a number!' );
	}

	return psi(x) * (1.0-psi(x)); 
}



module.exports = MultilayerPerceptron;