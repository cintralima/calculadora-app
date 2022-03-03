import { Component, ViewChild, ElementRef, OnInit, HostListener } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {


  @ViewChild('input')
  input!: ElementRef;

  public expression : Array<string> = [];


  ngOnInit(): void {

  }

  public insertChar(char: string): void {
    this.expression.push(char);
    this.input.nativeElement.value = this.expression.join('');
  }

  public clear(): void {
    this.expression = [];
    this.input.nativeElement.value = '';
  }

  public calculate(): void {
    this.input.nativeElement.value = eval(this.expression.join(''));
    this.expression = [];
    this.expression.push(this.input.nativeElement.value);
  }

  public backspace(): void {
    this.expression.pop();
    this.input.nativeElement.value = this.expression.join('');
  }



  public insertKey(key: string): void {
    if (key === '=') {
      this.calculate();
    } else if (key === 'C') {
      this.clear();
    } else if (key === 'Backspace') {
      this.backspace();
    } else {
      this.insertChar(key);
    }
  }

  public getKeys(): Array<string> {
    return ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '+', '-', '*', '/', '=', 'C', 'Backspace'];
  }

  @HostListener('document:keydown', ['$event']) onKeyDown(event: KeyboardEvent) {
    if(this.getKeys().includes(event.key)) {
      this.insertKey(event.key);
    }
  }

}
