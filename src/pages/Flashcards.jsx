import { useState, useRef } from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Spinner from 'react-bootstrap/Spinner'
import { AiOutlineCloudUpload } from "react-icons/ai";
import { HiOutlineDocumentDuplicate } from "react-icons/hi2";
import { FaLeftLong, FaRightLong } from "react-icons/fa6";
import { RiArrowGoBackFill } from "react-icons/ri";
import { FaFileExport } from "react-icons/fa";
import pdfToText from "../utils/pdfToText";
import exportFlashcardsAsTxt from "../utils/exportFlashcardsAsTxt";

const Flashcards = () => {
  const [inputText, setInputText] = useState("");
  const [flashcards, setFlashcards] = useState([])
  const fileInputRef = useRef(null);

  const [isParsing, setIsParsing] = useState(false)
  const [isGeneratingFlashcards, setIsGeneratingFlashcards] = useState(false)
  const [canShowFlashcards, setCanShowFlashcards] = useState(false)

  const [currentIndex, setCurrentIndex] = useState(0)
  const [showAnswer, setShowAnswer] = useState(false)

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (file && file.type === 'application/pdf') {
      setIsParsing(true)
      const text = await pdfToText(file);
      setInputText(text);
      setIsParsing(false)
    } else {
      alert("Please upload a valid PDF file.")
    }
  }

  const handleGenerateFlashcards = async () => {
    setIsGeneratingFlashcards(true)
    try {
      const response = await fetch("https://cs595-project.onrender.com/api/flashcards", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: inputText }),
      });
      const data = await response.json();
      setFlashcards(data.flashcards)
      setCanShowFlashcards(true)
    } catch (error) {
      console.error("Flashcard generation failed: ", error)
    } finally {
      setIsGeneratingFlashcards(false)
    }
  };

  const handleExport = () => {
    exportFlashcardsAsTxt(flashcards, "flashcards.txt")
  }

  return (
    <div className="container-fluid">
      <div className="row py-3 px-3">
        {!canShowFlashcards ? (
          <Form className="bg-light rounded px-3 pt-2 pb-1">
            <Form.Group className="mb-2" controlId="flashcard-input">
              <Form.Label as='h4'>Flashcard Prompt Input</Form.Label>
              <Form.Control as="textarea" className="mb-2" rows={20} value={inputText} onChange={(e) => setInputText(e.target.value)}/>
              <div className="d-flex align-items-center justify-content-between">
                <div>
                  <input
                    type="file"
                    accept=".pdf,.doc,.docx,.txt"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    style={{ display: "none" }}
                  />
                  <Button
                    className="btn btn-info d-flex align-items-center gap-2"
                    onClick={handleUploadClick}
                  >
                    <AiOutlineCloudUpload size={20} />
                    {isParsing ? (
                      <>Parsing <Spinner animation="border" size="sm" /></>
                    ) : (
                      "Upload Prompt"
                    )}
                  </Button>
                </div>
                <Button 
                  className="btn btn-primary d-flex align-items-center gap-2"
                  onClick={handleGenerateFlashcards}
                >
                  <HiOutlineDocumentDuplicate size={20} />
                  {isGeneratingFlashcards ? (
                      <>Generating <Spinner animation="border" size="sm" /></>
                    ) : (
                      "Generate Flashcards"
                    )}
                </Button>
              </div>
            </Form.Group>
          </Form>
        ) : (
          <div className="d-flex flex-column align-items-center justify-content-between gap-3">
            <div
              className="flashcard-container mb-3"
              onClick={() => setShowAnswer(!showAnswer)}
              style={{ cursor: "pointer" }}
            >
              <div className={`flashcard shadow ${showAnswer ? "flipped" : ""}`}>
                <div className="flashcard-face">
                  {flashcards[currentIndex].question}
                </div>
                <div className="flashcard-face flashcard-back">
                  {flashcards[currentIndex].answer}
                </div>
              </div>
            </div>
            <div id="flashcard-button-container" className="d-flex align-items-center justify-content-around w-100 gap-2">
              <div className="d-flex align-items-center justify-content-around w-100">
                <Button
                  className="btn d-flex align-items-center gap-2"
                  onClick={() => {
                    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : prev))
                    setShowAnswer(false)
                  }}
                  disabled={currentIndex === 0}
                >
                  <FaLeftLong size={18} />
                  Previous
                </Button>
                <Button
                  className="btn d-flex align-items-center gap-2"
                  onClick={() => {
                    setCurrentIndex((prev) => (prev < flashcards.length - 1 ? prev + 1 : prev))
                    setShowAnswer(false)
                  }}
                  disabled={currentIndex === flashcards.length - 1}
                >
                  <FaRightLong size={18} />
                  Next
                </Button>
              </div>
              <div className="d-flex align-items-center justify-content-evenly w-100">
                <Button 
                  className="btn btn-secondary d-flex align-items-center gap-2"
                  onClick={() => {
                    setCanShowFlashcards(false)
                    setCurrentIndex(0)
                    setShowAnswer(false)
                  }}
                >
                  <RiArrowGoBackFill size={18} />
                  Go Back
                </Button>
                <Button 
                  className="btn btn-success d-flex align-items-center gap-2"
                  onClick={handleExport}
                >
                  <FaFileExport size={16}/>
                  Export
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Flashcards