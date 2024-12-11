const express = require('express');
const {createTodos,getTodos, deleteTodo, updateTodo} = require('../controllers/todoController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

//create todo route
router.post('/',authMiddleware,createTodos);

//get todo route
router.get('/',authMiddleware,getTodos);

//delete todo route 
router.delete('/:id',authMiddleware,deleteTodo);

//update todo route
router.put('/:id',authMiddleware,updateTodo);

module.exports = router;