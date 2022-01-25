import classes from './Notes_Details.module.css'
import {useState,useEffect} from 'react'

const Notes_Details = (props) => {
    const [title,setTitle]=useState('')
    const [content,setContent]=useState('')
    const handleBcak = () => {
        props.detailNote(false)
    }
        // start get 
        const getItems=async()=>{
            const response=await fetch(`https://notes-b4a80-default-rtdb.firebaseio.com/notes/${props.ID}.json`);
            const data=await response.json()
            setTitle(data.title)
            setContent(data.content)
        }
        useEffect(()=>{
            getItems()
        },[])
    // end get 
    return (
        <div>
            <div className={classes.formHeader}>
                <h3 className={classes.h3}>Adding Note</h3>
                <i className="fas fa-long-arrow-alt-left" onClick={handleBcak}></i>
            </div>
            <div className={`card ${classes.card_details}`}>
                <div className="card-header">
                    {title}
                </div>
                <div className="card-body">
                    <blockquote className="blockquote mb-0">
                        <p>{content}</p>
                    </blockquote>
                </div>
            </div>
        </div>
    )
}

export default Notes_Details