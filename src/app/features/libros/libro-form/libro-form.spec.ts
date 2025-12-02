import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LibroForm } from './libro-form';

describe('LibroForm', () => {
  let component: LibroForm;
  let fixture: ComponentFixture<LibroForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LibroForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LibroForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
