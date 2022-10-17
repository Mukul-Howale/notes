import React from "react";

export default function Sidebar(props) {
    const noteElements = props.notes.map((note, index) => (
        <div key={note.id}>
            <div 
                className={`title ${note.id === props.currentNote.id ? "selected-note" : ""}`}
                onClick={() => props.setCurrentNoteId(note.id)}
            >
                <h3 className="text-snippet">{
                    note.body === "# Type your markdown note's title here" 
                    ? `Note ${index + 1}` 
                    : line(note.body.split("\n"))
                }</h3>
                <button className="delete-btn" onClick={(event) => props.deleteNote(event,note.id)}>
                    <i className="gg-trash trash-icon"></i>
                </button>
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
