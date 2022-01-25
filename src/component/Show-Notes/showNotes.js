import classes from './show.module.css';
import { useState, useEffect } from 'react';

const Show_Module = (props) => {
    const [notes, setNotes] = useState([]);
    const [loading, setLoading] = useState(false);
    // START GET 
    useEffect(() => {
        handleGetData();
    }, []);
    const handleGetData=async()=>{
        let Notes = [];
        try {
            setLoading(true);
            const response = await fetch('https://notes-b4a80-default-rtdb.firebaseio.com/notes.json');
            const data = await response.json();
            for (let key in data) {
                // console.log('DATA', data[key]);
                Notes.push({ title: data[key].title, content: data[key].content, id: key});
            }
            setNotes(Notes);
            setLoading(false);
        } catch (error) {
            setLoading(false);
        }
    };
    const handleAddingNotes = () => {
        props.addNote(true);
    };
    // END GET
    // START DELETE
        const handleDelete =async(id)=>{
            // console.log('my id is',id);
            setNotes([]);
            setLoading(true);
            const response = await fetch(`https://notes-b4a80-default-rtdb.firebaseio.com/notes/${id}.json`,{
                method:'DELETE'
            });
            setLoading(false);
            handleGetData();
        };
    // END DELETE
    const handleUpdate =(state)=>{
        props.ID(state)
        props.updateNote(true)
    }  
    const handleDetails=(id)=>{
        props.IdHandler(id)
        props.detailNote(true)
    }
    return (
        <div className={classes.showNotes}>
            <h3 className={classes.h3}>Notes</h3>
            {notes.length > 0 && <ul className={`${classes.Notes}`}>
                {notes.map((note) =>
                    <li key={note.id}>
                        <div className="row">
                            <div className='col-md-2'><h4>{note.title}</h4></div>
                            <div className='col-md-7'><p>{note.content}</p></div>
                            <div className={`col-md-3 ${classes.buttons}`}>
                                <i title='Details' className="fas fa-info-circle" onClick={()=>handleDetails(note.id)}></i>
                                <i title='Edit' className="fas fa-edit" onClick={()=>handleUpdate(note.id)}></i>
                                <i title='Remove' className="fas fa-eraser" onClick={()=>handleDelete(note.id)}></i>
                            </div>
                        </div>
                    </li>
                )}
            </ul>}
            {notes.length == 0 && loading && <div className={classes.spinner}>
                    <div className="spinner-border" style={{width: '7rem', height:'7rem'}} role="status">
                        <span className="sr-only">Loading...</span>
                    </div>
                </div>}
            {notes.length == 0 && !loading && <div className={classes.text}>
                <p><span>There is no NOTES found!</span></p>
                <p> Add your own notes by click on the button below ! </p>
            </div>}
            <div className={classes.addBtn}>
                <button onClick={handleAddingNotes}><i className="fas fa-plus-square"></i></button>
            </div>
        </div>
    );
};

export default Show_Module