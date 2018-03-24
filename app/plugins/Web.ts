import * as superagent from 'superagent';
import { URI } from '../lang/URI';

exports.fetch = async (uri: URI) => {
	return superagent.get(uri.full)
		.then(res => res.text);
};
