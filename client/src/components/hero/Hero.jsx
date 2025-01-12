import React from "react";
import heroimg from "../../assets/heroimg.jpg";

// import Hero from "../components/hero/Hero";

const bgStyle = {
  backgroundImage: `url(${heroimg})`,
  backgroundSize: "cover",
  backgroundPosition: "top",
  backgroundRepeat: "no-repeat",
  width: "100%",
};

const Hero = () => {
  return (
    <div style={bgStyle}>
      <div
        className="min-h-[650px] md: min-h-[550px]
      bg-gradient-to-r 
      from-black/80 
      to-primary/60 pt-33
      pb-10 md:pt-48"
      >
        <div className="container">
          <div
            className="grid grid-cols-1 
            lg: grid-cols-2
            item-center gap-12 
            text-white"
          ></div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
