import React from "react";
import "./LandingPage.css";

// ---- asset imports
import QuickLinks from "../QuickLinks/QuickLinks";
import Culture from "../Culture/Culture";
import Hero from "../HeroComponent/BreatheBaguio";
import MayorsCorner from "../MayorsCorner/MayorsCorner";
import Header from "../Header/Header";
// ------------------------

const LandingPage = () => (
  <main className="lp-wrapper">
    {/* Header */}
    <Header />

    {/* Hero Section */}
    <Hero />
    {/* Feature cards */}
    <Culture />
    {/* Quick links */}
    <QuickLinks />
    {/* Mayor's Corner */}
    <MayorsCorner />
  </main>
);

export default LandingPage;
