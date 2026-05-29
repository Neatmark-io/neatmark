<script lang="ts">
  import '../app.css';
  import { setAppState } from '$lib/state.svelte';
  import { page } from '$app/stores';
  import { Dialog, Tooltip } from 'bits-ui';
  import { onMount } from 'svelte';
  import Logo from '$lib/components/Logo.svelte';
  import SearchBar from '$lib/components/SearchBar.svelte';
  import FolderTree from '$lib/components/FolderTree.svelte';
  import ThemeToggle from '$lib/components/ThemeToggle.svelte';
  import LanguageToggle from '$lib/components/LanguageToggle.svelte';

  let { children } = $props();

  // Initialize the AppState context
  const appState = setAppState();
  let isDesktop = $state(false);
  let isSidebarDialogOpen = $derived(!isDesktop && !appState.isSidebarCollapsed);

  $effect(() => {
    appState.selectedFolder = $page.url.searchParams.get('folder');
  });

  onMount(() => {
    const media = window.matchMedia('(min-width: 1280px)');
    const updateViewport = () => {
      isDesktop = media.matches;
    };

    updateViewport();
    media.addEventListener('change', updateViewport);
    return () => media.removeEventListener('change', updateViewport);
  });
</script>

{#snippet sidebarContent()}
  <Tooltip.Root>
    <Tooltip.Trigger onclick={() => appState.hideSidebar()} class="sidebar-toggle-btn" aria-label={appState.t('actions.hideSidebar')}></Tooltip.Trigger>
    <Tooltip.Portal>
      <Tooltip.Content class="tooltip-content" side="top" sideOffset={6}>
        {appState.t('actions.hideSidebar')}
        <Tooltip.Arrow class="tooltip-arrow" />
      </Tooltip.Content>
    </Tooltip.Portal>
  </Tooltip.Root>
  <Logo />
  <SearchBar />
  <FolderTree />
  <div class="sidebar-controls">
    <ThemeToggle />
    <LanguageToggle />
  </div>
{/snippet}

{#snippet showSidebarTrigger(props: Record<string, unknown>)}
  <Dialog.Trigger {...props} class="navbar-toggle-btn" aria-label={appState.t('actions.showSidebar')}></Dialog.Trigger>
{/snippet}

<Tooltip.Provider delayDuration={250} skipDelayDuration={100}>
  <Dialog.Root open={isSidebarDialogOpen} onOpenChange={(open) => open ? appState.showSidebar() : appState.hideSidebar()}>
    <div class="page-container">
      <header class="navbar">
        <Tooltip.Root>
          <Tooltip.Trigger child={showSidebarTrigger} />
          <Tooltip.Portal>
            <Tooltip.Content class="tooltip-content" side="right" sideOffset={6}>
              {appState.t('actions.showSidebar')}
              <Tooltip.Arrow class="tooltip-arrow" />
            </Tooltip.Content>
          </Tooltip.Portal>
        </Tooltip.Root>
        <Logo />
      </header>

      <Dialog.Portal>
        <Dialog.Overlay class="sidebar-overlay" />
        <Dialog.Content class="sidebar mobile-sidebar" aria-label={appState.t('labels.bookmarkNavigation')}>
          {@render sidebarContent()}
        </Dialog.Content>
      </Dialog.Portal>

      <aside class="sidebar desktop-sidebar" aria-label={appState.t('labels.bookmarkNavigation')}>
        {@render sidebarContent()}
      </aside>

      <main class="main-container">
        {@render children()}
      </main>
    </div>
  </Dialog.Root>
</Tooltip.Provider>
