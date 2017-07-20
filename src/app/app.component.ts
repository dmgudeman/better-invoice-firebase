import { Component }     from '@angular/core';
import { 
  AngularFireDatabase,
  FirebaseListObservable
}                        from 'angularfire2/database';
import { FlexLayoutModule }        from '@angular/flex-layout';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
 
  constructor (db: AngularFireDatabase){
    console.log('AppComponent constructor');
  }
}
