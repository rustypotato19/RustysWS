import React from "react";

const AboutSection = () => {
  return (
    <section id="about" className="bg-rws-dark-blue text-white py-12 text-center">
      <div className="container mx-auto w-[80%] md:w-full">
        <h2 className="text-3xl font-bold mb-3">About Me</h2>
        <p className="text-lg max-w-2xl mx-auto">
          Briefly, I am looking to provide accessible development to all. I am
          passionate about helping both individuals and businesses to succeed online. I offer fully
          customisable solutions to make your idea stand out.
        </p>
        <div className="separator w-2/3 border-2 mx-auto rounded-lg border-rws-light-blue opacity-35 my-4"></div>
        <h2 className="text-2xl font-bold mb-3">Who am I?</h2>
        <p className="text-lg max-w-2xl mx-auto">
          I am a university student currently employed as a Field Applications Engineer for ETAS Ltd in York. I have enjoyed web development since I first touched upon it in my a-level classroom. A beautiful balance of hardcore backend development and making things look pretty.
          <br />
          I am always looking for opportunities to learn and grow as a developer, expecially since it's something I greatly enjoy
          <br />
          Just below you'll find some of my links to find out even more.
        </p>
        <div className="separator w-2/3 border-2 mx-auto rounded-lg border-rws-light-blue opacity-35 my-4"></div>
        <h2 className="text-xl font-bold mb-8">Check Out My Socials</h2>
        
        {/* Parent container and grid */}
        <div className="w-full mx-auto flex items-center justify-center">
          <div className="socials grid grid-cols-2 md:grid-cols-4 gap-x-10 justify-items-center justify-center items-center">
            <a href="https://github.com/rustypotato19?tab=repositories" className="tag" target="_blank" rel="noreferrer" >
              <img 
              className="w-24 hover:scale-110 transition-shadow duration-700 hover:shadow-[0_0_20px_10px_rgba(255,255,255,1)] rounded-full"
              src="/images/logos/git.svg" 
              alt="GitHub icon" 
              target="_blank"
              />
            </a>
            <a href="https://www.youtube.com/@TheRustyPotato" className="tag" target="_blank" rel="noreferrer" >
              <img 
              className="w-24 hover:scale-110 transition-shadow duration-700 hover:shadow-[0_0_20px_10px_rgba(255,255,255,1)] rounded-full px-2"
              src="/images/logos/youtube.svg" 
              alt="youtube icon" 
              target="_blank"
              />
            </a>
            <a href="https://linkedin.com/company/rustys-web-services" className="tag" target="_blank" rel="noreferrer" >
              <img 
              className="w-24 hover:scale-110 transition-shadow duration-700 hover:shadow-[0_0_20px_10px_rgba(255,255,255,0.7)] rounded-xl"
              src="/images/logos/linkedin.svg" 
              alt="linkedin icon" 
              target="_blank"
              />
            </a>
            <a href="https://discord.gg/ytYWRTaW3e" className="tag" target="_blank" rel="noreferrer" >
              <img 
              className="w-24 hover:scale-110 transition-shadow duration-700 hover:shadow-[0_0_20px_10px_rgba(255,255,255,1)] rounded-full px-2" 
              src="/images/logos/discord.svg" 
              alt="discord icon" 
              />
            </a>
          </div>
        </div>
        <p className="text-sm relative top-12 text-slate-300">Much thanks to <a className="text-blue-400" href="https://icons8.com">icons8.com</a> for providing all of the icons you see on this page.</p>
      </div>
    </section>
  );
};


export default AboutSection;
