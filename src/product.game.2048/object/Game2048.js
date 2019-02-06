export default class {
	constructor() {
		var str, num;




		var hoge = (str)=> {
			var n = this.getAnyCharNumber(str);
			console.log(n);
			var images = [1,2,3,4,5,6,7,8,9,10,11];
			var newImages = JSON.parse(JSON.stringify(images));

			var newImages = newImages.map((v, i)=> {
				var num = n * i * i + 13;
				// var nRandromByI = n / (i + 1);
				// console.log(nRandromByI, images.length % nRandromByI)
				return getRandomInt(num, 0, images.length - 1);
			});

			console.log(newImages);
		}

		function getRandomInt(n, min, max) {
			var f = intToFloatIsFirst(n);
			return Math.floor( f * (max - min + 1) ) + min;
		}

		// INFO: 整数を小数点第一位に変換する 23 -> 0.23
		function intToFloatIsFirst(n) {
			var l = n.toString().length;
			var p = 1;
			for (var i=0; i<l; i++)
				p = p * 10;
			return n / p;
		}

		hoge(1);
		hoge(2);
		hoge('あ');












		// str = '1';
		// num = this.getAnyCharNumber(str);
		// console.log(num);

		// str = 'Ｕ';
		// num = this.getAnyCharNumber(str);
		// console.log(num);

		// str = 1;
		// num = this.getAnyCharNumber(str);
		// console.log(num);

		// str = '🏈';
		// num = this.getAnyCharNumber(str);
		// console.log(num);

		// str = 'rp9dBxfVuBGidIK7yRIh';
		// num = this.getAnyCharNumber(str);
		// console.log(num);

		// str = 'rp9dBxfVuBGidIK7yRIhrp9dB7fVuBGidIK7yRIh';
		// num = this.getAnyCharNumber(str);
		// console.log(num);
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
