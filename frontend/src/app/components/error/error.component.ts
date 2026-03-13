import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

// Component de pàgina d'error 404
// Es mostra quan l'usuari navega a una URL que no existeix
@Component({
  selector: 'app-error',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './error.component.html',
  styleUrl: './error.component.css'
})
export class ErrorComponent {}