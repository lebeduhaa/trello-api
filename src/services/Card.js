const Card = require('../models/Card');

class CardService {
    static async getCards() {
        const card = await Card.getAll();

        return card;
    }

    static async getCard(id) {
        const card = await Card.getById(id);

        return card;
    }

    static async deleteCard(id) {
        await Card.delete(id);
    }

    static async createCard(card) {
        const result = await Card.create(card);

        return result;
    }

    static async updateCard(card) {
        await Card.update(card);
    }
}

module.exports = CardService;
