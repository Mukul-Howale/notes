import React from "react";

/*
    Challenge: Try to figure out a way to display only the
    first line of note.body as the note summary in the
    sidebar.
    {note.body.split("\n").filter((line) => {return line !== ""})[0]}
*/

export default function Sidebar(props) {
    const noteElements = props.notes.map((note, index) => (
        <div key={note.id}>
            <div 
                className={`title ${note.id === props.currentNote.id ? "selected-note" : ""}`}
                onClick={() => props.setCurrentNoteId(note.id)}
            >
                <h3 className="text-snippet">Note {index + 1}</h3>
                <h4 className="text-snippet summary">Summary : {line(note.body.split("\n"))}</h4>
            </div>
        </div>
    ))

    function line(notesBody){
        let line;
        for(let i=0; i<notesBody.length; i++){
            if(notesBody[i] !== "") {
                line = notesBody[i];
                break
            }
        }
        return line;
    }

    return (
        <section className="pane sidebar">
            <div className="sidebar--header">
                <h3>Notes</h3>
                <button className="new-note" onClick={props.newNote}>+</button>
            </div>
            {noteElements}
        </section>
    )
}
