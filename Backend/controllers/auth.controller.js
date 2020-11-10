const User = require('../models/user'); 
const nodemailer = require('nodemailer'); 
const jwt = require('jsonwebtoken'); 

//Create a user w/ email account verification
exports.signup = async function(req, res) {
    console.log(req.body); 
    const {email, password} = req.body;
    
    User.findOne({email}).exec((err, user) => {
        if(user) 
            console.log("User w/ this email already exists");
            //return res.status(400).json({error: "User w/ this email already exists"});


        const token = jwt.sign({email, password}, process.env.SECRET_KEY, {expiresIn: '20m'});

        let transporter = nodemailer.createTransport({
          service: 'gmail', 
          auth: {
              user: 'tutormasterlearner@gmail.com',
              pass: 'tutormasterlearner@1'
          }
        });
        // <p>${process.env.CLIENT_URL}/authentication/activate/${token}</p>
        let mailResponse = {
            from: 'tutormasterlearner@gmail.com',
            to: email,
            subject: 'TutorMaster | Activate Account',
            html: ` 
                 <h2>Thank you, please activate your account on the link below:</h2>
                <p>${process.env.CLIENT_URL}/email-activate?token=${token}</p>
            `
        };

        transporter.sendMail(mailResponse, function(err, info) {
            if(err)
                console.log(err); 
            else
                console.log('Email sent to: ' + email + ', activate your account plzz');
        });
    });

    return res.json('Email Sent');
}

//User is signed in
exports.signin = async function(req, res) {
    console.log(req.body); 
    const {email, password} = req.body;
    
    User.findOne({email}).exec((err, user) => {
        if(!user) 
            console.log("No email associated with this account");

        else {
            if(user.password === password) {
                console.log("Sign in success!"); 
            }
            else {
                console.log("Incorrect Password!"); 
            }
      }
   });
    return res.json('Sign in Success!');
}

exports.activateAccount = async(req, res, next) => {
    const {token} = req.body;
    console.log("enter act"); 
    if(token) {
        jwt.verify(token, process.env.SECRET_KEY, function(err, decodedToken) {
            if(err)
                console.log('Incorrect or Expired Link.');
                //return res.status(400).json({error: 'Incorrect or Expired Link.'}); 
           
             const {email, password} = decodedToken; 

             User.findOne({email}).exec((err, user) => {
                if(user) 
                    return res.status(400).json({error: "User w/ this email already exists"});
                
                let newUser = new User({"email": email, "password": password}); 
                newUser.save((err, success) => {
                    if(err) {
                        console.log("Error in signup while account activation: ", err);
                        return res.status(400), json({error: 'Error activating account'})
                    }
                    res.json({ 
                        message: "Signup Success!"
                    });
                    console.log("Signup Success!");
                });
            });
            res.redirect("/GeneralSignPage");
           // return res.redirect('http://localhost:3000/GeneralSignPage')
     })
    } else {
        return res.json({error: "Something went wrong!"});
    }
}