// modules
const { defineComponent, reactive, computed } = require('vue');
const validator = require('html-validator');
const { toast } = require('materialize-css');

const regex = require('../scripts/regex');

module.exports = defineComponent({
    name: 'html-validator',
    template: `
            <main class="row">
            <section class="col s12">
                <form class="row" @submit.prevent="validateHTML">
                    <fieldset class="input-field col s12">
                        <i class="material-icons prefix">laptop</i>
                        <input id="icon_prefix" type="url" v-model="stack.website" @keypress.enter.prevent>
                        <label for="icon_prefix">enter a url</label>
                    </fieldset>
                    <fieldset class="col s12 row">
                        <div class="col s6">
                        <button class="btn full-btn waves-effect waves-light black" type="submit" :disabled="validateButton">
                            Start validator
                            <i class="material-icons right">send</i>
                        </button>
                    </div>
                    <div class="col s6">
                        <button class="btn full-btn waves-effect waves-light red darken-4" @click="reset" :disabled="validateReset">
                            Reset validator
                            <i class="material-icons right">loop</i>
                        </button>
                    </div>
                    </fieldset>
                </form>
            </section>
            <section class="col s12 content scroll" >
                <article v-for="(result, i) of stack.results" :key="i" class="result">
                    <strong>
                        From the line {{result.lastLine}}, column {{result.firstColumn}}; to line {{result.lastLine}}, column {{result.lastColumn}}:
                    </strong>
                    <pre :class="result.type === 'error' ? 'red' : 'yellow'">
                        <code class="code">
                            {{result.extract}}
                        </code>
                    </pre>
                    <em>{{result.message}}</em>
                </article>
            </section>
        </main>
    `,
    setup() {
        const stack = reactive({
            website: '',
            results: []
        });

        async function validateHTML(e) {
            try {
                const res = await validator({
                    url: stack.website,
                    // validator: 'http://html5.validator.nu',
                    format: 'json'
                });
                res.messages.length === 0 
                    ? (toast({ html: `the website ${stack.website} is clean code` })) 
                    : (stack.results = res.messages);
            } catch (err) {
                toast({ html: err });
            }
            stack.website = '';
            e.target.reset();
        }

        const reset = () => (stack.results = []);

        const validateReset = computed(() => (stack.results[0] === undefined ? true : false));

        const validateButton = computed(() => (stack.website.match(regex) ? false : true));

        return {
            stack,
            validateHTML,
            reset,
            validateReset,
            validateButton
        };
    }
});
