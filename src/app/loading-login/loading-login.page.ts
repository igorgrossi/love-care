import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-loading-login',
  templateUrl: './loading-login.page.html',
  styleUrls: ['./loading-login.page.scss'],
})


export class LoadingLoginPage implements OnInit {

  constructor(private router: Router,) { }

  ngOnInit() {

  }



  mudarDeTela(){
   

    this.router.navigate(['home']);
  }

}
