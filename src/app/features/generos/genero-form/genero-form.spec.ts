import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneroForm } from './genero-form';

describe('GeneroForm', () => {
  let component: GeneroForm;
  let fixture: ComponentFixture<GeneroForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GeneroForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GeneroForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
