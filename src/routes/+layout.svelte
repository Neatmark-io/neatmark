<script lang="ts">
  import '../app.css';
  import { setAppState } from '$lib/state.svelte';
  import { page } from '$app/stores';
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

<div class="page-container">
  <header class="navbar">
    <button title="Show Sidebar" onclick={() => appState.showSidebar()} class="navbar-toggle-btn" aria-label="Show Sidebar"></button>
    <Logo />
  </header>

  <aside class="sidebar {appState.isSidebarCollapsed ? 'collapsed' : ''}">
    <button title="Hide Sidebar" onclick={() => appState.hideSidebar()} class="sidebar-toggle-btn" aria-label="Hide Sidebar"></button>
    <Logo />
    <SearchBar />
    <FolderTree />
    <ThemeToggle />
  </aside>

  <main class="main-container">
    {@render children()}
  </main>
</div>
