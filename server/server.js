
console.log('init...');

//youkuantiads
var nodegrass = require('nodegrass');
var http = require('http');
var folderPath='web';
var url = require('url');
var path = require('path');
var qs = require('querystring');
var mime=require('mime');
var Cookies=require('cookies');
var BufferHelper = require('bufferhelper');
expiresmaxAge=606024365;   
var mime=require('mime');


PORT=10185;
SERVER='127.0.0.1';
var server = http.createServer(function (req, res) {
    try{

		var cookies = new Cookies( req, res);
		var path = url.parse(req.url);
		var parameter = qs.parse(path.query);
		if(path.pathname==""||path.pathname=="/"){
			path.pathname="/index.html";
		}
		console.log('[youkuantiads] : '+path.pathname);
		var filePath = folderPath + path.pathname;
			fs.stat(filePath, function (err, stat) {
						if (err) {
							res.writeHead(404, {'Content-Type': 'text/plain'});
							res.end();
							return;
						}
						var expires = new Date();
						expires.setTime(expires.getTime() + expiresmaxAge*1000);
						var lastModified = stat.mtime.toUTCString();
						if (req.headers['ifModifiedSince'] && lastModified == req.headers['ifModifiedSince']) {
							response.writeHead(304, "Not Modified");
							res.end();
						}else{
							fs.readFile(filePath, "binary", function(err, file) {
								
								var mimeType = mime.lookup(filePath);
								console.log(filePath+":"+mimeType);
								res.setHeader("Expires", expires.toUTCString());
								res.setHeader("Cache-Control", "max-age=" + expiresmaxAge);
								res.setHeader("Last-Modified", lastModified);
								res.writeHead(200, {'Content-Type': mimeType} );
								
								
								  res.write(file,"binary");
								  res.end();
							});
						}
					  });
	}catch(e){
		//todo: add log
		console.log('[youkuantiads] : '+e);
		res.writeHead(500, {'Content-Type': 'text/plain'});
    		res.write('500 Internal server error\n');
    		res.end();
	}
});
server.listen(PORT, SERVER);
console.log('youkuantiads runing...');

//update
var exec = require('child_process').exec;
UPDATED=0;
function check_update(){
	/*var now=(new Date()).getHours();
	if(now==1){
		UPDATED=0;
	}
	if(now==23&&!UPDATED){
		try{
			console.log('updating...');
			exec("",function(){
				console.log('updated...');
			});
		}catch(e){
			console.log(e);
		}
	}*/
}