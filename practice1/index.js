type Task = {
  id: number;
  description: string;
  priority: number;
  completed: boolean;
}

class TaskManager {
  private tasks: Task[];
  private nextId: number;

  constructor() {
      this.tasks = [];
      this.nextId = 1;
  }

  addTask(description: string, priority: number): void {
      const task: Task = {
          id: this.nextId,
          description: description,
          priority: priority,
          completed: false
      };
      this.tasks.push(task);
      this.nextId++;
      console.log(`Task added: ${task.description} with priority ${task.priority}`);
  }

  removeTask(id: number): void {
      const index: number = this.tasks.findIndex(task => task.id === id);
      if (index !== -1) {
          this.tasks.splice(index, 1);
          console.log(`Task ${id} removed.`);
      } else {
          console.log(`Task with ID ${id} not found.`);
      }
  }

  listTasks(): void {
      if (this.tasks.length === 0) {
          console.log("No tasks to display.");
          return;
      }
      console.log("Tasks list:");
      this.tasks.forEach(task => {
          console.log(`ID: ${task.id}, Description: ${task.description}, Priority: ${task.priority}, Completed: ${task.completed}`);
      });
  }

  editTask(id: number, newDescription: string, newPriority: number): void {
      const task: Task | undefined = this.tasks.find(task => task.id === id);
      if (task) {
          task.description = newDescription ?? task.description;
          task.priority = newPriority ?? task.priority;
          console.log(`Task ${id} has been updated.`);
      } else {
          console.log(`Task with ID ${id} not found.`);
      }
  }

  toggleComplete(id: number): void {
      const task: Task | undefined = this.tasks.find(task => task.id === id);
      if (task) {
          task.completed = !task.completed;
          console.log(`Task ${id} completion status changed to ${task.completed}`);
      } else {
          console.log(`Task with ID ${id} not found.`);
      }
  }
}

const manager: TaskManager = new TaskManager();
manager.addTask("Complete project", 1);
manager.addTask("Read documentation", 2);
manager.listTasks();
manager.editTask(1, "Complete project and review", 1);
manager.toggleComplete(1);
manager.listTasks();
manager.removeTask(1);
manager.listTasks();
