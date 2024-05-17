const User = require("../model/user")
const bcrypt = require("bcrypt")
const nodemailer = require("nodemailer")
const dotenv = require("dotenv").config();

const transpoter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.SENDER_MAIL,
    pass: process.env.MAIL_PASSWORD,
  },
});
exports.renderLoginPage = (req, res) => {
    res.render("auth/login", {
        title: "Login",
        message : req.flash("message")
   })     
}

exports.renderRegisterPage = (req, res) => {
  res.render("auth/register", {
      title: "Register",
      message : req.flash("message")
  });
};

exports.haldleRegister = (req, res) => {
    const { name, password } = req.body;
    User.findOne({ name }).then((user) => {
        if (user) {
             req.flash("message", "email or password invalid");
            return res.redirect("/register");
        }
        return bcrypt.hash(password, 10).then((haspassword) => {
            return User.create({
              name,
              password: haspassword
            })
       }).then(() => {
           res.redirect("/login");
           transpoter.sendMail(
             {
               from: process.env.SENDER_MAIL,
               to: name,
               subject: "Register Successful",
               html: "<h1>Register account successfully</h1><p>using this email create blog.io Are you?</p>",
             },
             (err) => {
               console.log(err);
             }
           );
       });
        
    }).catch((err) => console.log(err))
}
exports.postLoginData = (req, res) => {
    const { name, password } = req.body;
    User.findOne({ name }).then((user) => {
        if (!user) {
            req.flash("message","email or password invalid")
            return res.redirect("/login");
        }
        return bcrypt.compare(password, user.password).then((isMatch) => {
            if (isMatch) {
                req.session.isLogin = true;
                req.session.userInfo = user;
                return req.session.save((err) => {
                    res.redirect("/");
                    console.log(err);
                })
                 
            }
               req.flash("message", "email or password invalid");
            return res.redirect("/login");
           
        }).catch (err => console.log(err));
    }).catch(err => console.log(err))
    
}

exports.removeSession = (req,res) => {
    req.session.destroy();
    res.redirect("/")    
    
}