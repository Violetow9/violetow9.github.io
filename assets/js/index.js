window.onload = () => {

    // Chargement des projets à partir du fichier projects.json
    fetch("/projects.json")
        .then(response => response.json())
        .then(json => {
            //console.log(json)
            loadProjects2(json)
        })
        .catch(reason => console.log(reason))

    // Chargement des articles de veille à partir du fichier veille.json
    fetch("/veille.json")
        .then(response => response.json())
        .then(json => {
            //console.log(json)
            loadVeille(json)
        })
        .catch(reason => console.log(reason))

    fetch("https://violetow9.me/githubdata.php")
        .then(response => response.json())
        .then(json => {
            //console.log(json)

            const reposCount = document.getElementById("repos-count");
            reposCount.setAttribute("data-purecounter-end", json.repos_count);

            const commitsCount = document.getElementById("commits-count");
            commitsCount.setAttribute("data-purecounter-end", json.commits_count);

            const collaboratorsCount = document.getElementById("collaborators-count");
            collaboratorsCount.setAttribute("data-purecounter-end", json.collaborators_count);

            const orgsCount = document.getElementById("orgs-count");
            orgsCount.setAttribute("data-purecounter-end", json.orgs_count);
        })
        .catch(reason => console.log(reason));

    // Formulaire de contact, quand le visiteur clique pour envoyer un message
    const btnContact = document.getElementById("btnContact");
    btnContact.onclick = () => {
        const nameChamp = document.getElementById("name");
        const name = nameChamp.value;

        const emailChamp = document.getElementById("email");
        const email = emailChamp.value;

        const subjectChamp = document.getElementById("subject");
        const subject = document.getElementById("subject").value;

        const messageChamp = document.getElementById("message");
        const message = document.getElementById("message").value;

        if (!nameChamp.checkValidity() || !emailChamp.checkValidity() || !subjectChamp.checkValidity() || !messageChamp.checkValidity()) {
            return;
        }

        const errorMessage = document.getElementById("contact-error-message");
        const successMessage = document.getElementById("contact-success-message");

        // Appel à ma restapi
        let data = new FormData();
        data.append("nom", name);
        data.append("email", email);
        data.append("sujet", subject);
        data.append("message", message);

        axios({
            method: "post",
            url: "https://violetow9.me/contact.php",
            data: data,
            headers: {"Content-Type": "multipart/form-data"},
        }).then(function (response) {
            //handle success
            //console.log(response);

            errorMessage.style.display = "none";
            successMessage.style.display = "block";
        }).catch(function (response) {
            //handle error
            console.log(response);

            errorMessage.style.display = "block";
            successMessage.style.display = "none";
        });
    };

    const mentionLegalesButton = document.getElementById("btnMentionsLegales");
    mentionLegalesButton.addEventListener('click', afficherMentionsLegales);
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

        const languageDocDiv = document.createElement("div");
        languageDocDiv.classList.add("col-sm-8");

        const languageButton = document.createElement("button");
        languageButton.type = "button";
        languageButton.innerText = project.language;
        languageButton.style.background = project.color;
        languageButton.classList.add("btn", "btn-primary", "me-2");
        languageButton.disabled = true;

        const docButton = document.createElement("a");
        docButton.href = project.documentation;
        docButton.innerText = "Documentation";
        docButton.classList.add("btn", "btn-link", "me-2");

        wMoreDiv.appendChild(wCategorySpan);
        wMoreDiv.appendChild(slashSpan);
        wMoreDiv.appendChild(wDateSpan);

        languageDocDiv.appendChild(languageButton);
        languageDocDiv.appendChild(docButton);

        for (let technology of project.technologies) {
            const techButton = document.createElement("button");
            techButton.type = "button";
            techButton.innerText = technology.name;
            techButton.style.background = technology.color;
            techButton.classList.add("btn", "btn-primary", "me-2");
            techButton.disabled = true;
            languageDocDiv.appendChild(techButton);
        }

        colSm8Div.appendChild(h2Title);
        colSm8Div.appendChild(pDescription);
        colSm8Div.appendChild(wMoreDiv);
        colSm8Div.appendChild(languageDocDiv);

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

function loadProjects2(projects) {
    // Récupération de l'élément HTML représentant le conteneur des cartes
    const cardContainer = document.getElementById('projects-card');

    // Création des éléments HTML pour chaque carte et ajout des données
    projects.forEach(project => {
        const card = document.createElement('div');
        card.classList.add('card', 'mb-4', 'mr-4', "mx-3", "p-0", "h-100", "rounded-0");
        card.style.maxWidth = '348px';

        const img = document.createElement('img');
        img.src = 'assets/img/' + project.image;
        img.classList.add('card-img-top', 'w-100', 'h-100');
        img.alt = '';

        const cardBody = document.createElement('div');
        cardBody.classList.add('card-body');

        const title = document.createElement('h5');
        title.classList.add('card-title');
        title.textContent = project.name;

        const description = document.createElement('p');
        description.classList.add('card-text');
        description.textContent = project.description;

        const date = document.createElement('p');
        date.classList.add('card-text', 'text-muted');
        date.textContent = project.date;

        const buttonDiv = document.createElement('div');
        buttonDiv.classList.add('mb-2');

        for (const techno of project.technologies) {
            // Créer le bouton
            const button = document.createElement('button');
            button.setAttribute('id', 'myButton');
            button.classList.add('btn', 'mr-1');
            //button.style.backgroundColor = techno.color;
            button.href = techno.url;

            //const buttonText = document.createTextNode(techno.name);
            //button.appendChild(buttonText);

            const buttonImage = document.createElement('img');
            buttonImage.setAttribute('src', 'assets/img/' + techno.image);
            //buttonImage.setAttribute('alt', 'Image de bouton');
            button.appendChild(buttonImage);

            buttonImage.style.maxHeight = '100%';
            buttonImage.style.maxWidth = '100%';

// Ajouter des styles CSS au bouton et à l'image
            button.style.display = 'inline-flex';
            button.style.alignItems = 'center';
            button.style.justifyContent = 'center';
            button.style.padding = '3.5px 7px';
            //button.style.backgroundColor = '#007bff';
            //button.style.color = '#fff';
            button.style.borderRadius = '10px';
            button.style.border = 'none';
            button.style.fontSize = '18px';
            button.style.fontWeight = 'bold';
            button.style.textAlign = 'center';
            button.style.width = '100px';
            buttonImage.style.marginRight = '10px';

            /*
            // Ajouter le bouton au DOM
            const buttonContainer = document.getElementById('button-container');
            buttonContainer.appendChild(button);

            // Changer le texte du bouton
            buttonText.textContent = 'Nouveau texte';

// Changer l'image du bouton
            buttonImage.setAttribute('src', 'nouvelle-image.png');

             */


            /*
            const btn = document.createElement('button');
            btn.type = 'button';
            btn.classList.add('btn', 'mr-1');
            btn.textContent = techno.name;
            btn.style.backgroundColor = techno.color;
            btn.href = techno.url;

            /*
            const icon = document.createElement('img');
            icon.src = button.icon;
            icon.classList.add('mr-2');
            btn.appendChild(icon);

             */

            buttonDiv.appendChild(button);
        }


        const documentationBtn = document.createElement('button');
        documentationBtn.type = 'button';
        documentationBtn.classList.add('btn', 'btn-primary', 'btn-block', 'mt-2');
        documentationBtn.textContent = 'En savoir plus';
        documentationBtn.addEventListener("click", ev => {
            window.open(project.url);
        });

        cardBody.appendChild(title);
        cardBody.appendChild(description);
        cardBody.appendChild(date);
        cardBody.appendChild(buttonDiv);
        cardBody.appendChild(documentationBtn);

        card.appendChild(img);
        card.appendChild(cardBody);

        cardContainer.appendChild(card);
    });
}

function loadVeille(articles) {
    const row = document.getElementById("articlesVeille");

    for (const article of articles) {
        let col = document.createElement("div");
        col.className = "col-md-4";

        let card = document.createElement("div");
        card.classList.add("card", "card-blog");

        let cardImage = document.createElement("div");
        cardImage.className = "card-img";

        let cardImageSource = document.createElement("a");
        let cardImageImg = document.createElement("img");
        cardImageImg.src = article.img;
        cardImageImg.alt = "";
        cardImageImg.className = "img-fluid";

        cardImageSource.appendChild(cardImageImg);
        cardImage.appendChild(cardImageSource);
        card.appendChild(cardImage);

        let cardCategoryBox = document.createElement("div");
        cardCategoryBox.className = "card-category-box";

        let cardBody = document.createElement("div");
        cardBody.className = "card-body";

        let cardCategory = document.createElement("div");
        cardCategory.className = "card-category";

        let cardCategoryTitle = document.createElement("h6");
        cardCategoryTitle.className = "category";
        cardCategoryTitle.innerText = article.category;

        cardCategory.appendChild(cardCategoryTitle);
        cardCategoryBox.appendChild(cardCategory);
        cardBody.appendChild(cardCategoryBox);

        let cardTitle = document.createElement("h3");
        cardTitle.className = "card-title";
        let cardLink = document.createElement("a");
        cardLink.href = article.url;
        cardLink.target = "_blank";
        cardLink.innerText = article.name;

        cardTitle.appendChild(cardLink);
        cardBody.appendChild(cardTitle);

        /*

        let cardDescription = document.createElement("p");
        cardDescription.className = "card-description";
        cardDescription.innerText = article.description;


        cardBody.appendChild(cardDescription);
    */

        // Ajout d'une section Résumé
        let cardSummary = document.createElement("div");
        cardSummary.className = "card-summary";
        cardSummary.innerHTML = `<h4>Résumé</h4><p>${article.summary}</p>`;

        cardBody.appendChild(cardSummary);

        // Ajout d'une section Avantages
        let cardAdvantages = document.createElement("div");
        cardAdvantages.className = "card-advantages";
        cardAdvantages.innerHTML = `<h4>Avantages</h4><ul>${article.advantages.map(advantage => `<li>${advantage}</li>`).join('')}</ul>`;

        cardBody.appendChild(cardAdvantages);

        // Ajout d'une section Inconvénients
        let cardDisadvantages = document.createElement("div");
        cardDisadvantages.className = "card-disadvantages";
        cardDisadvantages.innerHTML = `<h4>Inconvénients</h4><ul>${article.disadvantages.map(disadvantage => `<li>${disadvantage}</li>`).join('')}</ul>`;

        cardBody.appendChild(cardDisadvantages);

        // Ajout d'une section Pertinence
        let cardPertinence = document.createElement("div");
        cardPertinence.className = "card-pertinence";
        cardPertinence.innerHTML = `<h4>Pertinence</h4><p>${article.pertinence}</p>`;

        cardBody.appendChild(cardPertinence);



        card.appendChild(cardBody);

        let cardFooter = document.createElement("div");
        cardFooter.className = "card-footer";

        let postAuthor = document.createElement("div");
        postAuthor.className = "post-author";

        let authorSpan = document.createElement("span");
        authorSpan.className = "author";
        authorSpan.innerText = article.author;

        postAuthor.appendChild(authorSpan);
        cardFooter.appendChild(authorSpan);

        let postDate = document.createElement("div");
        postDate.className = "post-date";

        let postSpan = document.createElement("span");
        postSpan.classList.add("bi", "bi-clock");
        postSpan.innerText = " " + article.read_time + "min";

        postDate.appendChild(postSpan);
        cardFooter.appendChild(postDate);

        card.appendChild(cardImage);
        card.appendChild(cardBody);
        card.appendChild(cardFooter);

        col.appendChild(card);

        row.appendChild(col);
    }
}

function afficherMentionsLegales() {
    // Créer un élément div pour la popup
    var popup = document.createElement('div');

    var popupTitle = document.createElement('h1');
    var titleText = document.createTextNode('Mentions Légales');
    popupTitle.appendChild(titleText);
    popup.appendChild(popupTitle);

    // Ajouter du texte à la popup
    var texte = document.createElement('div');

    // Ajouter une partie de texte avec un intitulé
    var partie1 = document.createElement('div');
    var titre1 = document.createElement('h2');
    var texte1 = document.createTextNode('Propriétaire et éditeur du site:');
    var contenu1 = document.createTextNode('Hugo Ilarraz - hugoilarraz06@gmail.com ');
    var contenu2 = document.createTextNode('URL: violetow9.github.io');

    titre1.appendChild(texte1);
    partie1.appendChild(titre1);
    partie1.appendChild(contenu1);
    partie1.appendChild(contenu2);

    // Ajouter une partie de texte avec un intitulé
    var partie2 = document.createElement('div');
    var titre2 = document.createElement('h2');
    var texte2 = document.createTextNode('Hébergement:');
    var contenu2 = document.createTextNode('GitHub Pages (https://pages.github.com/)');
    titre2.appendChild(texte2);
    partie2.appendChild(titre2);
    partie2.appendChild(contenu2);

    var partie3 = document.createElement('div');
    var titre3 = document.createElement('h2');
    var texte3 = document.createTextNode('Propriété intellectuelle:');
    var imageBackground = document.createTextNode('Image "programmingbackground.jpg" appartient à : ');
    var contenu3 = document.createElement('a');
    contenu3.href = 'http://www.freepik.com';
    contenu3.innerText = "Designed by fullvector / Freepik";

    titre3.appendChild(texte3);
    partie3.appendChild(titre3);
    partie3.appendChild(imageBackground);
    partie3.appendChild(contenu3);


    var partie4 = document.createElement('div');
    var titre4 = document.createElement('h2');
    var texte4 = document.createTextNode('Formulaire de contact:');
    var contenu4 = document.createTextNode('Les informations recueillies sur ce formulaire sont enregistrées dans une base de données afin de pouvoir traiter votre demande. Les données sont conservées pendant une durée de 1 an et sont destinées à l\'administrateur du site. Conformément à la loi "informatique et libertés", vous pouvez exercer votre droit d\'accès aux données vous concernant et les faire rectifier en contactant l\'administrateur du site.');

    titre4.appendChild(texte4);
    partie4.appendChild(titre4);
    partie4.appendChild(contenu4);

    // Ajouter les parties de texte à l'élément texte
    texte.appendChild(partie1);
    texte.appendChild(partie2);
    texte.appendChild(partie3);
    texte.appendChild(partie4);


    // Appliquer des classes Bootstrap CSS à l'élément texte et à ses enfants
    texte.classList.add('container', 'my-5');
    partie1.classList.add('py-3');
    titre1.classList.add('mb-4');
    partie2.classList.add('py-3');
    titre2.classList.add('mb-4');

    popup.appendChild(texte);


    // Créer un bouton de fermeture pour la popup
    var boutonFermer = document.createElement('button');
    boutonFermer.classList.add('button-a', "button-big", "button-rouded");

    var texteBouton = document.createTextNode('Fermer');
    boutonFermer.appendChild(texteBouton);
    boutonFermer.style.marginTop = '10px';
    boutonFermer.addEventListener('click', function () {
        popup.style.display = 'none';
    });
    popup.appendChild(boutonFermer);

    // Appliquer du style à la popup
    popup.style.position = 'fixed';
    popup.style.top = '50%';
    popup.style.left = '50%';
    popup.style.transform = 'translate(-50%, -50%)';
    popup.style.padding = '20px';
    popup.style.background = '#fff';
    popup.style.border = '1px solid #ccc';
    popup.style.boxShadow = '0 0 10px rgba(0, 0, 0, 0.3)';
    popup.style.zIndex = '9999';

    // Ajouter la popup à la page
    document.body.appendChild(popup);
}