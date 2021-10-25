// modules
const { defineComponent, ref, computed, watchEffect } = require('vue');
const axios = require('axios');
const { toast } = require('materialize-css');

module.exports = defineComponent({
    name: 'cdnjs services',
    template: `
        <main class="row">
            <section class="col s12">
                <article class="input-field">
                      <textarea class="materialize-textarea" id="textarea1" v-model="tech" @keypress.enter.prevent>
                      </textarea>
                      <label for="textarea1">enter a search library</label>
                </article>
            </section>
            <section class="col s12 fixed-librarie scroll">
               <article class="col s3" v-for="(library, i) of libraries" :key="i">
                   <div class="card">
                        <strong class="card-title">{{library.name}}</strong>
                        <div class="card-content">
                            <cite>license: {{library.license}}</cite> <br>
                            <em>version: {{library.version}}</em>
                            <button
                                class="waves-effect waves-light btn black"
                                v-if="canCopy"
                                @click="copyLink(library.latest)"
                            >
                                copy link
                                <i class="material-icons left">content_copy</i>
                            </button>
                        </div>
                   </div>
               </article>
            </section>
        </main>
    `,
    setup() {
        const libraries = ref([]);
        const tech = ref('');
        const canCopy = ref(!!navigator.clipboard);

        watchEffect(async () => {
            try {
                if (tech.value !== '') {
                    const res = await axios.get('https://api.cdnjs.com/libraries', {
                        params: {
                            search: tech.value,
                            fields: 'version'
                        }
                    });

                    libraries.value = res.data.results;
                } else {
                    toast({ html: 'results is null please search'});
                    libraries.value = [];
                }
            } catch (err) {
                toast({ html: err.message });
            }
        });

        async function copyLink(link) {
            await navigator.clipboard.writeText(link);
            toast({ html: 'Copied' });
        }

        return {
            libraries,
            tech,
            canCopy,
            copyLink,
        };
    }
});
