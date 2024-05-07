import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuManageUsersComponent } from './menu-manage-users.component';

describe('MenuManageUsersComponent', () => {
  let component: MenuManageUsersComponent;
  let fixture: ComponentFixture<MenuManageUsersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MenuManageUsersComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MenuManageUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
