(() => {
  const optionAdd = 1;
  const optionEdit = 2;
  const optionDelete = 3;
  const optionUpdateStatus = 4;
  const optionPrintList = 5;

  interface ITodo {
    title: string;
    description: string;
    status?: boolean;
  }

  class Todo {
    
    constructor(
      private title: string,
      private description: string,
      private status: boolean = false
    ) {}
    
    get getTitle() {
      return this.title;
    }
    set setTitle(title: string) {
      this.title = title;
    }
    get getDescription() {
      return this.description;
    }
    set setDescription(description: string) {
      this.description = description;
    }
    get getStatus() {
      return this.status;
    }
    get fullTask() {
      return `${this.title} ${this.description} - Estado: "${this.status ? 'Completado' : 'Pendiente'}"`
    }


  }
  
  class TodoList {
    static listTask: Todo[] = [];

    listItem(): string[] {
      const list = TodoList.listTask.map((val, index) => {
        index++;
        return `${index} - ${val.fullTask} \n`
      });
      return list;
    }

    createItem(item: ITodo): Todo[] {
      const newItem = new Todo(item.title, item.description);
      TodoList.listTask.push(newItem);
      return TodoList.listTask;
    }

    editItem(idTask: number, item: ITodo): Todo[] {
      const editedItem = new Todo(item.title, item.description);
      TodoList.listTask[idTask - 1] = editedItem;
      return TodoList.listTask;   
    }

    deleteItem(idTask: number): Todo[] {
      TodoList.listTask = TodoList.listTask.filter((val, index) => {
        return index !== idTask -1;
      });
      return TodoList.listTask;   
    }

    updateStatusItem(idTask: number, item: ITodo): Todo[] {
      const updatedItem = new Todo(item.title, item.description, item.status);

      TodoList.listTask[idTask - 1] = updatedItem;

      return TodoList.listTask;   
    }

    printList() {
      const list = TodoList.listTask.map((val) => {
        return `${val.fullTask}`
      });
      return list;
    }

  }

  // agregar 
  const addTask = () => {
    let titleTask: string = String(prompt('Ingresar el título de la tarea'));
    let descriptionTask: string = String(prompt('Ingresar la descripción de la tarea'));

    if (titleTask.length > 0) {
      const item: TodoList = new TodoList();
      item.createItem({
        title: titleTask,
        description: descriptionTask,
      });
      start();
    } else {
      addTask();
    }
  }


  // editar
  const editTask = () => {
    const item: TodoList = new TodoList();
    const tasks = item.listItem();

    let idTask: number = Number(prompt(`Elija el número de la tarea que desea editar: \n ${tasks}`));

    if (idTask !== null && typeof idTask === 'number') {
      const value = TodoList.listTask.filter((val, index) => {
        return index === idTask - 1;
      });

      let editTitle: string = String(prompt(`Edite el título de la tarea`, `${value[0]?.getTitle}`));
      let editDescription: string = String(prompt(`Edite la descripción de la tarea`, `${value[0]?.getDescription}`));

      if (editTitle.length > 0) {
        item.editItem(idTask, {
          title: editTitle,
          description: editDescription,
        });
        start();
      } else {
        editTask();
      }
    } else {
      editTask();
    }
  };

  // eliminar
  const deleteTask = () => {
    const item: TodoList = new TodoList();
    const tasks = item.listItem();

    let idTask: number = Number(prompt(`Elija el número de la tarea que desea eliminar:: \n ${tasks}`));

    if (idTask !== null && typeof idTask === 'number') {
      item.deleteItem(idTask);
      start();
    } else {
      deleteTask();
    }
  }

  // actualizar estado
  const updateTask = () => {
    const item: TodoList = new TodoList();
    const tasks = item.listItem();

    let idTask: number = Number(prompt(`Elija el número de la tarea que desea marcar como completado:: \n ${tasks}`));

    if (idTask !== null && typeof idTask === 'number') {
      const value: Todo[] = TodoList.listTask.filter((val, index) => {
        return index === idTask - 1;
      });

      item.updateStatusItem(idTask, {
        title: value[0]!.getTitle,
        description: value[0]!.getDescription,
        status: true
      });
      start();
    } else {
      updateTask();
    }
  }

  const printTodoList = () => {
    const item: TodoList = new TodoList();
    item.printList();
    console.log('Lista de tareas: ', item.printList());
  }

  const start = () => {
    let option = Number(prompt(
      `Que desea realizar? \n 
      1. Agregar tarea \n 
      2. Editar tarea \n 
      3. Eliminar tarea \n 
      4. Completar tarea \n 
      5. Imprimir listado`, ''));

    if (option != null) {
      if (option === optionAdd) {
        addTask();
      } else if (option === optionEdit) {
        editTask();
      } else if (option === optionDelete) {
        deleteTask();
      } else if (option === optionUpdateStatus) {
        updateTask();
      } else if (option === optionPrintList) {
        printTodoList();
        // start();
      } else {
        start();
      }
    } else {
      start();
    }
  }

  start();

})();
