const { Operator } = require("./operator");
const path = require('path');
const fs = require('fs');

function sumAdjacentNumbers(stringArray) {

  console.log(444);
    let i = 0;
    while (i < stringArray.length - 1) {
        let currentNum = parseFloat(stringArray[i]);
        let nextNum = parseFloat(stringArray[i + 1]);
        if (!isNaN(currentNum) && !isNaN(nextNum)) {
            stringArray[i] = (currentNum + nextNum).toString();
            stringArray.splice(i + 1, 1);
        } else {
            i++;
        }
    }
    return stringArray;
}

 function concatenateNonNumbers(stringArray) {
    let i = stringArray.length - 2;
    while (i >= 0) {
        let canConvertI = !isNaN(parseFloat(stringArray[i]));
        let canConvertINext = !isNaN(parseFloat(stringArray[i + 1]));
        if (!canConvertI && !canConvertINext) {
            stringArray[i] = stringArray[i] + stringArray[i + 1];
            stringArray.splice(i + 1, 1);
        }
        i--;
    }
    return stringArray;
}

 function reverseHalves(array) {
    const midPoint = Math.floor(array.length / 2);
    const firstHalfReversed = array.slice(0, midPoint).reverse();
    const secondHalfReversed = array.slice(midPoint).reverse();
    return firstHalfReversed.concat(secondHalfReversed);
}

class Logic {
  // Include the processing functions here...
 
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

  // mvc

  getRoomLogic = (res) => {
    new Operator().getRoomOperator(res);
  };

  reserveRoomLogic = (rooms, res) => {
    new Operator().reserveRoomOperator(rooms, res);
  };

  getGameLogic = (res) => {
    new Operator().getGameOperator(res);
  };

  reserveGameLogic = (games, res) => {
    // console.log(games.gameId, games.reservedBy);
    new Operator().reserveGameOperator(games, res);
  };

  cancelReservationLogic = (rooms, res) => {
    new Operator().cancelReservationOperator(rooms, res);
  }

  arrayProcessLogic = (req, res) => {
    console.log('33');
    const { inputs, mode } = req.body;
    let result;
    console.log('22');


  try {
    console.log('44');

    console.log(mode);

    switch (mode) {
      case 'CPU':
        console.log(mode);
        result = sumAdjacentNumbers(inputs.split(','));
        console.log('1111');
        break;
      case 'GPU':
        result = reverseHalves(inputs.split(','));
        break;
      case 'FPGA':
        result = concatenateNonNumbers(inputs.split(','));
        break;
      default:
        throw new Error('Invalid mode');
    }



// After processing the input
const newEntry = {
    inputs: req.body.inputs.split(','),
    mode: req.body.mode,
    result: result
  };

  // Read the existing data, append the new entry, and write it back to the file
  fs.readFile(path.join(__dirname, 'results.json'), 'utf-8', (readErr, data) => {
    if (readErr && readErr.code !== 'ENOENT') {
      console.error(readErr);
      return res.render('index', { result: null, error: 'Failed to read results' });
    }
    
    let resultsData = [];
    if (data) {
      resultsData = JSON.parse(data);
    }
    resultsData.push(newEntry);

    fs.writeFile(path.join(__dirname, 'results.json'), JSON.stringify(resultsData, null, 2), 'utf-8', (writeErr) => {
      if (writeErr) {
        console.error(writeErr);
        // return res.render('index', { result: null, error: 'Failed to store results' });
      }
      // Render the home page with the updated results
    //   res.render('index', { resultsData: resultsData, error: null });
    });
  });



    res.render('index', { result, error: null });
  } catch (error) {
    res.render('index', { result: null, error: error.message });
  }
    // new Operator().arrayProcessOperator();
  }

  arrayResultLogic = (req, res) => {
    fs.readFile(path.join(__dirname, 'results.json'), 'utf-8', (err, data) => {
            if (err) {
              console.error(err);
              return res.render('results', { data: null, error: 'Failed to load results' });
            }
            const resultsData = JSON.parse(data);
            res.render('results', { data: resultsData, error: null });
          });
  }

  arrayDeleteIndexLogic = (req, res) => {
    const index = parseInt(req.params.index, 10);
    
        // Path to the JSON file
        const filePath = path.join(__dirname, 'results.json');
    
        // Read the JSON file
        fs.readFile(filePath, (err, data) => {
            if (err) {
                res.status(500).send('Error reading file');
                return;
            }
    
            // Parse the JSON data
            let jsonData = JSON.parse(data);
    
            // Check if the index is valid
            if (index < 0 || index >= jsonData.length) {
                res.status(400).send('Index out of bounds');
                return;
            }
    
            // Delete the object at the specified index
            jsonData.splice(index, 1);
    
            // Write the updated data back to the JSON file
            fs.writeFile(filePath, JSON.stringify(jsonData, null, 2), (err) => {
                if (err) {
                    res.status(500).send('Error writing file');
                    return;
                }
                // res.send('Index deleted successfully');
                res.redirect('/results');
            });
        });
  }

  
}

module.exports = {
  Logic,
};
