<script lang="ts">
  import { getAppState } from '$lib/state.svelte';
  import type { Folder, Bookmark } from '$lib/types';
  
  const appState = getAppState();

  const handleFolderClick = () => {
    appState.hideSidebar();
  };
</script>

{#snippet folderRow(folder: Folder)}
  <li class="folder {appState.selectedFolder === folder.id ? 'selected' : ''}">
    <a href="?folder={encodeURIComponent(folder.id)}" class="title" onclick={handleFolderClick}>
      <span class="icon {folder.icon ? '' : 'default'}">{folder.icon || ''}</span>
      <span class="folder-name">{folder.title}</span>
    </a>
    <ul>
      {#each folder.children as child}
        {#if child.type === 'folder'}
          {@render folderRow(child as Folder)}
        {/if}
      {/each}
    </ul>
  </li>
{/snippet}

<nav class="folder-tree">
  <ul>
    {#each appState.bookmarks as item}
      {#if item.type === 'folder'}
        {@render folderRow(item as Folder)}
      {/if}
    {/each}
  </ul>
</nav>
