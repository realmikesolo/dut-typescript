# Task Manager Application

## Overview

This repository contains the code for a basic task manager implemented in JavaScript. The primary file, `index.js`, houses a class `TaskManager` that allows users to add, edit, remove, and list tasks. Each task is characterized by an ID, description, priority, and a completion status.

## Features

The `TaskManager` class includes several methods:

- **addTask(description: string, priority: number)**: Adds a new task with the given description and priority.
- **removeTask(id: number)**: Removes the task associated with the given ID.
- **listTasks()**: Lists all the tasks currently in the manager.
- **editTask(id: number, newDescription: string, newPriority: number)**: Edits the task with a new description and/or priority.
- **toggleComplete(id: number)**: Toggles the completion status of the specified task.

## TypeScript Annotations

The main code for the task manager is written in JavaScript. However, for demonstration purposes in this documentation, I've added TypeScript type annotations. These annotations are used to clarify the types of variables and function parameters, which can help make the code structure clearer and ensure type safety during development.

Please be aware that these type annotations do not affect the runtime behavior of JavaScript, as JavaScript does not support types natively. If you wish to utilize TypeScript in practice for its benefits, such as static type checking, you will need to set up a TypeScript development environment. This involves installing TypeScript and configuring a `tsconfig.json` file to compile TypeScript code to JavaScript.
