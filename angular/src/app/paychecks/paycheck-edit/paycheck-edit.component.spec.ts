import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaycheckEditComponent } from './paycheck-edit.component';

describe('PaycheckEditComponent', () => {
  let component: PaycheckEditComponent;
  let fixture: ComponentFixture<PaycheckEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaycheckEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaycheckEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
