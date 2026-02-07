import { ref, onMounted } from 'vue';

const THEME_STORAGE_KEY = 'app-theme';
const DEFAULT_THEME = 'dark';

// Initialize currentTheme by reading from DOM or localStorage
function getInitialTheme() {
  if (typeof window === 'undefined') return DEFAULT_THEME;
  
  // First check if data-theme is already set on documentElement
  const existingTheme = document.documentElement.getAttribute('data-theme');
  if (existingTheme === 'dark' || existingTheme === 'light') {
    return existingTheme;
  }
  
  // Then check localStorage
  const savedTheme = localStorage.getItem(THEME_STORAGE_KEY);
  if (savedTheme === 'dark' || savedTheme === 'light') {
    return savedTheme;
  }
  
  return DEFAULT_THEME;
}

const currentTheme = ref(getInitialTheme());

function applyTheme(theme) {
  currentTheme.value = theme;
  if (typeof document !== 'undefined') {
    document.documentElement.setAttribute('data-theme', theme);
    if (document.body) {
      document.body.setAttribute('data-theme', theme);
    }
    localStorage.setItem(THEME_STORAGE_KEY, theme);
  }
}

function initTheme() {
  if (typeof window === 'undefined') return;
  
  const savedTheme = localStorage.getItem(THEME_STORAGE_KEY);
  const theme = savedTheme || DEFAULT_THEME;
  applyTheme(theme);
}

export function useTheme() {
  // Sync currentTheme with actual DOM state when component mounts
  onMounted(() => {
    const actualTheme = document.documentElement.getAttribute('data-theme') || 
                       localStorage.getItem(THEME_STORAGE_KEY) || 
                       DEFAULT_THEME;
    if (actualTheme !== currentTheme.value) {
      currentTheme.value = actualTheme;
    }
  });

  function toggleTheme() {
    const newTheme = currentTheme.value === 'dark' ? 'light' : 'dark';
    applyTheme(newTheme);
  }

  return {
    currentTheme,
    toggleTheme,
    initTheme,
  };
}

// Export initTheme for use in main.js
export { initTheme };
