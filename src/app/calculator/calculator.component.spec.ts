import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CalculatorComponent } from './calculator.component';

describe('CalculatorComponent', () => {
  let component: CalculatorComponent;
  let fixture: ComponentFixture<CalculatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CalculatorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CalculatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should handle number input correctly', () => {
    component.getNumber(5);
    expect(component.display).toEqual('5');
    component.getNumber(3);
    expect(component.display).toEqual('53');
  });

  it('should handle operator input correctly', () => {
    component.getNumber(5);
    component.getOperator('+');
    expect(component.display).toEqual('5 +');
  });


  it('should perform addition correctly', () => {
    component.getNumber(5);
    component.getOperator('+');
    component.getNumber(3);
    component.calculate();
    expect(component.display).toEqual('8');
  });
  
  it('should perform subtraction correctly', () => {
    component.getNumber(5);
    component.getOperator('-');
    component.getNumber(2);
    component.calculate();
    expect(component.display).toEqual('3');
  });

  it('should perform multiplication correctly', () => {
    component.getNumber(3);
    component.getOperator('*');
    component.getNumber(4);
    component.calculate();
    expect(component.display).toEqual('12');
  });

  it('should perform division correctly', () => {
    component.getNumber(8);
    component.getOperator('/');
    component.getNumber(2);
    component.calculate();
    expect(component.display).toEqual('4');
  });

  it('should handle division by zero appropriately', () => {
    component.getNumber(8);
    component.getOperator('/');
    component.getNumber(0);
    component.calculate();

    expect(component.display).toEqual('Infinity');
  });

  it('should clear calculator correctly', () => {
    component.getNumber(9);
    component.getOperator('+');
    component.getNumber(1);
    component.calculate();
    component.clear();
    expect(component.display).toEqual('');
    expect(component.number).toEqual('');
    expect(component.parameter1).toBeNull();
    expect(component.parameter2).toBeNull();
    expect(component.operator).toBeNull();
  });

  it('should not allow more than 6 digits input', () => {
    component.getNumber(1);
    component.getNumber(2);
    component.getNumber(3);
    component.getNumber(4);
    component.getNumber(5);
    component.getNumber(6);
    component.getNumber(7); 
    expect(component.display.length).toEqual(6);
  });

  it('should not proceed with calculation without an operator', () => {
    component.getNumber(5);
    component.getNumber(3);
    component.calculate(); 
    expect(component.display).toEqual('53');
  });

  it('should append new numbers to previous calculations correctly', () =>{
    component.getNumber(5);
    component.getOperator('+');
    component.getNumber(3);
    component.calculate();
    component.getNumber(6);
    expect(component.display).toEqual('86');
  });

  it('should not perform calculation with incomplete expression', () => {
    component.getNumber(5);
    component.getOperator('+');
    component.calculate();
    expect(component.display).toEqual('5 +');
  });

  it('should ignore operator if already set', () => {
    component.getNumber(4);
    component.getOperator('+');
    component.getOperator('-'); 
    expect(component.display).toEqual('4 +'); 
  });

});
