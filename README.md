# mlp #

implementation of a multilayer perceptron which can be trained using the backpropagation algorithm

## installation ##

	npm install mlp

Using *[browserify](https://github.com/substack/node-browserify)*, mlp can be used in a browser as well.

## how to use ##

### initialize a new perceptron

	// create the perceptron
	var MLP = require('mlp');
	var mlp = new MLP(2,3);

	// add hidden layers and initialize
	mlp.addHiddenLayer(5);
	mlp.addHiddenLayer(5);
	mlp.init();

The amount and dimensions of the hidden layers has to correspond with the problem,
you want to solve (think about *[overfitting](http://en.wikipedia.org/wiki/Overfitting)*)...

### train the perceptron

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

Depending on the training set, the learn rate and the structure of the perceptron, this step may take a while.
If necessary, you can add additional exit conditions to the loop (e.g. a maximum number of iterations).

If you want to restart the training, you have to clear the training set and to reset the weights:

	mlp.clearTrainingSet();
	mlp.resetWeights();

### classify element

	var elementToClassify = [1, 1];
	var classification = mlp.classify(elementToClassify);

The vector *classification* contains in each component the probability
that the element belongs to the associated class.

### export and import of mlp data

After training the perceptron, you can export the weights to save them for later use:

	var data = mlp.exportToJson();

The export is a simple JSON object that can be imported again as follows:

	mlp.setWeights(data);

## Changelog

### 1.1.0 / 2016-06-30

Add methods *exportToJson* and *setWeights* to export and import a perceptron.

## License
Copyright (c) 2015-2016 Ulf Biallas. Licensed under the [MIT license][MIT].
[MIT]: https://github.com/ulfbiallas/npm-mlp/blob/master/LICENSE
