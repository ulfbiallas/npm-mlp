function Layer(dimension) {

	if ( !(typeof dimension == 'number' && dimension % 1 == 0 && dimension > 0) ) {
		throw new TypeError( 'Layer: dimension has to be a positive integer!' );
	}

	this.dimension = dimension;
	this.input = new Array();
	this.output = new Array();
	this.error = new Array();

	for (var k=0; k<dimension; ++k) {
		this.input.push(0);
		this.output.push(0);
		this.error.push(0);
	}
}



module.exports = Layer;