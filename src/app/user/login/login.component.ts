import { 
  AfterViewInit,
  Component, 
  OnInit,
 }                            from '@angular/core';
import { Router, }            from '@angular/router';
// 3rd party
import { AngularFireAuth }    from 'angularfire2/auth';
import * as firebase          from 'firebase/app';
import { Observable }         from 'rxjs/Observable';
// Custom
import { MyIcons }            from '../../shared/my-icons';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  displayName: string;
  photoURL;
  user: Observable<firebase.User>
  userId: string;
  icons = ['chevron-right'];

  constructor(
    public afAuth: AngularFireAuth,
    private router:Router,
    private myIcons:MyIcons,
  ) {
    console.log('Login constructor');
    this.user = afAuth.authState;
   }

  ngOnInit() {
    this.myIcons.makeIcons(this.icons);
    if(!this.user){ 
      console.log('NOT LOGGED IN')
      return;
    }
    console.log("LOGGED IN", this.user)
    this.afAuth.authState.subscribe ( user => {
      if (user){
        this.displayName = user.displayName;
        this.photoURL = user.photoURL;
        this.userId = user.uid;
        console.log('this.userId', this.userId)
        this.router.navigate(['/companies']);
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

  goToCompanies() {
    this.router.navigate(['/companies']);

  }
}
