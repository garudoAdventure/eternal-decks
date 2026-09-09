import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeartArea } from './heart-area';

describe('HeartArea', () => {
  let component: HeartArea;
  let fixture: ComponentFixture<HeartArea>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeartArea],
    }).compileComponents();

    fixture = TestBed.createComponent(HeartArea);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
