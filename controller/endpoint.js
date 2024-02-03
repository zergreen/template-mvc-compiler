const { Logic } = require("./logic");
const model = require("../model/model");
class Endpoint {
  constructor() {
    this.arrays = model.arrays;
  }

  arrayProcessEndpoint = (req, res) => {
    const { inputs, mode } = req.body;
    this.arrays.inputs = inputs;
    this.arrays.mode = mode;
    new Logic().arrayProcessLogic(this.arrays, res);
  }

  arrayResultEndpoint = (req,res) => {
    new Logic().arrayResultLogic(req,res);
  }

  arrayDeleteIndexEndpoint = (req, res) => {
    const index = parseInt(req.params.index, 10);
    new Logic().arrayDeleteIndexLogic(index, res);
  }

}

module.exports = {
  Endpoint,
};
