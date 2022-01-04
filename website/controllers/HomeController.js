const fs = require('fs');
module.exports = {};
module.exports.Home = function Home(){
		var http = fs.readFileSync('./views/home.html', 'utf-8', (err, data) => {
			if(err){
				console.log(err);
				return;
			}
			return data;
		});
		return http;
}
module.exports.main = () => {
	return "main";
}

