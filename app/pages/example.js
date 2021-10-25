const { defineComponent, ref, watch } = require('vue');
const axios = require('axios');
const { toast } = require('materialize-css');

module.exports = defineComponent({
    name: 'singleStack',
    template: `
        <main>
                <form class="row">
                    <fieldset class="input-field col s12">
                        <i class="material-icons prefix">search</i>
                        <input class="input-focus" id="icon_prefix" type="text" v-model="tech" @keypress.enter.prevent>
                        <label class="label-focus" for="icon_prefix">enter a tech for search</label>
                    </fieldset>
                    <!-- <fieldset class="col s12 row">
                        <div class="col s6">
                        <button class="btn full-btn waves-effect waves-light black" type="submit" :disabled="validateButton">
                            Start search
                            <i class="material-icons right">send</i>
                        </button>
                    </div>
                    <div class="col s6">
                        <button class="btn full-btn waves-effect waves-light red darken-4" @click="reset" :disabled="validateReset">
                            Reset search
                            <i class="material-icons right">loop</i>
                        </button>
                    </div>
                    </fieldset> -->
                </form>
                <p>{{tech}}</p>
        </main>
    `,
    setup() {
        const libraries = ref([]);
        const tech = ref('');
        
        watch([libraries, tech] ,async (newValues, prevValues) => {
            console.table([newValues, prevValues])
            /* try {
                const res = await axios.get('https://api.cdnjs.com/libraries', {
                    params: {
                        search: tech.value,
                        fields: 'version'
                    }
                });

                libraries.value = res.data.results;
            } catch (err) {
                toast({ html: err.message });
            }
            tech.value = ''; */
        });

        return {
            libraries,
            tech
        };
    }
});
