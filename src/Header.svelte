<script context="module" lang="ts">
  import { tabNames } from './stores.ts';
  import { title } from './env.ts';
  const centerHorizontally = "margin-left: auto; margin-right: auto";
  const centerVertically = "margin-top: auto; margin-bottom: auto";
  const tabIndices = Array.from(
    {length: tabNames.length - 1},
    (_, i) => i.toString()
  );
</script>

<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import { get, writable } from 'svelte/store';

  import TopAppBar, { Row, Section, Title } from '@smui/top-app-bar';
  import IconButton, { Icon } from '@smui/icon-button';
  import Tab, { Label } from '@smui/tab';
  import TabBar from '@smui/tab-bar';
  import { mdiMenu } from '@mdi/js';

  import { activeTab } from './stores.ts';

  const dispatch = createEventDispatcher();
  function openDrawer(e: Event) {
    dispatch('menu');
  }
  export let topAppBar: TopAppBar;

  const active = writable(
    Math.min(get(activeTab), tabIndices.length - 1).toString()
  );
  let firstTime = true;
  active.subscribe((active) => { if (firstTime) {
      firstTime = false;
      return;
    }
    activeTab.set(parseInt(active));
  });
</script>

<div class="header">
  <TopAppBar
    variant="standard"
    bind:this={topAppBar}
    class="mdc-theme--primary mdc-theme--background mdc-elevation--z10"
  >
    <Row>
      <Section style="flex-grow: 1; padding-right: auto">
        <IconButton style={centerVertically} on:click={openDrawer}>
          <Icon tag="svg" viewBox="0 0 24 24">
            <path fill="currentColor" d={mdiMenu} />
          </Icon>
        </IconButton>
      </Section>
      <Section style="padding-left: 0">
        <Title style={centerHorizontally}>
          <b>
            <!-- <span style="font-size: 70%">Gjimnazi</span> -->
            <span style="font-family: 'Abril Fatface'">"{title}"</span>
          </b>
        </Title>
      </Section>
      <Section style="padding-left: 0">
        <div
          class="icon-indicators"
          style="margin-left: auto; margin-right: 0;"
        >
          <TabBar
            tabs={tabIndices}
            let:tab
            bind:active={$active}
          >
            <Tab {tab} minWidth>
              <b class="tabbar-tab">{tabNames[parseInt(tab)]}</b>
            </Tab>
          </TabBar>
        </div>
      </Section>
    </Row>
  </TopAppBar>
</div>

<style>
  .icon-indicators
    :global(.mdc-tab-indicator--active .mdc-tab-indicator__content) {
    opacity: 1;
  }
  .icon-indicators :global(.mdc-tab) {
    color: #fff;
  }
  .header {
    --mdc-theme-primary: var(--header-theme-color);
    --mdc-theme-background: var(--header-bg-color);
    --mdc-typography-headline6-font-size: 155%;
    --mdc-typography-button-font-size: 60%;
  }
</style>
