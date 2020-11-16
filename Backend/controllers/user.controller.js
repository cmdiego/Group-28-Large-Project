const User = require('../models/user');
const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');

//Create a user w/ email account verification
exports.signup = async function(req, res) {

  const user = req.body;

  User.findOne(user.email).exec((err, tempUser) => {
    if(err)
      return res.status(400).json({error: err});
    if(tempUser)
      return res.status(400).json({error: "User w/ this email already exists"});
  });

  const token = jwt.sign(user, process.env.SECRET_KEY);

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
      return res.status(400).json({error: err});
    else
      console.log('Email sent to: ' + email + ', activate your account plzz');
      return res.json('Email Sent');
  });
  // This point should never be reached, function should be returned prior to reaching the end
  console.log("Something went wrong with signup");
}

//User is signed in
exports.signin = async function(req, res) {
  const user = req.body;

  User.findOne(user.email).exec((err, tempUser) => {
    if(err)
      return res.status(400).json({error: err});
    if(!tempUser)
      return res.status(400).json({error: "user not found"});
    if(tempUser.password === user.password) {
      const token = jwt.sign(user, process.env.SECRET_KEY);
      return res.json({token: token});
    }
    else
      return res.status(400).json({error: "password didn't match"});
  });
  // This code should never be reached, function should return prior
  console.log("Something went wrong in signin");
}

exports.activateAccount = async(req, res, next) => {
  const {token} = req.body;
  console.log("enter act");
  if(token ==  null){
    return res.status(400).json({error: "token is null"});
  }
  jwt.verify(token, process.env.SECRET_KEY, (err, decodedToken) => {
    if(err)
      return res.sendStatus(403);
      //return res.status(400).json({error: 'Incorrect or Expired Link.'});

    const user = decodedToken;

    User.findOne(user.email).exec((err, tempUser) => {
      if(tempUser)
        return res.status(400).json({error: "User w/ this email already exists"});
    });
    let newUser = new User({"email": user.email, "password": user.password});
    newUser.save((err, success) => {
      if(err) {
        console.log("Error in signup while account activation: ", err);
        return res.status(400), json({error: 'Error activating account'});
      }
      res.json({message: "Signup Success!"});
    });
    res.redirect("/GeneralSignPage");
    // return res.redirect('http://localhost:3000/GeneralSignPage')
  })
}
