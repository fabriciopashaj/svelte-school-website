<script lang="ts" context="module">
  export interface Article {
    id: number,
    author: string,
    uploaded: string,
    title: string,
    content: string,
  };

</script>

<script lang="ts">
  import Card, {
    Content,
    // PrimaryAction,
    // Actions,
    // ActionButtons,
    // ActionIcons,
  } from '@smui/card';
  import Markdown from 'svelte-markdown';

  export let article: Article;
</script>

<div class="card-container">
  <Card style="padding-bottom: 15px">
    <Content style="color: black">
      <h2>{article.title}</h2>
      <p><b>Autor:</b> {article.author}</p>
      <p><b>Ngarkuar:</b> {article.uploaded}</p>
      <div class="paragraphs">
        <Markdown source={article.content} />
      </div>
    </Content>
  </Card>
</div>

<style>
  .card-container :global(p), :global(h2), :global(.paragraphs) {
    margin: 20px;
  }
  .card-container :global(img) {
    margin: 5px 20px 0px 5px;
    float: left;
    height: 300px;
    width: 300px;
  }
</style>
