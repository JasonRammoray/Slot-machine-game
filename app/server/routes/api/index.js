const express = require('express');
/* eslint-disable new-cap */
const router = express.Router();
/* eslint-enable new-cap */
const GameController = require('../../services/game');
const GameRules = require('../../services/game/rules');
const game = new GameController(new GameRules());

router.post('/game', (req, res) => res.status(200).json(game.generateCombination()));

module.exports = router;
