var Layer = require('./Layer');
var WeightMatrix = require('./WeightMatrix');
var TrainingElement = require('./TrainingElement');



function MultilayerPerceptron(inputDimension, outputDimension) {

	if ( !(typeof inputDimension == 'number' && inputDimension % 1 == 0 && inputDimension > 0) ) {
		throw new TypeError( 'MultilayerPerceptron: inputDimension has to be a positive integer!' );
	}

	if ( !(typeof outputDimension == 'number' && outputDimension % 1 == 0 && outputDimension > 0) ) {
		throw new TypeError( 'MultilayerPerceptron: outputDimension has to be a positive integer!' );
	}

	this.inputDimension = inputDimension;
	this.outputDimension = outputDimension;
	this.h = 1;

	this.weights = new Array();
	this.layers = new Array();
	this.trainingSet = new Array();
	this.layers.push(new Layer(this.inputDimension));
}



MultilayerPerceptron.prototype.addHiddenLayer = function(layerDimension) {

	if ( !(typeof layerDimension == 'number' && layerDimension % 1 == 0 && layerDimension > 0) ) {
		throw new TypeError( 'MultilayerPerceptron::addHiddenLayer: layerDimension has to be a positive integer!' );
	}

	this.layers.push(new Layer(layerDimension));
	this.h++;
}



MultilayerPerceptron.prototype.addToTrainingSet = function(input, output) {

	if ( !(Array.isArray(input) && input.length == this.inputDimension) ) {
		throw new TypeError( 'MultilayerPerceptron::addToTrainingSet: input has to be an array of input dimension!' );
	}

	if ( !(Array.isArray(output) && output.length == this.outputDimension) ) {
		throw new TypeError( 'MultilayerPerceptron::addToTrainingSet: output has to be an array of output dimension!' );
	}

	this.trainingSet.push(new TrainingElement(input, output));
}



MultilayerPerceptron.prototype.init = function() {
	this.layers.push(new Layer(this.outputDimension));
	this.h++;
	this.resetWeights();
}



MultilayerPerceptron.prototype.resetWeights = function() {
	this.weights.length = 0;
	for (var i=0; i<this.h-1; ++i) {
		var dim0 = this.layers[i].dimension;
		var dim1 = this.layers[i+1].dimension;
		var wm = new WeightMatrix(dim0, dim1, 1.0);
		this.weights.push(wm);
	}
}



MultilayerPerceptron.prototype.classify = function(x) {

	if ( !(Array.isArray(x) && x.length == this.inputDimension) ) {
		throw new TypeError( 'MultilayerPerceptron::classify: element has to be an array of input dimension!' );
	}

	for (var i=0; i<this.inputDimension; ++i) {
		this.layers[0].output[i] = x[i];
	}
	for (var h=1; h<this.h; ++h) {
		this.calcLayerInput(h);
		this.calcLayerOutput(h);
	}

	return this.layers[this.h-1].output;
}



MultilayerPerceptron.prototype.train = function(eta) {

	if ( !(typeof eta == 'number' && eta > 0) ) {
		throw new TypeError( 'MultilayerPerceptron::train: learn rate has to be a positive number!' );
	}

	var trainingSetError = 0;
	for (var t=0; t<this.trainingSet.length; ++t) {
	
		var te = this.trainingSet[t];
		var x = te.input;
		var y_desired = te.output;
		var y_actual = this.classify(x);

		var err = 0;
		for (var i=0; i<y_actual.length; ++i) {
			err +=(y_desired[i] - y_actual[i]) * (y_desired[i] - y_actual[i]);
		}

		trainingSetError += err * err;

		for (var i=0; i<this.layers[this.h-1].dimension; ++i) {
			this.layers[this.h-1].error[i] = y_desired[i] - y_actual[i];
		}

		for (var h=this.h-2; h>=0; h--) {
			this.calcLayerError(h);
		}

		for (var h=1; h<this.h; ++h) {
			this.updateWeights(h, eta);
		}
	}
	return Math.sqrt(trainingSetError);
}



MultilayerPerceptron.prototype.calcLayerInput = function(h) {

	if ( !(typeof h == 'number' && h % 1 == 0 && h >= 0) ) {
		throw new TypeError( 'MultilayerPerceptron::calcLayerInput: h has to be a non-negative integer!' );
	}

	if(h>0 && h<this.h) {
		var weightMatrix = this.weights[h-1];
		for(var i=0; i<this.layers[h].dimension; ++i) {
			this.layers[h].input[i] = 0;
			for(var j=0; j<this.layers[h-1].dimension; ++j) {
				this.layers[h].input[i] += this.layers[h-1].output[j] * weightMatrix.w[i * weightMatrix.inputDimension + j];
			}
		}
	}
}



MultilayerPerceptron.prototype.calcLayerOutput = function(h) {

	if ( !(typeof h == 'number' && h % 1 == 0 && h >= 0) ) {
		throw new TypeError( 'MultilayerPerceptron::calcLayerOutput: h has to be a non-negative integer!' );
	}

	for (var i=0; i<this.layers[h].dimension; ++i) {
		this.layers[h].output[i] = this.psi( this.layers[h].input[i] );
	}
}



MultilayerPerceptron.prototype.calcLayerError = function(h) {

	if ( !(typeof h == 'number' && h % 1 == 0 && h >= 0) ) {
		throw new TypeError( 'MultilayerPerceptron::calcLayerError: h has to be a non-negative integer!' );
	}

	var weightMatrix = this.weights[h];
	for (var i=0; i<this.layers[h].dimension; ++i) {
		var sum = 0;
		for (var j=0; j<this.layers[h+1].dimension; ++j) {
			sum += weightMatrix.w[j * weightMatrix.inputDimension + i] * this.layers[h+1].error[j];
		}
		this.layers[h].error[i] = this.dpsidx( this.layers[h].input[i] ) * sum;
	}
}



MultilayerPerceptron.prototype.updateWeights = function(h, eta) {

	if ( !(typeof h == 'number' && h % 1 == 0 && h >= 0) ) {
		throw new TypeError( 'MultilayerPerceptron::updateWeights: h has to be a non-negative integer!' );
	}

	if ( !(typeof eta == 'number' && eta > 0) ) {
		throw new TypeError( 'MultilayerPerceptron::updateWeights: eta has to be a positive number!' );
	}

	var weightMatrix = this.weights[h-1];
	for (var i=0; i<weightMatrix.outputDimension; ++i) {
		for (var j=0; j<weightMatrix.inputDimension; ++j) {
			var dw = eta * ( this.layers[h].error[i] * this.layers[h-1].output[j] );
			weightMatrix.w[i * weightMatrix.inputDimension + j] += dw;
		}
	}
}



MultilayerPerceptron.prototype.psi = function(x) {

	if ( !(typeof x == 'number') ) {
		throw new TypeError( 'MultilayerPerceptron::psi: x has to be a number!' );
	}

	var a = 0.5;
	return 1.0 / (1.0+Math.exp(-a*x));
}



MultilayerPerceptron.prototype.dpsidx = function(x) {

	if ( !(typeof x == 'number') ) {
		throw new TypeError( 'MultilayerPerceptron::dpsidx: x has to be a number!' );
	}

	return this.psi(x) * (1.0-this.psi(x)); 
}



module.exports = MultilayerPerceptron;