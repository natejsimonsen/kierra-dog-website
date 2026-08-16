(() => {
  "use strict";

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const wait = (ms) => new Promise((r) => setTimeout(r, ms));

  async function typeInto(el, text, speed) {
    if (reduceMotion) {
      el.textContent = text;
      return;
    }
    for (let i = 0; i <= text.length; i++) {
      el.textContent = text.slice(0, i);
      // eslint-disable-next-line no-await-in-loop
      await wait(speed);
    }
  }

  async function runHero() {
    const cmd1 = document.getElementById("cmd1");
    const cur1 = document.getElementById("cur1");
    const out1 = document.getElementById("out1");
    const cmd2 = document.getElementById("cmd2");
    const cur2 = document.getElementById("cur2");
    const out2 = document.getElementById("out2");

    if (!cmd1 || !cmd2) return;

    if (reduceMotion) {
      cmd1.textContent = "whoami";
      cmd2.textContent = "./train --clicker --positive";
      out1.hidden = false;
      out2.hidden = false;
      if (cur1) cur1.style.visibility = "hidden";
      if (cur2) cur2.style.visibility = "hidden";
      return;
    }

    if (cur2) cur2.style.visibility = "hidden";

    await typeInto(cmd1, "whoami", 55);
    await wait(250);
    out1.hidden = false;
    await wait(550);

    if (cur2) cur2.style.visibility = "visible";
    await typeInto(cmd2, "./train --clicker --positive", 38);
    if (cur2) cur2.style.visibility = "hidden";
    await wait(300);
    out2.hidden = false;
  }

  // ---------------------------------------------------------
  // ASCII behavior table — CODE | SIGNAL | INTERVENTION
  // Built at runtime so column padding is always exact.
  // ---------------------------------------------------------
  const ROWS = [
    ["ANX-01", "Anxiety, fear, low confidence", "Confidence-building, gradual exposure"],
    ["REACT-02", "Reactivity — dogs, people, environment", "Threshold work, counter-conditioning"],
    ["BARK-03", "Barking, lunging, leash frustration", "Redirect, reinforce calm alternatives"],
    ["PULL-04", "Leash pulling", "Loose-leash mechanics, marker timing"],
    ["JUMP-05", "Jumping, overexcitement", "Incompatible behavior, impulse control"],
    ["IMPL-06", "Impulse-control challenges", "Duration + distraction training"],
    ["SOC-07", "Socialization difficulties", "Structured, dog-paced exposure"],
    ["RES-08", "Resource guarding", "Trade-up protocols, trust building"],
    ["DEST-09", "Destructive behavior", "Enrichment, root-cause mapping"],
    ["POTY-10", "Potty-training challenges", "Schedule + reinforcement loop"],
    ["PUP-11", "Puppy biting, chewing, mouthing", "Redirection, bite inhibition"],
    ["ADOL-12", "Adolescent-dog behavior", "Consistency, patience protocols"],
    ["MANN-13", "Manners — home and public", "Default behaviors, real-world reps"],
    ["FOCUS-14", "Focus around distractions", "Engagement games, name response"],
    ["SVC-15", "Service-dog training needs", "Task chaining, public-access prep"],
    ["OBED-16", "Basic + advanced obedience", "Sit, stay, come, heel — proofed"],
  ];

  const COLS = [
    { label: "CODE", width: 8 },
    { label: "SIGNAL", width: 38 },
    { label: "INTERVENTION", width: 38 },
  ];

  function pad(str, width) {
    const s = String(str);
    if (s.length >= width) return s.slice(0, width);
    return s + " ".repeat(width - s.length);
  }

  function hrule(left, mid, right) {
    return left + COLS.map((c) => "─".repeat(c.width + 2)).join(mid) + right;
  }

  function buildTable() {
    const mount = document.getElementById("behaviorTable");
    if (!mount) return;
    mount.textContent = "";

    const top = document.createElement("div");
    top.className = "rule";
    top.textContent = hrule("┌", "┬", "┐");

    const headerRow = document.createElement("div");
    headerRow.className = "hd";
    headerRow.textContent =
      "│ " + COLS.map((c) => pad(c.label, c.width)).join(" │ ") + " │";

    const sep = document.createElement("div");
    sep.className = "rule";
    sep.textContent = hrule("├", "┼", "┤");

    const bottom = document.createElement("div");
    bottom.className = "rule";
    bottom.textContent = hrule("└", "┴", "┘");

    mount.append(top, headerRow, sep);

    ROWS.forEach(([code, signal, intervention]) => {
      const row = document.createElement("div");

      const pre = document.createTextNode("│ ");
      const codeSpan = document.createElement("span");
      codeSpan.className = "row-code";
      codeSpan.textContent = pad(code, COLS[0].width);

      const mid1 = document.createTextNode(" │ " + pad(signal, COLS[1].width) + " │ ");
      const last = document.createTextNode(pad(intervention, COLS[2].width) + " │");

      row.append(pre, codeSpan, mid1, last);
      mount.appendChild(row);
    });

    mount.appendChild(bottom);
  }

  // ---------------------------------------------------------
  // Keyboard navigation — [a]bout [m]ethod [s]ervices [c]ontact
  // ---------------------------------------------------------
  function initKeyNav() {
    const map = { a: "about", m: "method", s: "services", c: "contact" };
    document.addEventListener("keydown", (e) => {
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      const key = e.key.toLowerCase();
      const targetId = map[key];
      if (!targetId) return;
      const el = document.getElementById(targetId);
      if (!el) return;
      e.preventDefault();
      el.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "start" });
    });
  }

  document.addEventListener("DOMContentLoaded", () => {
    buildTable();
    initKeyNav();
    runHero();
  });
})();
