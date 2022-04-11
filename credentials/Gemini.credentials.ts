import { ICredentialType, NodePropertyTypes } from 'n8n-workflow';


export class Gemini implements ICredentialType {
	name = 'geminiApi';
	displayName = 'Gemini API';
	properties = [
		{
			displayName: 'API Key',
			name: 'apiKey',
			type: 'string' as NodePropertyTypes,
			default: '',
		},
		{
			displayName: 'API Secret',
			name: 'apiSecret',
			type: 'string' as NodePropertyTypes,
			default: '',
		},
	];
}
