const Todo = require('../models/todoModel');

//create todo
const createTodos = async (req,res)=>{
    const {title} = req.body;

    try{
        const todo = new Todo({
        user:req.user.id,
        title,
    })
    await todo.save();
        res.status(201).send(todo)
    }
    catch(err){
        console.log(err);
    }
};

//get all todo
const getTodos = async(req,res)=>{
    const id = req.user.id;
    try{
        const todo = await Todo.find({user:id});
        res.json(todo);
    }
    catch(err){
       console.log(err);
    }
}

//delete todo
const deleteTodo = async(req,res)=>{
    const {id} = req.params;
    await Todo.findByIdAndDelete(id);
    res.json({ message: 'Todo deleted' });
}

//udpate todo
const updateTodo = async(req,res)=>{
    const {id} = req.params;
    const {complete} = req.body;
    const todo = await Todo.findByIdAndUpdate(
        id,
        {$set: req.body},
        {new: true},
    );
    res.send(todo);
}

module.exports = {createTodos,getTodos,deleteTodo,updateTodo};