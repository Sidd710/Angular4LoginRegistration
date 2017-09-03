// import { Component, OnInit } from '@angular/core';
import { Component, ViewChild } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FacebookService, LoginResponse, LoginOptions, UIResponse, UIParams, FBVideoComponent } from 'ngx-facebook';
import {passport} from 'passport';
import {passporttwitter} from 'passport-twitter';
import { AuthService } from '../services/auth.service';
import userTwitterModel from '../models/userTwitterModel';



@Component({
  selector: 'app-brands',
  templateUrl: './brands.component.html',
  styleUrls: ['./brands.component.scss']
})
export class BrandsComponent {
  result: any;

  constructor( private fb: FacebookService) {
     
        console.log('Initializing Facebook');
    
        fb.init({
          appId: '336568296800940',
          version: 'v2.10'
        });
    
      

}
login() {
  this.fb.login()
    .then((res: LoginResponse) => {
      console.log('Logged in', res);
    })
    .catch(this.handleError);
}
twitterLogin()
{
  var TwitterStrategy = passporttwitter.Strategy;
  passport.use(new TwitterStrategy({
    
            consumerKey: 'SvwQ4pp4jQUHMOKDctCBSI8iX',
            consumerSecret: 'AExwLc5kssGaqmASrPyG0E0wmVS173wkHiyZAQkZ7EzTojmPrc',
            callbackURL: 'http://127.0.0.1:8080/auth/twitter/callback'
    
        },
            function (token, tokenSecret, profile, done) {
    
                // make the code asynchronous
                // User.findOne won't fire until we have all our data back from Twitter
                process.nextTick(function () {
    
                    userTwitterModel.findOne({ 'twitter.id': profile.id }, function (err, user) {
    
                        // if there is an error, stop everything and return that
                        // ie an error connecting to the database
                        if (err)
                            return done(err);
    
                        // if the user is found then log them in
                        if (user) {
                            return done(null, user); // user found, return that user
                        } else {
                            // if there is no user, create them
                            var newUser = new userTwitterModel();
                            
    
                            // set all of the user data that we need
                            newUser.twitter.id = profile.id;
                            newUser.twitter.token = token;
                            newUser.twitter.username = profile.username;
                            newUser.twitter.displayName = profile.displayName;
    
                            // save our user into the database
                            newUser.save(function (err) {
                                if (err)
                                    throw err;
                                return done(null, newUser);
                            });
                        }
                    });
    
                });
    
            }));
  passporttwitter.get('/auth/twitter', passporttwitter.authenticate('twitter'));
  
    // handle the callback after twitter has authenticated the user
    passporttwitter.get('/auth/twitter/callback',
    passporttwitter.authenticate('twitter', {
        successRedirect: '/profile',
        failureRedirect: '/'
      }));
    // =====================================
    // LOGOUT ==============================
    // =====================================
    passporttwitter.get('/logout', function (req, res) {
      req.logout();
      res.redirect('/');
    });
}
private handleError(error) {
  console.error('Error processing action', error);
}
};