function Layer(dimension) {
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