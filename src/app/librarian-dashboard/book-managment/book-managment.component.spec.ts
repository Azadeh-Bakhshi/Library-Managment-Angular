import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookManagmentComponent } from './book-managment.component';

describe('BookManagmentComponent', () => {
  let component: BookManagmentComponent;
  let fixture: ComponentFixture<BookManagmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BookManagmentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BookManagmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
