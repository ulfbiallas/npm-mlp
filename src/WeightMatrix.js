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



module.exports = WeightMatrix;