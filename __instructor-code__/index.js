const express = require('express');
const bodyParser = require('./body-parser');
const axios = require('axios');
const answers = require('./answers');

const app = express();

app.use(bodyParser.json());
app.use((req, res, next) => {
  if (!req.body.name) {
    res.status(400).send('You did not specify a name in the request body');
    return;
  }
  next();
});

function security1(req, res, next) {
  if (req.body.security1 === 9 * 9) {
    next();
  } else {
    res.status(400).send('You failed challenge 1');
  }
}

function legPressCheck(req, res, next) {
  if (req.body.howManyLegPressesCanTylerDo === answers.howManyLegPressesCanTylerDo) {
    next();
  } else {
    console.log(req.body.name + ' has completed challenge 2');
    res.status(400).send('You passed challenge 2! But you failed challenge 3');
  }
}

function awesomenessCheck(req, res, next) {
  axios.post(`http://localhost:${port}/who`, { name: req.body.name }).then(response => {
    if (req.body.whoIsAwesome === response.data) {
      next();
    } else {
      console.log(req.body.name + ' has completed challenge 3');
      res.status(400).send('You passed challenge 3! But you failed challenge 4');
    }
  }).catch(error => {
    console.log('error', error);
  })
}

app.post('/challenge', security1, cityCheck, legPressCheck, awesomenessCheck, (req, res) => {
  console.log(req.body.name + ' has completed all challenges!');
  res.json({
    message: 'You did it!',
    whoIsAwesome: req.body.name + '!',
  });
})

app.post('/who', (req, res) => {
  res.send('me');
});

const port = 3005;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

function cityCheck(req, res, next) {
  if (req.query.cool_city === 'phoenix') {
    next();
  } else {
    console.log(req.body.name + ' has completed challenge 1');
    res.status(400).send('You passed challenge 1! But you failed challenge 2');
  }
}