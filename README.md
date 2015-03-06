# mlp #

implementation of a multilayer perceptron which can be trained using the backpropagation algorithm

### installation ###

	npm install mlp

### how to use ###

	// create a new perceptron
	var MLP = require('mlp');
	var mlp = new MLP(2,3);

	// add hidden layers and initialize
	mlp.addHiddenLayer(5);
	mlp.addHiddenLayer(5);
	mlp.init();

The amount and dimensions of the hidden layers has to correspond with the problem, 
you want to solve (think about *overfitting*)...

	// create a training set
	mlp.addToTrainingSet([2, 1], [1, 0, 0]);
	mlp.addToTrainingSet([0, 1], [1, 0, 0]);
	mlp.addToTrainingSet([3, 4], [0, 1, 0]);
	mlp.addToTrainingSet([2, 3], [0, 1, 0]);
	mlp.addToTrainingSet([1, 0], [0, 0, 1]);
	mlp.addToTrainingSet([3, 1], [0, 0, 1]);

	// train the perceptron
	var learnRate = 0.5;
	var error = Number.MAX_VALUE;
	while (error > 0.01) {
		error = mlp.train(learnRate);
	}

Depending on the training set, the learn rate and the structure of the perceptron, this step can take a while.
If necessary, you can add additional exit conditions to the loop (e.g. a maximum number of iterations).

	// classify element
	var element = [1, 1];
	var classification = mlp.classify(element);

The vector *classification* contains in each component the probability
that the element belongs to the associated class.