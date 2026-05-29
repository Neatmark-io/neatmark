<script lang="ts">
  import { Tooltip } from 'bits-ui';
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
    }, 250);
  };

  const handleClear = () => {
    inputValue = '';
    appState.searchQuery = '';
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Enter') {
      appState.hideSidebar();
    } else if (e.key === 'Escape' && inputValue) {
      handleClear();
    } else if (e.key === 'Escape') {
      inputElement?.blur();
    }
  };

  onMount(() => {
    const isTextInput = (target: EventTarget | null) => {
      if (!(target instanceof HTMLElement)) return false;
      const tagName = target.tagName.toLowerCase();
      return tagName === 'input' || tagName === 'textarea' || target.isContentEditable;
    };

    const handleGlobalKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        inputElement?.focus();
        e.preventDefault();
      } else if (e.key === '/' && !isTextInput(e.target)) {
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
    placeholder={appState.t('placeholders.searchBookmarks')}
    aria-label={appState.t('labels.searchBookmarks')}
    aria-keyshortcuts="Control+K Meta+K /"
    value={inputValue}
    oninput={handleChange}
    onkeydown={handleKeyDown}
  />
  {#if !inputValue}
    <span class="search-shortcut" aria-hidden="true">
      <kbd>⌘</kbd>
      <kbd>K</kbd>
    </span>
  {/if}
  {#if inputValue}
    <Tooltip.Root>
      <Tooltip.Trigger aria-label={appState.t('actions.clearSearch')} onclick={handleClear} class="search-clear"></Tooltip.Trigger>
      <Tooltip.Portal>
        <Tooltip.Content class="tooltip-content" side="bottom" sideOffset={6}>
          {appState.t('actions.clearSearch')}
          <Tooltip.Arrow class="tooltip-arrow" />
        </Tooltip.Content>
      </Tooltip.Portal>
    </Tooltip.Root>
  {/if}
</div>
