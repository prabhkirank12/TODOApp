import React, { useState } from 'react'
import db from './firebase';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import { makeStyles } from '@material-ui/core/styles';
import './Todo.css';
import { startConfetti, stopConfetti, removeConfetti } from './confetti.js';
import { Button, List, ListItem, ListItemText, ListItemAvatar, Modal } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: '50%',
    height: '18%',
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    margin: '0 auto',
    top: '30%',
    left: '30%',
    right: '30%',
    borderRadius: '4px',
  },
}));

function Todo(props) {
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const [input, setInput] = useState('');

    const updateTodo = () => {
        // update the todo with new input text
        db.collection('todos').doc(props.todo.id).set({
            todo: input
        }, { merge: true }) //Merge will prevent you from overridig.

        setOpen(false);
    }

    const done = () => {
        stopConfetti();
        removeConfetti();
    }

    const deleteTodo = () => {
        db.collection('todos').doc(props.todo.id).delete();
        startConfetti();
        setTimeout(() => {
            done()
        }, 3000)
    }
    return (
        <>
        <Modal open={open} onClose={e => setOpen(false)}>
            <div className={classes.paper}>
                <h2>Edit Your Todo</h2>
                <input className="update-todo" placeholder={props.todo.todo} value={input} onChange={event => setInput(event.target.value)}/>
                <div className='update-bttn'>
                    <Button className='bttn' onClick={updateTodo}>Update Todo</Button>
                </div>
            </div>
        </Modal> 

        <List className="todo_list">
            <ListItem>
                <ListItemAvatar> <CheckBoxOutlineBlankIcon className='checkbox'/> </ListItemAvatar> 
              <ListItemText className="todo-text" primary={props.todo.todo} secondary={props.todo.createdAt} />
            </ListItem>
            <div className='bttn-div'>
                <Button className='bttn' onClick={e => setOpen(true)}><EditIcon />Edit</Button>
                <Button className='bttn' onClick={deleteTodo}><DeleteIcon />DELETE ME</Button>
            </div>
        </List>
        
        </>
    )
}

export default Todo
