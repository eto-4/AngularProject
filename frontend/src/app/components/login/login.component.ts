import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth/auth.service';

@Component({
    selector: 'app-login',
    imports: [
        CommonModule, 
        ReactiveFormsModule
    ],
    templateUrl: './login.component.html',
    styleUrl: './login.component.css',
})
export class LoginComponent {
    // Formulari reactiu amb els camps username i password
    loginForm: FormGroup;
    // Missatge d'error si les credencials són incorrectes
    errorMessage: string = '';

    constructor(
        private fb: FormBuilder,
        private authService: AuthService,
        private router: Router
    ) {
        // Initcialització del form amb validació de camps obligatoris
        this.loginForm = this.fb.group({
            username: ['', Validators.required],
            password: ['', Validators.required]
        });
    }

    // S'executa quan l'usuari envia el formulari
    onSubmit(): void {
        if (this.loginForm.invalid) return;
        
        const { username, password } = this.loginForm.value;
        
        // Intentem el login amb el servei d'autenticació
        const success = this.authService.login(username, password);
        
        if (success) {
            // Credencials correctes: redirigim a la llista de projectes
            this.router.navigate(['/projects']);
        } else {
            // Credencials incorrectes: mostrem missatge d'error
            this.errorMessage = 'Usuari o contrasenya incorrectes.';
        }
    }
}
