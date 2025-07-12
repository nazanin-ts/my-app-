import { MdOutlineDocumentScanner } from "react-icons/md";
import { PiCardsBold } from "react-icons/pi";
import { RiRobot3Line } from "react-icons/ri";
import { FaSignal } from "react-icons/fa6";
import Carousel from 'react-bootstrap/Carousel';
import { Link } from "react-router-dom"; // ✅ اصلاح شد

const Home = () => {
  return (
    <div className="container-fluid">
      <div className="row py-3 px-3">
        <Carousel>
          <Carousel.Item className="position-relative">
            <img className="w-100" src="/summarization.png" alt="Summarization Banner Image" />
            <div className="position-absolute top-50 start-0 translate-middle-y ps-5 text-start text-dark-emphasis" style={{ maxWidth: "40%" }}>
              <h3>From Pages to Pointers - Instantly.</h3>
              <p className="carousel-body-text">Quickly distill lengthy articles, essays, or notes into easy-to-digest summaries so you can focus on learning, not skimming.</p>
              <Link to="/summarization" className="btn btn-warning">Try Summarizer</Link>
            </div>
          </Carousel.Item>
          <Carousel.Item className="position-relative">
            <img className="w-100" src="/flashcards.png" alt="Flashcards Banner Image" />
            <div className="position-absolute top-50 end-0 translate-middle-y pe-5 text-end text-dark-emphasis" style={{ maxWidth: "35%" }}>
              <h3>Turn Notes into Knowledge.</h3>
              <p className="carousel-body-text">Automatically create flashcards from any text or document — perfect for fast reviews, self-quizzing, and deep understanding.</p>
              <Link to="/flashcards" className="btn btn-warning">Try Flashcard Generator</Link>
            </div>
          </Carousel.Item>
          <Carousel.Item className="position-relative">
            <img className="w-100" src="/chatbot.png" alt="Chatbot Banner Image" />
            <div className="position-absolute top-50 end-0 translate-middle-y pe-5 text-end text-dark-emphasis" style={{ maxWidth: "50%" }}>
              <h3>Study Help, On Demand.</h3>
              <p className="carousel-body-text">
                Ask your AI buddy anything, from complex topics to simple clarifications, and get clear, tailored answers in real time.
              </p>
              <Link to="/chatbot" className="btn btn-warning">Try Chatbot</Link>
            </div>
          </Carousel.Item>
          <Carousel.Item className="position-relative">
            <img className="w-100" src="/difficulty-estimator.png" alt="Difficulty Estimator Banner Image" />
            <div className="position-absolute top-50 start-0 translate-middle-y ps-5 text-start text-dark-emphasis" style={{ maxWidth: "35%" }}>
              <h3 className="text-light">Effort Made Predictable.</h3>
              <p className="carousel-body-text text-white">
                Automatically assess the difficulty of any content — from beginner basics to advanced concepts — so you can study smarter, not harder.
              </p>
              <Link to="/difficulty" className="btn btn-info">Try Difficulty Estimator</Link>
            </div>
          </Carousel.Item>
        </Carousel>
      </div>

      <div className="row py-3 px-3">
        <section className="row display-flex justify-content-evenly mb-3">
          <div className="col-md mt-3">
            <MdOutlineDocumentScanner className="h1 text-primary" />
            <h3 className="h5">Instant Summarization</h3>
            <p className="main-body-text text-secondary">Turn long readings into bite-sized summaries in seconds. Stay focused on what matters most — understanding the core ideas.</p>
          </div>
          <div className="col-md mt-3">
            <PiCardsBold className="h1 text-success" />
            <h3 className="h5">Smart Flashcard Generator</h3>
            <p className="main-body-text text-secondary">Automatically generate study-ready flashcards from any text or PDF. Flip, review, and master key concepts faster than ever.</p>
          </div>
          <div className="col-md mt-3">
            <RiRobot3Line className="h1 text-danger" />
            <h3 className="h5">Ask Me Anything</h3>
            <p className="main-body-text text-secondary">Stuck on a topic? Chat with your AI buddy to get clear, instant answers and explanations tailored to your study material.</p>
          </div>
          <div className="col-md mt-3">
            <FaSignal className="h1 text-warning" />
            <h3 className="h5">Difficulty Estimator</h3>
            <p className="main-body-text text-secondary">Instantly rate how tough a phrase is. Drop in a sentence and get an easy, medium, or hard rating to guide your study focus.</p>
          </div>
        </section>
      </div>
    </div>
  )
}

export default Home;