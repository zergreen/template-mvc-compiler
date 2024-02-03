const connection = require("../database/connector");
class Operator {
  getAllDataOperator = (req, res) => {
    let sql = `SELECT * FROM Compiler`;
    connection.all(sql, [], function (err, data) {
      if (err) {
        console.log(err);
        return res.status(501).send({ response: "Not Implement" });
      } else {
        return res.status(200).send({ response: data });
      }
    });
  };

  addDataOperator = (compiler, res) => {
    let sql = `INSERT INTO Compiler
        (
            id,
            src_code,
            output_syntax,
            model_type
        )
        VALUES
        (
            ?,?,?,?
        );`;
    connection.all(
      sql,
      [null, compiler.src_code, compiler.output_syntax, compiler.model_type],
      function (err) {
        if (err) {
          console.log(err);
          return res
            .status(501)
            .send({ response: "Failed: at addDataOperator" });
        } else {
          // we clear output_syntax because it's concat concat concat until we shuntdown server it's will became zero
          compiler.output_syntax = "";
          return res.status(201).redirect("/report");
          // return res.status(201).send({response: "add data success"})
        }
      }
    );
  };

  deleteDataOperator = (compiler, res) => {
    let sql = `DELETE FROM Compiler WHERE id = ?`;
    connection.all(sql, [compiler.id], function (err, data) {
      if (err) {
        console.log(err);
        return res
          .status(501)
          .send({ response: "Failed: at deleteDataOperator" });
      } else {
        // return res.status(201).send({response: "delete: data success"})
        return res.status(201).redirect("/report");
      }
    });
  };

  getDataOperator = (res) => {
    let sql = `SELECT * FROM Compiler`;
    connection.all(sql, [], function (err, data) {
      if (err) {
        console.log(err);
      } else {
        return res.status(201).render("../view/pages/report_compiler", {
          response: data,
        });
      }
    });
  };

//   editDataOperator = (compiler, res) => {
//     let sql = `UPDATE Compiler
//         SET src_code = ?, output_syntax = ?
//         WHERE id = ?;`;
//     connection.query(
//       sql,
//       [compiler.src_code, compiler.output_syntax, compiler.id],
//       function (err) {
//         if (err) {
//           console.log(err);
//           return res.status(501).send({ response: "Not Implement" });
//         } else {
//           return res.status(201).send({ response: "Update finished" });
//         }
//       }
//     );
//   };
}

module.exports = {
  Operator,
};
