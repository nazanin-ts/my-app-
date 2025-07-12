import { saveAs } from "file-saver"

const exportTextAsTxt = (text, filename) => {
  if (!text) {
    alert("There are no summary to export.")
    return
  }

  const blob = new Blob([text], {type: "text/plain; charset=utf-8"})
  saveAs(blob, filename)
}

export default exportTextAsTxt;