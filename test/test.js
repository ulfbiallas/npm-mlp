'use strict';

var chai = require( 'chai' );
var expect = chai.expect;
var assert = chai.assert;

var MLP = require('../');



describe( 'package', function tests() {

	it( 'test if mlp is a function', function test() {
		expect( MLP ).to.be.a( 'function' );
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
});



function test_addHiddenLayer(parameter) {
	return function() {
		var mlp = new MLP(1,1);
		mlp.addHiddenLayer(parameter);
	}
}