/**
 * third-party.js
 * AI provider implementation for third-party APIs using custom API keys and base URLs.
 */

import { BaseAIProvider } from './base-provider.js';
import { createOpenAI } from '@ai-sdk/openai';

export class ThirdPartyAIProvider extends BaseAIProvider {
	constructor() {
		super();
		this.name = 'ThirdParty';
	}

	/**
	 * Creates and returns a third-party client instance.
	 * @param {object} params - Parameters for client initialization
	 * @param {string} params.apiKey - Third-party API key
	 * @param {string} [params.baseURL] - Custom API endpoint
	 * @returns {Function} Third-party client function
	 * @throws {Error} If API key is missing or initialization fails
	 */
	getClient(params) {
		try {
			const { apiKey, baseURL } = params;

			if (!apiKey) {
				throw new Error('Third-party API key is required.');
			}

			if (!baseURL) {
				throw new Error('Third-party base URL is required.');
			}

			return createOpenAI({
				apiKey,
				baseURL
			});
		} catch (error) {
			this.handleError('client initialization', error);
		}
	}

	/**
	 * Override auth validation to require both API key and base URL
	 * @param {object} params - Parameters to validate
	 */
	validateAuth(params) {
		if (!params.apiKey) {
			throw new Error(`${this.name} API key is required`);
		}
		if (!params.baseURL) {
			throw new Error(`${this.name} base URL is required`);
		}
	}
}