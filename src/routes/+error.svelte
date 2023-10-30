<script lang="ts">
  import { page } from '$app/stores';
</script>

<section class="bg-gray-900">
  <div class="mx-auto max-w-screen-xl px-4 py-8 text-center lg:py-16">
    <h1
      class="mb-4 text-4xl font-extrabold leading-none tracking-tight text-white md:text-5xl lg:text-6xl"
    >
      The system is down
    </h1>
    <p class="mb-8 text-lg font-normal text-gray-400 sm:px-16 lg:px-48 lg:text-xl">
      The system is currently unavailable. Please try again later. This is most likely a temporary
      problem with the rabbitMQ services.
    </p>
    <div class="flex flex-col space-y-4 sm:flex-row sm:justify-center sm:space-x-4 sm:space-y-0">
      <a
        href="/"
        class="inline-flex items-center justify-center rounded-lg bg-blue-700 px-5 py-3 text-center text-base font-medium text-white focus:ring-blue-900"
      >
        Retry
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="ml-2 h-3.5 w-3.5"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
          />
        </svg>
      </a>
      <span
        class="inline-flex items-center justify-center rounded-lg border border-rose-800 px-5 py-3 text-center text-base font-medium text-rose-600 hover:bg-gray-700 focus:ring-gray-800"
      >
        Error: {$page.status}
        {$page.error.message}
      </span>
    </div>
  </div>
</section>
