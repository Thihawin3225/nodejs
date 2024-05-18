const User = require("../model/user")
const bcrypt = require("bcrypt")
const nodemailer = require("nodemailer")
const dotenv = require("dotenv").config();
const crypto = require("crypto");
const { title } = require("process");
const user = require("../model/user");

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

//render reset password page

exports.renderResetPassword = (req, res) => {
    res.render("auth/resetpwd.ejs", {
      title: "reset password",
      message: req.flash("message"),
    });
}
//render feedack
exports.renderFeedBack = (req, res) => {
    res.render("auth/feedback", {
        title : "feedback"
    });
}

// reset passwrod link send

exports.resetLinkSend = (req, res) => {
    const { name } = req.body;
    crypto.randomBytes(32, (err, buffer) => {
        if(err){
           return res.redirect("/reset-password")
        }
        const token = buffer.toString("hex")
        User.findOne({ name })
          .then((user) => {
            if (!user) {
              req.flash("message", "no account with this email");
              return res.redirect("/reset-password");
            }
            user.resetToken = token;
            user.tokenExipred = Date.now() + 1800000;
            return user.save()
          })
          .then((result) => {
            if (result) {
              res.redirect("/feedback");
              transpoter.sendMail({
                from: process.env.SENDER_MAIL,
                to: name,
                subject: "Reset Password",
                html: `<h1>Reset Password</h1><p>Clicking the link below.</p><a href="http://localhost:8080/reset-password/${token}">Clicking Item</a>`,
              }, (err) => {
                  console.log(err);
              });
            }
          })
          .catch((err) => console.log(err));
    })
}

// new password render

exports.renderNewpassword = (req, res) => {
    const { token } = req.params;
    User.findOne({
        resetToken: token, 
        tokenExipred : {$gt : Date.now()}
    }).then((user) => {
        res.render("auth/new-password", {
            title: "change password",
            resetToken: token,
            user_id : user._id,
        })
    }).catch((err)=>console.log(err))
}

exports.changeNewPassword = (req, res) => {
    let users;
    const { password, comfirmpassword, resetToken, user_id } = req.body;
    User.findOne({ resetToken, tokenExipred: { $gt: Date.now() }, _id: user_id }).then((user) => {
        if (password === comfirmpassword) {
            users = user;
           return bcrypt.hash(password,10)
        }
    }).then((hashpassword) => {
        users.password = hashpassword;
        users.resetToken = undefined;
        users.tokenExipred = undefined;
      return users.save()     
    }).then((result) => {
        res.redirect("/login")
    })
        .catch((err) => console.log(err))
};