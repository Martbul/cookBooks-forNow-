import * as recipeService from '../../services/recipeService.js';

export class DetailsPage {
    constructor(recipeService, templateFuction, renderHandler, navigate) {
        this.recipeService = recipeService;
        this.templateFuction = templateFuction;
        this.renderHandler = renderHandler;
        this.navigate = navigate;
        this.showDetails = this._showDetails.bind(this)
        this.goToEdit = this._goToEdit.bind(this)
    }
    async _showDetails(ctx) {
        let id = ctx.params.id
        let recipe = await this.recipeService.getRecipeById(id)

        let template = this.templateFuction(recipe, this.goToEdit);
        this.renderHandler(template)
    }

    async _goToEdit(id) {

        let path = `/editRecipe/${id}`
        this.navigate(path)
    }
}

