import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Project } from '../../models/project.model';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  // URL base de l'API del backend
  // Totes les peticions aniran a http://localhost:3700/api/...
  private apiUrl = 'http://localhost:3700/api';

  // Injectem HttpClient per fer peticions HTTP
  constructor(private http: HttpClient) {}

  // GET /api/projects
  // Retorna tots els projectes
  // El backend retorna: { projects: [...] }
  getProjects(): Observable<{ projects: Project[] }> {
    return this.http.get<{ projects: Project[] }>(`${this.apiUrl}/projects`);
  }

  // GET /api/project/:id
  // Retorna un projecte concret per ID
  // El backend retorna: { project: {...} }
  getProject(id: string): Observable<{ project: Project }> {
    return this.http.get<{ project: Project }>(`${this.apiUrl}/project/${id}`);
  }

  // POST /api/save-project
  // Crea un nou projecte
  // El backend retorna: { project: {...} }
  saveProject(project: Project): Observable<{ project: Project }> {
    return this.http.post<{ project: Project }>(`${this.apiUrl}/save-project`, project);
  }

  // PUT /api/project/:id
  // Actualitza un projecte existent
  // El backend retorna: { project: {...} }
  updateProject(id: string, project: Project): Observable<{ project: Project }> {
    return this.http.put<{ project: Project }>(`${this.apiUrl}/project/${id}`, project);
  }

  // DELETE /api/project/:id
  // Elimina un projecte
  // El backend retorna: { project: {...} } (el projecte eliminat)
  deleteProject(id: string): Observable<{ project: Project }> {
    return this.http.delete<{ project: Project }>(`${this.apiUrl}/project/${id}`);
  }

  // POST /api/upload-image/:id
  // Puja una imatge associada a un projecte
  // S'envia com a FormData amb el camp "image"
  uploadImage(id: string, imageFile: File): Observable<{ project: Project }> {
    const formData = new FormData();
    // El backend espera el camp "image" (vegeu el controlador uploadImage2)
    formData.append('image', imageFile);
    return this.http.post<{ project: Project }>(
      `${this.apiUrl}/upload-image/${id}`,
      formData
    );
  }

  // GET /api/get-image/:image
  // Construeix la URL completa per mostrar una imatge
  // S'usa directament al [src] de les imatges al template
  getImageUrl(imageName: string): string {
    return `${this.apiUrl}/get-image/${imageName}`;
  }
}