<script>
    import markdownit from 'markdown-it';
    import glossariesPage from "$lib/assets/glossaries.md?raw"

    const md = markdownit();
    const result = md.render(glossariesPage);
</script>

{@html result}