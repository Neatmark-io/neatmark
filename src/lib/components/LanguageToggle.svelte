<script lang="ts">
  import { getAppState } from '$lib/state.svelte';
  import { languages, type Language } from '$lib/i18n';

  const appState = getAppState();

  const handleLanguageChange = (event: Event) => {
    appState.setLanguage((event.target as HTMLSelectElement).value as Language);
  };
</script>

<label class="language-select">
  <span aria-hidden="true"></span>
  <select
    value={appState.language}
    aria-label={appState.t('labels.language')}
    title={appState.t('labels.language')}
    onchange={handleLanguageChange}
  >
  {#each languages as language (language.code)}
    <option value={language.code}>{language.code.toUpperCase()}</option>
  {/each}
  </select>
</label>
