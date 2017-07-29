import { 
  Injectable,
  NgZone,
 }                              from '@angular/core';
import { Subject }              from 'rxjs/Subject';
import { 
  Router, 
  ActivatedRoute, 
  Params, 
}                               from '@angular/router';
// 3rd Party
import { AngularFireAuth }      from 'angularfire2/auth';
import * as firebase            from 'firebase/app';
import { 
  AgmCoreModule, 
  MapsAPILoader 
}                               from 'angular2-google-maps/core';
import { Observable }           from 'rxjs/Observable';
import { }                      from '@types/googlemaps';
// Custom
import { Company }              from '../company/company';

 
@Injectable()
export class AddressService {
  private company:Company;
  private companyKey: string;
  private user: Observable<firebase.User>
  private userId: string;
  
   // Observable string sources
  address = new Subject<string>(); 

   // Observable string streams
  address$ = this.address.asObservable;
  
  private autocomplete = new Subject<google.maps.places.Autocomplete>();
  autocomplete$ = this.autocomplete.asObservable
  
  constructor (
    public afAuth: AngularFireAuth,
    private route: ActivatedRoute,
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone,
  ){}
  ngOnInit () {
     if(!this.user){ 
      console.log('NOT LOGGED IN')
      return;
    }
    console.log("LOGGED IN", this.user)
    this.route.params
      .subscribe(params => { 
        this.companyKey = params['id']
    });
    this.afAuth.authState.subscribe ( user => {
      if (user){
        this.userId = user.uid;

       firebase.database().ref('/companies/' + this.companyKey ).on('value', (snapshot)=> {
          this.company = snapshot.val();
        });
      this.publishData(this.company.address);

    //=========================================================
        this.mapsAPILoader.load().then(() => {
            let autocomplete = new google.maps.places.Autocomplete(
                <HTMLInputElement>document.getElementById("address"), {
                types: ['address']
            }).getPlace().formatted_address;
              this.publishData(autocomplete);
        })
      }
    });
  }
    // Service message commands
  publishData(data: string) {
    console.log('dataaaaaaaaaaaaaaaaaa in service', data);
    this.address.next(data);
  }

}