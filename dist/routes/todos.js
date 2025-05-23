"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
let todos = [];
const router = (0, express_1.Router)();
router.get("/", (req, res, next) => {
    res.status(200).json({ todos: todos });
});
router.post("/todo", (req, res, next) => {
    const newTodo = { id: new Date().toISOString(), text: req.body.text };
    todos.push(newTodo);
    res.status(201).json({ message: "added successfully", todos: todos, todo: newTodo });
});
router.put("/todo/:todoId", (req, res, next) => {
    const tid = req.params.todoId;
    const todoIndex = todos.findIndex(todoItem => {
        return todoItem.id === tid;
    });
    if (todoIndex >= 0) {
        todos[todoIndex].text = req.body.text;
        res.status(200).json({ message: "Updated Todo", todos: todos });
    }
    else {
        res.status(404).json({ message: "ID Not Found", todos: todos });
    }
});
router.delete("/todo/:todoId", (req, res, next) => {
    todos = todos.filter(todo => {
        return todo.id !== req.params.todoId;
    });
    res.status(200).json({ message: "Deleted Todo", todos: todos });
});
exports.default = router;
