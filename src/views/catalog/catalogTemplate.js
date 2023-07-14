import { html } from '../../../node_modules/lit-html/lit-html.js';


export const catalogPageTemplate = (searchHandler, recipes,detailedRecipes, toggleCard, goToEdit) => html`
<section id="catalog">
    <div>
        <input type="text" @change=${searchHandler}>
    </div>
    ${recipes.map(r => detailedRecipes[r._id] === undefined
        ? recipePreviewTemplate(r, toggleCard)
        : recipeCardTemplate(detailedRecipes[r._id], goToEdit)
    )}
</section>`;

let recipePreviewTemplate = (recipe, toggleCard) => html`
<article class="preview" @click=${() => toggleCard(recipe._id)}>
    <div class="title">
        <h2>${recipe.name}</h2>
    </div>
    <div class="small">
        <img src=${recipe.img}>
    </div>
</article>`;

// Add edit button functionality
let recipeCardTemplate = (recipe,goToEdit) => html`
<article>
    <h2>${recipe.name}</h2>
    <div class="band">
        <div class="thumb">
            <img src=${recipe.img}>
        </div>
        <div class="ingredients">
            <h3>Ingredients:</h3>
            <ul>
                ${recipe.ingredients.map(i => html`<li>${i}</li>`)}
            </ul>
        </div>
    </div>
    <div class="description">
        <h3>Preparation:</h3>
        ${recipe.steps.map(s => html`<p>${s}</p>`)}
    </div>
    <button @click=${(e) =>goToEdit(recipe.id)}> Edit</button>
</article>`;
