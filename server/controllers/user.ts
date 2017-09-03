import * as dotenv from 'dotenv';
import * as jwt from 'jsonwebtoken';
import * as nodemailer from 'nodemailer';
import * as express from 'express';
import * as expressMailer from 'express-mailer';

import User from '../models/userModel';
import BaseCtrl from './base';
import * as bcrypt from 'bcryptjs';

export default class UserCtrl extends BaseCtrl {
  model = User;
  numRandomed: any;
  login = (req, res) => {
console.log(req.body);
    this.model.findOne({ email: req.body.email }, (err, user) => {
      if (!user) { return res.sendStatus(403); }
      user.comparePassword(req.body.password, (error, isMatch) => {
        if (!isMatch) { return res.sendStatus(403); }
        const token = jwt.sign({ user: user }, process.env.SECRET_TOKEN); // , { expiresIn: 10 } seconds
        res.status(200).json({ token: token });
      });
    });
  }
  forgot = (req, res) => {

    // var transporter = nodemailer.createTransport({
    //   service: 'gmail',
    //   auth: {
    //     user: 'mailtestsidd@gmail.com',
    //     pass: 'siddtest'
    //   }
    // });
    
    // transporter.sendMail(mailOptions, function(error, info){
    //   if (error) {
    //     console.log(error);
    //   } else {
    //     console.log('Email sent: ' + info.response);
    //   }
    // });
    
    // console.log('in service')
    
    console.log('in service' + req.body)
    // bcrypt.genSalt(10, function(err, salt) {
    //   if (err) { return console.log(err); }
    //   bcrypt.hash(req.body.password, salt, function(error, hash) {
    //     if (error) {console.log(error); }
    //     req.body.password = hash;
    //     console.log(hash);

        
    //   });
    // });

    this.model.findOneAndUpdate({ email: req.body.email }, req.body, (err) => {
      if (err) {
        return console.error(err);
      }
      else
        {

        }
      this.model.findOne({ email: req.body.email }, (err, user) => {
        if (!user) { return res.sendStatus(403); }
        console.log('emailId: ' + user);
        try {

          const transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
              user: 'mailtestsidd@gmail.com',
              pass: 'siddtest'
            }
          });

          const mailOptions = {
            from: 'mailtestsidd@gmail.com',
            to: user.email,
            subject: 'New Generated Password for User',
            text: `Dear User,
               This is your newly generated password from system.` + req.body.password
          };
          // const mailOptions = {
          //   from: 'mailtestsidd@gmail.com',
          //   to: user.email,
          //   subject: 'New Generated Password for User',
          //   text: `Dear User,
          //      This is your newly generated password from system.` + req.body.password
          // };
          // transporter.sendMail(mailOptions, function (error, info) {
          //   console.log('mailOptions: ' + mailOptions);
          //   res.status(200).json({ message: 'Password has been sent.' });

          // });
          transporter.sendMail(mailOptions, function(error, info){
            if (error) {
              console.log(error);
            } else {
              console.log('Email sent: ' + info.response);
            }
          });
          // console.log('mailOptions: ' + mailOptions );
          // res.status(200).json({ message: 'Password has been sent.' });

        } catch (error) {
          debugger 
          console.log('error: ' + error);
        }

     });

      // user.comparePassword(req.body.password, (error, isMatch) => {
      //   if (!isMatch) { return res.sendStatus(403); }
      //   const token = jwt.sign({ user: user }, process.env.SECRET_TOKEN); // , { expiresIn: 10 } seconds
      //   res.status(200).json({ token: token });
      // });
   //});
  
    })
  }
  }
  
