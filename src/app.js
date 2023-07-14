import page from '../node_modules/page/page.mjs'
import { html , render } from '../node_modules/lit-html/lit-html.js'

import { AuthService} from "./services/authService.js";
import { showEditPage } from "./views/editRecipePage.js";
import { LoginPage } from './views/login/loginPage.js';
import { showCreateRecipe } from './views/createRecipePage.js';
import { catalogPageTemplate } from './views/catalog/catalogTemplate.js';
import { CatalogPage } from './views/catalog/catalogPage.js';
import { RecipeService } from './services/recipeService.js';
import { AuthDataService } from './services/authDataService.js';
import { loginTemplate } from './views/login/loginTemplate.js';
import { navTemplate } from './views/nav/navTemplate.js';
import {Nav} from './views/nav/nav.js';
import { DetailsPage } from './views/details/datailsPage.js';
import { detailsTemplate } from './views/details/detailsTemplate.js';
import { registerTemplate } from './views/register/registerTemplate.js';
import { RegisterPage } from './views/register/registerPage.js';
import { Modal } from './views/modal/modal.js';


const main = document.querySelector('main');
const navElement = document.querySelector('nav');
const modalElement = document.querySelector('modal');

let baseUrl = 'http://localhost:3030'

//Render Handler
let renderBody = (template) => render(template, main)
let renderNav = (template) => render(template,navElement)
let renderModal = (template) => render(template,modalElement)

//Services
const authDataService = new AuthDataService();
const authService = new AuthService(baseUrl, authDataService)
const recipeService = new RecipeService(baseUrl, authDataService)
const modalService = new Modal(renderModal)

//Component
let catalogPage = new CatalogPage(recipeService,catalogPageTemplate, renderBody, page.show, modalService)
let loginPage = new LoginPage(authService, loginTemplate, renderBody, page.show)
let navView = new Nav(authService, page.redirect, navTemplate,renderNav)
let detailsPage = new DetailsPage(recipeService,detailsTemplate, renderBody, page.show)
let registerPage = new RegisterPage(authService, registerTemplate, renderBody,page.show)


page('/index.html', '/');

page(navView.showNavigation)

page('/' ,  catalogPage.showCatalog)
page('/details/:id' ,  detailsPage.showDetails)
page('/createRecipe' ,  showCreateRecipe)
page('/editRecipe/:id' ,  showEditPage)
page('/login' ,  loginPage.showLogin)
page('/register'  ,  registerPage.showRegister)
page.start()

