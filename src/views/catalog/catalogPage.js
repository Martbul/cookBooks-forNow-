
export class CatalogPage {
    constructor(recipeService, templateFuction, renderHandler, navigate, modelService) {
        this.recipeService = recipeService;
        this.templateFuction = templateFuction;
        this.renderHandler = renderHandler;
        this.navigate = navigate;
        this.modalService = modelService
        this.detailedRecipes = {}
        this.recipes = [];
        this.showCatalog = this._showCatalog.bind(this)
        this.toggleCard = this._toggleCard.bind(this)
        this.searchHandler = this._searchHandler.bind(this)
    }
    async _showCatalog(ctx) {
        let queryParams = ctx.querystring
        .split('&')
        .map(x => x.split('='))
        let queryObj = queryParams.reduce((a,c) =>{
            a[c[0]] = c[1]
            return a;
        }, {})


        if(ctx.querystring){
            this.recipes = await this.recipesService.getRecipesBySearchQuery(queryObj);
        }else{
            this.recipes = await this.recipeService.getRecipesWithSelectedColumns(['_id', 'name', 'img']);

        }



        let template = this.templateFuction( this.searchHandler,this.recipes, this.detailedRecipes, this.toggleCard, this.goToEdit);
        this.renderHandler(template)   

            //let result = await this.modalService.showModal('Are you sure you want to delete this item')  (za modala, prosta za paginationa trqbva da go skriq, inache raboti(hope))
    }

    _searchHandler(e){
        let element = e.target
        let value = element.value
        this.navigate(`/?name=${value}`)
    } 

    async _toggleCard(id) {
        // if (this.detailedRecipes[id] === undefined) {
        //     let recipe = await this.recipeService.getRecipeById(id)
        //     this.detailedRecipes[id] = recipe
        // }
        // let template = this.templateFuction(this.recipes, this.detailedRecipes, this.toggleCard, this.goToEdit);
        // this.renderHandler(template)

        this.navigate(`/details/${id}`)
    }

    
}

