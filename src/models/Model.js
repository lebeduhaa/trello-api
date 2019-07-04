const fs = require('fs');

class Model {
    constructor(fileName) {
        this.fileName = fileName;
    }

    getAll() {
        return new Promise((resolve, reject) => {
            fs.readFile(`./db/${this.fileName}`, (err, data) => {
                if (err) {
                    reject(err.message);
                } else {
                    resolve(JSON.parse(data.toString()));
                }
            });
        });
    }

    delete(id) {
        return new Promise(async (resolve, reject) => {
            const items = await this.getAll();
            const itemIndex = items.findIndex(item => item.id === Number(id));

            if (itemIndex === -1) {
                reject({
                    text: `There is not such object in ${this.fileName}!`,
                    status: 404
                });
            }

            items.splice(itemIndex, 1);
            await this._saveResult(items);
            resolve();
        });
    }

    async create(model) {
        const items = await this.getAll();

        model.id = Number(items[items.length - 1].id) + 1;
        items.push(model);
        await this._saveResult(items);

        return model;
    }

    getById(id) {
        return new Promise(async (resolve, reject) => {
            const items = await this.getAll();
            const item = items.find(currentItem => currentItem.id === Number(id));

            if (!item) {
                reject({
                    text: `There is not such object in ${this.fileName}!`,
                    status: 404
                });
            }

            resolve(item);
        });
    }

    update(model, id) {
        return new Promise(async (resolve, reject) => {
            const items = await this.getAll();
            const itemIndex = items.findIndex(item => item.id === Number(id));

            if (itemIndex === -1) {
                reject({
                    text: `There is not such object in ${this.fileName}!`,
                    status: 404
                });
            }

            items.splice(itemIndex, 1, model);
            await this._saveResult(items);
            resolve();
        });
    }

    _saveResult(items) {
        return new Promise((resolve, reject) => {
            fs.writeFile(`./db/${this.fileName}`, JSON.stringify(items), (err) => {
                if (err) {
                    reject(err.message);
                } else {
                    resolve();
                }
            });
        });
    }
}

module.exports = Model;
