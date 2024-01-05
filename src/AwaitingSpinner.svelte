<script lang="ts">
  import CircularProgress from '@smui/circular-progress';
  import Accordion, { Panel, Header, Content } from '@smui-extra/accordion';

  export let promise: Promise;
</script>

{#await promise}
  <div class="spinner-container">
    <CircularProgress style="height: 100px; width: 100px" indeterminate />
  </div>
{:then resolvedPromise}
  {@debug resolvedPromise}
  <slot resolvedPromise={resolvedPromise} />
{:catch error}
  <div style="display: flex; justify-content: center">
    <h2>Ka ndodhur nj&#235; problem. Provoni t&#235; rifreskoni faqen dhe n&#235;se ndodh p&#235;rs&#235;ri ju lutem raportojeni.</h2>
    <Accordion>
      <Panel>
        <Header>M&#235; shum&#235; informacion</Header>
        <Content>
          <h3>{error.toString()}</h3>
        </Content>
      </Panel>
    </Accordion>
  </div>
{/await}

<style>
  .spinner-container {
    display: flex;
    justify-content: center;
    margin-top: 25%;
    --mdc-theme-primary: var(--header-bg-color);
  }
</style>
