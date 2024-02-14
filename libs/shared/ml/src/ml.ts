import * as tf from '@tensorflow/tfjs-node';

// Training data for labeling the saving capacity of a user.
const inputs = [
  [1600, 800],
  [2000, 1200],
  [1500, 1000],
  [2000, 1500],
  [1800, 1600],
  [2000, 2200],
  [1300, 1600]
];
const outputs = [2, 2, 1, 1, 0, 0, 0];

// Create a new sequential model.
const model = tf.sequential();

// The first layer in the model expects an input shape of 2, corresponding to the two features (monthly income and expenses).
model.add(tf.layers.dense({ units: 10, inputShape: [2], activation: 'relu' }));

// The second layer has 3 units, corresponding to the three classes ("low", "medium", "high").
model.add(tf.layers.dense({ units: 3, activation: 'softmax' }));

// This prepares the model for training.
model.compile({ loss: 'categoricalCrossentropy', optimizer: 'sgd' });

// Convert the data to tensors.
// xs represents the features (monthly income and expenses).
// ys represents the labels (0 for "low", 1 for "medium", 2 for "high").
const xs = tf.tensor2d(inputs);
const ys = tf.oneHot(tf.tensor1d(outputs, 'int32'), 3);

// Train the model using the data.
// The number of epochs is 50, meaning the model will see the data 50 times.
model.fit(xs, ys, { epochs: 1000 });

// Use the model to make predictions.
const predictions = model.predict(tf.tensor2d([[1500, 600], [2500, 800]])) as tf.Tensor<tf.Rank>;

// The predictions are probabilities for each class. To get the most likely class, we can use argMax.
predictions.argMax(-1).print(false);

