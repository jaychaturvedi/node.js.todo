const router = require('express').Router();
const pool = require('./db')

//create a todo
router.post("/todos", async (req, res) =>{
    try{
        const {description} = req.body;
        console.log("this is my req.boy" +req.body.description)
        const newTodo = await pool.query(
            "INSERT INTO todo (description) VALUES($1) RETURNING *",
            [description]
        );
        console.log(newTodo)
        res.send(newTodo.rows[0])
    } catch (err){
        console.error(err.message)
    }
})

//get all todos
router.get('/todos', async (req,res)=> {
    try{
        const allTodo = await pool.query(
            "SELECT * FROM todo",
        );
        console.log(allTodo.rows)
        res.send(allTodo.rows)
    } catch (err){
        console.error(err.message)
    }
})

//get a todo
router.get('/todos/:id', async (req,res)=> {
    try{
        const {id} = req.params;
        const oneTodo = await pool.query(
            "SELECT * FROM todo WHERE todo_id = $1",
            [id]
        );
        res.send(oneTodo.rows[0])
    } catch (err){
        console.error(err.message)
    }
})

//update a todo
router.put('/todos/:id', async (req,res)=> {
    const {id} = req.params
    const {description} = req.body
    try{
        const updateTodo = await pool.query(
            "UPDATE todo SET description = $1 WHERE todo_id = $2",
            [description, id]
        );
        res.send("todos updated")
    } catch (err){
        console.error(err.message)
    }
})

//delete a todo
router.delete('/todos/:id', async (req,res)=> {
    const {id} = req.params
    try{
        const deleteTodo = await pool.query(
            "DELETE FROM todo WHERE todo_id = $1",
            [id]
        );
        res.send("todos deleted")
    } catch (err){
        console.error(err.message)
    }
})

module.exports = router;