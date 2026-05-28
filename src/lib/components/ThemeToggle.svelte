<script lang="ts">
  import { ToggleGroup } from 'bits-ui';
  import { getAppState } from '$lib/state.svelte';
  import type { Theme } from '$lib/types';
  
  const appState = getAppState();

  const handleThemeChange = (newTheme: "auto" | "light" | "dark") => {
    appState.setTheme(newTheme);
  };

  const themes: { value: Theme; label: string; iconClass: string }[] = [
    { value: 'auto', label: 'Use system theme', iconClass: 'auto-icon' },
    { value: 'light', label: 'Use light theme', iconClass: 'light-icon' },
    { value: 'dark', label: 'Use dark theme', iconClass: 'dark-icon' }
  ];
</script>

<ToggleGroup.Root
  class="theme-toggle"
  type="single"
  value={appState.theme}
  onValueChange={(value) => value && handleThemeChange(value as Theme)}
  aria-label="Theme"
>
  {#each themes as theme (theme.value)}
    <ToggleGroup.Item
      value={theme.value}
      aria-label={theme.label}
      title={theme.label}
      class={appState.theme === theme.value ? 'selected' : undefined}
    >
      <div class={theme.iconClass}></div>
    </ToggleGroup.Item>
  {/each}
</ToggleGroup.Root>
