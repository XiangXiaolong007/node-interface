// @login & register
const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const gravatar = require("gravatar");
const jwt = require("jsonwebtoken");
const passport = require("passport");


const User = require("../../models/User");
const keys = require("../../config/keys");

// 引入验证的方法
const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");

// $router GET api/users/test
// @desc  返回的请求的json数据
// @access   public
router.get("/test", (req, res) => {
    res.json({
        msg: "login works"
    })
})

// $router POST api/users/register
// @desc  返回的请求的json数据
// @access   public
router.post("/register", (req, res) => {
    const { errors,isValid } = validateRegisterInput(req.body);

    // 判断isValid是否通过
    if(!isValid) {
        return res.status(400).json(errors);
    }
    // 查询数据库中是否拥有邮箱
    User.findOne({
            email: req.body.email
        })
        .then((user) => {
            if (user) {
                return res.status(400).json({
                    emain: "邮箱已被注册"
                })
            } else {
                const avatar = gravatar.url(req.body.email, {
                    s: '200',
                    r: 'pg',
                    d: 'mm'
                })

                const newUser = new User({
                    name: req.body.name,
                    email: req.body.email,
                    avatar,
                    password: req.body.password
                })

                bcrypt.genSalt(10, function (err, salt) {
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                        if (err) {
                            throw err;
                        }

                        newUser.password = hash;
                        newUser.save()
                            .then(user => {
                                res.json(user)
                            })
                            .catch(err => {})
                    })
                })
            }
        })
})

// $router POST api/users/login
// @desc  返回token jwt password
// @access   public
router.post("/login", (req, res) => {
    const { errors,isValid } = validateLoginInput(req.body);

    // 判断isValid是否通过
    if(!isValid) {
        return res.status(400).json(errors);
    }

    const email = req.body.email;
    const password = req.body.password;
    // 查询数据库
    User.findOne({
            email
        })
        .then(user => {
            if (!user) {
                return res.status(404).json({
                    email: "用户不存在！"
                })
            }
            // 密码匹配
            bcrypt.compare(password, user.password)
                .then(isMatch => {
                    if (isMatch) {
                        const rule = {
                            id: user.id,
                            name: user.name
                        }
                        jwt.sign(rule, keys.secretOrKey, {
                            expiresIn: 3600
                        }, (err, token) => {
                            if(err) throw err;
                            res.json({
                                success: true,
                                // Bearer
                                token: "Bearer " + token
                            })
                        })
                    } else {
                        return res.status(400).json({
                            password: "密码错误！"
                        })
                    }
                })
        })
})

// $router GET api/users/current
// @desc  return current user
// @access   private
router.get("/current",passport.authenticate("jwt", {session: false}),(req,res) => {
    res.json({
        id: req.user.id,
        name: req.user.name,
        email: req.user.email
    })
})

module.exports = router;