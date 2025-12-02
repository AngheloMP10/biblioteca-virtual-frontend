import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LibroList } from './libro-list';

describe('LibroList', () => {
  let component: LibroList;
  let fixture: ComponentFixture<LibroList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LibroList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LibroList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
