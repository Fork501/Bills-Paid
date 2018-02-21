import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BillsEditComponent } from './bills-edit.component';

describe('BillsEditComponent', () => {
  let component: BillsEditComponent;
  let fixture: ComponentFixture<BillsEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BillsEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BillsEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
