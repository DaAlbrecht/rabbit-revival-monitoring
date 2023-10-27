<script>
  import Messages from './Messages/Messages.svelte';
  import Stats from './Stats.svelte';
</script>

<svelte:head>
  <title>Home</title>
  <meta name="description" content="Svelte demo app" />
</svelte:head>

<section class="h-full text-neutral-300 dark:text-neutral-200">
  <div class="flex h-full flex-col text-white transition duration-200 dark:text-neutral-200">
    <div class="flex h-[52px]">
      <p>RabbitRevival - Monitoring / V1.0</p>
    </div>
    <div class="mt-4 grow overflow-x-auto">
      <div class="h-full overflow-hidden">
        <div class="flex h-full flex-col gap-4">
          <div class="grid h-[250px] grid-cols-3 grid-rows-2 gap-4">
            <Stats />
          </div>
          <Messages />
        </div>
      </div>
    </div>
  </div>
</section>
