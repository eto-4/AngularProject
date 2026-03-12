import { Component } from '@angular/core';

// Component del peu de pàgina
// És estàtic, no necessita cap lògica
@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {
  // Any actual per mostrar al copyright del footer.
  currentYear: number = new Date().getFullYear();
}