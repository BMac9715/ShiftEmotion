import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TopbarDashBoardComponent } from './topbar-dash-board.component';

describe('TopbarDashBoardComponent', () => {
  let component: TopbarDashBoardComponent;
  let fixture: ComponentFixture<TopbarDashBoardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TopbarDashBoardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TopbarDashBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
