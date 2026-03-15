import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProjectService } from '../../services/project/project.service';
import { Project } from '../../models/project.model';

// Component per editar un projecte existent
// Carrega les dades actuals del projecte i les mostra al formulari
@Component({
    selector: 'app-edit',
    standalone: true,
    imports: [
        CommonModule, 
        ReactiveFormsModule, 
        RouterLink
    ],
    templateUrl: './edit.component.html',
    styleUrl: './edit.component.css'
})
export class EditComponent implements OnInit {
    projectForm: FormGroup;
    
    // ID del projecte que s'està editant
    projectId: string = '';
    
    // Imatge actual del projecte (nom del fitxer al backend)
    currentImage: string = '';
    selectedImage: File | null = null;
    imagePreview: string | null = null;
    loading: boolean = true;
    saving: boolean = false;
    errorMessage: string = '';

    constructor(
        private fb: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private projectService: ProjectService,
        private cdr: ChangeDetectorRef
    ) {
        // Inicialitzem el formulari buit (es carregarà amb les dades del projecte)
        this.projectForm = this.fb.group({
            name:        ['', Validators.required],
            description: ['', Validators.required],
            category:    ['', Validators.required],
            langs:       ['', Validators.required],
            year:        ['']
        });
    }

    ngOnInit(): void {
        const id = this.route.snapshot.paramMap.get('id');
        if (id) {
            this.projectId = id;
            this.loadProject(id);
        } else {
            this.router.navigate(['/projects']);
        }
    }

    // Carrega el projecte i omple el formulari amb les seves dades
    loadProject(id: string): void {
        this.projectService.getProject(id).subscribe({
            next: (response) => {
                const project = response.project;
                this.currentImage = project.image || '';
                // Omplim el formulari amb les dades existents del projecte
                this.projectForm.patchValue({
                    name:        project.name,
                    description: project.description,
                    category:    project.category,
                    langs:       project.langs,
                    year:        project.year
                });
                this.loading = false;
                this.cdr.detectChanges();

            },
            error: (err) => {
                console.error('Error carregant el projecte:', err);
                this.errorMessage = 'No s\'ha pogut carregar el projecte.';
                this.loading = false;
                this.cdr.detectChanges();
            }
        });
    }

    onImageSelected(event: Event): void {
        const input = event.target as HTMLInputElement;
        if (input.files && input.files[0]) {
            this.selectedImage = input.files[0];
            const reader = new FileReader();
            reader.onload = (e) => {
              this.imagePreview = e.target?.result as string;
            };
            reader.readAsDataURL(this.selectedImage);
        }
        this.cdr.detectChanges();
    }

    getCurrentImageUrl(): string {
        if (this.imagePreview) return this.imagePreview;
        if (!this.currentImage || this.currentImage === 'null') {
            return 'https://placehold.co/600x400/16213e/a8b2d8?text=Sense+imatge';
        }
        return this.projectService.getImageUrl(this.currentImage);
    }

    onSubmit(): void {
        if (this.projectForm.invalid) return;

        this.saving = true;
        this.errorMessage = '';

        const updatedProject: Project = this.projectForm.value;

        // Pas 1: actualitzem les dades del projecte
        this.projectService.updateProject(this.projectId, updatedProject).subscribe({
            next: (response) => {
                const project = response.project;

                // Pas 2: si hi ha nova imatge, la pugem
                if (this.selectedImage && project._id) {
                    this.projectService.uploadImage(project._id, this.selectedImage).subscribe({
                        next: () => {
                            this.saving = false;
                            this.router.navigate(['/detail', this.projectId]);
                        },
                        error: () => {
                            this.saving = false;
                            // Tot i que la imatge ha fallat, les dades s'han actualitzat
                            this.router.navigate(['/detail', this.projectId]);
                        }
                    });
                } else {
                  this.saving = false;
                  this.router.navigate(['/detail', this.projectId]);
                }
            },
            error: (err) => {
                console.error('Error actualitzant el projecte:', err);
                this.errorMessage = 'No s\'ha pogut actualitzar el projecte.';
                this.saving = false;
            }
        });
    }
}