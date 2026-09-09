import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StageArea } from './stage-area';

describe('StageArea', () => {
  let component: StageArea;
  let fixture: ComponentFixture<StageArea>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StageArea],
    }).compileComponents();

    fixture = TestBed.createComponent(StageArea);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
