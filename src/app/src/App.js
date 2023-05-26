import "./App.css";
import { useState, useEffect } from "react";
import axios from "axios";

export function App() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");

  useEffect(() => {
    async function getTodos() {
      try {
        const response = await axios.get("http://127.0.0.1:8000/todos/");
        setTodos(response.data);
        console.log(response.data);
      } catch (error) {
        console.log(error);
      }
    }
    getTodos();
  }, [newTodo, 0]);


  const handleAddTodo = async (e) => {
    e.preventDefault();
    try {
      console.log(newTodo)
      const response = await axios.post("http://127.0.0.1:8000/todos/", {
        "title": newTodo,
      });
      setTodos([...todos, response.data]);
      setNewTodo("");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="App">
      <div>
        <h1>List of TODOs</h1>
        <ol  style={{ display: "flex", flexDirection:"column", alignItems:"center" }}>
          {todos.map((todo) => (
            <li key={todo.id}>{todo.title}</li>
          ))}
        </ol>
      </div>
      <div>
        <h1>Create a ToDo</h1>
        <form>
          <div>
            <label htmlFor="todo">ToDo: </label>
            <input
              type="text"
              value={newTodo}
              onChange={(e) => setNewTodo(e.target.value)}
            />
          </div>
          <div style={{ marginTop: "5px" }}>
            <button onClick={handleAddTodo}>Add ToDo!</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default App;
