import classes from './Adding_Notes.module.css'
import { useState } from 'react'
import { useEffect } from 'react/cjs/react.development';

const Adding_Notes = (props) => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [isActive, setIsActive] = useState(false);

    const handleTitle = (data) => {
        setTitle(data.target.value)
    }
    const handleContent = (data) => {
        setContent(data.target.value)
    }
    useEffect(()=>{
        title.length>0 && content.length>0 ? setIsActive(true):setIsActive(false)
    },[handleTitle,handleContent])
    const handleNoteAdder = async (e) => {
        e.preventDefault()
        try {
            const response = await fetch('https://notes-b4a80-default-rtdb.firebaseio.com/notes.json', {
                method: 'POST',
                body: JSON.stringify({ title: title, content: content, id: Math.random() }),
                headers: {
                    'content-Type': 'application/json'
                },
            });
            const data = await response.json()
            console.log('Successfully POST!');
            handleBcak();
            setTitle(''); setContent('')
        } catch (error) {
            console.log('There is an error occured!', error)
        }
    }
    const handleBcak = () => {
        props.addNote(false)
    }
    return (
        <div className={classes.adding_notes}>
            <div className={classes.formHeader}>
                <h3 className={classes.h3}>Adding Note</h3>
                <i className="fas fa-long-arrow-alt-left" onClick={handleBcak}></i>
            </div>
            <form onSubmit={handleNoteAdder}>
                <div className="form-group">
                    <label>Title</label>
                    <input value={title} type="text" className="form-control" placeholder="Title" onChange={handleTitle} />
                </div>
                <div className="form-group">
                    <label>Content</label>
                    <textarea value={content} className="form-control" rows="5" placeholder="Content" onChange={handleContent}></textarea>
                </div>
                <button type="submit" className="btn btn-primary" disabled={isActive?false:true}>ADD</button>
            </form>
        </div>
    )
}

export default Adding_Notes