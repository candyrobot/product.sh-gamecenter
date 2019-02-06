export default class {
	constructor() {
		var str, num;
		str = '1';
		num = this.getAnyCharNumber(str);
		console.log(num);

		str = 'Ｕ';
		num = this.getAnyCharNumber(str);
		console.log(num);

		str = 1;
		num = this.getAnyCharNumber(str);
		console.log(num);

		str = '🏈';
		num = this.getAnyCharNumber(str);
		console.log(num);

		str = 'rp9dBxfVuBGidIK7yRIh';
		num = this.getAnyCharNumber(str);
		console.log(num);

		str = 'rp9dBxfVuBGidIK7yRIhrp9dB7fVuBGidIK7yRIh';
		num = this.getAnyCharNumber(str);
		console.log(num);
	}

	getAnyCharNumber(str) {
		return this.getCharNumber(this.toZenkaku(str));
	}

	toZenkaku(str) {
		return str.toString().replace(/[A-Za-z0-9]/g, function(s) {
			return String.fromCharCode(s.charCodeAt(0) + 0xFEE0);
		});
	}

	getCharNumber(zenkaku) {
		const a = escape(zenkaku).split('%u');
		a.shift();
		const n10 = a.reduce((p, n16)=> p + this.change16to10(n16), 0);
		return n10;
	}

	change16to10(str) {
		return parseInt(str, 16);
	}
}
