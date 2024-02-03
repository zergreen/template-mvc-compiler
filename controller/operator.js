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

//mvc
    getRoomOperator = (res) => {
      // console.log(res);
      let sql = `SELECT roomId, roomName FROM rooms WHERE status = "available"`;
      connection.all(sql, [], function (err, data) {
        if (err) {
          console.log(err);
        } else {
          // return res.status(201).render("../view/pages/room", {
          //   response: data,
          // });
          return res.status(201).send({ response: data });
        }
      });
    };

    reserveRoomOperator = (rooms, res) => {
      const { roomId, gameId, reservedBy } = req.body; // Assuming gameId is also provided for the reservation
    const reserveRoomSql = 'UPDATE rooms SET status = "reserved", reservedBy = ? WHERE roomId = ?';
    const insertReservationSql = 'INSERT INTO reservations (roomId, gameId, reservedBy) VALUES (?, ?, ?)';
    
    connection.run(reserveRoomSql, [reservedBy, rooms.roomId], function(err) {
        if (err) {
            res.status(400).json({ "error": err.message });
            return;
        }
        // Only insert into reservations if the room reservation was successful
        connection.run(insertReservationSql, [rooms.roomId, rooms.gameId, rooms.reserveBy], function(err) {
            if (err) {
                res.status(400).json({ "error": err.message });
                return;
            }
            res.json({
                "message": "Room and game reserved",
                "roomId": rooms.roomId,
                "gameId": rooms.gameId,
                "reserveBy": rooms.reserveBy
            });
        });
    });
    };

    getGameOperator = (res) => {
      console.log(res)
      const sql = 'SELECT gameId, gameName FROM games WHERE status = "available"';
      connection.all(sql, [], (err, games) => {
          if (err) {
              res.status(400).json({ "error": err.message });
              return;
          }
          res.status(200).json({
              "message": "success",
              "data": games
          });
          
      });
    }

    reserveGameOperator = (games, res) => {
      const findRoomForGame = 'SELECT roomId FROM rooms WHERE status = "available" LIMIT 1';
  connection.get(findRoomForGame, (err, room) => {
      if (err || !room) {
          res.status(400).json({ "error": err ? err.message : "No available room" });
          return;
      }
      const reserveRoomSql = 'UPDATE rooms SET status = "reserved", reservedBy = ? WHERE roomId = ?';
      const reserveGameSql = 'UPDATE games SET status = "reserved", roomId = ? WHERE gameId = ?';
      connection.run(reserveRoomSql, [games.reservedBy, room.roomId], function(err) {
          if (err) {
              res.status(400).json({ "error": err.message });
              return;
          }
          connection.run(reserveGameSql, [room.roomId, games.gameId], function(err) {
              if (err) {
                  res.status(400).json({ "error": err.message });
                  return;
              }
              res.json({
                  "message": "Game and room reserved",
                  "gameId": games.gameId,
                  "roomId": room.roomId,
                  "reservedBy": games.reservedBy
              });
          });
      });
  });
    }

    cancelReservationOperator = (rooms, res) => {
      const sqlRoom = 'UPDATE rooms SET status = "available", reservedBy = NULL WHERE roomId = ?';
      const sqlGame = 'UPDATE games SET status = "available", roomId = NULL WHERE roomId = ?';
      connection.run(sqlRoom, [rooms.roomId], function(err) {
          if (err) {
              res.status(400).json({ "error": err.message });
              return;
          }
          connection.run(sqlGame, [rooms.roomId], function(err) {
              if (err) {
                  res.status(400).json({ "error": err.message });
                  return;
              }
              res.json({
                  "message": "Reservation cancelled",
                  "roomId": rooms.roomId
              });
          });
      });
    }

}

module.exports = {
  Operator,
};
