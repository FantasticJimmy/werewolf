const express = require('express');

const exampleRouter = express.Router();

function router() {
  exampleRouter.route('/:id').get((req, res) => {
    res.send('cool');
  });
  return exampleRouter;
}

module.exports = router;
