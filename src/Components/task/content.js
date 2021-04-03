import React from "react";
import ContentList from "./list";
import ContentText from "./text";

export default function ({ notes, setNotes, isEditMode, isCheckboxMode }) {  
  return (
    <>
      {isCheckboxMode ? (
        <ContentList notes={notes} setNotes={setNotes} isEditMode={isEditMode} />
      ) : (
          <ContentText notes={notes.map(e => e.task).join("\n")} setNotes={setNotes} isEditMode={isEditMode} />
        )}
    </>
  );
}
