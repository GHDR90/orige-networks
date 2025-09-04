<script>
    import markdownit from 'markdown-it';
    import aboutPage from "$lib/assets/about.md?raw"

    const md = markdownit();
    const result = md.render(aboutPage);
</script>

{@html result}