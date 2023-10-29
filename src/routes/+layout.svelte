<script lang="ts">
  import Navigation from './Navigation.svelte';
  import '../app.css';
  import { QueryClientProvider } from '@tanstack/svelte-query';
  import type { LayoutData } from './$types';

  export let data: LayoutData;
</script>

<div class="flex h-screen">
  <!-- <aside class="w-56 shrink-0"> -->
  <!--   <Navigation /> -->
  <!-- </aside> -->
  <main class="grow p-4">
    <QueryClientProvider client={data.queryClient}>
      <slot />
    </QueryClientProvider>
  </main>
</div>
