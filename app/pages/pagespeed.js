// single stack page
const { defineComponent, ref, reactive, computed } = require('vue');
const axios = require('axios');
const { toast } = require('materialize-css');

const regex = require('../scripts/regex');

module.exports = defineComponent({
    name: 'singleStack',
    template: `
        <main class="row">
            <section class="col s12">
                <form class="row" @submit.prevent="pagespeedAnalyze">
                    <fieldset class="input-field col s12">
                        <i class="material-icons prefix">laptop</i>
                        <input id="icon_prefix" type="url" v-model="stack.website" @keypress.enter.prevent>
                        <label for="icon_prefix">enter a url</label>
                    </fieldset>
                    <fieldset class="col s12 row">
                        <div class="col s6">
                        <button 
                            class="btn full-btn waves-effect waves-light black" 
                            type="submit" 
                            :disabled="validateButton"
                        >
                            Start pagespeed
                            <i class="material-icons right">send</i>
                        </button>
                    </div>
                    <div class="col s6">
                        <button 
                            class="btn full-btn waves-effect waves-light red darken-4"
                            @click="reset" 
                            :disabled="validateReset"
                        >
                            Reset pagespeed
                            <i class="material-icons right">loop</i>
                        </button>
                    </div>
                    </fieldset>
                </form>
            </section>
            
            <section class="col s12 row">
                <article class="col s6">
                    <div class="card medium">
                        <h2 class="card-title center" v-if="webDesktop === ''">
                             no desktop website info
                        </h2>
                        <h2 class="card-title center" v-else>{{webDesktop}}</h2>
                        <div class="card-content center">
                            <progress 
                                max="100" 
                                :value="stack.desktop" 
                                :class="['loader', 'circle', stack.colorDesktop]"
                            >
                            </progress>
                        </div>
                    </div>
                </article>
                <article class="col s6">
                    <div class="card medium">
                        <h2 class="card-title center" v-if="webMobile === ''">
                             no mobile website info
                        </h2>
                        <h2 class="card-title center" v-else>{{webMobile}}</h2>
                        <div class="card-content center">
                            <progress 
                                max="100" 
                                :value="stack.mobile" 
                                :class="['loader', 'circle', stack.colorMobile]"
                            >
                            </progress>
                        </div>
                    </div>
                </article>
            </section>
        </main>
    `,
    setup() {
        const stack = reactive({
            website: '',
            mobile: 0,
            desktop: 0,
            colorDesktop: 'default',
            colorMobile: 'default',
        });

        const webDesktop = ref('');
        const webMobile = ref('');

        async function pagespeedAnalyze(e) {
            try {
                const mobileRes = await axios.get("https://www.googleapis.com/pagespeedonline/v5/runPagespeed", {
                    params: {
                        url: stack.website,
                        key: "AIzaSyBEDaW4FxSZ2s1vz5CdD5Ai6PGZGdAzij0",
                        strategy: "mobile"
                    }
                });
                const desktopRes = await axios.get("https://www.googleapis.com/pagespeedonline/v5/runPagespeed", {
                    params: {
                        url: stack.website,
                        key: "AIzaSyBEDaW4FxSZ2s1vz5CdD5Ai6PGZGdAzij0",
                        strategy: "desktop"
                    }
                });

                stack.mobile = Math.round(mobileRes.data.lighthouseResult.categories.performance.score * 100);
                stack.desktop = Math.round(desktopRes.data.lighthouseResult.categories.performance.score * 100);

                webDesktop.value = desktopRes.data.lighthouseResult.finalUrl;
                webMobile.value = mobileRes.data.lighthouseResult.finalUrl;

                switch (true) {
                    case (stack.desktop === 1 || stack.desktop <= 49):
                        stack.colorDesktop = 'bad';
                        break;
                    case (stack.desktop === 50 || stack.desktop <= 89):
                        stack.colorDesktop = 'regular';
                        break;
                    default:
                        stack.colorDesktop = 'good';
                        break;
                }
                switch (true) {
                    case (stack.mobile === 1 || stack.mobile <= 49):
                        stack.colorMobile = 'bad';
                        break;
                    case (stack.mobile === 50 || stack.mobile <= 89):
                        stack.colorMobile = 'regular';
                        break;
                    default:
                        stack.colorMobile = 'good';
                        break;
                }
            } catch (err) {
                toast({ html: err });
            }
            stack.website = '';
            e.target.reset();
        }

        const reset = () => {
            stack.mobile = 0;
            stack.desktop = 0;
            stack.colorDesktop = 'default';
            stack.colorMobile = 'default';
            webDesktop.value = '';
            webMobile.value = '';
        };

        const validateReset = computed(() => (stack.mobile === 0 && stack.desktop === 0 ? true : false));

        const validateButton = computed(() => (stack.website.match(regex) ? false : true));

        return {
            stack,
            pagespeedAnalyze,
            reset,
            validateButton,
            validateReset,
            webDesktop,
            webMobile
        };
    }
});
