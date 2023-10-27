<script>
  export let title;
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
    </div>
    <div class="overflow-none relative flex grow flex-col p-4">
      <slot />
    </div>
  </div>
</div>
