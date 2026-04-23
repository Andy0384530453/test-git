import fs from "fs";
import { articles } from "./data.js";
import { layout } from "./layout.js";
import { slugify, truncate, countWords, escapeHTML } from "./stringUtils.js";


function generateStatsPage(data) {

    const totalWords = data.reduce((acc, article) => {
        return acc + countWords(article.content);
    }, 0);

    const avgWords = data.length === 0 ? 0 : Math.round(totalWords / data.length);

    const nbrArticles = data.length;

    const authorCount = {};

    data.forEach(article => {
        if (authorCount[article.author]) {
            authorCount[article.author]++;
        } else {
            authorCount[article.author] = 1;
        }
    });

    let topAuthor = "";
    let max = 0;

    for (let author in authorCount) {
        if (authorCount[author] > max) {
            max = authorCount[author];
            topAuthor = author;
        }
    }

    const body = `
    <h1>Analyse du Blog</h1>

    <div class="stats-box">
      <div class="stat-item"><strong>${nbrArticles}</strong><br>Articles</div>
      <div class="stat-item"><strong>${totalWords}</strong><br>Mots au total</div>
      <div class="stat-item"><strong>${avgWords}</strong><br>Mots / article</div>
      <div class="stat-item"><strong>${topAuthor}</strong><br>Auteur principal</div>
    </div>
  `;

    return layout("Statistiques", body);
}


function generateArchivesPage(data) {

    const list = data.map(article => `
    <li>
      <strong>${article.date}</strong> :
      <a href="${slugify(article.title)}.html">
        ${escapeHTML(article.title)}
      </a>
      (${countWords(article.content)} mots)
    </li>
  `).join("");

    return layout("Archives", `
    <h1>Tous les articles</h1>
    <ul>${list}</ul>
  `);
}


export const build = () => {

    const dist = "./dist";

    if (!fs.existsSync(dist)) {
        fs.mkdirSync(dist);
    }

    const indexBody = `
    <h1>Dernières publications</h1>

    ${articles.map(article => `
      <div class="card">
        <h2>${escapeHTML(article.title)}</h2>
        <p>${truncate(article.content, 100)}</p>
        <a href="${slugify(article.title)}.html">Lire</a>
      </div>
    `).join("")}
  `;

    fs.writeFileSync(`${dist}/index.html`, layout("Accueil", indexBody));
    fs.writeFileSync(`${dist}/archives.html`, generateArchivesPage(articles));


    fs.writeFileSync(`${dist}/stats.html`, generateStatsPage(articles));
    fs.writeFileSync(
        `${dist}/a-propos.html`,
        layout("À Propos", `
      <h1>À propos</h1>
      <p>Node.js project généré automatiquement</p>
    `)
    );

    articles.forEach(article => {

        const page = `
      <img src="data:image/png;base64,${article.image}" style="width:100%">
      <h1>${escapeHTML(article.title)}</h1>
      <p><em>${article.author} - ${article.date}</em></p>
      <div>${escapeHTML(article.content)}</div>
    `;

        fs.writeFileSync(
            `${dist}/${slugify(article.title)}.html`,
            layout(article.title, page)
        );
    });

};