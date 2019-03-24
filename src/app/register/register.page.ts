import { Component, OnInit } from '@angular/core';
import { AppService } from '../services/app.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  public product:any = {};

  constructor(private appService: AppService) { }

  ngOnInit() {
  }

  register(){
    console.log(this.product);
  }

 
}
