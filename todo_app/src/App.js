import React, { useState } from 'react';
import './App.css';
import { Button, FormControl, Input, InputLabel } from '@material-ui/core';

function App() {
  //todos will start with an empty array, this is setting the state, state is temporary it will reset once refreshed
  //react hooks => allows you to use state and other react features without writing a class
  const [todos, setTodos] = useState(['Finish FS project', 'Take a walk', 'Sleep']);
  //the input for the todo should be empty everytime
  const [input, setInput] = useState('');

  // onClick event handler
  const addTodo = (e) => {
    e.preventDefault();
    // keep the current array and then append the input to it
    setTodos([...todos, input]);
    setInput(''); //clears the input after enter
  } 

  return (
    <div className="App">
      <h1>Hello World!</h1>
      <form>
        {/* mapping the state with the input, capture the data being entered in the input */}
        <FormControl>
          <InputLabel>Write a todo</InputLabel>
          <Input value={input} onChange={e => setInput(e.target.value)}/>
        </FormControl>

        <Button disabled={!input} type="submit" onClick={addTodo} variant="contained" color="secondary">
          Add Todo
        </Button>
        {/* <button type="submit" onClick={addTodo}>Add Todo </button> */}
      </form>

    <ul>  
        {todos.map(todo => (
          <li>{todo}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
