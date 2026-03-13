import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ProjectService } from '../../services/project/project.service';
import { AuthService } from '../../services/auth/auth.service';
import { Project } from '../../models/project.model';

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

    constructor(
        private projectService: ProjectService,
        private authService: AuthService
    ) {}

    // S'executa quan el component s'inicialitza: carrega els projectes
    ngOnInit(): void {
        this.loadProjects();
    }

    // Crida al servei per obtenir tots els projectes del backend
    loadProjects(): void {
        this.loading = true;
        this.projectService.getProjects().subscribe({
            next: (response) => {
                // El backend retorna { projects: [...] }
                this.projects = response.projects;
                this.loading = false;
            },
            error: (err) => {
                console.error('Error carregant projectes:', err);
                this.errorMessage = 'No s\'han pogut carregar els projectes.';
                this.loading = false;
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

    // Getter per comprovar si l'usuari està autenticat (per mostrar el botó "Nou Projecte")
    get isLoggedIn(): boolean {
        return this.authService.isLoggedIn();
    }
}