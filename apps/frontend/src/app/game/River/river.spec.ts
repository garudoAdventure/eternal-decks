import { ComponentFixture, TestBed } from '@angular/core/testing';

import { River } from './river';

describe('River', () => {
  let component: River;
  let fixture: ComponentFixture<River>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [River],
    }).compileComponents();

    fixture = TestBed.createComponent(River);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
