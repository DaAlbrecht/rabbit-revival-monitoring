<script>
  import Header from './Header.svelte';
  import '../app.css';
</script>

<div>
  <Header />
  <main>
    <slot />
  </main>
  <footer class="bg-sky-400">
    <p>Documentation for this project can be found here:</p>
  </footer>
</div>
