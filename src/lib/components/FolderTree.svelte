<script lang="ts">
  import { getAppState } from '$lib/state.svelte';
  import type { Folder } from '$lib/types';
  import { resolve } from '$app/paths';

  const appState = getAppState();

  const handleFolderClick = () => {
    appState.hideSidebar();
  };
</script>

{#snippet folderRow(folder: Folder)}
  <li class="folder {appState.selectedFolder === folder.id ? 'selected' : ''}">
    <a
      href={resolve(`/?folder=${encodeURIComponent(folder.id)}`)}
      class="title"
      aria-current={appState.selectedFolder === folder.id ? 'page' : undefined}
      onclick={handleFolderClick}
    >
      <span class="icon {folder.icon ? '' : 'default'}">{folder.icon || ''}</span>
      <span class="folder-name">{folder.title}</span>
    </a>
    <ul>
      {#each folder.children as child (child.type === 'folder' ? child.id : child.url)}
        {#if child.type === 'folder'}
          {@render folderRow(child as Folder)}
        {/if}
      {/each}
    </ul>
  </li>
{/snippet}

<nav class="folder-tree" aria-label="Folders">
  <ul>
    {#each appState.bookmarks as item (item.type === 'folder' ? item.id : item.url)}
      {#if item.type === 'folder'}
        {@render folderRow(item as Folder)}
      {/if}
    {/each}
  </ul>
</nav>
