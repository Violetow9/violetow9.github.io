window.onload = () => {
    fetch("/projects.json")
        .then(response => response.json())
        .then(json => {
            console.log(json)
            loadProjects(json)
        })
        .catch(reason => console.log(reason))
}

function loadProjects(projects) {
    let rowProjects = document.getElementById("projects");

    for (const project of projects) {
        const colDiv = document.createElement("div");
        colDiv.classList.add("col-md-4");

        const workBoxDiv = document.createElement("div");
        workBoxDiv.classList.add("work-box");

        const aLink = document.createElement("a");
        aLink.href = project.image;
        aLink.setAttribute("data-gallery", "portfolioGallery");
        aLink.classList.add("portfolio-lightbox");

        const workImgDiv = document.createElement("div");
        workImgDiv.classList.add("work-img");

        const img = document.createElement("img");
        img.src = project.image;
        img.alt = "";
        img.classList.add("img-fluid");

        workImgDiv.appendChild(img);
        aLink.appendChild(workImgDiv);

        const workContentDiv = document.createElement("div");
        workContentDiv.classList.add("work-content");

        const rowDiv = document.createElement("div");
        rowDiv.classList.add("row");

        const colSm8Div = document.createElement("div");
        colSm8Div.classList.add("col-sm-8");

        const h2Title = document.createElement("h2");
        h2Title.classList.add("w-title");
        h2Title.innerText = project.name;

        const pDescription = document.createElement("p");
        pDescription.innerText = project.description;

        const wMoreDiv = document.createElement("div");
        wMoreDiv.classList.add("w-more");

        const wCategorySpan = document.createElement("span");
        wCategorySpan.classList.add("w-ctegory");
        wCategorySpan.innerText = project.category;

        const slashSpan = document.createElement("span");
        slashSpan.innerText = " / ";

        const wDateSpan = document.createElement("span");
        wDateSpan.classList.add("w-date");
        wDateSpan.innerText = project.date;

        const languageButton = document.createElement("button");
        languageButton.type = "button";
        languageButton.innerText = project.language;
        languageButton.classList.add("btn", "btn-primary", "me-2");
        languageButton.disabled = true;

        const docButton = document.createElement("a");
        docButton.href = project.documentation;
        docButton.innerText = "Documentation";
        docButton.classList.add("btn", "btn-link", "me-2");

        wMoreDiv.appendChild(wCategorySpan);
        wMoreDiv.appendChild(slashSpan);
        wMoreDiv.appendChild(wDateSpan);
        wMoreDiv.appendChild(languageButton);
        wMoreDiv.appendChild(docButton);
        colSm8Div.appendChild(h2Title);
        colSm8Div.appendChild(pDescription);
        colSm8Div.appendChild(wMoreDiv);

        const colSm4Div = document.createElement("div");
        colSm4Div.classList.add("col-sm-4");

        const wLikeDiv = document.createElement("div");
        wLikeDiv.classList.add("w-like");

        const aLink2 = document.createElement("a");
        aLink2.href = project.url;

        const spanIcon = document.createElement("span");
        spanIcon.classList.add("bi", "bi-plus-circle");

        aLink2.appendChild(spanIcon);
        wLikeDiv.appendChild(aLink2);
        colSm4Div.appendChild(wLikeDiv);

        rowDiv.appendChild(colSm8Div);
        rowDiv.appendChild(colSm4Div);
        workContentDiv.appendChild(rowDiv);

        workBoxDiv.appendChild(aLink);
        workBoxDiv.appendChild(workContentDiv);
        colDiv.appendChild(workBoxDiv);

        rowProjects.appendChild(colDiv);
    }
}