import "./MayorsCorner.css"

const MayorsCorner = () => {
  return (
    <div className="mayors-corner-container">
      <div className="mayors-corner-content">
        <div className="mayors-corner-text">

        <div style={{ height: "5px" }}></div>

          <h1 className="mayors-corner-title">MAYOR'S CORNER</h1>

          <div style={{ height: "7px" }}></div>

          <h2 className="mayors-corner-subtitle">Mayor Benjamin Magalong</h2>

          <div style={{ height: "30px" }}></div>

          <p className="mayors-corner-description">
            Baguio City is currently led by Mayor Benjamin Magalong, known for his focus on good governance,
            transparency, and innovation. He has implemented a 15-point agenda that includes improving disaster
            management, revitalizing the environment, and promoting responsible tourism. Under his leadership, the city
            has received recognition for its excellence in disaster risk reduction and management. His administration
            actively supports youth empowerment and sports development, leading to notable achievements in national
            competitions. He promotes peace and order through community engagement and smart policing strategies.
            Overall, his leadership is marked by a vision of sustainability, inclusiveness, and continuous improvement
            across the city.
          </p>
        </div>

        <div className="mayors-corner-image-container">
          <div className="mayors-corner-image-frame">
            <div className="rectangle-top-right">
              <img src="src/assets/Rectangle.png" alt="" className="rectangle-image" />
            </div>
            <div className="rectangle-bottom-left">
              <img src="src/assets/Rectangle.png" alt="" className="rectangle-image" />
            </div>
            <img src="src/assets/Magalong.png" alt="Mayor Benjamin Magalong" className="mayors-corner-image" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default MayorsCorner
