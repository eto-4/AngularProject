export class Project {

    // Id del projecte
    _id?: string;

    // Nom del projecte
    name: string;

    // Descripció del projecte
    description: string;

    // Categoria del projecte
    category: string;

    // Any del projecte
    year?: number;

    // Llenguatges o tecnologies utilitzades.
    langs: string;
    
    // Nom del fitxer d'imatge guardat al backend
    image?: string;
    

    // Inicialització de les dades
    constructor() {
        this._id = '';
        this.name = '';
        this.description = '';
        this.category = '';
        this.year = new Date(). getFullYear();
        this.langs = '';
        this.image = '';
    }   
}