import React, { useState } from 'react'
import db from './firebase';
import DeleteIcon from '@material-ui/icons/Delete';
import { makeStyles } from '@material-ui/core/styles';
import './Todo.css';
import { Button, List, ListItem, ListItemAvatar, ListItemText, Modal } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    margin: '0 auto',
    top: '30%',
    left: '30%',
    right: '30%',
  },
}));

function Todo(props) {
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const [input, setInput] = useState('');
    const handleOpen = () => {
        setOpen(true);
    }

    const updateTodo = () => {
        // update the todo with new input text
        db.collection('todos').doc(props.todo.id).set({
            todo: input
        }, { merge: true }) //Merge will prevent you from overridig.

        setOpen(false);
    }
    return (
        <>
        <Modal open={open} onClose={e => setOpen(false)}>
            <div className={classes.paper}>
                <h1>Edit Your Todo</h1>
                <input placeholder={props.todo.todo} value={input} onChange={event => setInput(event.target.value)}/>
                <Button onClick={updateTodo}>Update Todo</Button>
            </div>
        </Modal> 

        <List className="todo_list">
            <ListItem>
               <ListItemAvatar>
                </ListItemAvatar> 
              <ListItemText primary={props.todo.todo} secondary="deadline" />
            </ListItem>
            <button onClick={e => setOpen(true)}>Edit</button>
            <Button onClick={e => db.collection('todos').doc(props.todo.id).delete()}><DeleteIcon />DELETE ME</Button>
        </List>
        </>
    )
}

export default Todo
