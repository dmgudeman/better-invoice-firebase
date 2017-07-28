import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddressAutoComponent } from './address-auto.component';

describe('AddressAutoComponent', () => {
  let component: AddressAutoComponent;
  let fixture: ComponentFixture<AddressAutoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddressAutoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddressAutoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
