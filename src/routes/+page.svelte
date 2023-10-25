<script>
  import Counter from './Counter.svelte';
  import Messages from './Messages.svelte';
  import Starfield from './Starfield/Starfield.svelte';
</script>

<svelte:head>
  <title>Home</title>
  <meta name="description" content="Svelte demo app" />
</svelte:head>

<section class="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
  <div class="h-32 bg-slate-800 p-4">Replay Servie</div>
  <div class="h-32 bg-slate-800 p-4">Replay Servie</div>
  <div class="h-32 bg-slate-800 p-4">
    Consumers
    <Counter />
  </div>
</section>
<Messages />
<Starfield />
