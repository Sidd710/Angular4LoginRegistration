import { Component  , OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';
import { NavigationExtras, Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'] 
})
export class AppComponent {

  constructor(public auth: AuthService,private router: Router, private route: ActivatedRoute) { }
  ngOnInit() {
    this.router.navigate(["home"])
  }

}
