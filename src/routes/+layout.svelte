<script>
 import "$lib/client/assets/styles.css"
 import { base } from '$app/paths';
 import { setContext } from "svelte";
 import { CONTEXT } from "$lib/utils/constants.js";

 let { children } = $props();

 /**
  * Resolves a path
  * @param {string} path
  */
 function resolveURL(path) {
  return `${base}${path}`;
 }

 setContext(CONTEXT.RESOLVE_URL, resolveURL);

</script>

<nav>
 <div class="nav-item">
  <a href={resolveURL("/")}>Orige.net</a>
 </div>
    <div class="nav-item">
        <a href={resolveURL("/glossaries")}>Glossaries</a>
    </div>
 <div class="nav-item">
  <a href={resolveURL("/about")}>About</a>
 </div>
</nav>

 <div>
  {@render children()}
 </div>

<style>
 :root {
  font-family: "Helvetica Neue", sans-serif;
  color: #21130d;
 }
 nav {
  z-index: 999;
  display: flex;
 }
 .nav-item {
  padding-inline: 10px;
  border-right: 1px solid var(--dark-brown);
 }
 .nav-item:last-child {
  border: none;
 }
</style>