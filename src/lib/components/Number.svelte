<script lang="ts">
  export let number: number;
  export let type: 'success' | 'error' | 'info' = 'info';

  $: color = (() => {
    switch (type) {
      case 'success':
        return 'text-green-500';
      case 'error':
        return 'text-rose-500';
      case 'info':
        return 'text-sky-300';
    }
  })();
</script>

<div
  class={`absolute inset-0 flex items-center justify-center pb-[25px] text-4xl font-semibold ${color}`}
>
  {number}
</div>
