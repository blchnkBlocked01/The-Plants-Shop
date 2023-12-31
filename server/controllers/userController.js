const ApiError = require('../error/ApiError');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const {User, Basket, Cart} = require('../models/models')
const {where} = require("sequelize");

const generateJwt = (id, email, role) => {
    return jwt.sign(
        {id, email, role},
        process.env.SECRET_KEY,
        {expiresIn: '1h'}
    )
}

class UserController {
    async registration(req, res, next) {
        const {email, password, role} = req.body
        if (!email || !password) {
            return next(ApiError.badRequest('Некорректный email или password'))
        }
        const candidate = await User.findOne({where: {email}})
        if (candidate) {
            return next(ApiError.badRequest('Пользователь с таким email уже существует'))
        }
        const hashPassword = await bcrypt.hash(password, 5)
        const user = await User.create({email, password: hashPassword, role})
        const cart = await Cart.create({userId: user.id})
        const token = generateJwt(user.id, user.email, user.role)
        return res.json({token})
    }

    async login(req, res, next) {
        const {email, password} = req.body
        const user = await User.findOne({where: {email}})
        if (!user) {
            return next(ApiError.internal('Пользователь не найден'))
        }
        let comparePassword = bcrypt.compareSync(password, user.password)
        if (!comparePassword) {
            return next(ApiError.internal('Указан неверный пароль'))
        }
        const token = generateJwt(user.id, user.email, user.role)
        return res.json({token})
    }

    async check(req, res, next) {
        const token = generateJwt(req.user.id, req.user.email, req.user.role)
        return res.json({token})
    }

    async patchUserData(req, res) {
        const {id} = req.params;
        const updateOps = req.body;

        // Шифрование пароля перед сохранением в базу данных
        if (updateOps.password) {
            const saltRounds = 10;
            const hashedPassword = await bcrypt.hash(updateOps.password, saltRounds);
            updateOps.password = hashedPassword;
        }

        try {
            const user = await User.update(updateOps, {
                where: {id: id}
            });
            if (user[0] === 0) { // если ни один пользователь не был изменен
                res.status(404).json({
                    message: 'Пользователь не найден'
                });
            } else { // если хотя бы один пользователь был изменен
                res.status(200).json({
                    message: 'Данные пользователя обновлены'
                });
            }
        } catch (error) {
            console.log(error);
            res.status(500).json({
                error: error
            });
        }
    }

    async getUserData(req, res) {
        const {id} = req.params;
        try {
            const user = await User.findOne({where: {id}});
            if (user) {
                res.status(200).json(user); // Если пользователь найден, возвращаем его данные
            } else {
                res.status(404).json({message: 'Пользователь не найден'}); // Если пользователь не найден, возвращаем ошибку
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({message: 'Ошибка сервера'}); // Если произошла ошибка на сервере, возвращаем ошибку
        }
    }
}

module.exports = new UserController()
