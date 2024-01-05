<script lang="ts">
  import type TopAppBar from '@smui/top-app-bar';
  import { AutoAdjust } from '@smui/top-app-bar';
  import Router, { push, replace, loc } from 'svelte-spa-router';
  import routes from './routes';

  export let topAppBar: TopAppBar;
</script>

<div class="body">
  <AutoAdjust {topAppBar}>
    <div style="height: 15px"></div>
    <Router {routes} />
  </AutoAdjust>
</div>

<style>
  :global(body) {
    color: rgb(230, 210, 255);
    background-color: var(--body-bg-color);
    background-image: var(--body-bg-image);
    min-height: 100%;
    margin-bottom: 0;
  }
  :root {
    scrollbar-color: lightgray #fafafa;
  }
  .body :global(main) {
    --margins: 15%;
    --font-size: inherit;
  }
  @media screen and (width <= 700px) {
    .body :global(main) {
      --margins: 5%;
      --font-size: 80%;
    }
  }
  .body :global(main) {
    margin-left: var(--margins);
    margin-right: var(--margins);
    font-size: var(--font-size);
  }
</style>
