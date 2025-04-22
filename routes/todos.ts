import { Router } from "express";
import { Todo } from "../models/todo";

let todos: Todo[]  = [];
const router = Router();

router.get("/", (req, res, next) => { // View All
    res.status(200).json({todos: todos});
});

router.post("/todo", (req, res, next) => { //Add 
    const newTodo: Todo = {id: new Date().toISOString(), text: req.body.text};
    todos.push(newTodo);
    res.status(201).json({message: "added successfully", todos: todos, todo: newTodo});
});

router.put("/todo/:todoId", (req, res, next) => { //Update
    const tid = req.params.todoId;
    const todoIndex = todos.findIndex(todoItem => {
        return todoItem.id === tid;
    });
    if (todoIndex >= 0) {
        todos[todoIndex].text = req.body.text;
        res.status(200).json({ message: "Updated Todo", todos: todos});
    } else {
        res.status(404).json({ message: "ID Not Found", todos: todos});
    }
}) 

router.delete("/todo/:todoId", (req, res, next) => {
    todos = todos.filter(todo => {
        return todo.id !== req.params.todoId;
    });
    res.status(200).json({message: "Deleted Todo", todos: todos});
})
export default router;