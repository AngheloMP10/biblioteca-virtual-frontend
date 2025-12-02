import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneroList } from './genero-list';

describe('GeneroList', () => {
  let component: GeneroList;
  let fixture: ComponentFixture<GeneroList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GeneroList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GeneroList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
