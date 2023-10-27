"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
let todos = [];
const router = (0, express_1.Router)();
router.get('/', (request, response, next) => {
    response.status(200).json({ todos: todos });
});
router.post('/todo', (request, response, next) => {
    const body = request.body;
    const newTodo = {
        id: new Date().toISOString(),
        title: body.text
    };
    todos.push(newTodo);
    response.status(201).json({ message: "Todo item added to database", todo: newTodo, todos: todos });
});
router.put('/todo/:todoId', (request, response, next) => {
    const body = request.body;
    const params = request.params;
    const tid = params.todoId;
    let todoIndex = todos.findIndex(todoItem => todoItem.id === tid);
    if (todoIndex >= 0) {
        todos[todoIndex].title = body.text;
        return response.status(200).json({ message: "Todo is Updated " });
    }
    response.status(404).json({ message: "Data is not found" });
});
router.delete('/todo/:todoId', (request, response, next) => {
    const params = request.params;
    const tid = params.todoId;
    let todoIndex = todos.findIndex(todoItem => todoItem.id === tid);
    if (todoIndex >= 0) {
        todos = todos.filter(todoItem => todoItem.id !== tid);
        return response.status(200).json({ message: "Todo item is deleted" });
    }
    response.status(404).json({ message: "Data is not found" });
});
exports.default = router;
