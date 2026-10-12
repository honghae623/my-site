// 푸터 연도 자동 표시
document.getElementById("year").textContent = new Date().getFullYear();

// 다크 모드 토글 (선택값은 브라우저에 저장)
const toggle = document.getElementById("theme-toggle");
const root = document.documentElement;

function applyTheme(theme) {
  root.dataset.theme = theme;
  toggle.textContent = theme === "dark" ? "☀️" : "🌙";
}

let savedTheme = null;
try {
  savedTheme = localStorage.getItem("theme");
} catch (e) {}

const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
applyTheme(savedTheme || (prefersDark ? "dark" : "light"));

toggle.addEventListener("click", () => {
  const next = root.dataset.theme === "dark" ? "light" : "dark";
  applyTheme(next);
  try {
    localStorage.setItem("theme", next);
  } catch (e) {}
});

// 한 줄 소개 타이핑 효과
const tagline = document.querySelector(".hero__tagline");
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (!reduceMotion) {
  const fullText = tagline.textContent;
  tagline.setAttribute("aria-label", fullText);
  tagline.textContent = "";
  tagline.classList.add("is-typing");

  let i = 0;
  const timer = setInterval(() => {
    tagline.textContent = fullText.slice(0, ++i);
    if (i >= fullText.length) {
      clearInterval(timer);
      tagline.classList.remove("is-typing");
    }
  }, 70);
}

// 스크롤 시 섹션 등장 효과
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 }
);

document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
