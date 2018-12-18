import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaychecksComponent } from './paychecks.component';

describe('PaychecksComponent', () => {
  let component: PaychecksComponent;
  let fixture: ComponentFixture<PaychecksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaychecksComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaychecksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
