import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AutorListComponent } from './autor-list';

describe('AutorList', () => {
  let component: AutorListComponent;
  let fixture: ComponentFixture<AutorListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AutorListComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AutorListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
