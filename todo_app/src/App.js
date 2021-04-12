import React, { useEffect, useState } from 'react';
import firebase from 'firebase';
import './App.css';
import { Button, FormControl, Input, InputLabel } from '@material-ui/core';
import ListAltIcon from '@material-ui/icons/ListAlt';
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
    db.collection('todos').orderBy('timestamp', 'desc').onSnapshot(snapshot => {
      // takes a snapshot and makes docs and then go over each doc and reterives the todo field and add to the array and set to setTOdos
      // console.log(snapshot.docs.map(doc => ({id: doc.id, todo: doc.data().todo}))) //=> returns an object
      setTodos(snapshot.docs.map(doc => ({id: doc.id, todo: doc.data().todo})))
      
    })
  }, [])

  // onClick event handler
  const addTodo = (e) => {
    e.preventDefault();
    // this will add to the db
    db.collection('todos').add({
      todo: input,
      timestamp: firebase.firestore.FieldValue.serverTimestamp() //this is the timestamp from the server
    })
    // keep the current array and then append the input to it
    // setTodos([...todos, input]);
    setInput(''); //clears the input after enter
    console.log(e)
  } 

  return (
    <div className="App">
      <div className="title-form">
        <h1><ListAltIcon className="todo-icon"/> ToDo List:</h1>
        <form className="form">
          {/* mapping the state with the input, capture the data being entered in the input */}
          <FormControl>
            <InputLabel>Write a todo </InputLabel>
            <Input value={input} onChange={e => setInput(e.target.value)} className="input"/>
          </FormControl>

          <Button className="todo-bttn" disabled={!input} type="submit" onClick={addTodo} variant="contained" color="secondary">
            Add Todo
          </Button>
          {/* <button type="submit" onClick={addTodo}>Add Todo </button> */}
        </form>
      </div>
      <ul> 
         
        {todos.map(todo => (
          <Todo todo={todo}/>
        ))}
      </ul>
      
    </div>
  );
}

export default App;
