<script lang="ts">
  import { getAppState } from '$lib/state.svelte';
  import type { Folder, Bookmark } from '$lib/types';

  const appState = getAppState();

  let folders = $derived(appState.filteredBookmarks.filter(item => item.type === 'folder') as Folder[]);
  let bookmarks = $derived(appState.filteredBookmarks.filter(item => item.type === 'link') as Bookmark[]);
</script>

<div class="card-grid">
  {#if folders.length > 0}
    <div class="folder-grid">
      {#each folders as folder (folder.id)}
        <a
          href="?folder={encodeURIComponent(folder.id)}"
          class="folder-card"
        >
          <span class="icon"></span>
          <h3 class="title">{folder.title}</h3>
        </a>
      {/each}
    </div>
  {/if}

  {#if folders.length > 0 && bookmarks.length > 0}
    <hr class="divider" />
  {/if}

  {#if bookmarks.length > 0}
    <div class="bookmark-grid">
      {#each bookmarks as bookmark (bookmark.url)}
        <a
          href={bookmark.url}
          target="_blank"
          rel="noopener noreferrer"
        >
          <div class="bookmark-card">
            {#if !bookmark.icon}
              <span class="icon"></span>
            {:else}
              <img src={bookmark.icon} alt={bookmark.title} class="icon-image" />
            {/if}
            <div class="info">
              <h3 class="title">{bookmark.title}</h3>
              <p class="url">{bookmark.url}</p>
            </div>
          </div>
        </a>
      {/each}
    </div>
  {/if}
</div>
