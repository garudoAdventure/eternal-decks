import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JewelArea } from './jewel-area';

describe('JewelArea', () => {
  let component: JewelArea;
  let fixture: ComponentFixture<JewelArea>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JewelArea],
    }).compileComponents();

    fixture = TestBed.createComponent(JewelArea);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
