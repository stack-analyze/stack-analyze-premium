const { defineComponent, onMounted, ref } = require('vue');
const { Sidenav, Collapsible } = require('materialize-css');

module.exports = defineComponent({
    template: `
		<nav class="nav-wrapper black">
			<router-link to="#" data-target="mobile-demo" class="sidenav-trigger show-on-large">
				<i class="material-icons">menu</i>
			</router-link>
			<header class="brand-logo center">
				<h1 class="flow-text title">{{$route.name}}</h1>
			</header>
		</nav>
		<aside id="mobile-demo" class="sidenav">
			<section class="user-view">
				<div class="background">
					<img class="responsive-img" src="sidenav/technology.jpg">
				</div>
				<img class="circle" src="sidenav/logo.png">
				<strong class="white-text name">stack-analyze premium</strong>
				<strong class="white-text email">menu</strong>
			</section>
			<ul class="collapsible">
				<li >
					<div class="collapsible-header">
						<i class="material-icons">http</i>
						web tools
					</div>
					<ul class="collapsible-body">
						<li>
							<router-link to="/" class="sidenav-close items">
							<i class="material-icons">web</i>
								single stack
							</router-link>
						</li>
						<li>
							<router-link to="/multiple" class="sidenav-close items">
								<i class="material-icons">perm_data_setting</i>
								multiple stack
							</router-link>
						</li>
						<li>
							<router-link to="/pagespeed" class="sidenav-close items">
								<i class="material-icons">pageview</i>
								pagespeed
							</router-link>
						</li>
						<li>
							<router-link to="/validator" class="sidenav-close items">
								<i class="material-icons">code</i>
								html validator
							</router-link>
						</li>
						<li>
							<router-link to="/whois" class="sidenav-close items">
								<i class="material-icons">cloud_queue</i>
								whois
							</router-link>
						</li>
					</ul>
			</li>
			<li >
				<div class="collapsible-header">
					<i class="material-icons">search</i>
					search tools
				</div>
				<ul class="collapsible-body">
					<li>
						<router-link to="/github" class="sidenav-close items">
							<i class="material-icons">info_outline</i>
							github info
						</router-link>
					</li>
					<li>
						<router-link to="/anime" class="sidenav-close items">
							<i class="material-icons">book</i>
							anime search
						</router-link>
					</li>
					<li>
						<router-link to="/js-libraries" class="sidenav-close items">
							<i class="material-icons">local_library</i>
							cdnjs services
						</router-link>
					</li>
					<li>
						<router-link to="/deezer-info" class="sidenav-close items">
							<i class="material-icons">library_music</i>
							deezer info
						</router-link>
					</li>
					<li>
						<router-link to="/music" class="sidenav-close items">
							<i class="material-icons">music_note</i>
							lyric finder
						</router-link>
					</li>
				</ul>
			</li>
			<li >
				<div class="collapsible-header">
					<i class="material-icons">adjust</i>
					hardware tools
				</div>
				<ul class="collapsible-body">
					<li>
						<router-link to="/hardware" class="sidenav-close items">
							<i class="material-icons">settings</i>
							hardware information
						</router-link>
					</li>
					<li>
						<router-link to="/speed-test" class="sidenav-close items">
							<i class="material-icons">network_check</i>
							speed test
						</router-link>
					</li>
					<li>
						<router-link to="/about" class="sidenav-close items">
							<i class="material-icons">info</i>
							about
						</router-link>
					</li>
					</ul>
				</li>
				<li>
					<a href="license.html" class="sidenav-close items" target="_blank">
						<i class="material-icons">insert_comment</i>
						license
					</a>
				</li>
			</ul>
		</aside>
		<!-- <router-view v-slot="{ Component }">
			<transition>
				<keep-alive>
					<component :is="Component" />
				</keep-alive>
			</transition>
		</router-view> -->
		<router-view></router-view>
	`,
    setup() {
        onMounted(() => {
            // DOM elements
            const sideNav = document.querySelectorAll('.sidenav');
            const collapse = document.querySelectorAll('.collapsible');

            // materialize init
            Sidenav.init(sideNav, { draggable: false});
            Collapsible.init(collapse);
        });
    }
});
