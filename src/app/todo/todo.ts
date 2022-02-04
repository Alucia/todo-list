export class Todo {
    
  constructor(
    private title: string,
    private description: string,
    private status: boolean = false
  ) {}
  
  get getTitle() {
    return this.title;
  }
  get getDescription() {
    return this.description;
  }
  get getStatus() {
    return this.status;
  }
  get fullTask() {
    return `${this.title} ${this.description} - Estado: "${this.status ? 'Completado' : 'Pendiente'}"`
  }
}