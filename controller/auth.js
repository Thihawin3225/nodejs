const User = require("../model/user")
const bcrypt = require("bcrypt")
exports.renderLoginPage = (req, res) => {
    res.render("auth/login", {
       title : "Login"
   })     
}

exports.renderRegisterPage = (req, res) => {
  res.render("auth/register", {
    title: "Register",
  });
};

exports.haldleRegister = (req, res) => {
    const { name, password } = req.body;
    User.findOne({ name }).then((user) => {
        if (user) {
            return res.redirect("/register");
        }
        return bcrypt.hash(password, 10).then((haspassword) => {
            return User.create({
              name,
              password: haspassword
            })
       }).then(() => {
         res.redirect("/login");
       });
        
    }).catch((err) => console.log(err))
}
exports.postLoginData = (req, res) => {
    const { name, password } = req.body;
    User.findOne({ name }).then((user) => {
        if (!user) {
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
            return res.redirect("/login");
           
        }).catch (err => console.log(err));
    }).catch(err => console.log(err))
    
}

exports.removeSession = (req,res) => {
    req.session.destroy();
    res.redirect("/")    
    
}