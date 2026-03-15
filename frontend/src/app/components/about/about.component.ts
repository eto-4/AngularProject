import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';

// Component de la pàgina principal / presentació del portfolio
@Component({
    selector: 'app-about',
    standalone: true,
    imports: [
        RouterLink,
        CommonModule
    ],
    templateUrl: './about.component.html',
    styleUrl: './about.component.css'
})
export class AboutComponent implements OnInit {
    isLoggedIn$!: Observable<boolean>;

    constructor(private authService: AuthService) {}

    ngOnInit(): void {
        this.isLoggedIn$ = this.authService.isLoggedIn$()
    }
}