<script>
  import Messages from './Messages.svelte';
  import GridItem from './GridItem.svelte';
  import Number from './Number.svelte';
  import Starfield from './Starfield/Starfield.svelte';
</script>

<svelte:head>
  <title>Home</title>
  <meta name="description" content="Svelte demo app" />
</svelte:head>

<div class="absolute inset-0">
  <Starfield />
</div>
<section class="h-full text-neutral-300 dark:text-neutral-200">
  <div class="flex h-full flex-col text-white transition duration-200 dark:text-neutral-200">
    <div class="flex h-[52px] border-b border-neutral-50 dark:border-neutral-700">
      <p>Dashboard</p>
    </div>
    <div class="mt-4 grow overflow-x-auto">
      <div class="h-full overflow-hidden">
        <div class="grid h-full grid-cols-3 grid-rows-4 gap-4">
          <div>
            <GridItem title="Publishers">
              <Number number="2" />
            </GridItem>
          </div>
          <div>
            <GridItem title="Consumers">
              <Number number="2" />
            </GridItem>
          </div>
          <div>
            <GridItem title="System State">
              <div
                class="absolute inset-0 flex items-center justify-center pb-[25px] text-6xl font-semibold text-green-500"
              >
                Online
              </div>
            </GridItem>
          </div>
          <div class="col-span-3 row-span-3">
            <GridItem title="Messages">
              <Messages />
            </GridItem>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
