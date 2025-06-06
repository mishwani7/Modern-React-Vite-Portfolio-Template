import "./style.css";

// Generate dynamic line numbers for each section with improved spacing
function generateLineNumbers() {
  for (let i = 1; i <= 13; i++) {
    const lineNumbersContainer = document.getElementById(`lineNumbers${i}`);
    if (!lineNumbersContainer) continue;

    const bioContent = lineNumbersContainer
      .closest(".section-card")
      .querySelector(".bio-content");

    // Force a reflow to get accurate height
    bioContent.offsetHeight;

    // Get the computed line height
    const computedStyle = window.getComputedStyle(bioContent);
    const lineHeight = parseFloat(computedStyle.lineHeight);

    // Get the actual content height including all text
    const contentHeight = bioContent.scrollHeight;
    const paddingTop = parseFloat(computedStyle.paddingTop);
    const paddingBottom = parseFloat(computedStyle.paddingBottom);

    // Calculate effective content height
    const effectiveHeight = contentHeight - paddingTop - paddingBottom;

    // Calculate number of lines with increased buffer for spacing
    const numberOfLines = Math.max(
      Math.ceil(effectiveHeight / lineHeight) + 8, // Increased buffer for spacing
      25 // Higher minimum number of lines
    );

    // Generate line numbers with proper spacing
    let lineNumbers = "";
    // Add a few empty lines at the top for spacing
    lineNumbers += "\n\n";
    for (let j = 1; j <= numberOfLines; j++) {
      lineNumbers += j.toString().padStart(3, " ") + "\n";
    }
    // Add a few empty lines at the bottom for spacing
    lineNumbers += "\n\n\n";

    lineNumbersContainer.textContent = lineNumbers.trim();
  }
}

// Create floating code particles - Increased count
function createCodeParticles() {
  const particles = document.querySelector(".code-particles");
const codeSnippets = [
  // JavaScript Basics
  "function()",
  "const x =",
  "let",
  "var",
  "return;",
  "if (condition) {",
  "else",
  "switch (value) {",
  "case",
  "break;",
  "continue;",
  "for (let i = 0;",
  "while (true) {",
  "do { } while();",
  "try{",
  "catch",
  "finally",
  "throw new Error()",
  "setTimeout(() => {",
  "setInterval(() => {",

  // Advanced JavaScript
  "{...}",
  "async",
  "await",
  "import",
  "export",
  "class",
  "constructor()",
  "extends",
  "super()",
  "this.",
  "=> {}",
  "new Promise()",
  ".then()",
  ".catch()",
  ".finally()",
  "Object.keys()",
  "Object.values()",
  "Array.map()",
  "Array.filter()",
  "Array.reduce()",
  "Array.forEach()",
  "JSON.stringify()",
  "JSON.parse()",
  "Math.random()",
  "Math.floor()",
  "parseInt()",
  "parseFloat()",

  // Values
  "null",
  "undefined",
  "NaN",
  "true",
  "false",

  // Console
  "console.log",
  "console.error",
  "console.warn",
  "console.table",

  // React
  "useState",
  "useEffect",
  "useContext",
  "useRef",
  "useMemo",
  "useCallback",
  "useReducer",
  "useNavigate",
  "useParams",
  "React",
  "ReactDOM.render",
  "React Router",
  "<BrowserRouter>",
  "<Routes>",
  "<Route>",
  "<Link>",

  // Vue
  "Vue",
  "v-if",
  "v-for",
  "v-model",
  "v-bind",
  "v-on",
  "computed",
  "watch",
  "setup()",
  "ref()",
  "reactive()",
  "defineComponent",

  // Angular
  "angular",
  "@Component",
  "@NgModule",
  "@Injectable",
  "@Input()",
  "@Output()",
  "ngOnInit()",
  "*ngIf",
  "*ngFor",
  "HttpClientModule",

  // Next.js
  "Next.js",
  "getStaticProps",
  "getServerSideProps",
  "getInitialProps",
  "next/link",
  "next/image",
  "next/head",
  "app router",
  "pages router",

  // Other Frameworks
  "Redux",
  "dispatch()",
  "useSelector",
  "useDispatch",
  "Context API",
  "Zustand",
  "Recoil",
  "MobX",

  // APIs and GraphQL
  "GraphQL",
  "gql",
  "Apollo Client",
  "REST API",
  "fetch()",
  "axios.get()",
  "axios.post()",
  "axios.interceptors",
  "API",
  "JSON",
  "CORS",

  // HTML/CSS
  "HTML5",
  "<!DOCTYPE html>",
  "<div>",
  "<span>",
  "<form>",
  "<input>",
  "<button>",
  "<script>",
  "<style>",
  "<meta>",
  "CSS3",
  "box-shadow",
  "border-radius",
  "flex",
  "grid",
  "z-index",
  "position: absolute",
  "position: relative",
  "media queries",
  "SASS",
  "SCSS",
  "Tailwind",
  "Bootstrap",
  "Material UI",
  "Chakra UI",

  // Back-End
  "node.js",
  "express",
  "app.get()",
  "app.post()",
  "req.body",
  "res.send()",
  "middleware",
  "cors",
  "dotenv",
  "body-parser",

  // Databases
  "mongodb",
  "mongoose.connect()",
  "Schema",
  "Model.find()",
  "Model.create()",
  "mysql",
  "pg",
  "sequelize",
  "prisma",
  "ORM",
  "NoSQL",
  "SQL",

  // Auth
  "JWT",
  "bcrypt",
  "passport.js",
  "OAuth2",
  "session cookies",
  "auth middleware",

  // DevOps & Tools
  "Git",
  "git clone",
  "git push",
  "git pull",
  "git merge",
  "git branch",
  "Docker",
  "docker-compose.yml",
  "Dockerfile",
  "CI/CD",
  "Jenkins",
  "GitHub Actions",
  "Netlify",
  "Vercel",
  "Heroku",
  "Firebase",
  "Supabase",

  // Languages
  "JavaScript",
  "TypeScript",
  "Python",
  "PHP",
  "Laravel",
  "C#",
  ".NET Core",
  "Java",
  "Spring Boot",
  "Go",
  "Rust",
  "Ruby",
  "Ruby on Rails",

  // Testing
  "Jest",
  "test()",
  "describe()",
  "expect()",
  "Mocha",
  "Chai",
  "Cypress",
  "Playwright",
  "Testing Library",
  "unit test",
  "integration test",
  "end-to-end test",

  // Misc
  "lint",
  "ESLint",
  "Prettier",
  "babel.config.js",
  "webpack.config.js",
  "vite.config.js",
  "pnpm",
  "npm",
  "yarn",
  "package.json",
  "tsconfig.json",
  "npx",
  "CLI",
  "dotenv",
  ".env",
  ".gitignore",
  "README.md",
  "Markdown",
  "Regex",
  "base64",
];


  // Increased from 30 to 50 particles
  for (let i = 0; i < 50; i++) {
    const particle = document.createElement("div");
    particle.className = "code-particle";
    particle.textContent =
      codeSnippets[Math.floor(Math.random() * codeSnippets.length)];
    particle.style.left = Math.random() * 100 + "%";
    particle.style.animationDelay = Math.random() * 20 + "s";
    particle.style.animationDuration = Math.random() * 15 + 15 + "s";
    particles.appendChild(particle);
  }
}

// Enhanced Theme Toggle
function toggleTheme() {
  const body = document.body;
  const currentTheme = body.getAttribute("data-theme");

  console.log("Current theme:", currentTheme);

  if (currentTheme === "light") {
    body.setAttribute("data-theme", "dark");
    localStorage.setItem("theme", "dark");
    console.log("Switched to dark theme");
  } else {
    body.setAttribute("data-theme", "light");
    localStorage.setItem("theme", "light");
    console.log("Switched to light theme");
  }
}

// Make toggleTheme globally accessible for onclick
window.toggleTheme = toggleTheme;

// Modern Preloader Animation
function initializePreloader() {
  const preloader = document.getElementById("preloader");
  const progressFill = document.getElementById("progress-fill");
  const progressText = document.getElementById("progress-text");
  const codeLines = document.querySelectorAll(".code-line");

  // Animate code lines appearing
  codeLines.forEach((line, index) => {
    setTimeout(() => {
      line.classList.add("show");
    }, index * 200);
  });

  // Simulate loading progress
  let progress = 0;
  const progressInterval = setInterval(() => {
    progress += Math.random() * 15;
    if (progress > 100) {
      progress = 100;
      clearInterval(progressInterval);

      // Hide preloader after loading is complete
      setTimeout(() => {
        preloader.classList.add("fade-out");
        document.body.classList.add("loaded");

        setTimeout(() => {
          preloader.style.display = "none";
          // Generate line numbers after preloader is hidden
          setTimeout(generateLineNumbers, 100);
        }, 800);
      }, 500);
    }

    progressFill.style.width = progress + "%";
    progressText.textContent = Math.round(progress) + "%";
  }, 150);
}

// Scroll Progress Bar
window.addEventListener("scroll", () => {
  const scrollProgress = document.querySelector(".scroll-progress");
  const scrolled =
    (window.scrollY /
      (document.documentElement.scrollHeight - window.innerHeight)) *
    100;
  scrollProgress.style.width = scrolled + "%";
});

// Intersection Observer for animations with faster trigger
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      // Immediate animation - no delays
      entry.target.classList.add("animate-in");
    }
  });
}, observerOptions);

// Observe elements for animation
window.addEventListener("load", () => {
  document
    .querySelectorAll(".section-card, .social-section, .section-connector")
    .forEach((el) => {
      observer.observe(el);
    });

  // Regenerate line numbers after all content is fully loaded
  setTimeout(generateLineNumbers, 300);
});

// Enhanced profile image interactions
const profileContainer = document.querySelector(".profile-container");
let hoverTimeout;

profileContainer.addEventListener("mouseenter", () => {
  clearTimeout(hoverTimeout);
});

profileContainer.addEventListener("mouseleave", () => {
  hoverTimeout = setTimeout(() => {
    // Reset any hover effects
  }, 100);
});

// Recalculate line numbers on window resize
window.addEventListener("resize", () => {
  setTimeout(generateLineNumbers, 200);
});

// Force line number recalculation when fonts load
document.fonts.ready.then(() => {
  setTimeout(generateLineNumbers, 100);
});

// Load saved theme immediately
const savedTheme = localStorage.getItem("theme") || "light";
console.log("Loading saved theme:", savedTheme);
document.body.setAttribute("data-theme", savedTheme);

// Initialize features after DOM is loaded
document.addEventListener("DOMContentLoaded", function () {
  // Initialize features
  createCodeParticles();

  // Start preloader animation
  setTimeout(initializePreloader, 300);
});
