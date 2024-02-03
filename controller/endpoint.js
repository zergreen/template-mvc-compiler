const { Logic } = require("./logic");
const model = require("../model/model");
class Endpoint {
  constructor() {
    this.compiler = model.compiler;
  }

  addDataEndpoint = (req, res) => {
    this.compiler.src_code = req.body.src_code;
    this.compiler.model_type = req.body.model_type;
    console.table(this.compiler);
    new Logic().addDataLogic(this.compiler, res);
  };

  getAllDataEndpoint = (req, res) => {
    new Logic().getAllDataLogic(req, res);
  };

  deleteDataEndpoint = (req, res) => {
    this.compiler.id = req.params.id;
    new Logic().deleteDataLogic(this.compiler, res);
  };

  reportEndpoint = (req, res) => {
    new Logic().reportLogic(res);
  };

//   editDataEndpoint = (req, res) => {
//     this.compiler.id = req.body.id;
//     this.compiler.src_code = req.body.src_code;
//     this.compiler.output_syntax = req.body.output_syntax;
//     new Logic().editDataEndpointLogic(this.compiler, res);
//   };
}

module.exports = {
  Endpoint,
};
