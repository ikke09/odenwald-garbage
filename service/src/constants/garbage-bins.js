const GarbageBin = require('../models/garbage-bin');

const allPossibleGarbageBins = [
  new GarbageBin('Rest', 'Restmüll', '#d4d9dd'),
  new GarbageBin('Bio', 'Biomüll', '#6aff83'),
  new GarbageBin('Papier', 'Papiermüll', '#86d7ff'),
  new GarbageBin('Gelber-Sack', 'Plastikmüll', '#ffff53'),
  new GarbageBin('SA', 'Sondermüll', '#e398ff')
];

module.exports = allPossibleGarbageBins;
