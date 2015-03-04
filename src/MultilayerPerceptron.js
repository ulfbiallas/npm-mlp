var Layer = require('./Layer');
var WeightMatrix = require('./WeightMatrix');
var TrainingElement = require('./TrainingElement');



function MultilayerPerceptron(inputDimension, outputDimension) {

	this.inputDimension = inputDimension;
	this.outputDimension = outputDimension;
	this.h = 1;

	this.weights = new Array();
	this.layers = new Array();
	this.trainingSet = new Array();
	this.layers.push(new Layer(this.inputDimension));
}



MultilayerPerceptron.prototype.addHiddenLayer = function(layerDimension) {
	this.layers.push(new Layer(layerDimension));
	this.h++;
}



MultilayerPerceptron.prototype.addToTrainingSet = function(input, output) {
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
	if (x.length == this.inputDimension) {
		for (var i=0; i<this.inputDimension; ++i) {
			this.layers[0].output[i] = x[i];
		}
		for (var h=1; h<this.h; ++h) {
			this.calcLayerInput(h);
			this.calcLayerOutput(h);
		}
		return this.layers[this.h-1].output;
	}
	return x;
}



MultilayerPerceptron.prototype.train = function(eta) {
	var trainingSetError = 0;
	for (var t=0; t<this.trainingSet.length; ++t) {
	
		var te = this.trainingSet[t];
		var x = te.input;
		var y_soll = te.output;
		var y_ist = this.classify(x);

		var err = 0;
		for (var i=0; i<y_ist.length; ++i) {
			err +=(y_soll[i] - y_ist[i]) * (y_soll[i] - y_ist[i]);
		}

		trainingSetError += err * err;

		for (var i=0; i<this.layers[this.h-1].dimension; ++i) {
			this.layers[this.h-1].error[i] = y_soll[i] - y_ist[i];
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
	for (var i=0; i<this.layers[h].dimension; ++i) {
		this.layers[h].output[i] = this.psi( this.layers[h].input[i] );
	}
}



MultilayerPerceptron.prototype.calcLayerError = function(h) {
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
	var weightMatrix = this.weights[h-1];
	for (var i=0; i<weightMatrix.outputDimension; ++i) {
		for (var j=0; j<weightMatrix.inputDimension; ++j) {
			var dw = eta * ( this.layers[h].error[i] * this.layers[h-1].output[j] );
			weightMatrix.w[i * weightMatrix.inputDimension + j] += dw;
		}
	}
}



MultilayerPerceptron.prototype.psi = function(x) {
	var a = 0.5;
	return 1.0 / (1.0+Math.exp(-a*x));
}



MultilayerPerceptron.prototype.dpsidx = function(x) {
	return this.psi(x) * (1.0-this.psi(x)); 
}



module.exports = MultilayerPerceptron;