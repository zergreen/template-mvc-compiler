const { Operator } = require("./operator");
const arrayFunctions = require("./utils.js");

class Logic {
  arrayProcessLogic = (arrays, res) => {
    let result;

    try {
      switch (arrays.mode) {
        case "CPU":
          result = arrayFunctions.sumAdjacentNumbers(arrays.inputs.split(","));
          break;
        case "GPU":
          result = arrayFunctions.reverseHalves(arrays.inputs.split(","));
          break;
        case "FPGA":
          result = arrayFunctions.concatenateNonNumbers(arrays.inputs.split(","));
          break;
        default:
          throw new Error("Invalid mode");
      }

      // After processing the input
      const newEntry = {
        inputs: arrays.inputs.split(","),
        mode: arrays.mode,
        result: result,
      };

      new Operator().arrayProcessOperator(newEntry, res);
    } catch (error) {
      res.render("index", { result: null, error: error.message });
    }
  };

  arrayResultLogic = (req, res) => {
    new Operator().arrayResultOperator(req, res);
  };

  arrayDeleteIndexLogic = (index, res) => {
    new Operator().arrayDeleteIndexOperator(index, res);
  };
}

module.exports = {
  Logic,
};
