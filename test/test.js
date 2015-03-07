'use strict';

var chai = require( 'chai' );
var expect = chai.expect;
var assert = chai.assert;

var MLP_package = require('../');
var MLP = require('../src/MultilayerPerceptron');
var WeightMatrix = require('../src/WeightMatrix');
var Layer = require('../src/Layer');
var TrainingElement = require('../src/TrainingElement');


describe( 'package', function tests() {

	it( 'test if package mlp is a function', function test() {
		expect( MLP_package ).to.be.a( 'function' );
	});

});



describe( 'MultilayerPerceptron', function tests() {

	describe( 'Constructor', function tests() {

		it( 'test if error is thrown if no parameter is provided', function test() {
			expect( function(){ new MLP() } ).to.throw( TypeError );
		});

		it( 'test if error is thrown if not enough parameters are provided', function test() {
			expect( function(){ new MLP(1) } ).to.throw( TypeError );
		});

		it( 'test if error is thrown if a string is provided', function test() {
			expect( function(){ new MLP('abc') } ).to.throw( TypeError );
		});

		it( 'test if error is thrown if a non-integer number is provided', function test() {
			expect( function(){ new MLP(2.5, 2) } ).to.throw( TypeError );
		});

		it( 'test if error is thrown if a non-positive integer is provided', function test() {
			expect( function(){ new MLP(3, 0) } ).to.throw( TypeError );
		});

	});

	describe( 'addHiddenLayer', function tests() {

		it( 'test if error is thrown if no parameter is provided', function test() {
			expect( test_addHiddenLayer() ).to.throw( TypeError );
		});

		it( 'test if error is thrown if a string is provided', function test() {
			expect( test_addHiddenLayer('abc') ).to.throw( TypeError );
		});

		it( 'test if error is thrown if a non-integer number is provided', function test() {
			expect( test_addHiddenLayer(1.5) ).to.throw( TypeError );
		});

		it( 'test if error is thrown if a non-positive integer is provided', function test() {
			expect( test_addHiddenLayer(0) ).to.throw( TypeError );
		});

	});

	describe( 'addToTrainingSet', function tests() {

		it( 'test if error is thrown if no parameter is provided', function test() {
			expect( test_addToTrainingSet() ).to.throw( TypeError );
		});

		it( 'test if error is thrown if non-array parameters are provided', function test() {
			expect( test_addToTrainingSet(2,3) ).to.throw( TypeError );
		});

		it( 'test if error is thrown if arrays with wrong dimension are provided', function test() {
			expect( test_addToTrainingSet([5], [3]) ).to.throw( TypeError );
		});

		it( 'test if error is thrown if empty arrays are provided', function test() {
			expect( test_addToTrainingSet([], []) ).to.throw( TypeError );
		});

		it( 'test if error is thrown if not enough parameters are provided', function test() {
			expect( test_addToTrainingSet([1]) ).to.throw( TypeError );
		});

	});

	describe( 'classify', function tests() {

		it( 'test if error is thrown if no parameter is provided', function test() {
			expect( test_classify() ).to.throw( TypeError );
		});

		it( 'test if error is thrown if a non-array parameter is provided', function test() {
			expect( test_classify(2) ).to.throw( TypeError );
		});

		it( 'test if error is thrown if an array with wrong dimension is provided', function test() {
			expect( test_classify([5]) ).to.throw( TypeError );
		});

		it( 'test if error is thrown if an empty array is provided', function test() {
			expect( test_classify([]) ).to.throw( TypeError );
		});

	});

	describe( 'train', function tests() {

		it( 'test if error is thrown if no parameter is provided', function test() {
			expect( test_train() ).to.throw( TypeError );
		});

		it( 'test if error is thrown if a string is provided', function test() {
			expect( test_train('abc') ).to.throw( TypeError );
		});

		it( 'test if error is thrown if a non-positive number is provided', function test() {
			expect( test_train(0) ).to.throw( TypeError );
		});

		it( 'test if error is thrown if a negative number is provided', function test() {
			expect( test_train(-2.5) ).to.throw( TypeError );
		});

	});
});



describe( 'Layer', function tests() {

	describe( 'Constructor', function tests() {

		it( 'test if error is thrown if no parameter is provided', function test() {
			expect( function(){ new Layer() } ).to.throw( TypeError );
		});

		it( 'test if error is thrown if a string is provided', function test() {
			expect( function(){ new Layer('abc') } ).to.throw( TypeError );
		});

		it( 'test if error is thrown if a non-integer number is provided', function test() {
			expect( function(){ new Layer(2.5) } ).to.throw( TypeError );
		});

		it( 'test if error is thrown if a non-positive integer is provided', function test() {
			expect( function(){ new Layer(0) } ).to.throw( TypeError );
		});

	});
});



describe( 'WeightMatrix', function tests() {

	describe( 'Constructor', function tests() {

		it( 'test if error is thrown if no parameter is provided', function test() {
			expect( function(){ new WeightMatrix() } ).to.throw( TypeError );
		});

		it( 'test if error is thrown if not enough parameters are provided', function test() {
			expect( function(){ new WeightMatrix(1) } ).to.throw( TypeError );
		});

		it( 'test if error is thrown if a string is provided', function test() {
			expect( function(){ new WeightMatrix('abc', 1, 1) } ).to.throw( TypeError );
		});

		it( 'test if error is thrown if a non-integer number is provided', function test() {
			expect( function(){ new WeightMatrix(2.5, 2, 1) } ).to.throw( TypeError );
		});

		it( 'test if error is thrown if a non-positive integer as dimension is provided', function test() {
			expect( function(){ new WeightMatrix(3, 0, 1) } ).to.throw( TypeError );
		});

		it( 'test if error is thrown if a non-positive integer as initial weight scale is provided', function test() {
			expect( function(){ new WeightMatrix(3, 2, 0) } ).to.throw( TypeError );
		});

	});
});



describe( 'TrainingElement', function tests() {

	describe( 'Constructor', function tests() {

		it( 'test if error is thrown if no parameter is provided', function test() {
			expect( function(){ new TrainingElement() } ).to.throw( TypeError );
		});

		it( 'test if error is thrown if non-array parameters are provided', function test() {
			expect( function(){ new TrainingElement(2,3) } ).to.throw( TypeError );
		});

		it( 'test if error is thrown if empty arrays are provided', function test() {
			expect( function(){ new TrainingElement([], []) } ).to.throw( TypeError );
		});

		it( 'test if error is thrown if not enough parameters are provided', function test() {
			expect( function(){ new TrainingElement([1]) } ).to.throw( TypeError );
		});

	});
});



function test_addHiddenLayer(parameter) {
	return function() {
		var mlp = new MLP(1,1);
		mlp.addHiddenLayer(parameter);
	}
}

function test_addToTrainingSet(parameter1, parameter2) {
	return function() {
		var mlp = new MLP(1,2);
		mlp.addToTrainingSet(parameter1, parameter2);
	}
}

function test_classify(parameter) {
	return function() {
		var mlp = new MLP(2,1);
		mlp.init();
		mlp.classify(parameter);
	}
}

function test_train(parameter) {
	return function() {
		var mlp = new MLP(2,1);
		mlp.init();
		mlp.train(parameter);
	}
}