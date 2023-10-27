<script>
  import Navigation from './Navigation.svelte';
  import '../app.css';
</script>

<div class="flex min-h-screen">
  <!-- <aside class="w-56 shrink-0"> -->
  <!--   <Navigation /> -->
  <!-- </aside> -->
  <main class="grow p-4">
    <slot />
  </main>
</div>
