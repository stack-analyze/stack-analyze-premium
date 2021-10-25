// modules
const { defineComponent, ref, computed } = require('vue');
const axios = require('axios');
const { toast } = require('materialize-css');

module.exports = defineComponent({
    name: 'DeezerSearch',
    template: `
        <main class="row">
            <section class="col s12">
                <form class="row" @submit.prevent="deezerSearch">
                    <fieldset class="input-field col s12">
                        <i class="material-icons prefix">audiotrack</i>
                        <input class="input-focus" id="icon_prefix" type="text" v-model="deezer" @keypress.enter.prevent>
                        <label class="label-focus" for="icon_prefix">enter a artist or album for search</label>
                    </fieldset>
                    <fieldset class="col s12 row">
                        <div class="col s6">
                            <button class="btn full-btn waves-effect waves-light black" type="submit">  
                                Start Deezer album search
                                <i class="material-icons right">send</i>
                            </button>
                            </div>
                            <div class="col s6">
                                <button class="btn full-btn waves-effect waves-light red darken-4" @click="reset" :disabled="validateReset">
                                    Reset search
                                    <i class="material-icons right">loop</i>
                                </button>
                            </div>
                    </fieldset>
                </form>
            </section>
            <section class="col s12 scroll collections">
                <article class="col s4" v-for="result of deezerResults" :key="result.id">
                    <div class="card large">
                        <figure class="card-image">
                            <img :src="result.cover_medium" :alt="result.title">
                        </figure>
                        <div class="card-content">
                            <h2 class="card-title flow-text">{{result.artist.name}}</h2>
                            <strong>{{result.title}}</strong> <br>
                            <var>total tracks = {{result.nb_tracks}}</var>
                        </div>
                    </div>
                </article>
            </section>
        </main>
    `,
    setup() {
        const deezer = ref('');
        const deezerResults = ref([]);

        const validateReset = computed(() => (deezerResults.value[0] === undefined ? true : false));

        const deezerSearch = async (e) => {
            try {
                const res = await axios.get('https://api.deezer.com/search/album', {
                    params: {
                        q: deezer.value
                    }
                });

                deezerResults.value = res.data.data;

                if (res.data.total === 0) {
                    toast({html: 'not found'}); 
                }
            } catch (err) {
                toast({html: err.message});
            }
            deezer.value = '';
            e.target.reset();
        };

        const reset = () => (deezerResults.value = []);

        return {
            deezer,
            deezerResults,
            validateReset,
            deezerSearch,
            reset
        };
    }
});

