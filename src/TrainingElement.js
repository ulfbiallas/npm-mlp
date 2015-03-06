function TrainingElement(input, output) {

	if ( !(Array.isArray(input) && input.length>0) ) {
		throw new TypeError( 'TrainingElement: input has to be an non-empty array!' );
	}

	if ( !(Array.isArray(output) && output.length>0) ) {
		throw new TypeError( 'TrainingElement: output has to be an non-empty array!' );
	}

	this.input = input;
	this.output = output;
}



module.exports = TrainingElement;