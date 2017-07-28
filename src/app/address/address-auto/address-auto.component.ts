import { 
  AfterViewInit,
  Component, 
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  NgZone,
  ViewChild,
 }                        from '@angular/core';
import { 
  FormBuilder, 
  FormControl, 
  FormGroup, 
  FormsModule, 
  ReactiveFormsModule }          from '@angular/forms';
import { MaterialModule } from '@angular/material';
// 3rd Party
import { 
  AgmCoreModule, 
  MapsAPILoader 
}                         from 'angular2-google-maps/core';
import { }                from '@types/googlemaps';

// Custom
import { Company }        from '../../company/company';
import { Address }        from '../address';
import { AddressService } from '../address.service';


@Component({
  selector: 'app-address-auto',
  templateUrl: './address-auto.component.html',
  styleUrls: ['./address-auto.component.scss']
})
export class AddressAutoComponent implements AfterViewInit {
  @Input() company: Company;
  @Input() address;
  @Output() onAddress = new EventEmitter<any>();

  public latitude: number;
  public longitude: number;
  public searchControl: FormControl;
  public zoom: number;
  myform: FormGroup;
  
  @ViewChild("search")
  public searchElementRef: ElementRef;
  
  constructor(
    private fb:FormBuilder,
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone,
    private addressService: AddressService,
  ) {}
  
  ngOnInit() {

    if(this.company)
      console.log('AAAAAAAAAAAAAAAAAAAAAAADDDDDDDDDDDcompany.name in ngOnInit', this.company.name);
    if(this.addressService.getAddress()) {
      this.address = this.addressService.getAddress() 
      this.buildForm(this.address);
    }
    this.buildForm(); 
  } 

  buildForm(address?) {
    if(address){
      this.myform = this.fb.group({
        searchControl: this.address
    });
    } else{
      this.myform = this.fb.group({
        searchControl: '' 
      });
    }
  }
  

  ngAfterViewInit() {
 //set google maps defaults
    this.zoom = 4;
    this.latitude = 39.8282;
    this.longitude = -98.5795;
    
    //create search FormControl
    console.log('TTHHHHHUSSSSSSSS ADDRESSSSSSSSSSS', this.address);
     <HTMLInputElement>document.getElementById("address")
    //set current position
    // this.setCurrentPosition();
    
    //load Places Autocomplete
     this.mapsAPILoader.load().then(() => {
        let autocomplete = new google.maps.places.Autocomplete(
            <HTMLInputElement>document.getElementById("address"), {
            types: ['address']
        });
        autocomplete.addListener('place_changed', () => {
            this.ngZone.run(() => {
                // get the place result
                let place: google.maps.places.PlaceResult = autocomplete.getPlace();

                this.onAddress.emit(place);
                // add map calls here
            });
        });
    });
  }
  
  // private setCurrentPosition() {
  //   if ("geolocation" in navigator) {
  //     navigator.geolocation.getCurrentPosition((position) => {
  //       this.latitude = position.coords.latitude;
  //       this.longitude = position.coords.longitude;
  //       this.zoom = 12;
  //     });
  //   }
  // }

}

// http://brianflove.com/2016/10/18/angular-2-google-maps-places-autocomplete/
