const { log } = require('console');
const express = require('express');
const app = express();
const fs = require('fs');
const path = require('path');

app.use(express.urlencoded({ extended: true })); // Middleware to parse POST form data
app.set('view engine', 'ejs'); // Set EJS as the templating engine

app.get('/', (req, res) => {
  res.render('index', { result: null, error: null }); // Render the EJS template with no initial data
});

// app.post('/', (req, res) => {
//   const { inputs, mode } = req.body;
//   let result;

//   try {
//     switch (mode) {
//       case 'sum':
//         result = sumAdjacentNumbers(inputs.split(','));
//         break;
//       case 'reverse':
//         result = reverseHalves(inputs.split(','));
//         break;
//       case 'concatenate':
//         result = concatenateNonNumbers(inputs.split(','));
//         break;
//       default:
//         throw new Error('Invalid mode');
//     }
//     res.render('index', { result, error: null });
//   } catch (error) {
//     res.render('index', { result: null, error: error.message });
//   }
// });

// // v2 in another page
// app.post('/', (req, res) => {
//     // ... (existing processing code)
//     const { inputs, mode } = req.body;
//     let result;
  
//     try {
//       switch (mode) {
//         case 'sum':
//           result = sumAdjacentNumbers(inputs.split(','));
//           break;
//         case 'reverse':
//           result = reverseHalves(inputs.split(','));
//           break;
//         case 'concatenate':
//           result = concatenateNonNumbers(inputs.split(','));
//           break;
//         default:
//           throw new Error('Invalid mode');
//       }
//     //   res.render('index', { result, error: null });
//     } catch (error) {
//       res.render('index', { result: null, error: error.message });
//     }
    
//      // After processing the input
//   const newEntry = {
//     inputs: req.body.inputs.split(','),
//     mode: req.body.mode,
//     result: result
//   };

//   // Read the existing data, append the new entry, and write it back to the file
//   fs.readFile(path.join(__dirname, 'results.json'), 'utf-8', (readErr, data) => {
//     if (readErr && readErr.code !== 'ENOENT') {
//       console.error(readErr);
//       return res.render('index', { result: null, error: 'Failed to read results' });
//     }
    
//     let resultsData = [];
//     if (data) {
//       resultsData = JSON.parse(data);
//     }
//     resultsData.push(newEntry);

//     fs.writeFile(path.join(__dirname, 'results.json'), JSON.stringify(resultsData, null, 2), 'utf-8', (writeErr) => {
//       if (writeErr) {
//         console.error(writeErr);
//         return res.render('index', { result: null, error: 'Failed to store results' });
//       }
//       // Redirect to the results page to display the table
//       res.redirect('/results');
//     });
//   });

//   });

// v3 in same page
app.post('/', (req, res) => {
  const { inputs, mode } = req.body;
  let result;

  try {
    switch (mode) {
      case 'sum':
        result = sumAdjacentNumbers(inputs.split(','));
        break;
      case 'reverse':
        result = reverseHalves(inputs.split(','));
        break;
      case 'concatenate':
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

   
});

//   app.get('/results', (req, res) => {
//     fs.readFile(path.join(__dirname, 'results.json'), 'utf-8', (err, data) => {
//       if (err) {
//         console.error(err);
//         return res.render('results', { data: null, error: 'Failed to load results' });
//       }
//       res.render('results', { data: JSON.parse(data), error: null });
//     });
//   });

app.get('/results', (req, res) => {
    fs.readFile(path.join(__dirname, 'results.json'), 'utf-8', (err, data) => {
      if (err) {
        console.error(err);
        return res.render('results', { data: null, error: 'Failed to load results' });
      }
      const resultsData = JSON.parse(data);
      res.render('results', { data: resultsData, error: null });
    });
  });
  
  app.post('/delete-index/:index', (req, res) => {

    const index = parseInt(req.params.index, 10);
    console.log("params",req.params.index);
    console.log("index",index);

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
});
  

// Include the processing functions here...
function sumAdjacentNumbers(stringArray) {
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

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
