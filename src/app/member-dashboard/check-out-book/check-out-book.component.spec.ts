import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckOutBookComponent } from './check-out-book.component';

describe('CheckOutBookComponent', () => {
  let component: CheckOutBookComponent;
  let fixture: ComponentFixture<CheckOutBookComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CheckOutBookComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CheckOutBookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
