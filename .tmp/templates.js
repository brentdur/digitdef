angular.module('ddblogApp').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('app/admin/admin.html',
    "<nav class=\"navbar navbar-default admin\"><div class=container-fluid><div class=navbar-header><button type=button class=\"navbar-toggle collapsed\" data-toggle=collapse data-target=#navbar aria-expanded=false aria-controls=navbar><span class=sr-only>Toggle navigation</span> <span class=icon-bar></span> <span class=icon-bar></span> <span class=icon-bar></span></button> <a class=navbar-brand ui-sref=admin.overview>Admin Panel</a><p class=\"navbar-text admin navbar-left\">Signed in as: {{getCurrentUser.name}}</p></div><div id=navbar class=\"navbar-collapse collapse\"><ul class=\"visible-xs-block nav navbar-nav\"><li><a href=admin/overview>Overview <span class=sr-only>(current)</span></a></li><ul><li>Quick Create</li><ul class=list-inline><li><button ng-click=\"quickGo('post')\" class=btn>Post</button></li><!-- <li><button ng-click=\"quickGo('page')\" class=\"btn\">Page</button></li> --><li><button ng-click=\"quickGo('img')\" class=btn>Image</button></li></ul></ul><li><a href=admin/view/posts>Posts</a></li><!-- <li><a href=\"admin/view/pages\">Pages</a></li> --><li><a href=admin/view/images>Images</a></li><li><a href=admin/view/comments>Comments</a></li></ul><ul class=\"nav navbar-nav navbar-right\"><li><button ui-sref=base.home class=\"btn btn-default navbar-btn admin\">View Blog</button></li><li><button class=\"btn btn-default navbar-btn admin\" ng-click=logout()>Log Out</button></li></ul></div><!--/.nav-collapse --></div></nav><div class=container-fluid><div class=row><div class=\"col-sm-2 hidden-xs\"><nav ui-scrollfix=+59 class=affix-top><ul class=\"nav nav-sidebar\"><li style=height:20px></li><li class=active><a href=admin/overview>Overview <span class=sr-only>(current)</span></a></li><ul class=\"nav nav-sidebar quick\"><li>Quick Create</li><ul class=\"list-inline quick-item\"><li><button ng-click=\"quickGo('post')\" class=btn>Post</button></li><!-- <li><button ng-click=\"quickGo('page')\" class=\"btn\">Page</button></li> --><li><button ng-click=\"quickGo('img')\" class=btn>Image</button></li></ul></ul><li><a href=admin/view/posts>Posts</a></li><!-- <li><a href=\"admin/view/pages\">Pages</a></li> --><li><a href=admin/view/images>Images</a></li><li><a href=admin/view/comments>Comments</a></li></ul></nav></div><ui-view autoscroll=false></ui-view></div><!-- row --></div><!-- container -->"
  );


  $templateCache.put('app/admin/overview/overview.html',
    "<div class=\"col-sm-10 col-sm-offset-2 main\"><div class=row><div class=\"col-sm-4 tops\"><h4>Top Posts</h4><table class=\"table table-condensed table-bordered table-hover\"><thead><tr><th>Views</th><th>Title</th><th>Link</th></tr></thead><tbody><tr ng-repeat=\"post in posts | orderBy:'-views' | limitTo:8\"><td>{{post.views}}</td><td>{{post.title}}</td><td ng-show=\"post.update === 'published'\"><a ng-href=post/{{post.link}}>View</a></td><td ng-hide=\"post.update === 'published'\"><a ui-sref=\"admin.quickAdd({post:post, type:'posts', draft:true})\">Edit</a></td></tr></tbody></table><button ng-click=\"goTo('posts')\">View All Posts</button></div><div class=\"col-sm-4 tops\"><h4>Top Comments</h4><table class=\"table table-condensed table-bordered table-hover\"><thead><tr><th>Likes</th><th>User</th><th>Post</th><th>Link</th></tr></thead><tbody><tr ng-repeat=\"comment in comments | orderBy:'-likes' | limitTo:8\"><td>{{comment.likes}}</td><td>{{comment.author}}</td><td>{{comment.post.title}}</td><td><a ng-href=post/{{comment.post.link}}>View</a></td></tr></tbody></table><button ng-click=\"goTo('comments')\">View All Comments</button></div><div class=\"col-sm-4 tops\"><h4>Top Images</h4><table class=\"table table-condensed table-bordered table-hover\"><thead><tr><th>Views</th><th>Title</th><th>Link</th></tr></thead><tbody><tr ng-repeat=\"image in images | orderBy:'-views' | limitTo: 8\"><td>{{image.views}}</td><td>{{image.alt}}</td><td><button ng-click=viewImg($index) class=\"btn btn-default\">View</button></td></tr></tbody></table><button ng-click=\"goTo('images')\">View All Images</button></div></div><!-- top views --></div><!-- content -->"
  );


  $templateCache.put('app/admin/quickadd/quickadd.html',
    "<div class=\"col-xs-12 col-sm-10 col-sm-offset-2\"><h2>Create {{type}}</h2><form class=form-horizontal ng-submit=send()><div class=form-group><label for=form-date class=\"col-md-1 control-label\">Date:</label><div class=col-md-4><p class=\"form-control-static input-lg\">{{dateTime | date:'MMMM dd, yyyy @ HH:mma'}}</p><div collapse=isCollapsed><timepicker ng-model=dateTime show-meridian=false></timepicker><datepicker ng-model=dateTime datepicker-mode=day show-weeks=false></datepicker></div><input ng-model=dateTime type=hidden></div><div class=col-md-1><input type=button class=btn ng-click=\"isCollapsed = !isCollapsed\" value=\"Edit Date\"></div><div ng-hide=isDraft><div class=col-md-2><input type=submit class=\"btn btn-block btn-lg btn-success\" ng-click=\"send('published')\" value={{subText}}></div><div class=col-md-2><input type=button class=\"btn btn-block btn-lg btn-warning\" ng-click=\"send('draft')\" value=Draft></div></div><div ng-show=isDraft><div class=col-md-2><input type=submit class=\"btn btn-block btn-lg btn-warning\" ng-click=\"send('draft')\" value=\"Save Draft\"></div><div class=col-md-2><input type=button class=\"btn btn-block btn-lg btn-success\" ng-click=\"send('published')\" value=Publish></div></div><div class=col-md-2><input type=button class=\"btn btn-block btn-lg btn-danger\" ng-click=delete value=Clear></div></div><div class=form-group><label for=form-title class=\"col-md-1 control-label\">Title:</label><div class=col-md-5><input class=\"form-control input-lg\" id=form-title ng-model=title></div><label for=form-meta class=\"control-label col-md-1\">Tags:</label><div class=col-md-5><input class=\"form-control input-lg\" id=form-tags ng-model=tags></div></div><div class=form-group><div class=col-md-12><label for=form-post class=control-label>Content:</label><textarea class=\"form-control input-lg\" id=form-post rows=15 ng-model=content></textarea></div></div></form><div class=row><p>[break], [para], [tab]</p><h2>Preview:</h2><div class=col-md-12 ng-bind-html=trustHtml(fixedContent())></div></div></div>"
  );


  $templateCache.put('app/admin/quickimg/quickimg.html',
    "<div class=\"col-xs-12 col-sm-10 col-sm-offset-2\"><h2>Add {{type}}</h2><form class=form-horizontal><div class=form-group><label for=form-date class=\"col-md-1 control-label\">Date:</label><div class=col-md-4><p class=\"form-control-static input-lg\">{{dateTime | date:'MMMM dd, yyyy @ HH:mma'}}</p><div collapse=isCollapsed><timepicker ng-model=dateTime show-meridian=false></timepicker><datepicker ng-model=dateTime datepicker-mode=day show-weeks=false></datepicker></div><input ng-model=dateTime type=hidden></div><div class=col-md-1><input type=button class=btn ng-click=\"isCollapsed = !isCollapsed\" value=\"Edit Date\"></div><div ng-hide=isDraft><div class=col-md-2><input type=submit class=\"btn btn-block btn-lg btn-success\" ng-click=\"send('published')\" value={{subText}}></div><div class=col-md-2><input type=button class=\"btn btn-block btn-lg btn-warning\" ng-click=\"send('draft')\" value=Draft></div></div><div ng-show=isDraft><div class=col-md-2><input type=submit class=\"btn btn-block btn-lg btn-warning\" ng-click=\"send('draft')\" value=\"Save Draft\"></div><div class=col-md-2><input type=button class=\"btn btn-block btn-lg btn-success\" ng-click=\"send('published')\" value=Publish></div></div><div class=col-md-2><input type=button class=\"btn btn-block btn-lg btn-danger\" value=Clear></div><div class=form-group><label for=form-title class=\"col-md-1 control-label\">Alt Text:</label><div class=col-md-5><input ng-model=alt class=\"form-control input-lg\" id=form-title></div><label for=form-tags class=\"control-label col-md-1\">Tags:</label><div class=col-md-5><input ng-model=tags class=\"form-control input-lg\" id=form-tags></div></div><div class=form-group><label for=form-tags class=\"control-label col-md-1\">Full:</label><div class=col-md-5><input ng-model=full class=\"form-control input-lg\" id=form-tags></div><label for=form-tags class=\"control-label col-md-1\">Thumb:</label><div class=col-md-5><input ng-model=thumbN class=\"form-control input-lg\" id=form-tags></div><div class=form-group><div class=\"col-md-5 col-md-offset-1\"><div ng-file-drop ng-model=files class=drop-box drag-over-class=dragover ng-style=dropped accept=.jpg,.png,.pdf>{{dragText}}</div><div ng-no-file-drop>File Drag/Drop is not supported for this browser</div></div><div class=\"col-md-5 col-md-offset-1\"><div ng-file-drop ng-model=thumb class=drop-box drag-over-class=dragover ng-style=droppedT accept=.jpg,.png,.pdf>{{dragTextT}}</div><div ng-no-file-drop>File Drag/Drop is not supported for this browser</div></div></div></div></div></form><div class=row><div class=col-md-6><img class=img-responsive ng-show=update ng-src=assets/images/{{full}}></div><div class=col-md-6><img class=img-responsive ng-show=update ng-src=assets/images/{{thumbN}}></div></div></div>"
  );


  $templateCache.put('app/admin/view/view.html',
    "<div class=\"col-xs-12 col-sm-10 col-sm-offset-2 main\"><div class=row><h4 class=view-title>Top {{type}}</h4><button class=\"bulk-button btn btn-success\" ng-show=\"checked.length > 0 && !isComment\" ng-click=pubBulk()>Publish Selected</button> <button class=\"bulk-button btn btn-warning\" ng-show=\"checked.length > 0  && !isComment\" ng-click=draftBulk()>Draft Selected</button> <button class=\"bulk-button btn btn-danger\" ng-show=\"checked.length > 0\" ng-click=deleteBulk()>Delete Selected</button><table class=\"table table-condensed table-bordered table-hover\"><thead><tr><th><input type=checkbox id=blankCheckbox ng-click=selectAllCheck() ng-model=selectAll aria-label=...></th><th ng-repeat=\"heads in inf.header\">{{heads}}</th></tr></thead><tbody ng-show=isPost><tr ng-repeat=\"content in bucket | orderBy:'-views'\"><td><input type=checkbox id=blankCheckbox ng-click=checkChecked(content) ng-model=content.selected aria-label=...></td><td>{{content.title || content.alt}}</td><td>{{content.date | date:'MMMM dd, yyyy @ HH:MMa'}}</td><td><a ui-sref=\"base.home({specTag: tag})\" ng-repeat=\"tag in content.tags\">{{tag}}</a></td><td>{{content.views}}</td><td>{{content.update}}</td><td><button class=\"btn btn-default view-btn\" ng-show=isPub(content) ui-sref=\"base.post({perma: content.link})\">View</button> <button class=\"btn btn-primary view-btn\" ng-show=isPub(content) ui-sref=\"admin.quickAdd({post:content, type:type})\">Edit</button> <button class=\"btn btn-primary view-btn\" ng-hide=isPub(content) ui-sref=\"admin.quickAdd({post:content, type:type, draft:true})\">Edit</button> <button class=\"btn btn-warning view-btn\" ng-show=isPub(content) ng-click=toDraft(content)>Draft</button> <button class=\"btn btn-success view-btn\" ng-hide=isPub(content) ng-click=toPub(content)>Publish</button> <button class=\"btn btn-danger view-btn\" ng-click=\"delete(content._id, false)\">X</button></td></tr></tbody><tbody ng-show=isComment><tr ng-repeat=\"content in bucket | orderBy:'-views'\"><td><input type=checkbox id=blankCheckbox ng-click=checkChecked(content) ng-model=content.selected aria-label=...></td><td ng-show=isPub(content.post)>{{content.post.title}}</td><td ng-hide=isPub(content.post) style=\"color: red\">{{content.post.title}}(Drafted)</td><td>{{content.author}}</td><td>{{content.date | date:'MMMM dd, yyyy @ HH:MMa'}}</td><td ng-bind-html=truncateComment(content.content)></td><td><button class=\"btn btn-default view-btn\" ng-show=isPub(content.post) ui-sref=\"base.post({perma: content.post.link})\">View</button> <button class=\"btn btn-danger view-btn\" ng-click=\"delete(content._id, false)\">X</button></td></tr></tbody><tbody ng-show=isImg><tr ng-repeat=\"content in bucket | orderBy:'-views'\"><td><input type=checkbox id=blankCheckbox ng-click=checkChecked(content) ng-model=content.selected aria-label=...></td><td>{{content.alt}}</td><td>{{content.date | date:'MMMM dd, yyyy @ HH:MMa'}}</td><td><a ui-sref=\"base.home({specTag: tag})\" ng-repeat=\"tag in content.tags\">{{tag}}</a></td><td>{{content.views}}</td><td>{{content.update}}</td><td><button ng-click=viewImg($index) class=\"btn btn-default view-btn\">View</button> <button class=\"btn btn-primary view-btn\" ng-show=isPub(content) ui-sref=admin.quickImg({img:content})>Edit</button> <button class=\"btn btn-primary view-btn\" ng-hide=isPub(content) ui-sref=\"admin.quickImg({img:content, draft:true})\">Edit</button> <button class=\"btn btn-warning view-btn\" ng-show=isPub(content) ng-click=toDraft(content)>Draft</button> <button class=\"btn btn-success view-btn\" ng-hide=isPub(content) ng-click=toPub(content)>Publish</button> <button class=\"btn btn-danger view-btn\" ng-click=\"delete(content._id, false)\">X</button></td></tr></tbody></table></div><!-- top views --></div><!-- content --><!--\n" +
    "    <div class=\"col-xs-6 col-sm-4 table-responsive tops\">\n" +
    "          <h4>Top Comments</h4>\n" +
    "          <table class=\"table table-condensed table-bordered table-hover\">\n" +
    "            <thead>\n" +
    "              <tr>\n" +
    "                <th>Likes</th>\n" +
    "                <th>User</th>\n" +
    "                <th>Post</th>\n" +
    "                <th>Link</th>\n" +
    "              </tr>\n" +
    "            </thead>\n" +
    "            <tbody>\n" +
    "              <tr ng-repeat=\"comment in comments | orderBy:'-likes' | limitTo:8\">\n" +
    "                <td>{{comment.likes}}</td>\n" +
    "                <td>{{comment.user}}</td>\n" +
    "                <td>{{comment.post.title}}</td>\n" +
    "                <td><a ng-href=\"{{comment.post.link}}\">View</a></td>\n" +
    "              </tr>\n" +
    "            </tbody>\n" +
    "          </table>\n" +
    "          <button>View All Comments</button>\n" +
    "        </div> --><!--  <div class=\"col-xs-6 col-sm-4 table-responsive tops\">\n" +
    "          <h4>Top Images</h4>\n" +
    "          <table class=\"table table-condensed table-bordered table-hover\">\n" +
    "            <thead>\n" +
    "              <tr>\n" +
    "                <th>Views</th>\n" +
    "                <th>Title</th>\n" +
    "                <th>Link</th>\n" +
    "              </tr>\n" +
    "            </thead>\n" +
    "            <tbody>\n" +
    "              <tr ng-repeat=\"image in images | orderBy:'-views' | limitTo: 8\">\n" +
    "                <td>{{image.views}}</td>\n" +
    "                <td>{{image.alt}}</td>\n" +
    "                <td><a ng-href=\"images/{{image.full}}\" class=\"strip\" data-strip-group=\"main-group\">View</a></td>\n" +
    "              </tr>\n" +
    "            </tbody>\n" +
    "          </table>\n" +
    "          <button>View All Images</button>\n" +
    "        </div> -->"
  );


  $templateCache.put('app/base/base.html',
    "<nav class=\"navbar navbar-default navbar-fixed-top\"><div class=container><div class=navbar-header><button type=button class=\"navbar-toggle collapsed\" data-toggle=collapse data-target=#navbar aria-expanded=false aria-controls=navbar><span class=sr-only>Toggle navigation</span> <span class=icon-bar></span> <span class=icon-bar></span> <span class=icon-bar></span></button> <a class=navbar-brand href=/#/home>Digitally Defined</a></div><div id=navbar class=\"navbar-collapse collapse\"><ul class=\"nav navbar-nav\"><li class=active><a href=/#/home>Home</a></li><li><a href=http://brentondurkee.com>Resume</a></li><li class=navbar-image><a href=/#/images>Images</a></li></ul><ul class=\"nav navbar-nav navbar-right\"><li><button ng-show=isAdmin() class=\"btn btn-default navbar-btn admin\" ng-click=logOn()>Admin Page</button></li><li><button class=\"btn btn-default navbar-btn admin\" ng-show=isLoggedIn() ng-click=logout()>Log Out</button></li></ul></div><!--/.nav-collapse --></div></nav><div class=container><div class=jumbotron id=top><h1 class=title>Digitally Defined</h1><p class=lead>Living a life of curiosity and exploration.</p></div><ui-view autoscroll=false></ui-view></div><footer class=footer><p><a href=#top>Back to top</a></p><p ng-show=adminLink()><a ng-click=logOn()>Admin Login</a></p></footer>"
  );


  $templateCache.put('app/base/home/home.html',
    "<!-- row --><div class=row><!-- content column --><div class=col-sm-10><!-- cotent row --><div class=row><ol ng-show=tagFilt class=breadcrumb><li><a ui-sref=\"base.home({specTag: ''})\">All</a></li><li class=active>{{tagFilt}}</li></ol><!-- blog mix --><div class=\"col-sm-7 main\"><div class=blog-post ng-repeat=\"post in posts | dateMonth:dateFilt | tag:tagFilt | orderBy:predicate:reverse | offset:visiblePosts | limitTo:5\" ng-show=extendPost($index)><h2 class=blog-title><a ng-href=post/{{post.link}}>{{post.title}}</a></h2><p class=blog-meta>{{post.date | date:'MMMM dd yyyy'}} | Tags:<a ui-sref=\"base.home({specTag: tag})\" ng-repeat=\"tag in post.tags\">{{tag}}{{comma($last)}}</a></p><p ng-bind-html=trustHtml(postSmall(post))></p><div ng-switch=post.visibleMore><a ng-switch-when=true ng-href=post/{{post.link}}><p class=readmore>Read More<br><i class=\"fa fa-4x fa-ellipsis-h\"></i></p></a><hr ng-switch-when=false></div></div><!-- /.blog-post --></div><!-- end blog mix --><!-- picture mixed --><div class=\"col-sm-5 main img-main\"><button type=button class=image-button ng-repeat=\"img in images | dateMonth:dateFilt | tag:tagFilt | orderBy:predicate:reverse | offset:visibleImages | limitTo:10\" ng-click=viewImg($index) class=\"btn btn-default\"><img class=img-responsive ng-src=assets/images/{{img.thumb}}></button></div><!-- end picture mixed --></div><!-- end content row --><div class=row><!-- full blog --><div class=\"col-sm-12 main\"><div class=blog-post-full ng-repeat=\"post in posts | dateMonth:dateFilt | tag:tagFilt | orderBy:predicate:reverse | offset:visiblePosts | limitTo:5\" ng-hide=extendPost($index)><h2 class=blog-title><a ng-href=post/{{post.link}}>{{post.title}}</a></h2><p class=blog-meta>{{post.date | date:'MMMM dd yyyy'}} | Tags:<a ui-sref=\"base.home({specTag: tag})\" ng-repeat=\"tag in post.tags\">{{tag}}{{comma($last)}}</a></p><p ng-bind-html=trustHtml(postMid(post))></p><div ng-switch=post.visibleMore><a ng-switch-when=true ng-href=post/{{post.link}}><p class=readmore>Read More<br><i class=\"fa fa-4x fa-ellipsis-h\"></i></p></a><hr ng-switch-when=false></div></div><nav><ul class=pager><li><a href=home/#top ng-click=\"adjust(-5, -10)\" ng-hide=\"adjustCheck(-5, visiblePosts)\">Previous</a></li><li><a href=home/#top ng-hide=\"adjustCheck(5, visiblePosts)\" ng-click=\"adjust(5, 10)\">Next</a></li></ul></nav></div><!-- end full blog --></div></div><!-- content column --><!-- sidebar column --><div class=\"col-sm-2 blog-sidebar\"><div class=sidebar-module><h4>About</h4><p>I enjoy coding, computers, boardgames, books, learning, and many more geeky and technical things, and I go forward with the full pleasure and acceptance of the fact that computers, smartphones, and the internet make my life easier and are increasingly intergrated into my \"real world\" life. Some people may find this daunting, but I thrive in it.</p></div><div class=sidebar-module><h4>Images</h4><p><a href=images>View all images in grid format</a></p></div><div class=sidebar-module><h4>Archives</h4><ol class=list-unstyled><li><button ng-click=dateFilter(-1)>All</button></li><!-- <li><button ng-click=\"dateFilter(0)\">January </button></li>\n" +
    "        <li><button ng-click=\"dateFilter(1)\">February </button></li>\n" +
    "        <li><button ng-click=\"dateFilter(2)\">March </button></li> --><li><button ng-click=dateFilter(3)>April</button></li><!-- <li><button ng-click=\"dateFilter(4)\">May </button></li>\n" +
    "        <li><button ng-click=\"dateFilter(5)\">June </button></li>\n" +
    "        <li><button ng-click=\"dateFilter(6)\">July </button></li>\n" +
    "        <li><button ng-click=\"dateFilter(7)\">August </button></li>\n" +
    "        <li><button ng-click=\"dateFilter(8)\">September </button></li>\n" +
    "        <li><button ng-click=\"dateFilter(9)\">October </button></li>\n" +
    "        <li><button ng-click=\"dateFilter(10)\">November </button></li>\n" +
    "        <li><button ng-click=\"dateFilter(11)\">December </button></li> --></ol></div><div class=sidebar-module ng-hide=isLoggedIn()><h4>Log In</h4><form class=form name=form ng-submit=login(form) novalidate><label for=inputEmail class=sr-only>Email address</label><input type=email name=email class=form-control ng-model=user.email placeholder=\"Email address\" required><label for=inputPassword class=sr-only>Password</label><input type=password name=password class=form-control ng-model=user.password placeholder=Password required><div class=\"form-group has-error\"><p class=help-block ng-show=\"form.email.$error.required && form.password.$error.required && submitted\">Please enter your email and password.</p><p class=help-block ng-show=\"form.email.$error.email && submitted\">Please enter a valid email.</p><p class=help-block>{{ errors.other }}</p></div><button class=\"btn btn-primary btn-block\" type=submit>Sign in</button> <button class=\"btn btn-default btn-block\" ui-sref=register>Register</button></form></div></div><!-- end sidebar column --></div><!-- end row -->"
  );


  $templateCache.put('app/base/images/images.html',
    "<!-- row --><div class=row><!-- content column --><div class=col-sm-12><ol class=breadcrumb><li><a href=home>Home</a></li><li class=active>Images</li></ol><div class=row><!-- image grid --><div class=\"col-sm-12 img-main\"><p class=img-pre-text>Click image for Full-size Gallery</p><button type=button class=img-image-button ng-repeat=\"image in images | orderBy:'-date'\" ng-click=viewImg($index) class=\"btn btn-default\"><img class=img-img-responsive ng-src=assets/images/{{image.thumb}}></button></div></div></div><!-- content column --></div><!-- end row -->"
  );


  $templateCache.put('app/base/post/post.html',
    "<!-- row --><div class=row><!-- content column --><div class=col-sm-12><!-- cotent row --><div class=row><ol class=breadcrumb><li><a href=/#/home>Home</a></li><li class=active>{{post.title}}</li></ol><!-- full blog --><div class=\"col-sm-12 main\"><div class=blog-post style=\"height: auto\"><h2 class=blog-title>{{post.title}}</h2><p class=blog-meta>{{post.date | date:'MMMM d yyyy'}}</p><p ng-bind-html=trustHtml(full(post))></p><hr><ul class=tags-list>Tags:<li ng-repeat=\"tag in post.tags\"><a ui-sref=\"base.home({specTag: tag})\">{{tag}}{{comma($last)}}</a></li></ul></div><div class=comments><h2 class=comment-header>Comments</h2><blockquote ng-repeat=\"comment in post.comments\"><p class=comment-text>{{comment.content}}<span class=comment-user><i class=\"fa fa-lg fa-chevron-right\"></i> {{comment.author}}</span></p></blockquote><form ng-show=isLoggedIn() ng-submit=addComment()><h3>Create new Comment</h3><div class=form-group><label class=sr-only for=content>Comment Text:</label><textarea rows=2 class=form-control placeholder=\"Comment Text\" id=content ng-model=content></textarea><input ng-model=dateTime type=hidden></div><button type=submit class=\"btn btn-primary btn-center\">Submit</button></form><form ng-hide=isLoggedIn() class=form name=form ng-submit=login(form) novalidate><h4>Log In to Comment</h4><label for=inputEmail class=sr-only>Email address</label><input type=email name=email class=form-control ng-model=user.email placeholder=\"Email address\" required><label for=inputPassword class=sr-only>Password</label><input type=password name=password class=form-control ng-model=user.password placeholder=Password required><div class=\"form-group has-error\"><p class=help-block ng-show=\"form.email.$error.required && form.password.$error.required && submitted\">Please enter your email and password.</p><p class=help-block ng-show=\"form.email.$error.email && submitted\">Please enter a valid email.</p><p class=help-block>{{ errors.other }}</p></div><button class=\"btn btn-primary btn-block\" type=submit>Sign in</button> <button class=\"btn btn-default btn-block\" ui-sref=register>Register</button></form></div></div></div><!-- end full blog --></div></div><!-- content column --><!-- sidebar column --><!-- end row -->"
  );


  $templateCache.put('app/register/register.html',
    "<div class=container><form class=form-signin name=form ng-submit=register(form) novalidate><h2 class=form-signin-heading>Register</h2><div class=form-group ng-class=\"{ 'has-success': form.name.$valid && submitted,\n" +
    "                                            'has-error': form.name.$invalid && submitted }\"><label>Username</label><input name=name class=form-control ng-model=user.name required mongoose-error><p class=help-block ng-show=\"form.name.$error.required && submitted\">A name is required</p><p class=help-block ng-show=form.name.$error.mongoose>{{ errors.name }}</p></div><div class=form-group ng-class=\"{ 'has-success': form.email.$valid && submitted,\n" +
    "                                            'has-error': form.email.$invalid && submitted }\"><label>Email</label><input type=email name=email class=form-control ng-model=user.email required mongoose-error><p class=help-block ng-show=\"form.email.$error.email && submitted\">Doesn't look like a valid email.</p><p class=help-block ng-show=\"form.email.$error.required && submitted\">What's your email address?</p><p class=help-block ng-show=form.email.$error.mongoose>{{ errors.email }}</p></div><div class=form-group ng-class=\"{ 'has-success': form.password.$valid && submitted,\n" +
    "                                            'has-error': form.password.$invalid && submitted }\"><label>Password</label><input type=password name=password class=form-control ng-model=user.password ng-minlength=3 required mongoose-error><p class=help-block ng-show=\"(form.password.$error.minlength || form.password.$error.required) && submitted\">Password must be at least 3 characters.</p><p class=help-block ng-show=form.password.$error.mongoose>{{ errors.password }}</p></div><div><button class=\"btn form-btn btn-inverse btn-lg btn-login\" type=submit>Register</button> <a class=\"btn btn-lg btn-google btn-danger\" href=\"\" ng-click=\"loginOauth('google')\"><i class=\"fa fa-google-plus\"></i> Connect with Google+</a></div></form></div><!-- /container -->"
  );


  $templateCache.put('app/signin/signin.html',
    "<div class=container><form class=form-signin name=form ng-submit=login(form) novalidate><h2 class=form-signin-heading>Please sign in</h2><label for=inputEmail class=sr-only>Email address</label><input type=email name=email class=form-control ng-model=user.email placeholder=\"Email address\" required autofocus><label for=inputPassword class=sr-only>Password</label><input type=password name=password class=form-control ng-model=user.password placeholder=Password required><div class=\"form-group has-error\"><p class=help-block ng-show=\"form.email.$error.required && form.password.$error.required && submitted\">Please enter your email and password.</p><p class=help-block ng-show=\"form.email.$error.email && submitted\">Please enter a valid email.</p><p class=help-block>{{ errors.other }}</p></div><button class=\"btn form-btn btn-lg btn-primary btn-block\" type=submit>Sign in</button></form></div><!-- /container -->"
  );

}]);
