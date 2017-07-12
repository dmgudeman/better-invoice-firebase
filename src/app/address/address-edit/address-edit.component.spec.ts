import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddressEditComponent } from './address-edit.component';

describe('AddressEditComponent', () => {
  let component: AddressEditComponent;
  let fixture: ComponentFixture<AddressEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddressEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddressEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
