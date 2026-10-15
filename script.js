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

// 레트로 감성은 검은 배경이 기본
applyTheme(savedTheme || "dark");

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

// 방문자 카운터 (이 브라우저의 방문 횟수)
let visits = 1;
try {
  visits = Number(localStorage.getItem("visits") || 0) + 1;
  localStorage.setItem("visits", visits);
} catch (e) {}
document.getElementById("visit-count").textContent = String(visits).padStart(6, "0");

// 마우스 반짝이 꼬리
if (!reduceMotion) {
  const sparkles = ["✦", "✧", "★", "☆", "✶"];
  const colors = ["#ff00ff", "#00ffff", "#39ff14", "#ffff00"];
  let last = 0;

  document.addEventListener("mousemove", (e) => {
    const now = Date.now();
    if (now - last < 40) return;
    last = now;

    const star = document.createElement("span");
    star.className = "trail";
    star.setAttribute("aria-hidden", "true");
    star.textContent = sparkles[Math.floor(Math.random() * sparkles.length)];
    star.style.color = colors[Math.floor(Math.random() * colors.length)];
    star.style.left = `${e.clientX}px`;
    star.style.top = `${e.clientY}px`;
    document.body.appendChild(star);
    star.addEventListener("animationend", () => star.remove());
  });
}
