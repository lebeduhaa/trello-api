const fs = require('fs');

class Model {
    constructor(fileName) {
        this.fileName = fileName;
    }

    getAll() {
        return new Promise((resolve, reject) => {
            fs.readFile(`./db/${this.fileName}`, (err, data) => {
                if (err) {
                    reject(err);
                }

                resolve(JSON.parse(data.toString()));
            });
        });
    }

    async delete(id) {
        const items = await this.getAll();
        const itemIndex = items.findIndex(item => item.id === Number(id));

        items.splice(itemIndex, 1);
        await this._saveResult(items);
    }

    async create(model) {
        const items = await this.getAll();

        model.id = Number(items[items.length - 1].id) + 1;
        items.push(model);
        await this._saveResult(items);

        return model;
    }

    async getById(id) {
        const items = await this.getAll();
        const item = items.find(currentItem => currentItem.id === Number(id));

        return item;
    }

    async update(model, id) {
        const items = await this.getAll();
        const itemIndex = items.findIndex(item => item.id === Number(id));

        items.splice(itemIndex, 1, model);
        await this._saveResult(items);
    }

    _saveResult(items) {
        return new Promise((resolve, reject) => {
            fs.writeFile(`./db/${this.fileName}`, JSON.stringify(items), (err) => {
                if (err) {
                    reject(err);
                }

                resolve();
            });
        });
    }
}

module.exports = Model;
