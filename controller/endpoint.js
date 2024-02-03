const { Logic } = require("./logic");
const model = require("../model/model");
class Endpoint {
  constructor() {
    this.compiler = model.compiler;
    this.rooms = model.rooms;
    this.games = model.games;
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

  // mvc

  getRoomEndpoint = (req, res) => {
    new Logic().getRoomLogic(res);
  };

  reserveRoomEndpoint = (req, res) => {
    this.rooms.roomId = req.body.roomId;
    this.rooms.reservedBy = req.body.reservedBy;
    new Logic().reserveRoomLogic(this.rooms, res);
  };

  getGameEndpoint = (req, res) => {
    new Logic().getGameLogic(res);
  };

  reserveGameEndpoint = (req, res) => {
    this.rooms.gameId = req.body.gameId;
    this.rooms.reservedBy = req.body.reservedBy;
    new Logic().reserveGameLogic(this.rooms, res);
  };

  cancelReservationEndpoint = (req, res) => {
    this.rooms.roomId = req.body.roomId;
    new Logic().cancelReservationLogic(this.rooms, res);
  }

}

module.exports = {
  Endpoint,
};
