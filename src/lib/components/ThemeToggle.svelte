<script lang="ts">
  import { ToggleGroup } from 'bits-ui';
  import { getAppState } from '$lib/state.svelte';
  import type { Theme } from '$lib/types';
  
  const appState = getAppState();

  const handleThemeChange = (newTheme: "auto" | "light" | "dark") => {
    appState.setTheme(newTheme);
  };

  const themes: { value: Theme; labelKey: 'themes.auto' | 'themes.light' | 'themes.dark'; iconClass: string }[] = [
    { value: 'auto', labelKey: 'themes.auto', iconClass: 'auto-icon' },
    { value: 'light', labelKey: 'themes.light', iconClass: 'light-icon' },
    { value: 'dark', labelKey: 'themes.dark', iconClass: 'dark-icon' }
  ];
</script>

<ToggleGroup.Root
  class="theme-toggle"
  type="single"
  value={appState.theme}
  onValueChange={(value) => value && handleThemeChange(value as Theme)}
  aria-label={appState.t('labels.theme')}
>
  {#each themes as theme (theme.value)}
    <ToggleGroup.Item
      value={theme.value}
      aria-label={appState.t(theme.labelKey)}
      title={appState.t(theme.labelKey)}
      class={appState.theme === theme.value ? 'selected' : undefined}
    >
      <div class={theme.iconClass}></div>
    </ToggleGroup.Item>
  {/each}
</ToggleGroup.Root>
