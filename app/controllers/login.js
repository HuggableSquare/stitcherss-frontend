import Controller from '@ember/controller';
import { inject as service } from '@ember/service';

export default Controller.extend({
	session: service(),

	actions: {
		authenticate() {
			this.set('loading', true);

			const credentials = this.getProperties('email', 'password');

			this.session.authenticate('authenticator:token', credentials);
		}
	}
});
