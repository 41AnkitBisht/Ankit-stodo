import React, {useState, useEffect} from 'react';
import './App.css';
import Form from './components/Form';
import TodoList from './components/TodoList';

function App() {
  //Using state to gather data from user ex what user wrote on the web browser
  // const [name_of_variable, Function_to_change_variable]
  const [inputText, setInputText] = useState("");
  const [todos, setTodos] = useState([]);
  const [status, setStatus] = useState("all");
  const [filteredTodos, setFilteredTodos] = useState([]);

  useEffect(() =>{
    getLocalTodos();
  }, []);

  useEffect(()=>{
    filterHandler();
    saveLocalTodos();
  },[todos, status]);

  const filterHandler = () =>{
    switch(status) {
      case "completed":
        setFilteredTodos(todos.filter(todo =>todo.completed === true));
        break;
      case "uncompleted":
        setFilteredTodos(todos.filter(todo =>todo.completed === false));
        break;
      default:
        setFilteredTodos(todos);
        break;
    }
  }
  //Save to Local
  const saveLocalTodos = () =>{
    localStorage.setItem("todos", JSON.stringify(todos));
  }
  const getLocalTodos = () =>{
    if (localStorage.getItem("todos") == null){
      localStorage.setItem("todos", JSON.stringify([]));
    }else{
      let todoLocal = JSON.parse(localStorage.getItem("todos"));
      setTodos(todoLocal);
    }
  }
  return (
    <div className="App">
        <header>
          <h1>Ankit's Todo List {inputText}</h1>
        </header>
        <Form setStatus={setStatus} todos={todos} setTodos={setTodos} inputText={inputText} setInputText={setInputText} />
        <TodoList filteredTodos={filteredTodos} todos={todos} setTodos={setTodos}  />
    </div>
  );
}

export default App;
