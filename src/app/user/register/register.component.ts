import { 
  AfterContentInit,
  AfterViewInit,
  Component,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
 }                               from '@angular/core';
import { 
  BrowserAnimationsModule,
}                                from '@angular/platform-browser/animations';
import { DomSanitizer }          from '@angular/platform-browser';
import { 
  FormBuilder, 
  FormControl, 
  FormGroup, 
  FormsModule, 
  ReactiveFormsModule,
  Validators,
}                                from '@angular/forms';
import { 
  AngularFireDatabase, 
  FirebaseListObservable ,
  FirebaseObjectObservable,
}                                from 'angularfire2/database';
import { Location }              from '@angular/common';
import { 
  MdIconModule,
  MdIconRegistry,
  MdInputContainer,
  MdTabsModule,
  MdTab,
  MdTabGroup,
  MaterialModule,
 }                               from '@angular/material';
import { 
  Router, 
  ActivatedRoute, 
  Params, 
}                                from '@angular/router';
// 3rd party
import { $ }                     from 'jquery';
import { Observable }            from 'rxjs/Observable';
import 'rxjs/add/operator/take'; 
import { AngularFireAuth }       from 'angularfire2/auth';
import * as firebase             from 'firebase/app';

// Custom
import { Address }               from '../../address/address';
import { AddressService }        from '../../address/address.service';
// import { AddressAutoComponent }  from '../../address/address-auto/address-auto.component';
// import { AddressService }        from '../../address/address.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  icons=['thumbs-up', 'chevron-left']
  myform : FormGroup;
  title;
  user: Observable<firebase.User>
  displayName;

  constructor(
    public afAuth: AngularFireAuth,
    public addressService:AddressService,
    private db: AngularFireDatabase,
    private fb: FormBuilder,
    private iconRegistry: MdIconRegistry,
    private location: Location,
    private route: ActivatedRoute,
    private router:Router,
    private sanitizer: DomSanitizer,
  ) {
    this.icons.forEach((icon) => {
      iconRegistry.addSvgIcon(
      icon,
      sanitizer.bypassSecurityTrustResourceUrl('assets/images/icons/' + icon + '.svg')
      );
    });
    this.user = afAuth.authState;
  };

  ngOnInit() {
      this.buildForm()
    if(!this.user){ 
      console.log('NOT LOGGED IN')
      return;
    }
    console.log("LOGGED IN", this.user)
   
  }

  buildForm(company?) {

    // // if(!this.myform){
    //   this.myform = this.fb.group({
    //     email: ['', Validators.required],
    //     password: ['', Validators.required],
    //   });
    // // }

    return this.myform
  }
  registerWithGoogle() {
    var provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider).then(function(result) {
  // This gives you a Google Access Token. You can use it to access the Google API.
  var token = result.credential.accessToken;
  // The signed-in user info.
  var user = result.user;
  // ...
}).catch(function(error) {
  // Handle Errors here.
  var errorCode = error['code'];
  var errorMessage = error.message;
  // The email of the user's account used.
  var email = error['email'];
  // The firebase.auth.AuthCredential type that was used.
  var credential = error['credential'];
  // ...
});

  }

registerWithFacebook() {
    var provider = new firebase.auth.FacebookAuthProvider();
    firebase.auth().signInWithPopup(provider).then(function(result) {
  // This gives you a Google Access Token. You can use it to access the Google API.
  var token = result.credential.accessToken;
  // The signed-in user info.
  var user = result.user;
  // ...
}).catch(function(error) {
  // Handle Errors here.
  var errorCode = error['code'];
  var errorMessage = error.message;
  // The email of the user's account used.
  var email = error['email'];
  // The firebase.auth.AuthCredential type that was used.
  var credential = error['credential'];
  // ...
});
}

  onSubmit() {

    // let mf = this.myform.value;
    //   let email = mf.email;
    //   let password = mf.password;
    
  }
  goBack() {
     this.location.back();
  }

  logout(){

  }
  goToLogin() {

  }

}
