import classes from './Update_Notes.module.css'
import { useState, useEffect } from 'react'
const Update_Notes = (props) => {
	const [title, setTitle] = useState('');
	const [content, setContent] = useState('');

	const handleBcak = () => {
		props.addNote(false)
		props.updateNote(false);
	}
	const handleTitle = (data) => {
		setTitle(data.target.value)
		// console.log('title', data.target.value)
	}
	const handleContent = (data) => {
		setContent(data.target.value)
		// console.log('content', data.target.value)
	}
	const handleNoteUpdate = (e) => {
		e.preventDefault()
		const load = {
			method: 'PUT',
			body: JSON.stringify({ title: title, content: content, id: Math.random() }),
			headers: {
					'Content-Type': 'application/json' 
			},
			auth:null
	}
		// console.log(props.ID);
		fetch(`https://notes-b4a80-default-rtdb.firebaseio.com/notes/${props.ID}.json`, load)
			.then((res) => {
				// console.log('response after edits', res)
				handleBcak();
				setTitle(''); setContent('')
			})
			.catch((error) => {
				console.log(error.message)
			})
	}
	// start get 
	const getItems = async () => {
		const response = await fetch(`https://notes-b4a80-default-rtdb.firebaseio.com/notes/${props.ID}.json`);
		const data = await response.json()
		// console.log('my item', data)
		setTitle(data.title)
		setContent(data.content)
	}
	useEffect(() => {
		getItems()
	}, [])
	// end get 
	return (
		<div className={classes.update_notes}>
			<div className={classes.formHeader}>
				<h3 className={classes.h3}>Update Note</h3>
				<i className="fas fa-long-arrow-alt-left" onClick={handleBcak}></i>
			</div>
			<form onSubmit={handleNoteUpdate}>
				<div className="form-group">
					<label>Title</label>
					<input value={title} type="text" className="form-control" placeholder="Title" onChange={handleTitle} />
				</div>
				<div className="form-group">
					<label>Content</label>
					<textarea value={content} className="form-control" rows="5" placeholder="Content" onChange={handleContent}></textarea>
				</div>
				<button type="submit" className="btn btn-primary">Update</button>
			</form>
		</div>
	)
}

export default Update_Notes