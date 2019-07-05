let x = 1;
const Witch = require('../models/Witch');

x = new Witch('Jimmy');

console.log(`client script ${x.name}`);
