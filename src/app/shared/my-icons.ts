import { 
  Injectable, 
}                                from '@angular/core';
import { DomSanitizer }          from '@angular/platform-browser';
import { 
  MdIconRegistry,
  MaterialModule,
 }                               from '@angular/material';


@Injectable()
export class MyIcons {
  
  constructor(
    private iconRegistry:MdIconRegistry,
    private sanitizer:DomSanitizer,
  ){

  }
      
  makeIcon(icon) {
    console.log(`In makeIcon`);
    return this.iconRegistry.addSvgIcon(
      icon, this.sanitizer.bypassSecurityTrustResourceUrl('assets/images/icons/' + icon + '.svg')
    );
  };

  makeIcons(icons) {
    icons.forEach((icon) =>{
    this.iconRegistry.addSvgIcon(
      icon,
      this.sanitizer.bypassSecurityTrustResourceUrl('assets/images/icons/' + icon + '.svg')
    );
    });
    

  }


}
