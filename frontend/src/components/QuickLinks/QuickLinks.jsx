import "./QuickLinks.css"
// Import the images from the assets directory
import baguioLogo from "../../assets/BaguioLogo.png"
import bimpLogo from "../../assets/BIMP.png"
import cgobLogo from "../../assets/CGOB.png"

const QuickLinks = () => {
  return (
    <section className="quick-links-section">
      <div className="quick-links-container">
        <div className="quick-links-left">
          <h2>QUICK LINKS</h2>
          <p>Quick access to Baguio City Websites</p>
        </div>

        <div className="quick-links-cards">
          <a
            href="https://new.baguio.gov.ph/home"
            className="quick-link-card"
            target="_blank"
            rel="noopener noreferrer"
          >
            <div className="card-image">
              <img src={baguioLogo} alt="Baguio City Seal" />
            </div>
            <div className="card-title">
              Baguio City
              <br />
              Official Website
            </div>
          </a>

          <a
            href="https://www.facebook.com/baguioinmypocket/"
            className="quick-link-card"
            target="_blank"
            rel="noopener noreferrer"
          >
            <div className="card-image">
              <img src={bimpLogo} alt="Baguio in my Pocket App" />
            </div>
            <div className="card-title">
              Baguio in my
              <br />
              Pocket
            </div>
          </a>

          <a
            href="https://alternateroutes.baguio.gov.ph/"
            className="quick-link-card"
            target="_blank"
            rel="noopener noreferrer"
          >
            <div className="card-image">
              <img src={cgobLogo} alt="Traffic Monitory Map" />
            </div>
            <div className="card-title">
              Traffic Monitory
              <br />- CGOB
            </div>
          </a>
        </div>
      </div>
    </section>
  )
}

export default QuickLinks