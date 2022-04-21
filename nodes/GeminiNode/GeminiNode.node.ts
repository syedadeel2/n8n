import axios from 'axios';
import * as crypto from 'crypto';
import { IExecuteFunctions } from 'n8n-core';
import { IDataObject, INodeExecutionData, INodeType, INodeTypeDescription, NodeOperationError } from 'n8n-workflow';

export class GeminiNode implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Gemini Exchange Node',
		name: 'geminiExchangeNode',
		group: [ 'transform' ],
		version: 1,
		description: 'Gemini Exchange Node',
		defaults: {
			name: 'Gemini Node',
			color: '#772244',
		},
		inputs: [ 'main' ],
		outputs: [ 'main' ],
		credentials: [
			{
				name: 'geminiApi',
				required: true,
			},
		],
		properties: [
			{
				displayName: 'Environment',
				name: 'environment',
				type: 'options',
				options: [
					{
						name: 'Production',
						value: 'production',
					},
					{
						name: 'Sandbox',
						value: 'Sandbox',
					}
				],
				default: 'production',
				description: 'Gemini Exhcange Environment',
			},
			{
				displayName: 'Endpoint',
				name: 'endpoint',
				type: 'options',
				options: [
					{
						"name": "/v1/order/new",
						"value": "/v1/order/new",
						"description": "New Order"
					},
					{
						"name": "/v1/order/cancel",
						"value": "/v1/order/cancel",
						"description": "Cancel Order"
					},
					{
						"name": "/v1/order/cancel/session",
						"value": "/v1/order/cancel/session",
						"description": "Cancel All Session Orders"
					},
					{
						"name": "/v1/order/cancel/all",
						"value": "/v1/order/cancel/all",
						"description": "Cancel All Active Orders"
					},
					{
						"name": "/v1/wrap/:symbol",
						"value": "/v1/wrap/:symbol",
						"description": "Wrap Order"
					},
					{
						"name": "/v1/order/status",
						"value": "/v1/order/status",
						"description": "Order Status"
					},
					{
						"name": "/v1/orders",
						"value": "/v1/orders",
						"description": "Get Active Orders"
					},
					{
						"name": "/v1/mytrades",
						"value": "/v1/mytrades",
						"description": "Get Past Trades"
					},
					{
						"name": "/v1/tradevolume",
						"value": "/v1/tradevolume",
						"description": "Get Trade Volume"
					},
					{
						"name": "/v1/notionalvolume",
						"value": "/v1/notionalvolume",
						"description": "Get Notional Volume"
					},
					{
						"name": "/v1/heartbeat",
						"value": "/v1/heartbeat",
						"description": "Heartbeat"
					},
					{
						"name": "/v1/balances",
						"value": "/v1/balances",
						"description": "Get Available Balances"
					},
					{
						"name": "/v1/notionalbalances/:currency",
						"value": "/v1/notionalbalances/:currency",
						"description": "Get Notional Balances"
					},
					{
						"name": "/v1/balances/earn",
						"value": "/v1/balances/earn",
						"description": "Get Earn Balances"
					},
					{
						"name": "/v1/earn/rates",
						"value": "/v1/earn/rates",
						"description": "Get Earn Rates"
					},
					{
						"name": "/v1/earn/interest",
						"value": "/v1/earn/interest",
						"description": "Get Earn Interest"
					},
					{
						"name": "/v1/earn/history",
						"value": "/v1/earn/history",
						"description": "Get Earn History"
					},
					{
						"name": "/v1/addresses/:network",
						"value": "/v1/addresses/:network",
						"description": "Get Deposit Addresses"
					},
					{
						"name": "/v1/deposit/:network/newAddress",
						"value": "/v1/deposit/:network/newAddress",
						"description": "New Deposit Address"
					},
					{
						"name": "/v1/transfers",
						"value": "/v1/transfers",
						"description": "Transfers"
					},
					{
						"name": "/v1/withdraw/:currency",
						"value": "/v1/withdraw/:currency",
						"description": "Withdraw Crypto Funds"
					},
					{
						"name": "/v1/clearing/new",
						"value": "/v1/clearing/new",
						"description": "New Clearing Order"
					},
					{
						"name": "/v1/clearing/status",
						"value": "/v1/clearing/status",
						"description": "Clearing Order Status"
					},
					{
						"name": "/v1/clearing/cancel",
						"value": "/v1/clearing/cancel",
						"description": "Cancel Clearing Order"
					},
					{
						"name": "/v1/clearing/confirm",
						"value": "/v1/clearing/confirm",
						"description": "Confirm Clearing Order"
					},
					{
						"name": "/v1/instant/quote/:side/:symbol",
						"value": "/v1/instant/quote/:side/:symbol",
						"description": "Get Instant Quote"
					},
					{
						"name": "/v1/instant/execute",
						"value": "/v1/instant/execute",
						"description": "Execute Instant Order"
					},
					{
						"name": "/v1/payments/addbank",
						"value": "/v1/payments/addbank",
						"description": "Add A Bank"
					},
					{
						"name": "/v1/payments/methods",
						"value": "/v1/payments/methods",
						"description": "View Payment Methods"
					},
					{
						"name": "/v1/payments/sen/withdraw",
						"value": "/v1/payments/sen/withdraw",
						"description": "SEN Withdrawals"
					},
					{
						"name": "/v1/account",
						"value": "/v1/account",
						"description": "Account Detail"
					},
					{
						"name": "/v1/approvedAddresses/:network/request",
						"value": "/v1/approvedAddresses/:network/request",
						"description": "Create Approved Address"
					},
					{
						"name": "/v1/approvedAddresses/account/:network",
						"value": "/v1/approvedAddresses/account/:network",
						"description": "View Approved Address List"
					},
					{
						"name": "/v1/approvedAddresses/:network/remove",
						"value": "/v1/approvedAddresses/:network/remove",
						"description": "Remove Address from Approved Address List"
					},
					{
						"name": "/v1/account/create",
						"value": "/v1/account/create",
						"description": "Create Account"
					},
					{
						"name": "/v1/account/list",
						"value": "/v1/account/list",
						"description": "Get Accounts"
					},
					{
						"name": "/v1/account/transfer/:currency",
						"value": "/v1/account/transfer/:currency",
						"description": "Internal Transfer"
					},
					{
						"name": "/v1/roles",
						"value": "/v1/roles",
						"description": "Get role of the current API key"
					}
				],
				default: '',
				description: 'Gemini Endpoint',
				required: true,
			},
			{
				displayName: 'Parameters',
				name: 'parameters',
				displayOptions: {
					show: {
						endpoint: [ '/v1/wrap/:symbol', '/v1/account/transfer/:currency', '/v1/approvedAddresses/account/:network', '/v1/approvedAddresses/:network/request', '/v1/instant/quote/:side/:symbol', '/v1/notionalbalances/:currency', '/v1/addresses/:network', '/v1/deposit/:network/newAddress', '/v1/withdraw/:currency', '/v1/approvedAddresses/:network/remove' ]
					}
				},
				type: 'string',
				default: '',
				description: 'EndPoint Parameters',
				required: true
			},
			{
				displayName: 'JSON Payload',
				name: 'jsonPayload',
				type: 'json',
				default: '',
				description: 'Json Payload to post',
			}
		],
	};


	async execute ( this: IExecuteFunctions ): Promise<INodeExecutionData[][]> {

		const items = this.getInputData();

		const returnData: IDataObject[] = [];

		const credentials = await this.getCredentials( 'geminiApi' );

		if ( credentials === undefined ) {
			throw new NodeOperationError( this.getNode(), 'No credentials got returned!' );
		}

		let environment = this.getNodeParameter( 'environment', 0 ) as string;
		let endpoint = this.getNodeParameter( 'endpoint', 0 ) as string;

		let parameters = this.getNodeParameter( 'parameters', 0, '' ) as string;

		let payloadStr = this.getNodeParameter( 'jsonPayload', 0 ) as string;
		const host = `https://api.${ environment == 'sandbox' ? 'sandbox.' : '' }gemini.com`;

		// replace all the parameters in the endpoint
		if ( parameters && parameters.length > 0 ) {
			const regex = /\:[a-zA-Z0-9]+/gm;
			const matches = endpoint.match( regex );
			if ( matches && matches.length > 0 ) {

				const params = parameters.split( ',' );

				if ( matches.length != params.length ) {
					throw new NodeOperationError( this.getNode(), 'Length of parameters doesn\'t match with endpoint parameters.', { description: "Please make sure the length of the parameters matches with endpoint e.g. /v1/approvedAddresses/:network/request this endpoint have only 1 parameter :network and value(s) in parameter field should have extactly 1 value. For multiple parameters you can add multiple values in parameters field separated by comma with no spaces." } );
				}

				for ( let index = 0; index < matches.length; index++ ) {

					const match = matches[ index ];
					endpoint = endpoint.replace( match, params[ index ] );

				}
			}
		}

		let body = {
			"nonce": ( new Date() ).getTime(),
			"request": endpoint
		};


		let payload = { ...body };

		if ( payloadStr && payloadStr.length > 0 )
			payload = { ...payload, ...JSON.parse( payloadStr ) };

		const encodedPayload = Buffer.from( JSON.stringify( payload ) ).toString( "base64" );
		const sign = crypto.createHmac( 'sha384', credentials.apiSecret.toString() ).update( encodedPayload ).digest( 'hex' );

		try {
			const response = await axios.post( `${ host }${ endpoint }`, payload, {
				headers: {
					'Content-Type': 'application/json',
					'X-GEMINI-APIKEY': credentials.apiKey.toString(),
					'X-GEMINI-PAYLOAD': encodedPayload,
					'X-GEMINI-SIGNATURE': sign,
					'Cache-Control': "no-cache"
				}
			} );

			if ( response && response.data && response.data instanceof Array ) {
				for ( let index = 0; index < response.data.length; index++ ) {
					const element = response.data[ index ];

					returnData.push( element );

				}
			} else if ( response && response.data ) {
				returnData.push( response.data );
			}
		} catch ( error: any ) {
			throw new NodeOperationError( this.getNode(), error );
		}

		return [ this.helpers.returnJsonArray( returnData ) ];

	}


}
