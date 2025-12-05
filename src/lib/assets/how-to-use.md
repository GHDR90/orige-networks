# How to use Orige.net

1.	What you can do with Orige.net
2.	 Getting Started
3.	Free-Text Search
4.	 Filtering Options
5.	 Navigating the Network Graph: A Summary
6.	 Tips & Best Practices
7.	 Help and Tutorial

## 1. What Can You Do with Orige.net

Learning to use Orige.net does not require advance levels of digital literacy. Once you understand the basics, you can start exploring the relationships between Origen’s writings, his theological doctrines, and the biblical texts he quotes. 
With Orige.net, you can:

-	Visualize connections between one or more of Origen’s doctrines and the biblical quotations found in one or more of his works.
-	Compare how different doctrines use the same or different biblical passages.
-	Examine the occurrence of specific biblical books within particular doctrinal contexts.
-	Explore how Origen cites Scripture in individual passages and how these quotations relate to specific doctrines.
-	Discover patterns that show how Origen built his theology through clusters of biblical references.

Orige.net is not only a searchable archive of Origen’s doctrines and biblical quotations; it is also an interactive tool that helps you explore how Origen thought with Scripture. Through Orige.net you can delve into Origen’s textual mind, exploring the conceptual network through which he constructed theological meaning by weaving together clusters of scriptural references. By navigating the visual network, you can see at a glance which biblical texts were central to his theology and how they interconnect across his works.

## 2. Getting Started

Open the platform and wait for the initial graph to load. By default, you will see **nodes (dots)** representing:

-	Passages from Origen of Alexandria’s works **(blue nodes)**
-	Biblical quotations referenced by Origen **(yellow nodes)**

Example:

<img src=(https://github.com/user-attachments/assets/5c75aeb4-ad7f-477f-8689-58e256ad9c6d) alt="Fig 2" width="350" height="223">

Click on a node to view its label (e.g., Princ. 1.1.1 or John 1:1) and metadata (work, doctrine, etc.). Clicking a node reveals its associated metadata in a panel on the left side of the interface. If you are looking at a biblical node (yellow nodes, e.g. Rom 10:21) the box will show the work it is cited, the doctrines related to the biblical quotation and the Origenian passages where it is referred. If you click on a passage from Origen’s works (blue nodes, e.g. Cels. 8.26) the box will show you the related doctrines and biblical quotation(s). You will also see the related nodes connected through an **edge (a line)**.

## 3. Free-Text Search

At the bottom left of your screen you have a box containing a free text search bar and three sections named “Works”, “Doctrines” and “Biblical works”. 

Here I explain how to use the **free text bar**. Use the search bar at the top to type keywords. This could be:

-	A Scripture reference (e.g., John 14:6)
-	A work of Origen (e.g., De Principiis)
-	A specific passage in one of Origen’s work (e.g., Hom.Ps. 76.3.2)

Once you type your search one or more nodes will appear. If you click on the node, a box will appear on the left of your screen with all the related metadata. You will notice that a button will open at the top left called “**show hidden neighbours**”. If you click on that, you will be able to visualise the nodes (biblical passages or work references) related to the one matching your search. For example, if you search for Princ. 2.2.2 and you click on the “show hidden neighbours” button, you will visualise the network of biblical quotations related to that passage. 

If you click on a single node, you will see that another button appears, called “**Show extra degree of neighbours**”. If you click on that you will visualise other nodes that are related to your primary node via its attachments (either biblical references or Origen’s work references). Another possible use of this function regards the visualisation of all biblical passages connected to a specific verse (e.g., those associated with Heb 1:3). First, the verse must be searched using the free-text bar. After clicking on Heb 1:3 node, clear the search field and click on “show extra degree of neighbours.” The interface will then display all biblical citations linked to that passage, allowing users to explore its broader intertextual network.

 **Please note** that the search must perfectly match the text of the reference. You can find abbreviations of Origen’s work and biblical books in the [Glossaries section](https://ghdr90.github.io/orige-networks/glossaries). Biblical quotations follow the following quotation style: Abbreviated biblical book + space + chapter + colon + versicule (e.g. Col 1:10); Origen’s work references follow the following: Abbreviated work’s name + full stop + chapter + verses. Chapter and verses are always separated by a full stop (eg. Comm.Jo. 5.7).

## 4. Filtering Options

At the bottom left of your screen, below the free text search bar you will find three sections named “Works”, “Doctrines” and “Biblical works”. Here, I explain how to use those filters. You can refine your view using the following filter:

-	**Work-based filter**: Select one or more of Origen’s works to see only nodes related to that work (e.g. “Contra Celsum”).
-	**Doctrine filter**: Select one or more doctrinal themes to see only nodes related to that doctrine (e.g. “Merit”). A full list of doctrines and their definition can be found in the [Glossaries section](https://ghdr90.github.io/orige-networks/glossaries)
-	**Biblical works** filter: Limit to quotations from specific biblical books (e.g. “Revelation”)

Combine the filters to narrow the network to precisely the area you want to examine. In the section regarding the “doctrine” filter you will notice that there are two options, one named “**all**”, the other “**any**”. These are to be used when you want to filter through more than one doctrine. 

1.	If the bar is set to “**any**” and you select more than one doctrine the graph will show you all the nodes where any of the selected doctrines appears. 
2.	By contrast, if the bar is set to “**all**”, the graph will show you only those nodes where the selected doctrines appear together.

For example, if you select “predestination” and “foreknowledge” and the bar is set to “any”, you will see all the biblical references and textual places where either one of the doctrines appears; by contrast, if you select “all”, you will only see the occurrences where they appear together. 

You will notice that when you click one of the works, doctrines or biblical works a button will open at the top left called “show hidden neighbours”. For the use of this button see above the “free text search section”.

 **Please note** that you can use the following filters together: works and doctrines; doctrines and biblical works. You cannot use together the filters “works” and “biblical works” as the system does not allow it.

## 5. Navigating the Network Graph: A Summary

Here you have some schematised summary on how to use the Network graph:
-	**Nodes** = passages or biblical texts; **edges** = reference or usage links.
-	Use zoom and pan controls to move around the graph.
- Click on a node to highlight its connections:
   - For a **blue node**, you will see which biblical quotations it references.
   - For a **yellow node**, you will see which of Origen’s passages cite it.
-	Use the side-panel or pop-up to review metadata: node type (passage vs quotation), work name, doctrine tags, etc.
- For a more precise analysis:
   - Identify nodes with many connections (high centrality) — key passages or quotations.
   - Look for clusters — groups of interconnected passages and quotations around specific doctrines.
-	 **To compare usage across doctrines**: use the doctrine filter to select two or more doctrines and observe similarities or differences in Scripture references.
-	 **To compare across works**: select two works in the work-filter and observe how each uses Scripture with respect to doctrine.
-	 **To examine one biblical text**: search for a specific reference (e.g., John 1:1) and see how many of Origen’s passages cite it, and for which doctrines.

## 6. Tips & Best Practices

-	Start with a broad search (e.g., a doctrine) then narrow down using filters to focus.
-	When the graph becomes visually dense, apply filters to reduce complexity and highlight meaningful patterns.
-	Hover vs click: Hovering shows quick info; clicking fixes and expands the node’s network.
-	Be careful not to misspell references when using the free search bar. The system will not respond to misspelled references. Abbreviations of Origen’s works and biblical books can be found in the [Glossaries section](https://ghdr90.github.io/orige-networks/glossaries). Biblical abbreviation follows the following style: John 1:10; Origenian passages abbreviation follows the following: Princ. 2.2.2.

## 6. Help and Tutorials

As the project is still under development, video tutorials and presentation of the database will be produced in the upcoming months. Once produced, hyperlinks will be attached in this section. However, if you encounter any issues, please contact me at the following email: [giovanni.hermanin@cas.au.dk](mailto:giovanni.hermanin@cas.au.dk). 





