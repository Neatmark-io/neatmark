<script lang="ts">
  import { getAppState } from '$lib/state.svelte';
  
  const appState = getAppState();

  const handleLogoClick = () => {
    appState.searchQuery = '';
    appState.hideSidebar();
  };
</script>

<div class="app-logo">
  <img class="app-logo-img" src="/assets/logo.svg" alt="NeatMark">
  <a class="app-logo-name" href="/" onclick={handleLogoClick}>Neatmark</a>
</div>
