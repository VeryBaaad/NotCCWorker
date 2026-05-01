/**
 * NotCCWorker
 */

import { RULES } from './config/rules.js';
import { USER_ID_WHITELIST, CHAT_ID_WHITELIST } from './config/whitelist.js';
import { NORMALIZE_MAP } from './config/normalize.js';

const pickRandom = (arr) => arr[Math.floor(Math.random() * arr.length)];
const isWhitelisted = (id, whitelist) => whitelist.length === 0 || whitelist.includes(id);

const normalizeText = (input) => {
	if (!input) return "";
	let result = input.normalize("NFKC");
	for ( const { from, to } of NORMALIZE_MAP) {
		result = result.split(from).join(to);
	}
	return result;
};

const compileRule = (rule) => {
	if (rule.strict) {
		return {
			...rule,
			compiledPatterns: rule.patterns.map(p => normalizeText(p))
		};
	}
	const flags = rule.flags || "i";
	return {
		...rule,
		compiledPatterns: rule.patterns.map(patterns => {
			try {
				return new RegExp(patterns, flags);
			} catch (e) {
				console.error(`[CONFIG_ERROR] Invaild regex "${pattern}": `, e.message);
				return null;
			}
		}).filter(Boolean)
	};
}

const matchRule = (text, normalizeText, rule) => {
	// TODO
};