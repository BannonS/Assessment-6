const express = require('express');
const path = require('path');
const cors = require('cors');
const bots = require("./src/botsData");
const shuffle = require("./src/shuffle");
const axios = require('axios');
const app = express();

// Updated ip address
const baseURL = 'http://35.89.218.209/api';

const axiosInstance = axios.create({
  baseURL: baseURL,
});

app.get('/api/data', async (req, res) => {
  try {
    const response = await axiosInstance.get('/data');
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching data:', error);
    res.sendStatus(500);
  }
});

const playerRecord = {
  wins: 0,
  losses: 0,
};

app.use(express.json());
app.use(cors());


app.use(express.static(path.join(__dirname, 'public')));

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});


// Add up the total health of all the robots
const calculateTotalHealth = (robots) =>
  robots.reduce((total, { health }) => total + health, 0);

// Add up the total damage of all the attacks of all the robots
const calculateTotalAttack = (robots) =>
  robots
    .map(({ attacks }) =>
      attacks.reduce((total, { damage }) => total + damage, 0)
    )
    .reduce((total, damage) => total + damage, 0);

// Calculate both players' health points after the attacks
const calculateHealthAfterAttack = ({ playerDuo, compDuo }) => {
  const compAttack = calculateTotalAttack(compDuo);
  const playerHealth = calculateTotalHealth(playerDuo);
  const playerAttack = calculateTotalAttack(playerDuo);
  const compHealth = calculateTotalHealth(compDuo);

  return {
    compHealth: compHealth - playerAttack,
    playerHealth: playerHealth - compAttack,
  };
};

app.get("/api/robots", (req, res) => {
  try {
    res.status(200).send(bots);
  } catch (error) {
    console.error("ERROR GETTING BOTS", error);

    rollbar.error('Error getting bots', { error });

    rollbar.info('Additional information about the error', { request: req });

    res.sendStatus(400);
  }
});

app.get("/api/robots/shuffled", (req, res) => {
  try {
    let shuffled = shuffle(bots);
    res.status(200).send(shuffled);
  } catch (error) {
    console.error("ERROR GETTING SHUFFLED BOTS", error);
    res.sendStatus(400);
  }
});

app.post("/api/duel", (req, res) => {
  try {
    const { compDuo, playerDuo } = req.body;

    const { compHealth, playerHealth } = calculateHealthAfterAttack({
      compDuo,
      playerDuo,
    });

    // comparing the total health to determine a winner
    if (compHealth > playerHealth) {
      playerRecord.losses += 1;
      res.status(200).send("You lost!");
    } else {
      playerRecord.wins += 1;
      res.status(200).send("You won!");
    }
  } catch (error) {
    console.log("ERROR DUELING", error);

    rollbar.error('Error dueling', { error });

    res.sendStatus(400);
  }
});

app.get("/api/player", (req, res) => {
  try {
    res.status(200).send(playerRecord);
  } catch (error) {
    console.log("ERROR GETTING PLAYER STATS", error);

    rollbar.error('Error getting player stats', { error })

    res.sendStatus(400);
  }
});

app.listen(8000, () => {
  console.log(`Listening on 8000`);
});

const Rollbar = require('rollbar');

const rollbar = new Rollbar({
  accessToken: '3f6ba29398bc4ab1a7b888c3e7eca164',
  captureUncaught: true,
  captureUnhandledRejections: true
});

app.use(rollbar.errorHandler());

