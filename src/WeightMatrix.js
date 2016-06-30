function WeightMatrix(inputDimension, outputDimension, initialWeightScale) {

	if ( !(typeof inputDimension == 'number' && inputDimension % 1 == 0 && inputDimension > 0) ) {
		throw new TypeError( 'WeightMatrix: inputDimension has to be a positive integer!' );
	}

	if ( !(typeof outputDimension == 'number' && outputDimension % 1 == 0 && outputDimension > 0) ) {
		throw new TypeError( 'WeightMatrix: outputDimension has to be a positive integer!' );
	}

	if ( !(typeof initialWeightScale == 'number' && initialWeightScale > 0) ) {
		throw new TypeError( 'WeightMatrix: initialWeightScale has to be a positive number!' );
	}

	this.inputDimension = inputDimension;
	this.outputDimension = outputDimension;
	this.w = new Array();

	for (var k=0; k<inputDimension*outputDimension; ++k) {
		this.w.push( 2*initialWeightScale*Math.random() - initialWeightScale);
	}
}



WeightMatrix.prototype.setWeights = function(data) {

	if ( !(Array.isArray(data) && data.length == (this.inputDimension * this.outputDimension)) ) {
		throw new TypeError( 'MultilayerPerceptron::setWeights: input has to be an array with size of inputDimension times outputDimension!' );
	}

	this.w = data;
}



module.exports = WeightMatrix;