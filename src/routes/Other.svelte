<script lang="ts" context="module">
  import type Article from '../ArticleCard.svelte';
  let articles: null|Article[] = null;
  async function loadArticles(): Article[] {
    if (articles == null) {
      const res = await fetch('/articles.json');
      if (!res.ok) {
        throw new Error(res.text());
      }
      articles = await res.json() as Article[];
    }
    await new Promise((res, rej) => setTimeout(res, 0.5e3));
    return articles;
  }
</script>

<script lang="ts">
  import ArticleCard from '../ArticleCard.svelte';
  import AwaitingSpinner from '../AwaitingSpinner.svelte';

  let articlesPromise = loadArticles();
</script>

<AwaitingSpinner promise={articlesPromise} let:resolvedPromise={articles}>
  {#each articles as article}
    <ArticleCard {article} />
    <div style="height: 20px"></div>
  {/each}
</AwaitingSpinner>

<style></style>
