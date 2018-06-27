const express = require('express');
const router = express.Router();
const GameController = require('../../services/game');
const GameRules = require('../../services/game/rules');
const game = new GameController(new GameRules());

router.post('/game', (req, res) => res.status(200).json(game.generateCombination()));

module.exports = router;
