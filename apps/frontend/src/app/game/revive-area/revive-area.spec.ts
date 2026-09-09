import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviveArea } from './revive-area';

describe('ReviveArea', () => {
  let component: ReviveArea;
  let fixture: ComponentFixture<ReviveArea>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReviveArea],
    }).compileComponents();

    fixture = TestBed.createComponent(ReviveArea);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
