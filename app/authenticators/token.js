import Base from 'ember-simple-auth/authenticators/base';
import RSVP from 'rsvp';
import fetch from 'fetch';

export default Base.extend({
	restore(data) {
		return new RSVP.Promise((resolve, reject) => {
			if (data.token) {
				return resolve(data);
			}
			return reject();
		});
	},

	authenticate(credentials) {
		return fetch('/login', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(credentials)
		}).then((response) => {
			if (response.status >= 200 && response.status < 300) {
				return response;
			}
			let error = new Error(response.statusText);
			error.response = response;
			throw error;
		}).then((response) => response.json());
	},

	invalidate() {
		return RSVP.resolve();
	}
});
