import { Component, Input, } from '@angular/core';
import { CommonModule, NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-square',
  standalone: true,
  imports: [NgIf, NgFor],
  templateUrl: './square.component.html',
  styleUrl: './square.component.scss'
})
export class SquareComponent {
  @Input() value: 'X' | 'O' | null = null;
}
