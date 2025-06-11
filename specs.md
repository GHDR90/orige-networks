# Specs

Per May 15, 2025, the PI suggested the following structure which is annotated with my comments (Bjarke):

---

Here is an explanation of the nodes and edges in my dataset and their name, with a couple of questions also.
    
## Nodes
I can identify these types of nodes (plus one optional):

- Work: e.g. Contra Celsum (Cels)
- Work Reference Nodes: e.g., Cels. praef. 2, Cels. praef. 3-4, Cels. praef. 5
  - These represent sections of Contra Celsum (primary units you're analyzing).
- Quotation Nodes: e.g., Matt 27:17, Rom 8:35, etc.
  - These are biblical verses quoted in the work.
- Doctrine Nodes: e.g., Love, Philosophy, Passion/Cross
  - These are theological or philosophical themes associated with the work sections.
- (Optional): Related Quotation Nodes: e.g., Jer 20:7 
  - These are biblical passages to which the authors allude without quoting them fully. In the visualization, they can even appear only as a subtext of the quotation nodes. The name should be changed in “Related Biblical Allusions”

> Bjarke's comments:
> In my opinion, it only makes sense to include two types of nodes: `work reference` sections (i.e., primary units) and `(related) quotation` verses (i.e., referenced biblical verses).  
> - `Work` will be a property of the `work reference` node.
> - `Doctrines` will be a property of the `work reference` node.
> - The type of quotation (`quotation` vs. `related quotation`) will be a property of the edges between a primary node (`work reference`) and its referenced biblical verses.

## Edges
Summary of Possible Edge Types

| From Node Type | To Node Type     | Possible Edge name |
|----------------|------------------|--------------------|
| Work Reference | Quotation        | QUOTES             |
| Work Reference | Doctrine         | RELATES_TO         |
| Work Reference | RelatedQuotation | RELATED_ALLUSION   |
| Doctrine       | Work Reference   | APPEARS_IN         |
| Doctrine       | Quotation        | SUPPORTED_BY       |

> Bjarke's comments: Because of the types of nodes, attributes, and edges (see above), only the following edges are constructed.
> - From `work reference` to `quotation` (solid edge)
> - From `work reference` to `relatedQuotation` (dotted edge)
> 
> All other attributes can be found via the graph model upon filter/search:
> - `work reference` -> `doctrine`: Doctrine can be found as attribute of the work reference node. 
> - `doctrine` -> `work reference`: Can be equivalently found by filtering the graph nodes by doctrine as all `work reference` nodes have the doctrine attribute.
> - `doctrine` -> `quotation`: Same as above by following inbound edges to `quotation` nodes and filtering by `doctrines` attribute of neighboring nodes. 

Since the dataset also filters by work, it is possible to filter and look for connections in only one or more works. I should also be possible to filter through doctrines.

One interesting feature I’d like to explore (if possible) is filtering two doctrines simultaneously — for example, “Love” and “Philosophy” — and visualizing their connections to biblical quotations. More importantly, the visualization should highlight whether these two doctrines share any biblical quotations. For instance, if both doctrines reference Matt 27:17, there should be a single shared node representing that quotation connected to both doctrines. This approach would allow users to easily see both the unique biblical support for each doctrine, as well as the overlapping scriptural foundations that link them. It would provide valuable insight into the extent to which biblical quotations connect and relate these doctrines.

Finally, in the tool we’ve chosen to use (Sigma.js), I noticed there is a “search in nodes” function. Would it be possible to use this feature to search for a single node — for example, a specific biblical quotation like Matt 27:17 — and visualize how that node is connected to different doctrines?
I really hope I have been clear. If not, just tell me!