import Vue from 'vue';

class Application {
	constructor(id: string) {
		this.bind();
	}

	bind() {
		Vue.extend(this);
	}
}