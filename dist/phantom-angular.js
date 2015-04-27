var system = require('system');
var fs = require('fs');
var url = system.args[1] || '';
var counter = 0;
var xml = '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n<url>\n<loc>'+url+'</loc>\n<changefreq>daily</changefreq>\n<priority>1.0</priority>\n</url>\n';
run(url);
function run(url){
  if(url.length > 0) {
    var page = require('webpage').create();
    page.onConsoleMessage = function(msg) {
      console.log(msg);
    };

    page.open(url, function (status) {
      if (status == 'success') {
        var delay, checker = (function() {
          var html = page.evaluate(function () {
            var body = document.getElementsByTagName('body')[0];
            if(body.getAttribute('data-status') == 'ready') {
              return document.getElementsByTagName('html')[0].outerHTML;
            }
          });
          if(html) {
            clearTimeout(delay);
            var file = url.split('/');
            file = file[file.length-1];
             fs.write('snapshots/'+ file +'.html', html, 'w');
             if(url.indexOf('post') === -1){
               var pageUrls = page.evaluate(function(){
                  var pageUrls = [];
                  var elements = document.getElementsByClassName('blog-title');
                  for(var i = 0; i<elements.length; i++){
                    var postUrl = 'http://localhost:9000/#/'+elements[i].children[0].getAttribute('ng-href');
                    if(pageUrls.indexOf(postUrl) === -1){
                      pageUrls.push(postUrl);
                    }
                  }
                  return pageUrls;
               });
               for(var i = 0; i < pageUrls.length; i++){
                  run(pageUrls[i]);
                }
            }
            else {
              xml += '<url>\n' +
                      '<loc>'+url+'</loc>\n' +
                     '<changefreq>daily</changefreq>\n' +
                      '<priority>1.0</priority>\n' +
                    '</url>\n';
              if(counter === 0 ){
                xml+= '</urlset>';
                fs.write('sitemap.xml', xml, 'w');
                phantom.exit();
              }
            }
          }
        });
        delay = setInterval(checker, 100);
      }
    });
  }
};