import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AutorList } from './autor-list';

describe('AutorList', () => {
  let component: AutorList;
  let fixture: ComponentFixture<AutorList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AutorList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AutorList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
