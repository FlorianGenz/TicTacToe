import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameResultWindowComponent } from './game-result-window.component';

describe('GameResultWindowComponent', () => {
  let component: GameResultWindowComponent;
  let fixture: ComponentFixture<GameResultWindowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GameResultWindowComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GameResultWindowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
