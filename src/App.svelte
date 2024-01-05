<script lang="ts" context="module">
  const themes = [
    {
      '--header-theme-color': '#f5f5b5',
      '--header-bg-color': 'rgb(30, 30, 140)',
      '--body-bg-color': '',
      '--body-bg-image': 'linear-gradient(to right, #a00600, #ac8000 90%)',
    },
    {
      '--header-theme-color': '#f5f5b5',
      '--header-bg-color': '#ee9900',
      '--body-bg-color': 'rgb(30, 30, 90)',
      '--body-bg-image': '',
    }
  ];
</script>

<script lang="ts">
  import Drawer, {
    AppContent,
    Content,
    Header as DrawerHeader,
    Title,
    Scrim
  } from '@smui/drawer';
  import type TopAppBar from '@smui/top-app-bar';
  import List, { Item } from '@smui/list';
  import Switch from '@smui/switch';
  import FormField from '@smui/form-field';
  import Header from './Header.svelte';
  import Body from './Body.svelte';

  let path: string;
  let open = false;
  let themeIndex = parseInt(localStorage.getItem('themeIndex')) || 0;
  themeIndex = Math.min(Math.max(themeIndex, 0), themes.length - 1)

  function onMenu(e: Event) {
    e;
    open = true;
  }
  function setTheme(themeIndex: number) {
    for (let [key, value] of Object.entries(themes[themeIndex])) {
      document.documentElement.style.setProperty(key, value);
    }
    localStorage.setItem("themeIndex", themeIndex.toString());
  }

  export let topAppBar: TopAppBar;

  let secondaryTheme = themeIndex == 1;
  $: setTheme(themeIndex)
  $: themeIndex = secondaryTheme ? 1 : 0;
</script>

<main>
  <Drawer variant="modal" fixed={false} bind:open>
    <DrawerHeader>
      <Title>Opsionet</Title>
    </DrawerHeader>
    <Content>
      <List>
        <Item>
          <FormField>
            <span>Pamja 1</span>
            <Switch
              bind:checked={secondaryTheme}
              color="secondary"
              icons={false}
              ripple={false}
            />
            <span>Pamja 2</span>
          </FormField>
        </Item>
      </List>
    </Content>
  </Drawer>
  <Scrim fixed={false} />
  <AppContent>
    <Header bind:topAppBar={topAppBar} bind:path on:menu={onMenu} />
    <Body {topAppBar} />
  </AppContent>
</main>

<style>
  main {
    --mdc-switch-selected-handle-color: orange;
    --mdc-switch-selected-focus-handle-color: orange;
    --mdc-switch-unselected-handle-color: blue;
    --mdc-switch-unselected-focus-handle-color: blue;
    --mdc-theme-surface: lightgray;
    height: 100%;
    width: 100%;
    margin: 0 0 0 0;
    padding: 0 0 0 0;
  }
</style>
