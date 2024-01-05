<script lang="ts">
  import { title } from '../env.ts';
</script>

<div>
  <h4>Placeholders</h4>
  {#each Array(70) as _1}
    <pre>{#each Array(8) as _2} {title} {/each} </pre>
   {/each}
</div>

<style></style>
