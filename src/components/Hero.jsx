import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import React, { useEffect, useState } from "react";
import { heroVideo, smallHeroVideo } from "../utils";

const Hero = () => {
  const [videoSrc, setVideoSrc] = useState(
    window.innerWidth < 760 ? smallHeroVideo : heroVideo
  );
  const [videoKey, setVideoKey] = useState(Date.now());
  const handleVideoSrcSet = () => {
    const newVideoSrc = window.innerWidth < 760 ? smallHeroVideo : heroVideo;
    setVideoSrc(newVideoSrc);
    setVideoKey(Date.now());
  };
  useEffect(() => {
    window.addEventListener("resize", handleVideoSrcSet);
    return () => {
      window.removeEventListener("resize", handleVideoSrcSet);
    };
  }, []);

  useGSAP(() => {
    gsap.to("#hero", {
      opacity: 1,
      delay: 1.5,
    });
    gsap.to("#cta",{
      opacity:1,
      y:-50,
      delay:3

    })
  }, []);
  return (
    <section className="w-full nav-height bg-black relative">
      <div className="h-5/6 w-full  flex-center flex-col">
        <p id="hero" className="hero-title">
          iPhone 15 pro
        </p>
        <div className="md:w-10/12  w-9/12">
          <video
            key={videoKey}
            autoPlay
            muted
            playsInline={true}
            className="pointer-events-none"
          >
            <source src={videoSrc} type="video/mp4" />
          </video>
        </div>
      </div>
      <div id="cta" className="flex flex-col items-center opacity-0 translate-y-20">
        <a href="#highlights" className="btn">Buy</a>
        <p className="font-normal text-xl">From $199/month or $999</p>

      </div>
    </section>
  );
};

export default Hero;
