import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardMenuComponent } from './dashboard-menu.component';

describe('AdminMenuComponent', () => {
  let component: DashboardMenuComponent;
  let fixture: ComponentFixture<AdminMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminMenuComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdminMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
