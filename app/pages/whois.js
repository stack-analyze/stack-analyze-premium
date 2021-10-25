// modules
const { defineComponent, reactive, computed } = require('vue');
const whois = require('whois-light');
const { toast } = require('materialize-css');

const regex = require('../scripts/regex');

module.exports = defineComponent({
    name: 'whois',
    template: `
            <main class="row">
            <section class="col s12">
                <form class="row" @submit.prevent="whoisInfo">
                    <fieldset class="input-field col s12">
                        <i class="material-icons prefix">laptop</i>
                        <input id="icon_prefix" type="text" v-model="stack.website" @keypress.enter.prevent>
                        <label for="icon_prefix">enter a url</label>
                    </fieldset>
                    <fieldset class="col s12 row">
                        <div class="col s6">
                        <button class="btn full-btn waves-effect waves-light black" type="submit" :disabled="validateButton">
                            Start whois
                            <i class="material-icons right">send</i>
                        </button>
                    </div>
                    <div class="col s6">
                        <button class="btn full-btn waves-effect waves-light red darken-4" @click="reset" :disabled="validateReset">
                            Reset whois
                            <i class="material-icons right">loop</i>
                        </button>
                    </div>
                    </fieldset>
                </form>
            </section>
            <section class="col s12 content scroll" >
                <pre class="code">{{stack.results}}</pre>
            </section>
        </main>
    `,
    setup() {
        const stack = reactive({
            website: '',
            results: ''
        });

        async function whoisInfo(e) {
            try {
                const data = await whois.lookup(stack.website);
                stack.results = data;
            } catch (err) {
                toast({ html: err });
            }
            stack.website = '';
            e.target.reset();
        }

        const reset = () => (stack.results = '');

        const validateReset = computed(() => (stack.results === '' ? true : false));

        const validateButton = computed(() => (stack.website.match(regex) ? false : true));

        return {
            stack,
            whoisInfo,
            reset,
            validateReset,
            validateButton
        };
    }
});
