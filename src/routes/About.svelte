<script lang="ts" context="module">
  import { title } from '../env.ts';

  type Paper = [string, string];

  let papers: null|Paper[] = null;
  async function loadPapers(): Paper[] {
    if (papers == null) {
      const res = await fetch('/about.json');
      if (!res.ok) {
        throw new Error(res.text());
      }
      papers = await res.json() as Paper[];
    }
    return papers;
  }
</script>

<script lang="ts">
  import Paper, { Title, Subtitle, Content } from '@smui/paper';
  import AwaitingSpinner from '../AwaitingSpinner.svelte';
  import Markdown from 'svelte-markdown';

  let papersPromise = loadPapers();
</script>

<div class="about">
  <img src="/logo.png" alt="Logo {{ title }}" />
  <!-- TODO: Wrap this in a component -->
  <AwaitingSpinner promise={papersPromise} let:resolvedPromise={papers}>
    {#each papers as [title, source]}
      <div style="padding: 10px 0 10px 0">
        <Paper variant="raised" elevation={10} square={false}>
          <Title>{title}</Title>
          <hr />
          <Content>
            <Markdown {source} />
          </Content>
        </Paper>
      </div>
    {/each}
  </AwaitingSpinner>
</div>

<style>
  .about {
    --mdc-typography-headline5-font-size: 1.8rem;
    --mdc-typography-headline5-font-weight: 600;
    --mdc-theme-primary: rgba(98, 0, 238, 0.4);
  }
  .about :global(img) {
    --img-ratio: 2;
  }
  @media screen and (width <= 700px) {
    .about :global(img) {
      --img-ratio: 1;
    }
  }
  .about :global(img) {
    display: block;
    border: 10px outset black;
    border-radius: 35px;
    width: calc(312px * var(--img-ratio));
    height: calc(272px * var(--img-ratio));
    margin-left: auto;
    margin-right: auto;
    margin-bottom: 15px;
  }
</style>
