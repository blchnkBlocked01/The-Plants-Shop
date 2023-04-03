const {Product} = require('../models/models');
const {resolve} = require('path');
const {v4} = require('uuid');

class ProductController {
    async create(req, res) {
        const {name, price, typeId} = req.body;
        const {img} = req.files;
        console.log(img);
        let fileName = v4() + ".jpg";
        await img.mv(resolve(__dirname, '..', 'static', fileName));

        const product = await Product.create({name, price, typeId, img: fileName});
        res.json(product);
    }

    async getAll(req, res) {
        const {typeId} = req.query;
        let products;

        if (!typeId) {
            products = await Product.findAll();
        }

        if (typeId) {
            products = await Product.findAll({where: {typeId}});
        }
        return res.json(products);
    }

    async getOne(req, res) {
        const {id} = req.params;
        const product = await Product.findOne({
            where: {id}
        });

        return res.json(product);
    }
}

module.exports = new ProductController()