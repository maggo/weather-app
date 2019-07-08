import React, { FunctionComponent } from "react";
import styles from "./Notes.module.css";

interface Props {
  notes?: string[];
  onAdd?: (note: string) => void;
  onDelete?: (index: number) => void;
}

export const Notes: FunctionComponent<Props> = ({ notes, onAdd, onDelete }) => {
  return (
    <div className={styles.container}>
      <h5>Notes</h5>
      <div className={styles.noteList}>
        {!!notes && notes.length ? (
          notes.map((note, index) => (
            <div key={index} className={styles.note}>
              {note}
              <button
                className="icon"
                onClick={() => onDelete && onDelete(index)}
              >
                <span role="img" aria-label="Delete">
                  🗑
                </span>
              </button>
            </div>
          ))
        ) : (
          <div>No notes yet…</div>
        )}
      </div>

      <form
        onSubmit={e => {
          e.preventDefault();

          const value = e.currentTarget.note.value;

          if (value) {
            onAdd && onAdd(e.currentTarget.note.value);
            e.currentTarget.note.value = "";
          }
        }}
      >
        <textarea
          className={styles.textarea}
          name="note"
          placeholder="Add a new note"
          rows={5}
        />
        <button>Submit</button>
      </form>
    </div>
  );
};
