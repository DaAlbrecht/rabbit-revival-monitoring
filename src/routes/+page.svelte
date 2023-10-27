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
<section class="text-neutral-300 dark:text-neutral-200 text-app-small h-full">
  <div
    class="flex flex-col h-full dark:text-neutral-200 text-app-small transition duration-200 text-white"
  >
    <div class="h-[52px] border-b border-neutral-50 dark:border-neutral-700 flex" />
    <div class="grow overflow-x-auto">
      <div class="h-full overflow-hidden">
        <div class="grid">
          <div
            class="h-full group flex flex-col rounded bg-white hover:bg-opacity-60 dark:bg-neutral-800 hover:dark:bg-opacity-80 transition-bg duration-200 border border-neutral-60 dark:border-neutral-600 shadow-light-elevation-1 hover:shadow-light-elevation-2 dark:shadow-dark-elevation-1 transition-shadow hover:dark:shadow-dark-elevation-2 overflow-hidden"
          >
            <div class="h-full flex flex-col">
              <div class="p-4 flex items-center justify-between" />
              <div class="relative grow flex flex-col pr-2 overflow-none">
                <div
                  class="absolute inset-0 flex justify-center items-center font-semibold pb-[25px]"
                  style="color: rgb(0, 159, 227); font-size: 67.64px;"
                >
                  50
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
<Messages />
<Starfield />
