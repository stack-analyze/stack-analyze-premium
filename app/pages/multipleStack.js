// single stack page
const { defineComponent, reactive, computed } = require('vue');
const Wappalyzer = require('wappalyzer');
const { toast } = require('materialize-css');

const regex = require('../scripts/regex');
const openWeb = require('../scripts/openShell');

module.exports = defineComponent({
    name: 'singleStack',
    template: `
        <main>
            <form class="row" @submit.prevent="multipleStack">
                <fieldset class="col s12 row">
                    <div class="input-field col s6">
                    	<i class="material-icons prefix">laptop</i>
                    	<input id="icon_primary" type="url" class="validate" v-model="stack.urlPrimary" @keypress.enter.prevent>
                    	<label for="icon_primary">enter a url 1</label>
                    </div>
                    <div class="input-field col s6">
                    	<i class="material-icons prefix">laptop_chromebook</i>
                    	<input id="icon_secondary" type="url" class="validate" v-model="stack.urlSecondary" @keypress.enter.prevent>
                    	<label for="icon_secondary">enter a url 2</label>
                    </div>
                </fieldset>
                <fieldset class="col s12 row">
                        <div class="col s6">
                        <button class="btn full-btn waves-effect waves-light black" type="submit" :disabled="validateButton">
                            Start multiple analyze
                            <i class="material-icons right">send</i>
                        </button>
                    </div>
                    <div class="col s6">
                        <button class="btn full-btn waves-effect waves-light red darken-4" @click="reset" :disabled="validateReset">
                            Reset multiple analyze
                            <i class="material-icons right">loop</i>
                        </button>
                    </div>
                    </fieldset>
            </form>
            <section class="col s12 row">
                    <article class="col s6" v-for="(apps, i) of stack.apps" :key="i+1">
                    <ul class="collection with-header">
                    	<li class="collection-header">
                    		<h2 class="flow-text">{{apps.url}}</h2>
                    	</li>
                    	<li class="collection-item">
                    	<ul class="scroll multi-collections">
                    	<li class="collection-item avatar" v-for="tech of apps.technologies" :key="tech.slug">
                    		<img class="circle" :src="'logos/'+tech.icon">
                    		<strong class="title">{{tech.name}}</strong>
                    		<p>Categories:
                                    {{
                                        tech.categories
                                            .map((categorie) => categorie.name)
                                            .join(", ")
                                    }}
                                </p>
                                <a :href="tech.website" target="_blank" @click="openWeb">go to website</a>
                    	</li>
                    	</ul>
                    	</li>
                    </ul>
                    </article>
            </section>
        </main>
    `,
    setup() {
        const stack = reactive({
            urlPrimary: '',
            urlSecondary: '',
            apps: []
        });

        async function multipleStack(e) {
            const wappalyzer = new Wappalyzer();
            try {
                await wappalyzer.init();
                
                const urls = [ stack.urlPrimary, stack.urlSecondary ];
                stack.apps = await Promise.all(
                    urls.map(async (url) => {
                        const { technologies } = await wappalyzer.open(url).analyze();
                        return {
                            url,
                            technologies
                        };
                    })
                );
            } catch (err) {
                toast({ html: err });
            }
            await wappalyzer.destroy();
            stack.urlPrimary = '';
            stack.urlSecondary = '';
            e.target.reset();
        }

        const reset = () => (stack.apps = []);

        const validateButton = computed(() => (stack.urlPrimary.match(regex) && stack.urlSecondary.match(regex) ? false : true));
        const validateReset = computed(() => (stack.apps[0] === undefined ? true : false));

        return {
            stack,
            multipleStack,
            openWeb,
            reset,
            validateButton,
            validateReset
        };
    }
});