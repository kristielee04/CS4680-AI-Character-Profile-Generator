// ===== Elements =====
const characterForm = document.getElementById("characterForm");
const generateBtn = document.getElementById("generateBtn");
const clearFormBtn = document.getElementById("clearForm");
const resultsSection = document.getElementById("resultsSection");
const characterDisplay = document.getElementById("characterDisplay");
const loadingOverlay = document.getElementById("loadingOverlay");

let currentCharacterData = null;

// ===== Helpers =====
const show = (el) => (el.style.display = "block");
const hide = (el) => (el.style.display = "none");
const showLoading = () => {
  loadingOverlay.style.display = "flex";
  generateBtn.disabled = true;
  generateBtn.innerHTML =
    '<i class="fas fa-spinner fa-spin"></i> Generating...';
};
const hideLoading = () => {
  loadingOverlay.style.display = "none";
  generateBtn.disabled = false;
  generateBtn.innerHTML = '<i class="fas fa-magic"></i> Generate Character';
};

function chips(arr) {
  if (!arr || !Array.isArray(arr) || arr.length === 0)
    return '<span class="k">—</span>';
  return `<div class="chips">${arr
    .map((x) => `<span class="chip">${x}</span>`)
    .join("")}</div>`;
}

// ===== Rendering =====
function displayCharacter(characterData) {
  const p = characterData.character_profile;
  const bi = p.basic_info,
    psy = p.psychology,
    bg = p.background,
    sk = p.skills_and_abilities,
    vd = p.visual_design,
    nh = p.narrative_hooks,
    ex = p.extra_notes;

  characterDisplay.innerHTML = `
    <!-- Basic Information -->
    <div class="section">
      <h3 class="section-title">Basic Information</h3>
      <div class="kvs">
        <div class="k">Name</div><div>${bi.name || "—"}</div>
        <div class="k">Role</div><div>${bi.role || "—"}</div>
        <div class="k">Genre</div><div>${chips(bi.genre)}</div>
        <div class="k">Tone</div><div>${chips(bi.tone)}</div>
        <div class="k">Age</div><div>${bi.age_range || "—"}</div>
        <div class="k">Gender</div><div>${
          [bi.gender, bi.pronouns].filter(Boolean).join(" · ") || "—"
        }</div>
        <div class="k">Summary</div><div>${bi.summary || "—"}</div>
      </div>
    </div>

    <!-- Psychology -->
    <div class="section">
      <h3 class="section-title">Personality & Psychology</h3>
      <div class="kvs">
        <div class="k">Personality</div><div>${chips(
          psy.personality_traits
        )}</div>
        <div class="k">Motivations</div><div>${chips(psy.motivations)}</div>
        <div class="k">Fears</div><div>${chips(psy.fears)}</div>
        <div class="k">Strengths</div><div>${chips(psy.strengths)}</div>
        <div class="k">Flaws</div><div>${chips(psy.flaws)}</div>
      </div>
    </div>

    <!-- Background -->
    <div class="section">
      <h3 class="section-title">Background</h3>
      <div class="kvs">
        <div class="k">Origin</div><div>${bg.origin || "—"}</div>
        <div class="k">Key Events</div><div>${chips(bg.key_life_events)}</div>
        <div class="k">Current Status</div><div>${
          bg.current_status || "—"
        }</div>
      </div>
    </div>

    <!-- Skills and Abilities -->
    <div class="section">
      <h3 class="section-title">Skills & Abilities</h3>
      <div class="kvs">
        <div class="k">Skills</div><div>${chips(sk.skills)}</div>
        <div class="k">Special Abilities</div><div>${chips(
          sk.special_abilities
        )}</div>
      </div>
    </div>

    <!-- Visual Design -->
    <div class="section">
      <h3 class="section-title">Visual Design</h3>
      <div class="kvs">
        <div class="k">Body Type</div><div>${vd.body_type || "—"}</div>
        <div class="k">Clothing Style</div><div>${
          vd.clothing_style || "—"
        }</div>
        <div class="k">Color Palette</div><div>${chips(vd.color_palette)}</div>
        <div class="k">Visual Keywords</div><div>${chips(
          vd.visual_keywords
        )}</div>
        <div class="k">Distinctive Features</div><div>${chips(
          vd.distinctive_features
        )}</div>
      </div>
    </div>

    <!-- Narrative Hooks -->
    <div class="section">
      <h3 class="section-title">Narrative Hooks</h3>
      <div class="kvs">
        <div class="k">Goals</div><div>${chips(nh.goals)}</div>
        <div class="k">Conflicts</div><div>${chips(nh.conflicts)}</div>
        <div class="k">Relationships</div><div>${chips(nh.relationships)}</div>
      </div>
    </div>

    <!-- Extra Notes -->
    <div class="section">
      <h3 class="section-title">Themes & Extra Notes</h3>
      <div class="kvs">
        <div class="k">Themes</div><div>${chips(ex.themes)}</div>
        <div class="k">Additional Context</div><div>${
          ex.additional_context || "—"
        }</div>
      </div>
    </div>
  `;

  show(resultsSection);
  resultsSection.classList.add("success-animation");
  setTimeout(() => resultsSection.classList.remove("success-animation"), 400);
}

// ===== Events =====
characterForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  showLoading();
  try {
    const formData = new FormData(characterForm);
    const data = {};
    for (let [k, v] of formData.entries()) data[k] = v.trim();

    const res = await fetch("/generate-character", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    const out = await res.json();

    if (!res.ok || !out.success)
      throw new Error(out.error || "Failed to generate");

    currentCharacterData = out.character;
    displayCharacter(currentCharacterData);
    window.scrollTo({ top: resultsSection.offsetTop, behavior: "smooth" });
  } catch (err) {
    console.error(err);
    alert(err.message || "Network error");
  } finally {
    hideLoading();
  }
});

clearFormBtn.addEventListener("click", () => {
  characterForm.reset();
  hide(resultsSection);
});
