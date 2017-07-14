import { Component, OnInit } from '@angular/core';
// 3rd party

import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs/Observable';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  displayName: string;
  photoURL;
  user: Observable<firebase.User>

  constructor(
    public afAuth: AngularFireAuth,
  ) {
    this.user = afAuth.authState;
   }

  ngOnInit() {

    if(!this.user){ 
     
      console.log('NOT LOGGED IN')
      return;
    }
    console.log("LOGGED IN", this.user)
    this.afAuth.authState.subscribe ( user => {
      if (user){
      this.displayName = user.displayName;
      
      this.photoURL = user.photoURL;
      }

    });
    
  
  }
  login() {
    this.afAuth.auth.signInWithPopup(new firebase.auth.FacebookAuthProvider()).then(authState=>{
      console.log('AFTER LOGIN', authState);
    })
  }

  logout() {
    this.afAuth.auth.signOut();
  }
}
