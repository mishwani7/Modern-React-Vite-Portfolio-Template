import React, { useEffect, useRef } from "react";

const CodeParticles = () => {
  const particlesRef = useRef(null);

  useEffect(() => {
    const particles = particlesRef.current;
    if (!particles) return;

    const codeSnippets = [
      // Programming Symbols & Operators
      "{", "}", "[", "]", "(", ")", "<", ">", "<=", ">=", "==", "===", "!=", "!==",
      "+", "-", "*", "/", "%", "**", "++", "--", "=", "+=", "-=", "*=", "/=", "%=", "**=",
      "&", "|", "^", "~", ">>", "<<", ">>>", "&&", "||", "??", "!", "!!", "?", ":",
      ";", ",", ".", "...", "=>", "->", "::", "??=", "?.",

      // Mathematical & Logic Symbols
      "∑", "∞", "∆", "π", "λ", "∫", "√", "±", "≠", "≈", "≤", "≥", "∇", "⊕", "⊗", "∂",
      "α", "β", "γ", "δ", "θ", "μ", "σ", "φ", "ω", "η", "ξ", "τ", "∈", "∉", "⊂", "⊃",
      "∩", "∪", "⊆", "⊇", "¬", "∧", "∨",

      // Binary & Hex Patterns
      "0", "1", "10", "11", "101", "010", "111", "000", "1001", "1010", "1101", "0110",
      "0x0A", "0x1F", "0xFF", "0x00", "0xAB", "0x7F", "0101", "1100", "0011", "1111",
      "0000", "1110", "0001",

      // ASCII Drawing - Circuits / Boxes / UI
      "━", "┃", "┏", "┓", "┗", "┛", "┣", "┫", "┳", "┻", "┌", "┐", "└", "┘", "├", "┤",
      "┬", "┴", "┼", "╋", "═", "║", "╔", "╗", "╚", "╝", "╠", "╣", "╦", "╩", "╬",
      "▲", "▼", "◆", "●", "■", "▪", "▫", "◇", "○", "□", "◉",

      // Simple Code Patterns
      "{ }", "[ ]", "( )", "< >", "<!-- -->", "/* */", "//", "#", "$", "@", "\\",
      "`", "''", '""', "``", "'''", '"""',

      // Code Keywords (Short)
      "if", "else", "for", "while", "do", "switch", "case", "break", "continue", "return",
      "try", "catch", "finally", "throw", "yield", "let", "const", "var", "new", "delete",
      "typeof", "instanceof", "in", "await", "async", "import", "export", "from", "as",
      "class", "extends", "super", "this", "function", "def", "fn", "void",

      // Types / Data
      "int", "float", "double", "str", "char", "bool", "list", "array", "dict", "map",
      "set", "object", "null", "undefined", "NaN",

      // Short Language Codes
      "js", "ts", "py", "rb", "go", "rs", "c", "cpp", "cs", "java", "kt", "php",
      "html", "css", "json", "yaml", "xml", "sql", "sh", "bash",

      // Tech Abbreviations
      "AI", "ML", "DL", "NLP", "CV", "VR", "AR", "IoT", "IIoT", "5G", "4G", "GPU",
      "CPU", "RAM", "ROM", "SSD", "HDD", "USB", "PCIe", "BIOS", "UI", "UX", "DB",
      "DBMS", "RDBMS", "OS", "VM", "VPS", "VPN", "CLI", "GUI", "SDK", "API", "IDE",
      "CI", "CD", "CDN", "DNS", "IP",

      // Cloud & DevOps
      "AWS", "GCP", "Azure", "Heroku", "Firebase", "Docker", "K8s", "Terraform",
      "Ansible", "Nginx", "DevOps", "GitOps", "SRE", "IaC", "CI/CD", "Jenkins",
      "GitHub Actions",

      // Networking & Web
      "HTTP", "HTTPS", "TCP", "UDP", "IP", "IPv4", "IPv6", "DNS", "SSL", "TLS",
      "SSH", "REST", "SOAP", "gRPC", "WebSocket", "FTP", "SFTP", "JWT", "OAuth", "CORS",

      // Programming Concepts & Principles
      "OOP", "AOP", "FP", "MVC", "MVVM", "MVP", "CRUD", "JWT", "CORS", "SPA", "PWA",
      "SSR", "CSR", "BFF", "SOLID", "DRY", "KISS", "YAGNI", "TDD", "BDD", "DDD",
      "CQRS", "ACID", "CAP", "BASE", "ORM", "ODM",

      // Data Formats
      "JSON", "XML", "YAML", "CSV", "TSV", "PROTOBUF", "AVRO",

      // Misc Short Tokens
      "npm", "yarn", "pnpm", "pip", "brew", "apt", "git", "svn", "docker", "kube",
      "bash", "zsh",

      // File Extensions
      ".js", ".ts", ".jsx", ".tsx", ".html", ".css", ".scss", ".json", ".yaml",
      ".xml", ".py", ".rb", ".go", ".rs", ".c", ".cpp", ".java", ".kt", ".php",
      ".sql", ".sh", ".md"
    ];

    // Clear existing particles
    particles.innerHTML = "";

    // Create 50 particles
    for (let i = 0; i < 50; i++) {
      const particle = document.createElement("div");
      particle.className = "code-particle";
      const snippet = codeSnippets[Math.floor(Math.random() * codeSnippets.length)];
      particle.textContent = snippet;

      // Add different styles based on content type
      if (snippet.match(/[∑∞∆πλ∫√±≠≤≥αβγδθμσφωητξ∈∉⊂⊃∇⊕⊗∂∩∪⊆⊇¬∧∨≈]/)) {
        particle.classList.add("math-particle");
      } else if (snippet.match(/[━┃┏┓┗┛┣┫┳┻┌┐└┘├┤┬┴┼╋▲▼◆●■▪▫◇○□═║╔╗╚╝╠╣╦╩╬◉]/)) {
        particle.classList.add("symbol-particle");
      } else if (snippet.match(/^[01]+$|^0x[0-9A-F]+$/)) {
        particle.classList.add("binary-particle");
      } else if (snippet.match(/^[{}[\]()<>]$|^[=!<>+\-*/%&|^~?:;,.]+$|^(<=|>=|==|===|!=|!==|\+\+|--|=>|->|::|\.\.\.|\?\?|\?\.)$/)) {
        particle.classList.add("operator-particle");
      } else if (snippet.match(/^(if|else|for|while|do|switch|case|break|continue|return|try|catch|finally|throw|yield|let|const|var|new|delete|typeof|instanceof|in|await|async|import|export|from|as|class|extends|super|this|function|def|fn|void|int|float|double|str|char|bool|list|array|dict|map|set|object|null|undefined|NaN)$/)) {
        particle.classList.add("keyword-particle");
      } else if (snippet.match(/^\.[a-z]{1,4}$/)) {
        particle.classList.add("extension-particle");
      } else if (snippet.match(/^[A-Z]{2,5}$|^(js|ts|py|rb|go|rs|c|cpp|cs|java|kt|php|html|css|json|yaml|xml|sql|sh|bash|npm|yarn|pnpm|pip|brew|apt|git|svn|docker|kube|zsh)$/)) {
        particle.classList.add("tech-particle");
      } else if (snippet.match(/^(JSON|XML|YAML|CSV|TSV|PROTOBUF|AVRO|HTTP|HTTPS|TCP|UDP|IPv[46]|DNS|SSL|TLS|SSH|REST|SOAP|gRPC|WebSocket|FTP|SFTP|JWT|OAuth|CORS|OOP|AOP|FP|MVC|MVVM|MVP|CRUD|SPA|PWA|SSR|CSR|BFF|SOLID|DRY|KISS|YAGNI|TDD|BDD|DDD|CQRS|ACID|CAP|BASE|ORM|ODM|CI\/CD)$/)) {
        particle.classList.add("protocol-particle");
      }

      particle.style.left = Math.random() * 100 + "%";
      particle.style.animationDelay = Math.random() * 20 + "s";
      particle.style.animationDuration = Math.random() * 15 + 15 + "s";
      particles.appendChild(particle);
    }
  }, []);

  return <div className="code-particles" ref={particlesRef}></div>;
};

export default CodeParticles;
