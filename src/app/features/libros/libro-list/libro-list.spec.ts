import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LibroListComponent } from './libro-list';

describe('LibroList', () => {
  let component: LibroListComponent;
  let fixture: ComponentFixture<LibroListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LibroListComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(LibroListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
