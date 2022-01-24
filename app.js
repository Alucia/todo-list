(function () {
    var optionAdd = 1;
    var optionEdit = 2;
    var optionDelete = 3;
    var optionUpdateStatus = 4;
    var optionPrintList = 5;
    var Todo = /** @class */ (function () {
        function Todo(title, description, status) {
            if (status === void 0) { status = false; }
            this.title = title;
            this.description = description;
            this.status = status;
        }
        Object.defineProperty(Todo.prototype, "getTitle", {
            get: function () {
                return this.title;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Todo.prototype, "setTitle", {
            set: function (title) {
                this.title = title;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Todo.prototype, "getDescription", {
            get: function () {
                return this.description;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Todo.prototype, "setDescription", {
            set: function (description) {
                this.description = description;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Todo.prototype, "getStatus", {
            get: function () {
                return this.status;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Todo.prototype, "fullTask", {
            get: function () {
                return "".concat(this.title, " ").concat(this.description, " - Estado: \"").concat(this.status ? 'Completado' : 'Pendiente', "\"");
            },
            enumerable: false,
            configurable: true
        });
        return Todo;
    }());
    var TodoList = /** @class */ (function () {
        function TodoList() {
        }
        TodoList.prototype.listItem = function () {
            var list = TodoList.listTask.map(function (val, index) {
                index++;
                return "".concat(index, " - ").concat(val.fullTask, " \n");
            });
            return list;
        };
        TodoList.prototype.createItem = function (item) {
            var newItem = new Todo(item.title, item.description);
            TodoList.listTask.push(newItem);
            return TodoList.listTask;
        };
        TodoList.prototype.editItem = function (idTask, item) {
            var editedItem = new Todo(item.title, item.description);
            TodoList.listTask[idTask - 1] = editedItem;
            return TodoList.listTask;
        };
        TodoList.prototype.deleteItem = function (idTask) {
            TodoList.listTask = TodoList.listTask.filter(function (val, index) {
                return index !== idTask - 1;
            });
            return TodoList.listTask;
        };
        TodoList.prototype.updateStatusItem = function (idTask, item) {
            var updatedItem = new Todo(item.title, item.description, item.status);
            TodoList.listTask[idTask - 1] = updatedItem;
            return TodoList.listTask;
        };
        TodoList.prototype.printList = function () {
            var list = TodoList.listTask.map(function (val) {
                return "".concat(val.fullTask);
            });
            return list;
        };
        TodoList.listTask = [];
        return TodoList;
    }());
    // agregar 
    var addTask = function () {
        var titleTask = String(prompt('Ingresar el título de la tarea'));
        var descriptionTask = String(prompt('Ingresar la descripción de la tarea'));
        if (titleTask.length > 0) {
            var item = new TodoList();
            item.createItem({
                title: titleTask,
                description: descriptionTask
            });
            start();
        }
        else {
            addTask();
        }
    };
    // editar
    var editTask = function () {
        var _a, _b;
        var item = new TodoList();
        var tasks = item.listItem();
        var idTask = Number(prompt("Elija el n\u00FAmero de la tarea que desea editar: \n ".concat(tasks)));
        if (idTask !== null && typeof idTask === 'number') {
            var value = TodoList.listTask.filter(function (val, index) {
                return index === idTask - 1;
            });
            var editTitle = String(prompt("Edite el t\u00EDtulo de la tarea", "".concat((_a = value[0]) === null || _a === void 0 ? void 0 : _a.getTitle)));
            var editDescription = String(prompt("Edite la descripci\u00F3n de la tarea", "".concat((_b = value[0]) === null || _b === void 0 ? void 0 : _b.getDescription)));
            if (editTitle.length > 0) {
                item.editItem(idTask, {
                    title: editTitle,
                    description: editDescription
                });
                start();
            }
            else {
                editTask();
            }
        }
        else {
            editTask();
        }
    };
    // eliminar
    var deleteTask = function () {
        var item = new TodoList();
        var tasks = item.listItem();
        var idTask = Number(prompt("Elija el n\u00FAmero de la tarea que desea eliminar:: \n ".concat(tasks)));
        if (idTask !== null && typeof idTask === 'number') {
            item.deleteItem(idTask);
            start();
        }
        else {
            deleteTask();
        }
    };
    // actualizar estado
    var updateTask = function () {
        var item = new TodoList();
        var tasks = item.listItem();
        var idTask = Number(prompt("Elija el n\u00FAmero de la tarea que desea marcar como completado:: \n ".concat(tasks)));
        if (idTask !== null && typeof idTask === 'number') {
            var value = TodoList.listTask.filter(function (val, index) {
                return index === idTask - 1;
            });
            item.updateStatusItem(idTask, {
                title: value[0].getTitle,
                description: value[0].getDescription,
                status: true
            });
            start();
        }
        else {
            updateTask();
        }
    };
    var printTodoList = function () {
        var item = new TodoList();
        item.printList();
        console.log('Lista de tareas: ', item.printList());
    };
    var start = function () {
        var option = Number(prompt("Que desea realizar? \n \n      1. Agregar tarea \n \n      2. Editar tarea \n \n      3. Eliminar tarea \n \n      4. Completar tarea \n \n      5. Imprimir listado", ''));
        if (option != null) {
            if (option === optionAdd) {
                addTask();
            }
            else if (option === optionEdit) {
                editTask();
            }
            else if (option === optionDelete) {
                deleteTask();
            }
            else if (option === optionUpdateStatus) {
                updateTask();
            }
            else if (option === optionPrintList) {
                printTodoList();
                // start();
            }
            else {
                start();
            }
        }
        else {
            start();
        }
    };
    start();
})();
