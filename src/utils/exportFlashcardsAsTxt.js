import { saveAs } from "file-saver";

const exportFlashcardsAsTxt = (flashcards, filename) => {
  if (!flashcards?.length) {
    alert("There are no flashcards to export.");
    return;
  }

  let formattedText = "";
  flashcards.forEach(fc => {
    formattedText += "Question: " + fc.question + "\n";
    formattedText += "Answer: " + fc.answer + "\n\n";
  });

  const blob = new Blob([formattedText], { type: "text/plain; charset=utf-8" });
  saveAs(blob, filename);
};

export default exportFlashcardsAsTxt;