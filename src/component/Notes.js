import Adding_Notes from './Adding-Notes/Adding_Notes'
import classes from './Notes.module.css'
import Show_Module from './Show-Notes/showNotes'
import { useState } from 'react'
import Update_Notes from './Update-Notes/Update_Notes'
import Notes_Details from './Notes-Details/Notes_Details'

const Notes=()=>{
    const [form,setForm]=useState(false)
    const [update,setUpdate]=useState(false)
    const [detail,setDetail]=useState(false)
    const [id, setId]=useState()
    const [detailId, setDetailId]=useState()

    const handleFormAppear = (status) => {
        status ? setForm(true):setForm(false)
    }
    const handleFormUpdate = (status) => {
        status ? setUpdate(true):setUpdate(false)
    }
    const handleNoteDetails=(status)=>{
        status ? setDetail(true):setDetail(false)
    }
    const handleGetId=(id)=>{
        setId(id)
        // console.log('ID',id)
    }
    const handleDetailId=(id)=>{
        setDetailId(id)
    }

    return(
        <div className={`${classes.Notes}`}>
            <div className="container">
                <div className={classes.Box}>
                    {form && !update && !detail&& <Adding_Notes addNote={handleFormAppear}/>}
                    {!form&& !update && !detail&&<Show_Module addNote={handleFormAppear} updateNote={handleFormUpdate} ID={handleGetId} detailNote={handleNoteDetails} IdHandler={handleDetailId}/>}
                    {update && !form && !detail&&<Update_Notes updateNote={handleFormUpdate} addNote={handleFormAppear} ID={id}/>}
                    {detail &&!form&& !update && <Notes_Details detailNote={handleNoteDetails} ID={detailId}/>}
                </div>
            </div>
        </div>
    )
}

export default Notes