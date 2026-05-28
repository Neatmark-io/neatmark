<script lang="ts">
  import '../app.css';
  import { setAppState } from '$lib/state.svelte';
  import { page } from '$app/stores';
  import { Tooltip } from 'bits-ui';
  import Logo from '$lib/components/Logo.svelte';
  import SearchBar from '$lib/components/SearchBar.svelte';
  import FolderTree from '$lib/components/FolderTree.svelte';
  import ThemeToggle from '$lib/components/ThemeToggle.svelte';
  
  let { children } = $props();

  // Initialize the AppState context
  const appState = setAppState();

  $effect(() => {
    appState.selectedFolder = $page.url.searchParams.get('folder');
  });
</script>

<Tooltip.Provider delayDuration={250} skipDelayDuration={100}>
  <div class="page-container">
    <header class="navbar">
      <Tooltip.Root>
        <Tooltip.Trigger onclick={() => appState.showSidebar()} class="navbar-toggle-btn" aria-label="Show sidebar"></Tooltip.Trigger>
        <Tooltip.Portal>
          <Tooltip.Content class="tooltip-content" side="right" sideOffset={6}>
            Show sidebar
            <Tooltip.Arrow class="tooltip-arrow" />
          </Tooltip.Content>
        </Tooltip.Portal>
      </Tooltip.Root>
      <Logo />
    </header>

    <aside class="sidebar {appState.isSidebarCollapsed ? 'collapsed' : ''}" aria-label="Bookmark navigation">
      <Tooltip.Root>
        <Tooltip.Trigger onclick={() => appState.hideSidebar()} class="sidebar-toggle-btn" aria-label="Hide sidebar"></Tooltip.Trigger>
        <Tooltip.Portal>
          <Tooltip.Content class="tooltip-content" side="right" sideOffset={6}>
            Hide sidebar
            <Tooltip.Arrow class="tooltip-arrow" />
          </Tooltip.Content>
        </Tooltip.Portal>
      </Tooltip.Root>
      <Logo />
      <SearchBar />
      <FolderTree />
      <ThemeToggle />
    </aside>

    <main class="main-container">
      {@render children()}
    </main>
  </div>
</Tooltip.Provider>
