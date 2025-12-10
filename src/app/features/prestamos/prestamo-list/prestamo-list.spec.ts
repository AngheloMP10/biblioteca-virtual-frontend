import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrestamoList } from './prestamo-list';

describe('PrestamoList', () => {
  let component: PrestamoList;
  let fixture: ComponentFixture<PrestamoList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PrestamoList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrestamoList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
