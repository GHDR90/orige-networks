# About the project

-	How to cite the database
-	Description of Orige.net Project
-	Download the Full Dataset
-	Acknowledgements

## How to cite the database
Hermanin de Reichenfeld, G., Fog, B. V., (2025) _The Orige.net Project: Digital Exploration of Biblical Quotations in Origen of Alexandria's Exegesis_. [https://ghdr90.github.io/orige-networks/](https://ghdr90.github.io/orige-networks/about).

## Description of the Project
_Orige.net_ is an open-access digital platform that applies Network Analysis to biblical quotations and theological concepts within the works of Origen of Alexandria. Conceived and designed by Dr. [Giovanni Hermanin de Reichenfeld](https://pure.au.dk/portal/en/persons/giovanni.hermanin%40cas.au.dk/publications/) as part of his Marie Skłodowska-Curie fellowship (grant no. 101149891 – Orige.net), the project builds a searchable graph database connecting two types of nodes: 

-	passages from Origen’s works, shown in blue (e.g., Princ. 1.1.1)
-	referenced biblical quotations, shown in yellow (e.g., John 1:1).

The application allows users to filter and connect biblical quotations (e.g., John 1:1), Origen’s writings (e.g., De Principiis), and doctrinal themes (e.g., Trinity, Soul). The core search and filter functionality includes free-text search, work-based filtering, doctrine filtering, and referenced-work filtering.
Through _Orige.net_, users can:

- Explore how Origen uses Scripture to explain specific doctrines across his works
- Visualise intersections between theology and exegesis in Origen's thought
- Identify all biblical texts cited in relation to one or more doctrines across Origen’s works
- Identify Origen’s quotations of one or more biblical texts used to explain particular theological doctrines
- Compare Origen’s biblical usage across doctrines or works

The aim of the project is to allow scholars to reconstruct Origen’s "textual mind" – the mental network through which he engaged with Scripture – thus offering the scholarly community a powerful tool for visualising and analysing interpretive patterns previously inaccessible without computational support. Orige.net represents a significant methodological advance in textual studies and invites scholars to apply similar tools to other ancient authors and traditions.

All data have been manually collected and revised by Dr. [Giovanni Hermanin de Reichenfeld](https://pure.au.dk/portal/en/persons/giovanni.hermanin%40cas.au.dk/publications/) and structured in a JSON format. Data collection involved reading all of Origen’s works and manually assigning specific doctrines and biblical quotations to each passage. Grounded in rigorous scholarly practice, this process inevitably reflects a degree of interpretation, as the identification and categorisation of doctrinal elements require informed hermeneutic judgment which embraces the interpretive framework of the scholar who undertakes it.

The website and codes are developed by [Bjarke Vognstrup Fog](https://pure.au.dk/portal/en/persons/bfog@cc.au.dk) at the [Center for Humanities Computing](https://chc.au.dk), Aarhus University. Please refer to the [How to use the database](https://ghdr90.github.io/orige-networks/how-to-use) page for further instructions and tutorials.

## Download the Full Dataset

Orige.net is an Open Source project. The application is built as a pre-rendered, static site using Svelte, [SvelteKit](https://svelte.dev/docs/kit/adapter-static), and the static adapter . The graph database is modeled using [Graphology](https://graphology.github.io/) and rendered with [SigmaJS](https://www.sigmajs.org/). The web app requires a JSON file containing all entries that are modelled in the graph.

The entire codebase for the site is available in my Github repo at the following link:

[https://github.com/GHDR90/orige-networks](https://github.com/GHDR90/orige-networks) 

The JSON file with all the entries can be downloaded at the following link:

[https://pure.au.dk/portal/en/datasets/dataset-origenet-json/](https://pure.au.dk/portal/en/datasets/dataset-origenet-json/)

Please note that the data collection is still in progress and therefore the files will be implemented continuously. 


## Acknowledgments
The Orige.net project is funded from the European Union under Horizon Europe research and innovation programme HORIZON-MSCA-2023-PF-01, Marie Sklodowska-Curie grant agreement 101149891. Funded by the European Union. Views and opinions expressed are however those of the author only and do not necessarily reflect those of the European Union or the granting authority. Neither the European Union nor the granting authority can be held responsible for them.

I would like to thank Aarhus University’s Centre for Humanities Computing, particularly [Bjarke Vognstrup Fog](https://pure.au.dk/portal/en/persons/bfog@cc.au.dk), who designed and developed the codes and the website, and [Peter Bjerregaard Vahlstrup](https://pure.au.dk/portal/en/persons/imvpbv%40cas.au.dk). A special thanks goes also to Aarhus University’s Department of Theology, particularly to prof. [Anders-Christian Jacobsen](https://pure.au.dk/portal/en/persons/alj%40cas.au.dk).

Any use of this website and database in connection with scientific work must reference and acknowledge [Center for Humanities Computing](https://chc.au.dk), Aarhus University.

![EN-Funded by the EU-POS](https://github.com/user-attachments/assets/c17a0944-274e-4e30-a3f4-3910f6c4cdde)  ![csm_CHC_logo-turquoise-full-name_de1d69e41b](https://github.com/user-attachments/assets/3dad5317-aae2-4e7f-9bb8-8c9475c7f53f) 

