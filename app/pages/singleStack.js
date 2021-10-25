// single stack page
const { defineComponent, reactive, computed } = require('vue');
const Wappalyzer = require('wappalyzer');
const { toast } = require('materialize-css');

const regex = require('../scripts/regex');
const openWeb = require('../scripts/openShell');

module.exports = defineComponent({
    name: 'singleStack',
    template: `
        <main class="row">
            <section class="col s12">
                <form class="row" @submit.prevent="singleStack">
                    <fieldset class="input-field col s12">
                        <i class="material-icons prefix">laptop</i>
                        <input class="input-focus" id="icon_prefix" type="url" v-model="stack.website" @keypress.enter.prevent>
                        <label class="label-focus" for="icon_prefix">enter a url</label>
                    </fieldset>
                    <fieldset class="col s12 row">
                        <div class="col s6">
                        <button class="btn full-btn waves-effect waves-light black" type="submit" :disabled="validateButton">
                            Start analyze
                            <i class="material-icons right">send</i>
                        </button>
                    </div>
                    <div class="col s6">
                        <button class="btn full-btn waves-effect waves-light red darken-4" @click="reset" :disabled="validateReset">
                            Reset analyze
                            <i class="material-icons right">loop</i>
                        </button>
                    </div>
                    </fieldset>
                </form>
            </section>
            <section class="col s12 scroll collections">
                    <article class="col s4" v-for="app of stack.apps" :key="app.slug">
                        <div class="card medium sticky-action">
                            <figure class="card-image">
                                <img class="logo" :src="'logos/'+app.icon" :alt="app.name">
                            </figure>
                            <div class="card-content">
                                <h2 class="card-title activator">
                                  {{app.name}}
                                  <i class="material-icons right">more_vert</i>
                                </h2>
                            </div>
                            <div class="card-reveal">
                                  <span class="card-title grey-text text-darken-4">
                                    Info<i class="material-icons right">close</i>
                                  </span>
                                  <p>
                                    Categories: {{
                                        app.categories
                                            .map((categorie) => categorie.name)
                                            .join(", ")
                                    }}
                                </p>
                            </div>
                            <div class="card-action">
                            	<a class="blue-text" :href="app.website" target="_blank" @click="openWeb">
                                    {{app.name}} website
                                </a>
                            </div>
                        </div>
                    </article>
            </section>
        </main>
    `,
    setup() {
        const stack = reactive({
            website: '',
            apps: []
        });

        async function singleStack(e) {
            const wappalyzer = new Wappalyzer();
            try {
                await wappalyzer.init();

                const { technologies } = await wappalyzer.open(stack.website).analyze();
                stack.apps = technologies;
            } catch (err) {
                toast({ html: err });
            }
            await wappalyzer.destroy();
            stack.website = '';
            e.target.reset();
        }

        const reset = () => (stack.apps = []);
        
        const validateReset = computed(() => (stack.apps[0] === undefined ? true : false));

        const validateButton = computed(() => (stack.website.match(regex) ? false : true));

        return {
            stack,
            singleStack,
            openWeb,
            reset,
            validateButton,
            validateReset
        };
    }
});
