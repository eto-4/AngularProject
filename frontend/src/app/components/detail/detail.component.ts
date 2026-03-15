import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ProjectService } from '../../services/project/project.service';
import { AuthService } from '../../services/auth/auth.service';
import { Project } from '../../models/project.model';

// Component que mostra el detall complet d'un projecte
@Component({
    selector: 'app-detail',
    standalone: true,
    imports: [
        CommonModule, 
        RouterLink
    ],
    templateUrl: './detail.component.html',
    styleUrl: './detail.component.css'
})
export class DetailComponent implements OnInit {
    project: Project = new Project();
    loading: boolean = true;
    errorMessage: string = '';
    // Controla si es mostra el diàleg de confirmació d'eliminació
    showDeleteConfirm: boolean = false;
    isLoggedIn: boolean = false

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private projectService: ProjectService,
        private authService: AuthService,
        private cdr: ChangeDetectorRef
    ) {}

    ngOnInit(): void {
      this.authService.isLoggedIn$().subscribe(value => {
        this.isLoggedIn = value;
        this.cdr.detectChanges();
      });
      const id = this.route.snapshot.paramMap.get('id');
      if (id) {
        this.loadProject(id);
      } else {
        this.router.navigate(['/projects']);
      }
    }

    loadProject(id: string): void {
        this.projectService.getProject(id).subscribe({
            next: (response) => {
                this.project = response.project;
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

    // Construeix la URL de la imatge
    getImageUrl(imageName: string): string {
        if (!imageName || imageName === 'null') {
            return 'https://placehold.co/600x400/16213e/a8b2d8?text=Sense+imatge';
        }
        return this.projectService.getImageUrl(imageName);
    }

    // Mostra el diàleg de confirmació abans d'eliminar
    confirmDelete(): void {
        this.showDeleteConfirm = true;
    }

    // Cancel·la l'eliminació i amaga el diàleg
    cancelDelete(): void {
        this.showDeleteConfirm = false;
    }

    // Executa l'eliminació definitiva del projecte
    deleteProject(): void {
        if (!this.project._id) return;
        
        this.projectService.deleteProject(this.project._id).subscribe({
            next: () => {
                // Projecte eliminat correctament: tornem a la llista
                this.router.navigate(['/projects']);
            },
            error: (err) => {
                console.error('Error eliminant el projecte:', err);
                this.errorMessage = 'No s\'ha pogut eliminar el projecte.';
                this.showDeleteConfirm = false;
            }
        });
    }

}