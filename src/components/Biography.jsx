import React, { useEffect, useRef, useState } from "react";

const BiographySection = ({ id, title, children, sectionNumber }) => {
  const lineNumbersRef = useRef(null);
  const contentRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);
  
  // Function to get relevant emoji based on section content
  const getSectionEmoji = (title, sectionNumber) => {
    const emojiMap = {
      1: "👋", // Who I Am
      2: "🌱", // Early Life
      3: "🎓", // Educational Journey
      4: "🏛️", // University Days
      5: "💼", // Freelancing & Blogging
      6: "🛠️", // Spot Web Tools
      7: "📱", // GPA Calculator
      8: "📜", // Historic Opportunity
      9: "🎉", // Graduation
      10: "🏢", // Founding HindukushSoft
      11: "🎯", // Leading with Mission
      12: "❤️", // Community
      13: "🌟", // A Bigger Dream
    };
    return emojiMap[sectionNumber] || "📄";
  };
  
  // Function to trim long file names for mobile
  const getDisplayFileName = (title) => {
    if (!title) return 'untitled';
      // Convert title to file-friendly format
    let fileName = title.toLowerCase()
      .replace(/[^a-z0-9\s]/g, '')
      .replace(/\s+/g, '-')
      .trim();
    
    // Trim for mobile devices - increased limit since we have more space
    // if (isMobile && fileName.length > 50) {
    //   return fileName.substring(0, 50) + '...';
    // }
    
    return fileName;
  };

  useEffect(() => {
    // Check if device is mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 767);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const generateLineNumbers = () => {
      const lineNumbersContainer = lineNumbersRef.current;
      const bioContent = contentRef.current;
      
      if (!lineNumbersContainer || !bioContent) return;

      // Clear existing content
      lineNumbersContainer.textContent = "";

      // Force a reflow to get accurate height
      bioContent.offsetHeight;

      // Get the computed line height
      const computedStyle = window.getComputedStyle(bioContent);
      const lineHeight = parseFloat(computedStyle.lineHeight) || 26;

      // Get the actual content height including all text
      const contentHeight = bioContent.scrollHeight;
      const paddingTop = parseFloat(computedStyle.paddingTop) || 32;
      const paddingBottom = parseFloat(computedStyle.paddingBottom) || 32;

      // Calculate effective content height
      const effectiveHeight = contentHeight - paddingTop - paddingBottom;

      // Calculate number of lines with buffer
      const numberOfLines = Math.max(
        Math.ceil(effectiveHeight / lineHeight) + 3,
        15 // Minimum number of lines
      );

      // Generate line numbers
      let lineNumbers = "";
      for (let j = 1; j <= numberOfLines; j++) {
        lineNumbers += j.toString().padStart(2, " ") + "\n";
      }

      lineNumbersContainer.textContent = lineNumbers.trim();
    };

    // Generate line numbers with multiple attempts
    const timer1 = setTimeout(generateLineNumbers, 50);
    const timer2 = setTimeout(generateLineNumbers, 200);
    const timer3 = setTimeout(generateLineNumbers, 500);
    
    // Regenerate on font load
    document.fonts.ready.then(() => {
      setTimeout(generateLineNumbers, 100);
    });

    // Regenerate on window resize
    const handleResize = () => {
      setTimeout(generateLineNumbers, 100);
    };
    
    window.addEventListener("resize", handleResize);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      window.removeEventListener("resize", handleResize);
    };
  }, [children]);
  
  // Add mouse tracking for glow effect
  useEffect(() => {
    const cardElement = document.getElementById(id);
    if (!cardElement) return;

    const handleMouseMove = (e) => {
      const rect = cardElement.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      
      cardElement.style.setProperty('--mouse-x', `${x}%`);
      cardElement.style.setProperty('--mouse-y', `${y}%`);
    };

    cardElement.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      cardElement.removeEventListener('mousemove', handleMouseMove);
    };
  }, [id]);

  return (
    <div className="section-card code-editor-card" id={id}>
      {/* Code Editor Toolbar */}
      <div className="code-editor-toolbar">
        <div className="toolbar-left">
          <div className="window-controls">
            <span className="control close"></span>
            <span className="control minimize"></span>
            <span className="control maximize"></span>
          </div>          <div className="file-tab">
            <span className="file-icon">{getSectionEmoji(title, sectionNumber)}</span>
            <span className="file-name">{getDisplayFileName(title)}.jsx</span>
            <span className="file-modified">●</span>
          </div>
        </div>
      </div>
      
      {/* Code Editor Content */}
      <div className="code-editor-content">
        <div className="line-numbers" ref={lineNumbersRef}></div>
        <div className="bio-content" ref={contentRef}>
          <h2 className={`section-title section-${sectionNumber}`} data-section={sectionNumber}>
            {title}
          </h2>
          <div className="section-content">
            {children}
          </div>
        </div>
      </div>
        {/* Code Editor Footer */}
      <div className="code-editor-footer">
        <div className="footer-left">
          <span className="encoding">UTF-8</span>
        </div><div className="footer-right">
          <span className="cursor-position">Ln {sectionNumber * 15 + Math.floor(Math.random() * 10) + 5}, Col {Math.floor(Math.random() * 60) + 20}</span>
        </div>
      </div>
    </div>
  );
};

const Biography = () => {
  useEffect(() => {
    // Scroll animations observer
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.classList.add("animate-in");
          }, 50);
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    // Initialize animation observer
    const allElements = document.querySelectorAll(
      ".section-card, .section-connector"
    );
    const firstSectionCard = document.querySelector(".section-card");

    allElements.forEach((el) => {
      el.classList.remove("animate-in");

      // Make the first section card appear immediately on page load
      if (el === firstSectionCard) {
        setTimeout(() => {
          el.classList.add("animate-in");
        }, 100);
      } else {
        // All other elements still use scroll-based animation
        observer.observe(el);
      }
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div className="container">
      <BiographySection id="who-i-am" title="Who I Am" sectionNumber={1}>
        <p>
          My name <span className="highlight">Abu Zar Mishwani</span>, and
          I'm from a beautiful town called Drosh, located in Chitral,
          Pakistan. People close to me also call me{" "}
          <span className="highlight">Mufasa</span>, a nickname I proudly carry.
          It's inspired by the wise and brave character from{" "}
          <a
            href="https://en.wikipedia.org/wiki/The_Lion_King"
            target="_blank"
            className="link"
            rel="noopener noreferrer"
          >
            The Lion King
          </a>
          . The name Mufasa means "king" or "brave leader," and I've always
          loved it because it reminds me to lead with strength, kindness,
          and responsibility.
        </p>
      </BiographySection>

      <div className="section-connector"></div>

      <BiographySection id="early-life" title="Early Life" sectionNumber={2}>
        <p>
          I was born on August 24, 2000, into a respectful Pashtun family
          that values simplicity, education, and integrity. Growing up in
          the peaceful valleys of Chitral gave me a calm nature, but even as
          a child, I had a spark of curiosity. I always wondered how things
          worked, especially machines and technology. I still remember the
          first time I saw a computer in real life. It was like magic to me.
          I didn't just want to use it, I wanted to understand how it
          worked.
        </p>
      </BiographySection>

      <div className="section-connector"></div>

      <BiographySection id="educational-journey" title="Educational Journey" sectionNumber={3}>
        <p>
          That curiosity stayed with me. I completed my matriculation from{" "}
          <span className="highlight">Drosh Public School and College</span>,
          and later did ICS (Intermediate in Computer Science) from{" "}
          <span className="highlight">Government Higher Secondary School Drosh</span>.
          During these years, I used every chance I got to spend time in
          computer labs, try new things, and ask questions. My love for
          technology grew stronger every day.
        </p>
      </BiographySection>

      <div className="section-connector"></div>

      <BiographySection id="university-days" title="University Days & Discovering My Path" sectionNumber={4}>
        <p>
          In 2020, I got admitted to the{" "}
          <span className="highlight">University of Chitral</span>{" "}for a BS in
          Computer Science. This was a turning point in my life. During my
          studies, I explored various fields of computer science, but I
          found myself especially drawn to web development and SEO. I
          started learning the building blocks like HTML, CSS, and
          JavaScript, then moved forward to more advanced tools and
          technologies like React, PHP, Laravel, and WordPress. I didn't
          stop there. I also explored website builders like Elementor, and
          learned about performance, security, SEO, and user experience.
        </p>
      </BiographySection>

      <div className="section-connector"></div>

      <BiographySection id="freelancing" title="Freelancing & Blogging" sectionNumber={5}>
        <p>
          While studying, I also built my own projects and offered freelance
          services in web development, SEO, and content writing. Each
          project taught me something new and helped me understand
          real-world challenges. I loved how every website I created was
          like building a digital home for someone's idea.
        </p>
        <p>
          <br />In 2020, I started a tech blog called{" "}
          <a href="https://techabu.co" target="_blank" className="link" rel="noopener noreferrer">
            TechABU
          </a>
          . It became my space to explain technical topics in a way that's
          easy to understand. I wrote about SEO tips, programming concepts,
          WordPress tricks, and even AI tools. The blog steadily gained an
          audience, and that motivated me to keep writing and helping
          others.
        </p>
      </BiographySection>

      <div className="section-connector"></div>

      <BiographySection id="web-tools" title="Spot Web Tools" sectionNumber={6}>
        <p>
          Later, in 2022, I created{" "}
          <a href="https://app.techabu.co" target="_blank" className="link" rel="noopener noreferrer">
            Spot Web Tools
          </a>
          , an online platform with more than 190 free SEO and web tools.
          From developers and marketers to students and bloggers, many
          people use it to save time and get things done quickly. Spot Web
          Tools is available as both a web app and an Android app, making it
          easy for everyone to access.
        </p>
      </BiographySection>

      <div className="section-connector"></div>

      <BiographySection id="gpa-calculator" title="GPA Calculator & Planner" sectionNumber={7}>
        <p>
          In 2023, I also explored Android app development and launched an
          app called{" "}
          <a
            href="https://play.google.com/store/apps/details?id=advc.calc.easygpacalculator"
            target="_blank"
            className="link"
            rel="noopener noreferrer"
          >
            GPA Calculator & Planner
          </a>
          . It was built especially for students to help them track their
          semester performance and CGPA in a simple and useful way. Seeing
          students benefit from my app gave me a deep sense of joy. It
          reminded me that good software can make life easier for others.
        </p>
      </BiographySection>

      <div className="section-connector"></div>

      <BiographySection id="opportunity" title="A Historic Opportunity" sectionNumber={8}>
        <p>
          One of the most special experiences during my university life was
          being selected for a government project. I worked under the
          supervision of the Assistant Commissioner and Deputy Commissioner
          of Lower Chitral to help write the official{" "}
          <span className="highlight">Chitral Gazetteer</span>. It was an honor
          to contribute to something that documented the history, geography,
          and culture of my homeland.
        </p>
      </BiographySection>

      <div className="section-connector"></div>

      <BiographySection id="graduation" title="Graduation & Industry Exposure" sectionNumber={9}>
        <p>
          In December 2024, I completed my BS in Computer Science. Right
          after graduation, I got the chance to work with a professional
          software house in Peshawar under the{" "}
          <span className="highlight">Khyber Pakhtunkhwa Information Technology Board (KPITB)</span>{" "}
          internship program. This gave me exposure to industry practices,
          teamwork, and building production-level software.
        </p>
        <p>
          <br />Along the way, I also earned certifications in{" "}
          <span className="highlight">Google IT Support</span>{" "}and{" "}
          <span className="highlight">SEO Specialization</span>, which added
          more depth to my skillset and helped me stay aligned with industry
          standards.
        </p>
      </BiographySection>

      <div className="section-connector"></div>

      <BiographySection id="founding" title="Founding HindukushSoft Technologies" sectionNumber={10}>
        <p>
          By 2025, I decided it was time to bring my bigger vision to life.
          I registered my own company in Chitral,{" "}
          <a
            href="https://www.hindukushsoft.com"
            target="_blank"
            className="link"
            rel="noopener noreferrer"
          >
            HindukushSoft Technologies Pvt. Ltd
          </a>
          . The idea was simple but powerful. I wanted to create
          opportunities for local youth, build quality software, and help
          businesses grow through technology and digital presence.
        </p>
      </BiographySection>

      <div className="section-connector"></div>

      <BiographySection id="mission" title="Leading with a Mission" sectionNumber={11}>
        <p>
          Today, as the Founder and CEO of HindukushSoft, I lead a dedicated
          team of developers, designers, and tech learners. Our company
          provides services in web development, app development, and other
          areas of IT. Our mission is to make HindukushSoft a symbol of
          trust, talent, and technological excellence in the region.
        </p>
      </BiographySection>

      <div className="section-connector"></div>

      <BiographySection id="community" title="Giving Back to My Community" sectionNumber={12}>
        <p>
          Besides all this, I've always believed in giving back to the
          community. I've volunteered with{" "}
          <span className="highlight">Al-Khidmat Foundation Chitral</span>,
          offering IT support for their initiatives and helping them manage
          their digital activities. I've also taught computer science
          voluntarily at a local academy, where I helped students grasp key
          concepts and inspired them to explore careers in technology.
          Supporting and uplifting others through knowledge has always been
          a cause close to my heart.
        </p>
      </BiographySection>

      <div className="section-connector"></div>

      <BiographySection id="dream" title="A Bigger Dream" sectionNumber={13}>
        <p>
          Looking ahead, I have big plans. I want to grow HindukushSoft
          Technologies into a leading software house that not only serves
          clients across Pakistan and beyond but also creates hundreds of
          jobs and training opportunities in Chitral. I dream of a future
          where talented youth from our valley can build meaningful careers
          in tech and contribute to the global digital economy. I want to
          support education, innovation, and entrepreneurship through
          technology.
        </p>
        <div className="quote">
          <p className="quote-text">
            I believe the best way to shape the future is to take the lead
            and create it yourself.
          </p>
          <p className="quote-author">— Abu Zar Mishwani</p>
        </div>
      </BiographySection>
    </div>
  );
};

export default Biography;
