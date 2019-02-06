export default class {
	constructor() {
		var str, num;
		// str = '1';
		// num = this.getCharNumber(this.toZenkaku(str));
		// console.log(num);

		// str = 'Ｕ';
		// num = this.getCharNumber(this.toZenkaku(str));
		// console.log(num);

		// str = 1;
		// num = this.getCharNumber(this.toZenkaku(str));
		// console.log(num);

		// str = '🏈';
		// num = this.getCharNumber(this.toZenkaku(str));
		// console.log(num);

		str = 'rp9dBxfVuBGidIK7yRIh';
		num = this.getCharNumber(this.toZenkaku(str));
		console.log(num);
	}

	toZenkaku(str) {
		//16進数の場合
		return str.toString().replace(/[A-Za-z0-9]/g, function(s) {
			return String.fromCharCode(s.charCodeAt(0) + 0xFEE0);
		});
	}

	getCharNumber(zenkaku) {
		console.log(zenkaku);
		const n16 = escape(zenkaku).slice(2);
		return this.change16to10(n16);
	}

	change16to10(str) {
		return parseInt(str, 16);
	}
}
