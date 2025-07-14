const { genSalt, hash } = require("bcrypt")
const User = require("../models/user")

exports.showIndex = (req, res, next) => {
    res.render('index')
}

exports.showPageSignUp = (req, res, next) => {
    res.render('signUp')
}

exports.showMembersPage = (req, res, next) => {
    res.render('members')
}

exports.get404Page = (req, res, next) => {
    res.status(404).render('404')
}

exports.checkAuth = (req, res, next) => {
    if(req.session && req.session.user || req.isAuthenticated()) {
        next()
    } else {
        res.redirect("/")
    }
}

exports.signup = async (req, res, next) => {
    const { username, email, password } = req.body

    const salt = await genSalt(16)

    const hashedPassword = await hash(password, salt)

    const user = new User(username, email, hashedPassword)

    try {
        await user.save()
        res.redirect("/")
    } catch (err) {
        console.log(err)
        res.redirect("signup")
    }
}

exports.login = async (req, res, next) => {
    const { email, password } = req.body

    const user = await User.findOne({email, senha: password})

    try {
        if(user) {
            req.session.user = user
            return res.redirect("/members")
        }
        res.render("index")
    } catch (err) {
        console.log(err)
        res.render("index")
    }
}

exports.logout = (req, res, next) => {
    req.session.destroy(err => {
        if(err) {
            console.log(err)
        }
        res.redirect("/")
    })
}