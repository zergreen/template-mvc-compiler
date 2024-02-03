const path = require("path");
const fs = require("fs");
class Operator {
  arrayDeleteIndexOperator = (index, res) => {
    const filePath = path.join(__dirname, "results.json");

    //  Read the JSON file
    fs.readFile(filePath, (err, data) => {
      if (err) {
        res.status(500).send("Error reading file");
        return;
      }

      // Parse the JSON data
      let jsonData = JSON.parse(data);

      // Check if the index is valid
      if (index < 0 || index >= jsonData.length) {
        res.status(400).send("Index out of bounds");
        return;
      }

      // Delete the object at the specified index
      jsonData.splice(index, 1);

      // Write the updated data back to the JSON file
      fs.writeFile(filePath, JSON.stringify(jsonData, null, 2), (err) => {
        if (err) {
          res.status(500).send("Error writing file");
          return;
        }
        // res.send('Index deleted successfully');
        res.redirect("/results");
      });
    });
  };

  arrayResultOperator = (req, res) => {
    fs.readFile(path.join(__dirname, "results.json"), "utf-8", (err, data) => {
      if (err) {
        console.error(err);
        return res.render("results", {
          data: null,
          error: "Failed to load results",
        });
      }
      const resultsData = JSON.parse(data);
      res.render("results", { data: resultsData, error: null });
    });
  };

  arrayProcessOperator = (newEntry, res) => {
    // Read the existing data, append the new entry, and write it back to the file
    fs.readFile(
      path.join(__dirname, "results.json"),
      "utf-8",
      (readErr, data) => {
        if (readErr && readErr.code !== "ENOENT") {
          console.error(readErr);
          return res.render("index", {
            result: null,
            error: "Failed to read results",
          });
        }

        let resultsData = [];
        if (data) {
          resultsData = JSON.parse(data);
        }
        resultsData.push(newEntry);

        fs.writeFile(
          path.join(__dirname, "results.json"),
          JSON.stringify(resultsData, null, 2),
          "utf-8",
          (writeErr) => {
            if (writeErr) {
              console.error(writeErr);
              return res.render("index", {
                result: null,
                error: "Failed to store results",
              });
            }
          }
        );
      }
    );

    res.render("index", { result: newEntry.result, error: null });
  };
}

module.exports = {
  Operator,
};
