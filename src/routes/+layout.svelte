<script>

 let { children } = $props();

</script>

<nav>
 <h1>Hej</h1>
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
 }
</style>