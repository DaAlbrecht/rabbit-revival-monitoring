<script>
  import { page } from '$app/stores';
</script>

<header class="flex h-full flex-col justify-between bg-slate-800 p-4">
  <nav class="flex flex-col">
    <ul>
      <li aria-current={$page.url.pathname === '/' ? 'page' : undefined}>
        <a href="/">Home</a>
      </li>
    </ul>
  </nav>
  <nav class="flex flex-col">
    <ul>
      <li aria-current={$page.url.pathname === '/' ? 'page' : undefined}>
        <a href="/">Home</a>
      </li>
    </ul>
  </nav>
</header>
