import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ErreurPopUpComponent } from './erreur-pop-up.component';

describe('ErreurPopUpComponent', () => {
  let component: ErreurPopUpComponent;
  let fixture: ComponentFixture<ErreurPopUpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ErreurPopUpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ErreurPopUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
