import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';

// Component de la pàgina de contacte
// El formulari és només visual (no hi ha endpoint de contacte al backend)
@Component({
    selector: 'app-contact',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule],
    templateUrl: './contact.component.html',
    styleUrl: './contact.component.css'
})
export class ContactComponent {
    contactForm: FormGroup;
    // Controla si s'ha enviat el formulari per mostrar la confirmació
    submitted: boolean = false;

    constructor(private fb: FormBuilder) {
        this.contactForm = this.fb.group({
            name:    ['', Validators.required],
            email:   ['', [Validators.required, Validators.email]],
            message: ['', Validators.required]
        });
    }

    onSubmit(): void {
        if (this.contactForm.invalid) return;
        // Simulem l'enviament (no hi ha backend per al formulari de contacte)
        this.submitted = true;
        this.contactForm.reset();
    }
}