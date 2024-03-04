import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-calculator',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './calculator.component.html',
  styleUrl: './calculator.component.css'
})
export class CalculatorComponent {
  display: string = "";
  number: string ="";
  countadd:number = 0;
  countminus:number = 0;
  countmultiply:number = 0;
  countdivide:number = 0;
  parameter1: number = null;
  parameter2: number = null;
  operator:string;
  displayCalcNumber: string;
  calculation:number;
  fun:boolean = false;
  returnedJoke:string;

  constructor(private http:HttpClient)
  {

  }

  ngOnint(){
  }

  getNumber(value:number)
  {
    if(this.number.length != 6 && this.parameter1 == null)
    {
      this.number+= value.toString();
      this.display = this.number;
    }

    if (this.parameter1 != null)
    {
        this.number+= value.toString();
        this.display = this.parameter1.toString()+" "+this.operator+" "+this.number;  
    }
  }


  getOperator(operator:string)
  {
    if (this.display != "")
    {
      this.operator = operator;
      this.parameter1 = Number(this.number);
      this.display = this.parameter1.toString()+" "+this.operator;

      if (this.parameter1 != null)
      {
        this.number = "";
      }

    }

  }

  calculate()
  {
    this.parameter2 = Number(this.number);
      switch(this.operator){
        case "+":
          this.calculation = this.parameter1+this.parameter2;
          this.countadd+=1;
          break;

        case "-":
          this.calculation = this.parameter1-this.parameter2;
          this.countminus+=1;
          break;

          case "*":
            this.calculation = this.parameter1*this.parameter2;
            this.countmultiply+=1;
            break;

          case "/":
            this.calculation = Math.round((this.parameter1/this.parameter2)  * 100) / 100;
            this.countdivide+=1;
            break;
      }


      if (this.fun == true)
      {
        this.fetchJoke() 
      }
   
      this.display = this.calculation.toString();  
      this.number = this.calculation.toString();
      this.parameter1 = this.calculation;
      this.parameter2 = null;
  }

  clear()
  {
    this.display = "";
    this.number = "";
    this.parameter1 = null;
    this.parameter2 = null;
  }

  funClick()
  {
    if (this.fun == true)
    {
      this.fun = false;
      this.returnedJoke = "";
    }
    else
    {
      this.fun = true
    }
  }

  fetchJoke() {     
    const jokeApiUrl = `https://v2.jokeapi.dev/joke/Programming?type=single&id=${this.calculation}`;     
    this.http.get<any>(jokeApiUrl).subscribe(data => {       
        if (!data.error) {         
            this.returnedJoke = data.joke;         
        }     
    });   
}
}


