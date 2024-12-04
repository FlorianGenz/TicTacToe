import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogInWindowComponent } from './log-in-window.component';

describe('LogInWindowComponent', () => {
  let component: LogInWindowComponent;
  let fixture: ComponentFixture<LogInWindowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LogInWindowComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LogInWindowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
