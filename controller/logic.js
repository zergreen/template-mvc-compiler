const { Operator } = require("./operator");
class Logic {
  compile(inputCode, model) {
    let tokens = [];
    let lines = inputCode.split("\n");

    for (let line of lines) {
      line = line.trim();

      if (model === "Model1") {
        if (line.startsWith("declare")) {
          const [keyword, identifier] = line.split(" ");
          tokens.push({ type: "Keyword", value: keyword });
          tokens.push({ type: "Identifier", value: identifier });
        } else {
          const parts = line.split(" ");
          for (const part of parts) {
            if (part.match(/^\d+$/)) {
              tokens.push({ type: "Literal", value: part });
            } else if (part.match(/^[+=]$/)) {
              tokens.push({ type: "Symbol", value: part });
            } else if (part.match(/^[a-zA-Z_]\w*$/)) {
              tokens.push({ type: "Identifier", value: part });
            }
          }
        }
      } else if (model === "Model2") {
        if (line.startsWith("declare")) {
          const [keyword, variable] = line.split(" ");
          tokens.push({ type: "Keyword and Sign", value: keyword });
          tokens.push({ type: "Variable", value: variable });
        } else {
          const parts = line.split(" ");
          for (const part of parts) {
            if (part.match(/^\d+$/)) {
              tokens.push({ type: "Integer", value: part });
            } else if (part === "=") {
              tokens.push({ type: "Assignment", value: part });
            } else if (part === "+") {
              tokens.push({ type: "Keyword and Sign", value: part });
            } else if (part.match(/^[a-zA-Z_]\w*$/)) {
              tokens.push({ type: "Variable", value: part });
            }
          }
        }
      }
    }
    return tokens;
  }

  addDataLogic = async (compiler, res) => {
    let model1Tokens = await this.compile(
      compiler.src_code,
      compiler.model_type
    );
    model1Tokens.forEach((token) => {
      compiler.output_syntax += `${token.value} is ${token.type}` + "\n";
    });

    new Operator().addDataOperator(compiler, res);
  };

  getAllDataLogic = (req, res) => {
    new Operator().getAllDataOperator(req, res);
  };

  deleteDataLogic = (compiler, res) => {
    new Operator().deleteDataOperator(compiler, res);
  };

  reportLogic = (res) => {
    new Operator().getDataOperator(res);
  };

  // editDataEndpointLogic = async (compiler, res) => {
  //   const model1Tokens = await this.compile(
  //     compiler.src_code,
  //     compiler.model_type
  //   );
  //   model1Tokens.forEach((token) => {
  //     compiler.output_syntax += `${token.value} is ${token.type}` + "\n";
  //   });
  //   new Operator().editDataOperator(compiler, res);
  // };
}

module.exports = {
  Logic,
};
