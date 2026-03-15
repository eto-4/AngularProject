import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { CommonModule } from '@angular/common';

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
    isLoggedIn: boolean = false;

    constructor(
        private authService: AuthService,
        private cdr: ChangeDetectorRef
    ) {}

    ngOnInit(): void {
        this.authService.isLoggedIn$().subscribe(value => {
            console.log('isLoggedIn:', value);
            this.isLoggedIn = value;
            this.cdr.detectChanges();
        });
    }
}