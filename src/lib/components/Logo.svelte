<script lang="ts">
  import { getAppState } from '$lib/state.svelte';
  import { resolve, asset } from '$app/paths';

  const appState = getAppState();

  const handleLogoClick = () => {
    appState.searchQuery = '';
    appState.hideSidebar();
  };
</script>

<div class="app-logo">
  <img class="app-logo-img" src={asset("/assets/logo.svg")} alt="NeatMark">
  <a class="app-logo-name" href={resolve("/")} onclick={handleLogoClick}>Neatmark</a>
</div>
