import React from "react";
import "../LandingPage/LandingPage.css";
import FeatureCard from "./FeatureCard";
import cordilleraDance from "../../assets/Cordillerans.png";
import kalingaTattoo from "../../assets/ApoWandOd.png";

const Culture = () => {
  return (
    <section className="lp-features">
      <p className="lp-tagline">
        Threads of the Highlands: Celebrating Cordillera’s Culture and Heritage
      </p>
      <FeatureCard className={"culture-card-1"}
        img={cordilleraDance}
        title="Echoes of the Highlands: Traditional Cordilleran Dance"
        text="This powerful dance performance showcases the rhythm, unity, and grit of the Cordillerans. Woven cultural costumes and synchronized movements are passed down through generations—honoring both the ancestors and the land."
      />
      <FeatureCard 
        className={"culture-card-2"}
        img={kalingaTattoo}
        title="Wisdom and Identity: The Tattooed Woman of Kalinga"
        text="A symbol of honor and bravery, the traditional tattoos of the Kalinga people reflect a lifetime of cultural pride. This elder, a bearer of ancient wisdom, continues to share the stories, rituals, and heritage of her people."
        reverse
      />
    </section>
  );
};

export default Culture;
