import { Component, OnInit } from '@angular/core';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { SquareComponent } from "../square/square.component";

@Component({
    selector: 'app-board',
    standalone: true,
    templateUrl: './board.component.html',
    styleUrls: ['./board.component.scss'],
    imports: [NgIf, SquareComponent, NgFor]
})
export class BoardComponent implements OnInit{
  squares: any[] = [];
  xIsNext: boolean = true;
  winner: string | null = null;

  constructor() {}
  
  ngOnInit(): void {
    this.newGame();
  }
  
  //boton juego nuevo
  newGame() {
    this.squares = Array(9).fill(null);
    this.winner = null;
    this.xIsNext = true;
  }
  
  //devuelve el jugador siguiente
  get player() {
    return this.xIsNext ? 'X' : 'O';
  }
  
  makeMove (idx: number) {
    if (!this.squares[idx] && !this.winner) {
      this.squares.splice(idx, 1, this.player);
      this.xIsNext = !this.xIsNext;
      this.winner = this.calculateWinner();
      
      // se comprueba si el jugador ha ganado antes de que se mueva la ia
      if (!this.winner && !this.xIsNext) {
        this.machineMove();
      }
    }
  }
  
  //se comprueba el tablero, si la casilla está marcada la cambia por otra
  machineMove() {
    let emptyIn = this.squares.map((value, index) => value === null ? index : null).filter(val => val !== null);
    if (emptyIn.length > 0) {
      let randomIndex = emptyIn[Math.floor(Math.random() * emptyIn.length)]!;
      this.squares[randomIndex] = 'O';
      this.xIsNext = !this.xIsNext;
      this.winner = this.calculateWinner();
    }
  }
  //combinaciones ganadoras
  calculateWinner() {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    //recorre todo el array y comprueba si hay alguna combinación ganadora
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (this.squares[a] &&
          this.squares[a] === this.squares[b] &&
          this.squares[a] === this.squares[c]) {
        return this.squares[a];
      }
    }
    return null;
  }
}