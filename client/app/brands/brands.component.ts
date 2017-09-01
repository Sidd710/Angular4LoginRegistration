// import { Component, OnInit } from '@angular/core';
import { Component, ViewChild } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FacebookService, LoginResponse, LoginOptions, UIResponse, UIParams, FBVideoComponent } from 'ngx-facebook';
import { TwitterService } from 'ng2-twitter';

@Component({
  selector: 'app-brands',
  templateUrl: './brands.component.html',
  styleUrls: ['./brands.component.scss']
})
export class BrandsComponent {
  result: any;

  constructor( private fb: FacebookService, private twitter: TwitterService) {
    
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

private handleError(error) {
  console.error('Error processing action', error);
}
};