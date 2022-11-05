// NAWIGACJA

createLink("index.html", "SKILLS");
createLink("chess.html", "CHESS");
createLink("projects.html", "PROJECTS");
createLink("algorithms.html", "ALGORITHMS");
createLink("maths.html", "MATHS");


function createLink(href, text  ) {
    let anchor = document.createElement('a');
    let link = document.createTextNode(text);
    anchor.appendChild(link);
    anchor.href = href;
    const nav = document.getElementById("nav");
     nav.append(anchor);
}