import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarDashBoardComponent } from './sidebar-dash-board.component';

describe('SidebarDashBoardComponent', () => {
  let component: SidebarDashBoardComponent;
  let fixture: ComponentFixture<SidebarDashBoardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SidebarDashBoardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SidebarDashBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
