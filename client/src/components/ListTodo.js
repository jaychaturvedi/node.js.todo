import React, { Fragment, useState, useEffect } from 'react'

function ListTodo() {

    const [todos, setTodos] = useState([])

    const deleteTodo = async (id) => {
        try {
            const response = await fetch(`http://localhost:5000/api/todos/${id}`, {
                method: "DELETE"
            })

            setTodos(todos.filter( i => i.todo_id !== id ))
            console.log(id)
        } catch (err) {
            console.log(err.message)

        }
    }

    const getTodos = async () => {

        const response = await fetch("http://localhost:5000/api/todos");
        try {
            const jsonData = await response.json()
            setTodos(jsonData)

        } catch (err) {
            console.log(err.message);
        }

    };

    useEffect(() => {
        getTodos();
    }, [])


    console.log(todos[0])





    return (<Fragment>
        <table className="table table-bordered mt-5">
            <thead>
                <tr>
                    <th>Description</th>
                    <th>Edit</th>
                    <th>Delete</th>
                </tr>
            </thead>
            <tbody>
                {/* <tr>
        <td>John</td>
        <td>Doe</td>
        <td>john@example.com</td>
      </tr> */}
                {todos.map(todo => (
                    <tr key={todo.todo_id}>
                        <td>{todo.description}</td>
                        <td>Edit</td>
                        <td><button className="btn btn-danger" onClick={() => deleteTodo(todo.todo_id)}>Delete</button></td>
                    </tr>

                ))}

            </tbody>
        </table>
    </Fragment>)
};

export default ListTodo;