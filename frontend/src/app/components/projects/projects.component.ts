import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ProjectService } from '../../services/project/project.service';
import { AuthService } from '../../services/auth/auth.service';
import { Project } from '../../models/project.model';
import { Observable } from 'rxjs';

// Component que mostra la llista de tots els projectes
@Component({
    selector: 'app-projects',
    standalone: true,
    imports: [
        CommonModule, 
        RouterLink
    ],
    templateUrl: './projects.component.html',
    styleUrl: './projects.component.css'
})
export class ProjectsComponent implements OnInit {
    // Array de projectes retornats pel backend
    projects: Project[] = [];
    // Estat de càrrega per mostrar un spinner mentre esperem la resposta
    loading: boolean = true;
    // Missatge d'error si la petició falla
    errorMessage: string = '';

    isLoggedIn: boolean = false;

    constructor(
        private projectService: ProjectService,
        private authService: AuthService,
        private cdr: ChangeDetectorRef
    ) {}

    ngOnInit(): void {
      this.authService.isLoggedIn$().subscribe(value => {
        this.isLoggedIn = value;
        this.cdr.detectChanges();
      });
      this.loadProjects();
    }

    // Crida al servei per obtenir tots els projectes del backend
    loadProjects(): void {
        this.loading = true;
        this.projectService.getProjects().subscribe({
            next: (response) => {
                console.log('Resposta del backend:', response);
                // El backend retorna { projects: [...] }
                this.projects = response.projects || [];
                this.loading = false;
                this.cdr.detectChanges();
            },
            error: (err) => {
                console.error('Error carregant projectes:', err);
                this.errorMessage = 'No s\'han pogut carregar els projectes.';
                this.loading = false;
                this.cdr.detectChanges();
            }
        });
    }

    // Construeix la URL de la imatge d'un projecte
    getImageUrl(imageName: string): string {
        // Si no té imatge assignada o és "null", retornem una imatge per defecte
        if (!imageName || imageName === 'null') {
            return 'https://placehold.co/600x400/16213e/a8b2d8?text=Sense+imatge';
        }
        return this.projectService.getImageUrl(imageName);
    }
}