<script lang="ts">
  import { getAppState } from '$lib/state.svelte';
  
  const appState = getAppState();

  const handleThemeChange = (newTheme: "auto" | "light" | "dark") => {
    appState.setTheme(newTheme);
  };
</script>

<div class="theme-toggle">
  <button title="auto theme" onclick={() => handleThemeChange('auto')} class:selected={appState.theme === 'auto'}>
    <div class="auto-icon"></div>
  </button>
  <button title="light theme" onclick={() => handleThemeChange('light')} class:selected={appState.theme === 'light'}>
    <div class="light-icon"></div>
  </button>
  <button title="dark theme" onclick={() => handleThemeChange('dark')} class:selected={appState.theme === 'dark'}>
    <div class="dark-icon"></div>
  </button>
</div>
