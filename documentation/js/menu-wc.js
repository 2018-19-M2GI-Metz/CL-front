'use strict';


customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">cl-front documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="overview.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>README
                            </a>
                        </li>
                        <li class="link">
                            <a href="license.html"  data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>LICENSE
                            </a>
                        </li>
                        <li class="link">
                            <a href="dependencies.html" data-type="chapter-link">
                                <span class="icon ion-ios-list"></span>Dependencies
                            </a>
                        </li>
                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-toggle="collapse" ${ isNormalMode ?
                                'data-target="#modules-links"' : 'data-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse" ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link">AppModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-AppModule-d0292d99762857d4f0424c32479eb772"' : 'data-target="#xs-components-links-module-AppModule-d0292d99762857d4f0424c32479eb772"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-AppModule-d0292d99762857d4f0424c32479eb772"' :
                                            'id="xs-components-links-module-AppModule-d0292d99762857d4f0424c32479eb772"' }>
                                            <li class="link">
                                                <a href="components/AppComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">AppComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/AppRoutingModule.html" data-type="entity-link">AppRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/GlobalModule.html" data-type="entity-link">GlobalModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-GlobalModule-a938c9938a85fbb8d37d6a51dcc330e0"' : 'data-target="#xs-components-links-module-GlobalModule-a938c9938a85fbb8d37d6a51dcc330e0"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-GlobalModule-a938c9938a85fbb8d37d6a51dcc330e0"' :
                                            'id="xs-components-links-module-GlobalModule-a938c9938a85fbb8d37d6a51dcc330e0"' }>
                                            <li class="link">
                                                <a href="components/ButtonComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ButtonComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ErreurPopUpComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ErreurPopUpComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/InputComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">InputComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/MainModule.html" data-type="entity-link">MainModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-MainModule-8a7ea798ec831d6dce8af0de9d544fda"' : 'data-target="#xs-components-links-module-MainModule-8a7ea798ec831d6dce8af0de9d544fda"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-MainModule-8a7ea798ec831d6dce8af0de9d544fda"' :
                                            'id="xs-components-links-module-MainModule-8a7ea798ec831d6dce8af0de9d544fda"' }>
                                            <li class="link">
                                                <a href="components/MainComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">MainComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/MapModule.html" data-type="entity-link">MapModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-MapModule-052240419371762ca376481e3676ad58"' : 'data-target="#xs-components-links-module-MapModule-052240419371762ca376481e3676ad58"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-MapModule-052240419371762ca376481e3676ad58"' :
                                            'id="xs-components-links-module-MapModule-052240419371762ca376481e3676ad58"' }>
                                            <li class="link">
                                                <a href="components/MapComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">MapComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/PanelModule.html" data-type="entity-link">PanelModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-PanelModule-7c8a6a0d80e23bbdf8001bf18d5d7369"' : 'data-target="#xs-components-links-module-PanelModule-7c8a6a0d80e23bbdf8001bf18d5d7369"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-PanelModule-7c8a6a0d80e23bbdf8001bf18d5d7369"' :
                                            'id="xs-components-links-module-PanelModule-7c8a6a0d80e23bbdf8001bf18d5d7369"' }>
                                            <li class="link">
                                                <a href="components/GpsComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">GpsComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/PanelComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">PanelComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/TspComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">TspComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/PanelRoutingModule.html" data-type="entity-link">PanelRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/PipesModule.html" data-type="entity-link">PipesModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#pipes-links-module-PipesModule-48542a1b9e576b1420e88375cc8ef7a7"' : 'data-target="#xs-pipes-links-module-PipesModule-48542a1b9e576b1420e88375cc8ef7a7"' }>
                                            <span class="icon ion-md-add"></span>
                                            <span>Pipes</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="pipes-links-module-PipesModule-48542a1b9e576b1420e88375cc8ef7a7"' :
                                            'id="xs-pipes-links-module-PipesModule-48542a1b9e576b1420e88375cc8ef7a7"' }>
                                            <li class="link">
                                                <a href="pipes/CapitalizePipe.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">CapitalizePipe</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                </ul>
                </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#classes-links"' :
                            'data-target="#xs-classes-links"' }>
                            <span class="icon ion-ios-paper"></span>
                            <span>Classes</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse" ${ isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"' }>
                            <li class="link">
                                <a href="classes/FormPanelUtils.html" data-type="entity-link">FormPanelUtils</a>
                            </li>
                            <li class="link">
                                <a href="classes/Log.html" data-type="entity-link">Log</a>
                            </li>
                            <li class="link">
                                <a href="classes/Path.html" data-type="entity-link">Path</a>
                            </li>
                            <li class="link">
                                <a href="classes/Place.html" data-type="entity-link">Place</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#injectables-links"' :
                                'data-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/DrawerService.html" data-type="entity-link">DrawerService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/HttpService.html" data-type="entity-link">HttpService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/LogService.html" data-type="entity-link">LogService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/MapDataService.html" data-type="entity-link">MapDataService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/UserLocationService.html" data-type="entity-link">UserLocationService</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#interceptors-links"' :
                            'data-target="#xs-interceptors-links"' }>
                            <span class="icon ion-ios-swap"></span>
                            <span>Interceptors</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse" ${ isNormalMode ? 'id="interceptors-links"' : 'id="xs-interceptors-links"' }>
                            <li class="link">
                                <a href="interceptors/EmptyBackendInterceptor.html" data-type="entity-link">EmptyBackendInterceptor</a>
                            </li>
                            <li class="link">
                                <a href="interceptors/MockBackendInterceptor.html" data-type="entity-link">MockBackendInterceptor</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#interfaces-links"' :
                            'data-target="#xs-interfaces-links"' }>
                            <span class="icon ion-md-information-circle-outline"></span>
                            <span>Interfaces</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse" ${ isNormalMode ? ' id="interfaces-links"' : 'id="xs-interfaces-links"' }>
                            <li class="link">
                                <a href="interfaces/IApiRest.html" data-type="entity-link">IApiRest</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#miscellaneous-links"'
                            : 'data-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse" ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/functions.html" data-type="entity-link">Functions</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <a data-type="chapter-link" href="routes.html"><span class="icon ion-ios-git-branch"></span>Routes</a>
                        </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});