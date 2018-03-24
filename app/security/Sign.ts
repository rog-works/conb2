import * as CryptoJS from 'crypto-js';

export class Sign {
	public static digest(...args: any[]): string {
		return CryptoJS.HmacSHA1(JSON.stringify(args), 'hogehoge').toString();
	}
}
