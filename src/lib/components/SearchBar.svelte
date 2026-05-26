<script lang="ts">
  import { getAppState } from '$lib/state.svelte';
  import { onMount } from 'svelte';
  
  const appState = getAppState();
  let inputElement: HTMLInputElement;

  let inputValue = $state(appState.searchQuery);
  let timeout: ReturnType<typeof setTimeout>;

  const handleChange = (e: Event) => {
    const value = (e.target as HTMLInputElement).value;
    inputValue = value;
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      appState.searchQuery = value;
    }, 1000);
  };

  const handleClear = () => {
    inputValue = '';
    appState.searchQuery = '';
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Enter') {
      appState.hideSidebar();
    }
  };

  onMount(() => {
    const handleGlobalKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        inputElement?.focus();
        e.preventDefault();
      }
    };
    window.addEventListener('keydown', handleGlobalKeyDown);
    return () => {
      window.removeEventListener('keydown', handleGlobalKeyDown);
    };
  });
</script>

<div class="searchbar">
  <input
    bind:this={inputElement}
    type="text"
    placeholder="Search bookmarks..."
    value={inputValue}
    oninput={handleChange}
    onkeydown={handleKeyDown}
  />
  {#if inputValue}
    <button title="Clear" aria-label="Clear Search" onclick={handleClear}></button>
  {/if}
</div>
