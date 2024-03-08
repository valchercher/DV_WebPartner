import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndicateurqualiComponent } from './indicateurquali.component';

describe('IndicateurqualiComponent', () => {
  let component: IndicateurqualiComponent;
  let fixture: ComponentFixture<IndicateurqualiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IndicateurqualiComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(IndicateurqualiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
