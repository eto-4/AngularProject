import { Component, ChangeDetectorRef } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProjectService } from '../../services/project/project.service';
import { Project } from '../../models/project.model';

// Component per crear un nou projecte
// Inclou formulari reactiu i subida d'imatge en dos passos
@Component({
    selector: 'app-create',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule, RouterLink],
    templateUrl: './create.component.html',
    styleUrl: './create.component.css'
})
export class CreateComponent {

    // Formulari reactiu amb validació
    projectForm: FormGroup;
    
    // Fitxer d'imatge seleccionat per l'usuari
    selectedImage: File | null = null;
    
    // Previsualització local de la imatge seleccionada
    imagePreview: string | null = null;

    // Estats de la petició
    loading: boolean = false;
    successMessage: string = '';
    errorMessage: string = '';

    constructor(
        private fb: FormBuilder,
        private projectService: ProjectService,
        private router: Router,
        private cdr: ChangeDetectorRef
    ) {
        this.projectForm = this.fb.group({
            // Camps obligatoris amb Validators.required
            name:        ['', Validators.required],
            description: ['', Validators.required],
            category:    ['', Validators.required],
            langs:       ['', Validators.required],
            // Camp opcional
            year:        [new Date().getFullYear()]
        });
    }

    // S'activa quan l'usuari selecciona un fitxer d'imatge
    onImageSelected(event: Event): void {
        const input = event.target as HTMLInputElement;
        if (input.files && input.files[0]) {
            this.selectedImage = input.files[0];
            // Generem una previsualització local amb FileReader
            const reader = new FileReader();
            reader.onload = (e) => {
                this.imagePreview = e.target?.result as string;
                this.cdr.detectChanges();
            };
            reader.readAsDataURL(this.selectedImage);
        }
    }

    // S'executa quan l'usuari envia el formulari
    onSubmit(): void {
        if (this.projectForm.invalid) return;
        
        this.loading = true;
        this.errorMessage = '';
        
        const project: Project = this.projectForm.value;
        
        // Pas 1: guardem el projecte al backend
        this.projectService.saveProject(project).subscribe({
            next: (response) => {
                const savedProject = response.project;
                
                // Pas 2: si hi ha imatge seleccionada, la pugem
                if (this.selectedImage && savedProject._id) {
                    this.projectService.uploadImage(savedProject._id, this.selectedImage).subscribe({
                        next: () => {
                            this.loading = false;
                            // Redirigim al detall del projecte creat
                            this.router.navigate(['/detail', savedProject._id]);
                        },
                        error: () => {
                            this.loading = false;
                            // El projecte s'ha creat però la imatge ha fallat: anem igualment al detall
                            this.router.navigate(['/detail', savedProject._id]);
                        }
                    });
                } else {
                    // Sense imatge: redirigim directament al detall
                    this.loading = false;
                    this.router.navigate(['/detail', savedProject._id]);
                }
            },
            error: (err) => {
                console.error('Error creant el projecte:', err);
                this.errorMessage = 'No s\'ha pogut crear el projecte. Torna-ho a intentar.';
                this.loading = false;
            }
        });
    }
}