import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LibrarianProfileComponent } from './librarian-profile.component';

describe('LibrarianProfileComponent', () => {
  let component: LibrarianProfileComponent;
  let fixture: ComponentFixture<LibrarianProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LibrarianProfileComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LibrarianProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
