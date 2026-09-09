import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayerArea } from './player-area';

describe('PlayerArea', () => {
  let component: PlayerArea;
  let fixture: ComponentFixture<PlayerArea>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlayerArea],
    }).compileComponents();

    fixture = TestBed.createComponent(PlayerArea);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
