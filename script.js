// Theme toggle (persist to localStorage)
const root = document.documentElement;
const themeToggle = document.getElementById('themeToggle');
const savedTheme = localStorage.getItem('theme');

if (savedTheme) {
  root.setAttribute('data-theme', savedTheme);
}

themeToggle?.addEventListener('click', () => {
  const current = root.getAttribute('data-theme') || 'dark';
  const next = current === 'dark' ? 'light' : 'dark';
  root.setAttribute('data-theme', next);
  localStorage.setItem('theme', next);
});

// Animated counters
function animateCount(el, target, duration = 1200) {
  const start = 0;
  const startTime = performance.now();
  function tick(now) {
    const progress = Math.min((now - startTime) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3); // easeOutCubic
    el.textContent = Math.floor(start + (target - start) * eased).toLocaleString();
    if (progress < 1) requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
}

document.querySelectorAll('.count').forEach(el => {
  const target = parseInt(el.getAttribute('data-target'), 10);
  // Lazy start when visible
  const obs = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCount(el, target);
        obs.unobserve(el);
      }
    });
  }, { threshold: 0.5 });
  obs.observe(el);
});

// CTA tracking (simple log to footer)
const ctaLog = document.getElementById('ctaLog');
document.querySelectorAll('.track-cta').forEach(link => {
  link.addEventListener('click', () => {
    const label = link.getAttribute('data-cta');
    const time = new Date().toLocaleTimeString();
    ctaLog.textContent = `Clicked: ${label} at ${time}`;
  });
});

// Copy Discord handle
const copyBtn = document.getElementById('copyDiscord');
copyBtn?.addEventListener('click', async () => {
  const handle = document.getElementById('discordHandle')?.textContent?.trim();
  try {
    await navigator.clipboard.writeText(handle || '@DevSatvak');
    copyBtn.textContent = 'Copied!';
    setTimeout(() => (copyBtn.textContent = 'Copy Discord'), 1200);
  } catch {
    copyBtn.textContent = 'Failed';
    setTimeout(() => (copyBtn.textContent = 'Copy Discord'), 1200);
  }
});
