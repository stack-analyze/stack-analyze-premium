// modules
const { ref, onMounted, defineComponent } = require('vue');
const { toast } = require('materialize-css');
const { FastAPI } = require('fast-api-speedtest');

// component
module.exports = defineComponent({
    name: 'Speedtest',
    template: `
        <div :class="[open ? 'loader' : '']"></div>
        <main class="row">
            <section class="col s12 mt">
                <button 
                    class="btn full-btn waves-effect waves-light black" 
                    @click="open = !open; speed();"
                >
                    <i class="material-icons right">loop</i>
                    restart speed
                </button>
            </section>
            <transition name="fade">
            <section class="col s4 offset-s4 mt" v-if='open'>
                <article class="card">
                    <strong class="card-title center">Result speedtest</strong>
                    <div class="card-content">
                        <p>
                            Download speed: 
                            {{results.downloadSpeed}} 
                            {{results.downloadUnit}}
                            <i class="Large material-icons right red-text">arrow_downward</i>
                        </p><hr>
                        <p>
                            Ping: 
                            {{results.ping}} 
                            {{results.pingUnit}}
                            <i class="Large material-icons right">perm_data_setting</i>
                        </p><hr>
                        <p>
                            Upload speed: 
                            {{results.uploadSpeed}} 
                            {{results.uploadUnit}}
                            <i class="Large material-icons right green-text">arrow_upward</i>
                        </p>
                    </div>
                </article>
            </section>
            </transition>
        </main>
    `,
    setup() {
        // state
        const results = ref({});
        const open = ref(false);

        // init module
        const FastTest = new FastAPI({
            measureUpload: true,
            timeout: 60000 // 60000ms === 1min
        });

        // function
        const speed = async () => {
            try {
                results.value = await FastTest.runTest();
                open.value = true;
            } catch (err) {
                toast({html: err.message });
            }
        };
        
        // mounted
        onMounted(() =>{
            speed();
        });

        return {
            results,
            speed,
            open
        };
    }
});
