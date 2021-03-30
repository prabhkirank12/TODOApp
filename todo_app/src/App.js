import React, { useEffect, useState } from 'react';
import './App.css';
import { Button, FormControl, Input, InputLabel } from '@material-ui/core';
import Todo from './Todo';
import db from './firebase';

function App() {
  //todos will start with an empty array, this is setting the state, state is temporary it will reset once refreshed
  //react hooks => allows you to use state and other react features without writing a class
  const [todos, setTodos] = useState([]);
  //the input for the todo should be empty everytime
  const [input, setInput] = useState('');

  // when the app loads, we need to listen to the database and fetch new todoss as they get added/remove
  //useEffect => is a hook, runs once when the app loads
  // useEffect will fire each time I type anything into the input field
  useEffect(() => {
    // the code here ... fires when the app.js loads
    db.collection('todos').onSnapshot(snapshot => {
      // takes a snapshot and makes docs and then go over each doc and reterives the todo field and add to the array and set to setTOdos
      // console.log(snapshot.docs.map(doc => doc.data())) => returns an object
      setTodos(snapshot.docs.map(doc => doc.data().todo))
    })
  }, [])

  // onClick event handler
  const addTodo = (e) => {
    e.preventDefault();
    // this will add to the db
    db.collection('todos').add({
      todo: input
    })
    // keep the current array and then append the input to it
    // setTodos([...todos, input]);
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
          <Todo todo={todo}/>
        ))}
      </ul>
    </div>
  );
}

export default App;
