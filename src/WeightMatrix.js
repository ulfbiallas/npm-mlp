function WeightMatrix(inputDimension, outputDimension, initialWeightScale) {

	this.inputDimension = inputDimension;
	this.outputDimension = outputDimension;
	this.w = new Array();

	for (var k=0; k<inputDimension*outputDimension; ++k) {
		this.w.push( 2*initialWeightScale*Math.random() - initialWeightScale);
	}
}



module.exports = WeightMatrix;