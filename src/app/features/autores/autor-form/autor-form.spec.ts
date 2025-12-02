import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AutorForm } from './autor-form';

describe('AutorForm', () => {
  let component: AutorForm;
  let fixture: ComponentFixture<AutorForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AutorForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AutorForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
