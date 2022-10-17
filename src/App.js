import React from "react";
import Sidebar from "./components/Sidebar";
import Editor from "./components/Editor";
import Split from "react-split";
import { nanoid } from "nanoid";
import "./styles/App.css";
import "react-mde/lib/styles/css/react-mde-all.css";    // used for markdown styling

/**
* Challenge: complete and implement the deleteNote function
*/

export default function App() {
    //By adding fn for returning value while state initialization, 
    //the value is loaded once when the component is rendered at the first time
    //This is lazy state initialization
    //If the state is not initialized lazily, 
    //(in the below code) it will keep on getting the locally stored value at each render of the component
    const [notes, setNotes] = React.useState(() => {
        return JSON.parse(localStorage.getItem("notes")) || []
    })

    const [currentNoteId, setCurrentNoteId] = React.useState(
        (notes[0] && notes[0].id) || ""
    )

    React.useEffect(() => {
        localStorage.setItem("notes", JSON.stringify(notes))
    }, [notes])

    function createNewNote() {
        const newNote = {
            id: nanoid(),
            body: "# Type your markdown note's title here"
        }
        setNotes(oldNotes => [...oldNotes, newNote])
        setCurrentNoteId(newNote.id)
    }

    function updateNote(text) {
        // Rearranging recently updating note to the top of the list
        setNotes(oldNotes => {
            const newNote = []
            for(let i=0; i<oldNotes.length; i++){
                if(oldNotes[i].id === currentNoteId) newNote.unshift({...oldNotes[i], body:text})
                else newNote.push(oldNotes[i])
            }
            return newNote
        })
    }

    function deleteNote(event,noteId){
        event.stopPropagation()
        setNotes(oldNotes => oldNotes.filter(note => {
            return note.id !== noteId
        }))
    }

    function findCurrentNote() {
        return notes.find(note => {
            return note.id === currentNoteId
        }) || notes[0]
    }

    return (
        <main>
        {
            notes.length > 0
            ?
            <Split
                sizes={[30, 70]}
                direction="horizontal"
                className="split"
            >
                <Sidebar
                notes={notes}
                currentNote={findCurrentNote()}
                setCurrentNoteId={setCurrentNoteId}
                newNote={createNewNote}
                deleteNote={deleteNote}
                />
                {
                currentNoteId &&
                notes.length > 0 &&
                <Editor
                    currentNote={findCurrentNote()}
                    updateNote={updateNote}
                />
                }
            </Split>
            :
            <div className="no-notes">
                <h1>You have no notes</h1>
                <button
                className="first-note"
                onClick={createNewNote}
                >
                Create one now
                </button>
            </div>

        }
        </main>
    )
}
