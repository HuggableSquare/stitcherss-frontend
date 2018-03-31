import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import fetch from 'fetch';

export default Controller.extend({
	queryParams: ['term'],
	session: service(),
	offset: 0,

	actions: {
		logout() {
			this.session.invalidate();
		},
		search(fresh) {
			if (fresh) {
				this.set('offset', 0);
				this.set('search', undefined);
			} else {
				this.set('offset', this.get('offset') + 20);
			}

			this.set('loading', true);

			fetch(`/search?term=${this.term}&offset=${this.offset}&token=${this.session.data.authenticated.token}`)
				.then((response) => {
					if (response.status >= 200 && response.status < 300) {
						return response;
					}
					const error = new Error(response.statusText);
					error.response = response;
					throw error;
				})
				.then((response) => response.json())
				.then((search) => {
					this.set('loading', false);
					if (this.search && this.search.results) {
						this.search.results.pushObjects(search.results);
					} else {
						this.set('search', search);
					}
				});
		}
	}
});
