import * as dotenv from 'dotenv';
import * as jwt from 'jsonwebtoken';
import * as nodemailer from 'nodemailer';

import User from '../models/userModel';
import BaseCtrl from './base';

export default class UserCtrl extends BaseCtrl {
  model = User;
numRandomed: any;
  login = (req, res) => {
    
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
     
     console.log('in service')
       this.numRandomed = Math.floor(Math.random()*(10-20+1)+10);
       console.log('in service'+req.body.email )
     this.model.findOneAndUpdate({ email: req.body.email }, req.body, (err) => {
      if (err) { 
        return console.error(err);  
      }
      this.model.findOne({ email: req.body.email }, (err, user) => {
      if (!user) { return res.sendStatus(403); }
      console.log('emailId: ' + user );
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
      transporter.sendMail(mailOptions, function(error, info){
       console.log('mailOptions: ' + mailOptions );
      res.status(200).json({ message: 'Password has been sent.' });

    });
      // console.log('mailOptions: ' + mailOptions );
      // res.status(200).json({ message: 'Password has been sent.' });

    } catch (error) {
      debugger
       console.log('error: ' + error );
    }
     
    });
     
      // user.comparePassword(req.body.password, (error, isMatch) => {
      //   if (!isMatch) { return res.sendStatus(403); }
      //   const token = jwt.sign({ user: user }, process.env.SECRET_TOKEN); // , { expiresIn: 10 } seconds
      //   res.status(200).json({ token: token });
      // });
    });
  }

}
