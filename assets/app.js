const md = document.querySelector("#md"), slide = document.querySelector("#slide"), count = document.querySelector("#count");
    let slides = [], current = 0;
    md.value = `# Markdown Slide Deck\\n\\nTurn plain markdown into focused presentation slides.\\n\\n---\\n\\n## Features\\n\\n- Split slides with three dashes\\n- Navigate with buttons or arrow keys\\n- Switch themes instantly\\n\\n---\\n\\n## Code\\n\\n\`\`\`js\\nconst message = "ship useful tools";\\nconsole.log(message);\\n\`\`\``;
    function inline(text) { return text.replace(/`([^`]+)`/g, "<code>$1</code>").replace(/\\*\\*([^*]+)\\*\\*/g, "<strong>$1</strong>"); }
    function parseBlock(block) {
      const lines = block.trim().split("\\n"); let html = "", inCode = false, code = [];
      for (const line of lines) {
        if (line.startsWith("```")) { if (inCode) { html += `<pre><code>${code.join("\\n").replace(/[&<>]/g, c => ({ "&":"&amp;","<":"&lt;",">":"&gt;" }[c]))}</code></pre>`; code = []; } inCode = !inCode; continue; }
        if (inCode) { code.push(line); continue; }
        if (line.startsWith("# ")) html += `<h1>${inline(line.slice(2))}</h1>`;
        else if (line.startsWith("## ")) html += `<h2>${inline(line.slice(3))}</h2>`;
        else if (line.startsWith("- ")) html += `<li>${inline(line.slice(2))}</li>`;
        else if (line.trim()) html += `<p>${inline(line)}</p>`;
      }
      return html.replace(/(<li>.*<\/li>)/gs, "<ul>$1</ul>");
    }
    function render() {
      slides = md.value.split(/^---$/m).map(s => s.trim()).filter(Boolean);
      current = Math.min(current, slides.length - 1);
      slide.style.opacity = .2; slide.style.transform = "translateY(6px)";
      setTimeout(() => { slide.innerHTML = parseBlock(slides[current] || ""); count.textContent = `${current + 1} / ${slides.length}`; slide.style.opacity = 1; slide.style.transform = "translateY(0)"; }, 120);
    }
    function go(delta) { current = Math.max(0, Math.min(slides.length - 1, current + delta)); render(); }
    document.querySelector("#prev").onclick = () => go(-1); document.querySelector("#next").onclick = () => go(1);
    document.addEventListener("keydown", e => { if (e.key === "ArrowRight") go(1); if (e.key === "ArrowLeft") go(-1); });
    document.querySelector("#theme").onchange = e => {
      const themes = { light:["#f8fafc","#111827","#2563eb"], midnight:["#111827","#f8fafc","#38bdf8"], paper:["#fff7ed","#1c1917","#ea580c"] };
      const [bg,ink,accent] = themes[e.target.value]; document.documentElement.style.setProperty("--slide", bg); document.documentElement.style.setProperty("--ink", ink); document.documentElement.style.setProperty("--accent", accent);
    };
    md.addEventListener("input", render); render();

