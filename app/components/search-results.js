import Component from '@ember/component';
import { inject as service } from '@ember/service';
import { uniqBy } from '@ember/object/computed';

export default Component.extend({
	classNames: ['search-results'],
	session: service(),

	shows: uniqBy('search.results', 'id'),

	didInsertElement() {
		if (this.get('term')) {
			this.sendAction('loadMoreResults', true);
		}
	}
});
