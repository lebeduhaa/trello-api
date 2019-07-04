const Board = require('../models/Board');

class BoardService {

  static async getBoards() {
    const boards = await Board.getAll();

    return boards;
  }

  static async getBoard(id) {
    const board = await Board.getById(id);

    return board;
  }

  static async deleteBoard(id) {
    await Board.delete(id);
  }

  static async createBoard(board) {
    const result = await Board.create(board);

    return result
  }

  static async updateBoard(board) {
    await Board.update(board);
  }

}

module.exports = BoardService;
