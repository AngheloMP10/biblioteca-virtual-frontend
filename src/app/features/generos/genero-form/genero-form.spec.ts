import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneroFormComponent } from './genero-form';

describe('GeneroForm', () => {
  let component: GeneroFormComponent;
  let fixture: ComponentFixture<GeneroFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GeneroFormComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(GeneroFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
