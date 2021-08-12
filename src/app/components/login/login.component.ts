import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import firebase from "firebase/app";
import "firebase/auth";
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  newEmail
  newPassword
  email
  password


  constructor(
    private authService: AuthService
  ) { }

  createAccount(newEmail, newPassword){
    this.authService.createAccount(newEmail, newPassword);
  }

  login(email, password){
    this.authService.login(email, password);
  }

  logout(){
    this.authService.logout();
  }

  ngOnInit(): void {}




}
