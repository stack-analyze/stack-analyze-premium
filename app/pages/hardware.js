// modules
const { ref, defineComponent, onMounted } = require('vue');
const { toast } = require('materialize-css');
const {
    cpu,
    mem,
    diskLayout,
    graphics,
    osInfo,
    bios,
    baseboard
} = require("systeminformation");

// component
module.exports = defineComponent({
    name: 'HardwareInformation',
    template: `
        <main class="row">
            <section class="col s12">
                <ul class="tabs black-text">
                    <li class="tab col s2">
                        <a :class="[ activeTabs === 1 ? 'active' : '']" @click="activeTabs = 1">
                            Main info
                        </a>
                    </li>
                    <li class="tab col s2">
                        <a :class="[ activeTabs === 2 ? 'active' : '']" @click="activeTabs = 2">
                            Disk Info
                        </a>
                    </li>
                    <li class="tab col s3">
                        <a :class="[ activeTabs === 3 ? 'active' : '']" @click="activeTabs = 3">
                            Controller Info
                        </a>
                    </li>
                    <li class="tab col s3">
                        <a :class="[ activeTabs === 4 ? 'active' : '']" @click="activeTabs = 4">
                            Display Info
                        </a>
                    </li>
                    <li class="tab col s2">
                        <a :class="[ activeTabs === 5 ? 'active' : '']" @click="activeTabs = 5">
                            Bios Info
                        </a>
                    </li>
                </ul>
            </section>
            <section class="col s12" v-if="activeTabs === 1">
                <article>
                    <h2>Main Info</h2>
                </article>
                <article class="col s4">
                    <div class="card small">
                        <div class="card-content">
                            <strong class="card-title">CPU Info</strong>
                            <ul>
                                <li>manufacturer: {{cpuInfo.manufacturer}}</li>
                                <li>brand: {{cpuInfo.brand}}</li>
                                <li>speedMin: {{cpuInfo.speed}} GHz</li>
                                <li>cores: {{cpuInfo.cores}}</li>
                                <li>physicalCores: {{cpuInfo.physicalCores}}</li>
                                <li>processors: {{cpuInfo.processors}}</li>
                                <li>vendor: {{cpuInfo.vendor}}</li>
                                <li>family: {{cpuInfo.family}}</li>
                                <li>model: {{cpuInfo.model}}</li>
                            </ul>
                        </div>
                    </div>
                </article>
                <article class="col s4">
                    <div class="card small">
                        <div class="card-content">
                            <strong class="card-title">RAM Info</strong>
                            <ul>
                                <li>total: {{(ramInfo.total / 1073741824).toFixed(2)}} GB</li>
                                <li>free: {{(ramInfo.free / 1073741824).toFixed(2)}} GB</li>
                                <li>used: {{(ramInfo.used / 1073741824).toFixed(2)}} GB</li>
                                <li>active: {{(ramInfo.active / 1073741824).toFixed(2)}} GB</li>
                                <li>available: {{(ramInfo.available / 1073741824).toFixed(2)}} GB</li>
                            </ul>
                        </div>
                    </div>
                </article>
                <article class="col s4">
                    <div class="card small">
                        <div class="card-content">
                            <strong class="card-title">OS Info</strong>
                            <ul>
                                <li>hostname: {{osDetail.hostname}}</li>
                                <li>platform: {{osDetail.platform}}</li>
                                <li>distro: {{osDetail.distro}}</li>
                                <li>release: {{osDetail.release}}</li>
                                <li>kernel: {{osDetail.kernel}}</li>
                                <li>arch: {{osDetail.arch}}</li>
                                <li>serial: {{osDetail.serial}}</li>
                                <li>uefi: {{osDetail.uefi ? 'uefi bios' : 'legacy bios'}}</li>
                            </ul>
                        </div>
                    </div>
                </article>
            </section>
            <section class="col s12" v-if="activeTabs === 2">
                <article>
                    <h2>Disk Info</h2>
                </article>
                <article class="col s4" v-for="(diskInfo, i) of disksInfo" :key="i">
                    <div class="card small">
                        <div class="card-content">
                            <strong class="card-title">{{diskInfo.name !== '' ? diskInfo.name : 'no disk info'}}</strong>
                            <ul>
                                <li>type: {{diskInfo.type}}</li>
                                <li>
                                    vendor: {{diskInfo.vendor !== '' ? diskInfo.vendor : 'no vendor info'}}
                                </li>
                                <li>size: {{(diskInfo.size / 1073741824).toFixed(2)}} GB</li>
                                <li>
                                    interface type: 
                                    {{diskInfo.interfaceType !== '' 
                                        ? diskInfo.interfaceType 
                                        : 'no interface info'
                                    }}
                                </li>
                            </ul>
                        </div>
                    </div>
                </article>
            </section>
            <section class="col s12" v-if="activeTabs === 3">
                <article>
                    <h2>Controller Info</h2>
                </article>
                <article class="col s4" v-for="(controller, i) of graphicsInfo.controllers" :key="i">
                    <div class="card small">
                        <div class="card-content">
                            <strong class="card-title">{{controller.model}}</strong>
                            <ul>
                                <li>vendor: {{controller.vendor}}</li>
                                <li>
                                    vram: {{
                                        controller.vram < 1024 
                                            ? controller.vram + ' MB' 
                                            : (controller.vram / 1024).toFixed(2) + ' GB'
                                    }}
                                </li>
                            </ul>
                        </div>
                    </div>
                </article>
            </section>
            <section class="col s12" v-if="activeTabs === 4">
                <article>
                    <h2>Display Info</h2>
                </article>
                <article class="col s4" v-for="(display, i) of graphicsInfo.displays" :key="i">
                    <div class="card small">
                        <div class="card-content">
                            <strong class="card-title">{{display.model}}</strong>
                            <ul>
                                <li>main: {{display.main}}</li>
                                <li>connections: {{display.connection}}</li>
                                <li>resolution: {{display.resolutionX}} X {{display.resolutionY}}</li>
                            </ul>
                        </div>
                    </div>
                </article>
            </section>
            <section class="col s12" v-if="activeTabs === 5">
                <article>
                    <h2>BIOS Info</h2>
                </article>
                <article class="col s6">
                    <div class="card small">
                        <div class="card-content">
                            <strong class="card-title">bios about</strong>
                            <ul>
                                <li>release date: {{biosDetails.releaseDate}}</li>
                                <li>vendor: {{biosDetails.vendor}}</li>
                                <li>
                                    revision: {{biosDetails.revision === "" ? "no info": biosDetails.revision}}
                                </li>
                                <li>version: {{biosDetails.version}}</li>
                            </ul>
                        </div>
                    </div>
                </article>
                <article class="col s6">
                    <div class="card small">
                        <div class="card-content">
                            <strong class="card-title">board info</strong>
                            <ul>
                                <li>manufacturer: {{boardInfo.manufacturer}}</li>
                                <li>model: {{boardInfo.model}}</li>
                                <li>version: {{boardInfo.version}}</li>
                                <li>
                                    serial: {{boardInfo.serial === '' ? 'no serial info' : boardInfo.serial}}
                                </li>
                            </ul>
                        </div>
                    </div>
                </article>
            </section>
        </main>
    `,
    setup() {
        // start states
        const cpuInfo = ref({});
        const ramInfo = ref({});
        const osDetail = ref({});
        const disksInfo = ref({});
        const graphicsInfo = ref({});
        const biosDetails = ref({});
        const boardInfo = ref({});
        
        const activeTabs = ref(1);
        
        onMounted(async () => {
            try {
                cpuInfo.value = await cpu();
                ramInfo.value = await mem();
                disksInfo.value = await diskLayout();
                graphicsInfo.value = await graphics();
                osDetail.value = await osInfo();
                biosDetails.value = await bios();
                boardInfo.value = await baseboard();
            } catch (err) {
                toast({html: err.message});
            }
        });

        return {
            cpuInfo,
            ramInfo,
            osDetail,
            disksInfo,
            graphicsInfo,
            activeTabs,
            biosDetails,
            boardInfo
        };
    }
});
