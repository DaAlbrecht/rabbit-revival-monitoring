<script>
  export let title;
  export let loading;
  export let error;
</script>

<div
  class="dark:highlight-white/5 relative h-full min-h-full rounded-lg border-2 border-slate-50 dark:border-slate-400"
>
  <div class="flex h-full flex-col">
    <div class="flex items-center justify-between p-4">
      <p
        class="text-dashboards-xs text-neutral-850 mr-2 truncate font-medium leading-normal transition-all group-hover:mr-2 dark:text-white"
        title="Number of recent departures"
      >
        {title}
      </p>
      {#if error}
        <p class="text-xs font-semibold text-red-500">{error}</p>
      {/if}
      {#if loading}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="h-6 w-6 animate-spin text-slate-300 dark:text-slate-400"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
          />
        </svg>
      {/if}
    </div>
    <div class="overflow-none relative flex grow flex-col p-4">
      {#if loading || error}
        <div
          class="absolute inset-0 flex items-center justify-center pb-[25px] text-2xl font-semibold text-slate-300"
        >
          No data
        </div>
      {:else}
        <slot />
      {/if}
    </div>
  </div>
</div>
