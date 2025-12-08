import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LibroFormComponent } from './libro-form';

describe('LibroForm', () => {
  let component: LibroFormComponent;
  let fixture: ComponentFixture<LibroFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LibroFormComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(LibroFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
