//konami code plugin
(function ($) {

    $.fn.konami = function (callback, code) {
        if (code == undefined) code = "38,38,40,40,37,39,37,39,66,65"; //Super secret!

        return this.each(function () {
            var kkeys = [];
            $(this).keydown(function (e) {
                kkeys.push(e.keyCode);
                if (kkeys.toString().indexOf(code) >= 0) {
                    $(this).unbind('keydown', arguments.callee);
                    callback(e);
                }
            });
        });
    }

})(jQuery);

//Custom closure
(function($, ko, data){

	//IE checks
	function getInternetExplorerVersion() {
	    var rv = -1; // Return value assumes failure.
	    if (navigator.appName == 'Microsoft Internet Explorer') {
	        var ua = navigator.userAgent;
	        var re = new RegExp("MSIE ([0-9]{1,}[\.0-9]{0,})");
	        if (re.exec(ua) != null)
	            rv = parseFloat(RegExp.$1);
	    }
	    return rv;
	}
	function isInvalidIEVersion() {
		var ver = getInternetExplorerVersion();
		if (ver > -1 && ver < 9) {
			$('html').addClass("ltIE9");
			return true;
		}
		return false;
	}

	//On page load
	$(function(){

		//Quit if using an IE we don't like
		if (isInvalidIEVersion()) return;

		//Create and bind the viewmodel
		var vm = new tft.skilltree.Calculator(data);
		ko.applyBindings(vm);

		//apply konami code plugin
		$(window).konami(function () { vm.open(); vm.godMode(); });

		//Allow a split second for binding before turning on animated transitions for the UI
		setTimeout(function(){
			$('.page').addClass('animated');
		}, 50);
	});


})(window.jQuery, window.ko, {
	learnTemplate: '学习 {n} 来解锁.',
	portraitPathTemplate: 'img/portrait-1.jpg',
	numPortraits: 1,
	defaultStats: {
		'魅力值': 1
		, '灵巧值': 1
		, '秃头值': 1
	},
	skills: [
		{
			id: 1
			, title: 'Microsoft Excel'
			, description: '最基础最通用的数据分析与可视化工具。'
			, rankDescriptions: [
				'你需要知道各种方程式，如何转换数据格式，VLookup，Pivot Table，基础的线性回归以及Add-In里面的Solver'
				, '你将进入编程世界，并且接触到大数据，有着更好的可视化表现力和灵活度.'
			]
            , links: [
                {
                    label: 'Excel 官方教程'
                    , url: 'https://support.office.com/zh-cn/excel'
                }
                , {
                    label: 'ExcelHome学习论坛'
	                , url: 'http://www.excelhome.net'
                }
            ]
			, maxPoints: 2
			, stats: [
        {
					title: '魅力值'
					, value: 1
				}
				,{
					title: '秃头值'
					, value: 1
				}
        ,{
					title: '灵巧值'
					, value: 3
				}
			]
		},

		{
			id: 2
			, title: 'Photoshop'
			//, dependsOn: [1]
            , links: [
                {
                    label: 'Adobe Photoshop 学习和支持'
	                , url: 'https://helpx.adobe.com/cn/support/photoshop.html'
                }
            ]
			, maxPoints: 2
			, stats: [
				{
					title: '魅力值'
					, value: 3
				},{
					title: '灵巧值'
					, value: 2
				}
			]
            , rankDescriptions: [
                '字体修改，蒙版图层概念，内容识别填充，掌握各种基本工具'
                , '为其他平台按需求提供自定义图标，对各类图像进行排版和修改'
            ]
            , description: '目前公认的最好的通用平面美术设计软件'
			, talents: ['图像缔造者']
		},
		{
			id: 3
			, title: 'Lightroom'
			, dependsOn: [2]
            , links: [
                {
                    label: 'Lightroom官方教程'
	                , url: 'https://helpx.adobe.com/cn/lightroom-classic/user-guide.html'
                }
            ]
			, maxPoints: 2
            , rankDescriptions: [
                '熟练修改别人的预设'
                , '能够有效管理大量照片，灵活使用各种工具，能够形成自己的风格并且能够保证风格稳定'
            ]
            , description: '成为摄影师时顺便掌握的图像管理和处理软件'
			, stats: [
				{
					title: '魅力值'
					, value: 2
				}
				, {
					title: '灵巧值'
					, value: 1
				}
			]
		},
		{
			id: 4
			, title: '视频制作'
			, dependsOn: [2],
      maxPoints: 2
            , description: '21世纪新人类必不可少的技能'
			, stats: [
				{
					title: '魅力值'
					, value: 10
				}
			],
      rankDescriptions: [
          'Final Cut Pro或者Adobe Premiere Pro的基础剪辑，配乐，打字幕'
          , '掌握Motion或者Adobe After Effects来进行特效处理，比如动态跟踪'
      ]
		},
		{
			id: 5
			, title: '原型设计'
			, dependsOn: [4]
            , links: [
                {
                    label: 'Dribbble设计参考'
	                , url: 'https://dribbble.com'
                }
                , {
                    label: '墨刀'
                    , url: 'https://modao.cc'
                },
                {
                    label: 'Sketch'
                    , url: 'https://modao.cc'
                }
            ]
			, maxPoints: 2
            , rankDescriptions: [
                '能够发现、模仿、修改别人的作品，并且根据需求通过PPT设计出低保真原型'
                , '能够设计出自己的东西，并且根据需求通过墨刀、Sketch和Photoshop设计出可交互的高保真原型'
            ]
            , description: '原型是一种让用户提前体验产品、交流设计构想、展示复杂系统的方式，原型设计可以让开发者看到整个产品的雏形，然后可以进行进一步的设计与修改'
			, talents: ['原型炼金术士']
			, stats: [
				{
					title: '魅力值'
					, value: 2
				}
				, {
					title: '灵巧值'
					, value: 1
				}
			]
		},

		{
			id: 6
			, title: 'Microsoft PowerPoint'
			//, dependsOn: [1]
            , links: [
                {
                    label: 'iSlide插件（暂时无Mac）'
	                , url: 'https://www.islide.cc'
                }
            ]
            , description: '传说中的PPT，不仅仅能做演示文稿，还能P图、创作图标，甚至还能完成高保真的原型设计与动画'
			, stats: [
        {
					title: '秃头值'
					, value: 1
				},
        {
					title: '魅力值'
					, value: 1
				}
				, {
					title: '灵巧值'
					, value: 3
				}
			]
		},
		{
			id: 7
			, title: 'Tableau'
			, dependsOn: [6]
            , links: [
                {
                    label: '《用数据讲故事 Storytelling with Data》'
	                , url: 'https://book.douban.com/subject/27108685/'
                }
                , {
                    label: '麒桦的作品集'
                    , url: 'https://public.tableau.com/profile/qihua.zhu#!/'
                }
            ]
            , description: '一款强大易用的数据分析和可交互的可视化软件，很流行并将更加流行'
			, stats: [
        {
					title: '秃头值'
					, value: 2
				},
        {
					title: '魅力值'
					, value: 3
				}
				, {
					title: '灵巧值'
					, value: 3
				}
			]
			, talents: ['数据幻术师']
		},

		{
			id: 8
			, title: 'SQL结构数据管理'
			, dependsOn: [1]
      			, maxPoints: 2
            , links: [
                {
                    label: '《MySQL Cookbook 中文版》'
	                , url: 'https://book.douban.com/subject/3045359/'
                }
                , {
                    label: '《The Language of SQL》'
                    , url: 'https://book.douban.com/subject/26909896/'
                }
                , {
                    label: '《The Kimball Group Reader》'
                    , url: 'https://book.douban.com/subject/26793122/'
                }
            ]
            , description: '能够根据需求构建数据库系统，支持数据工作流和报告体系结构'
			, stats: [
				{
					title: '灵巧值'
					, value: 2
				},
        {
          title: '秃头值'
          , value: 4
        }
			]
		},
		{
			id: 9
			, title: '信息架构'
			, dependsOn: [8]
			, maxPoints: 2
            , rankDescriptions: [
                '你变强了'
                , '你更强了'
            ]
            , description: '企业将来自许多不同来源的数据组合在一起，包括电子表格，数据库和数据仓库。随着数量，种类，速度或数据的增加，更多企业数据存储在基于云的分布式数据存储中。'
			, stats: [
				{
					title: '灵巧值'
					, value: 3
				}
				, {
					title: '秃头值'
					, value: 3
				}
			]
			, talents: ['架构守护者']
		},
		{
			id: 10
			, title: '云端数据库应用入门'
			, dependsOn: [9]
      			, maxPoints: 2
			, stats: [
				{
					title: '灵巧值'
					, value: 6
				},
        {
					title: '秃头值'
					, value: 8
				}
			]
		},

		{
			id: 13
			, title: '统计学'
			//, dependsOn: [1]
            , links: [
                {
                    label: '可汗统计学公开课（网易）'
                    , url: 'http://open.163.com/special/Khan/khstatistics.html'
                }
            ]
            , description: '统计学是在数据分析的基础上，研究测定、收集、整理、归纳和分析反映数据数据，以便给出正确消息的科学。'
			, stats: [
				{
					title: '秃头值'
					, value: 3
				}
			]
		},
		{
			id: 14
			, title: '线性代数等'
      			, maxPoints: 4
			, dependsOn: [13]
            , description: '众所周知，线性代数（linear algebra）是关于向量空间和线性映射的一个数学分支。这个是主要需要学的，当然，更多的相关数学只需要自己探寻了。'
			, stats: [
				{
					title: '秃头值'
					, value: 4
				}
				, {
					title: '灵巧值'
					, value: 1
				}
			]
			, talents: ['高等数学门徒']
		},

		{
			id: 11
			, title: 'Python数据分析与可视化'
			, dependsOn: [1]
            , links: [
                {
                    label: 'w3schools.com Python'
	                , url: 'https://www.w3schools.com/python/default.asp'
                }
                ,{
		            label: '《Python数据分析》'
                    , url: 'https://book.douban.com/subject/26274624/'
                }
                ,{
                    label: 'Data Analyst in Python - Dataquest.io'
                    , url: 'https://www.dataquest.io/path/data-analyst/'
                }
            ]
			, maxPoints: 2
            , rankDescriptions: [
                '编写程序以清理，过滤，聚合，重组和组合数据；从结构化和非结构化源中加载数据；执行基本的探索性数据分析；将科学方法原则和可重复报告应用于开发和基于代码的解决方案的介绍。'
                , '学习各种Python库，自如运用各类API，衔接其他数据结构'
            ]
            , description: 'Python是一种广泛使用的解释型、高级编程、通用型编程语言，广为数据分析所用，有着很大丰富的第三方库。'
			, stats: [
				{
					title: '秃头值'
					, value: 2
				},
        {
					title: '灵巧值'
					, value: 4
				}
			]
		},
		{
			id: 12
			, title: 'Python面向对象编程'
			, dependsOn: [11]
			, maxPoints: 2,
      links: [
          {
              label: 'Dataquest.io Python高级编程'
            , url: 'https://www.dataquest.io/course/python-programming-advanced/'
          }]
            , rankDescriptions: [
                '你创造了一个对象。'
                , '你可以和对象做你喜欢和不喜欢做的东西了。'
            ]
            , description: '面向对象程序设计（Object-oriented programming，缩写：OOP）是种具有物件概念的程式编程典范，同时也是一种程序开发的抽象方针。'
			, stats: [
				{
					title: '秃头值'
					, value: 4
				}
				, {
					title: '灵巧值'
					, value: 3
				}
			]
			, talents: ['神之傀儡']
		},

		{
			id: 15
			, title: 'Python机器学习'
			, dependsOn: [12, 14]
      , links: [
          {
              label: '吴恩达机器学习课程'
              , url: 'https://study.163.com/course/courseMain.htm?courseId=1004570029'
          }
      ]
      , description: '机器学习算法是一类从数据中自动分析获得规律，并利用规律对未知数据进行预测的算法'
, stats: [
  {
    title: '秃头值'
    , value: 3
  }
  , {
    title: '灵巧值'
    , value: 4
  }
]
, talents: ['天机参悟者']
},
		{
			id: 16
			, title: '深度学习的概念与应用'
			, dependsOn: [15]
      			, maxPoints: 5
            , links: [
              {
              label: '前沿代码和论文展示'
                  , url: 'https://paperswithcode.com/sota'
              }
            ]
            , description: '深度学习是机器学习中一种基于对数据进行表征学习的算法。观测值（例如一幅图像）可以使用多种方式来表示，如每个像素强度值的向量，或者更抽象地表示成一系列边、特定形状的区域等。而使用某些特定的表示方法更容易从实例中学习任务（例如，人脸识别或面部表情识别）。深度学习的好处是用非监督式或半监督式的特征学习和分层特征提取高效算法来替代手工获取特征。'
			, stats: [
				{
					title: '秃头值'
					, value: 8
				},
        {
          title: '灵巧值'
          , value: 3
        }
			]
			, talents: ['深渊凝视者']
		},
		{
			id: 17
			, title: 'AJAX & APIs'
			, dependsOn: [10, 15]
            , description: '可以获得第三方数据库的接口'
			, stats: [
				{
					title: '秃头值'
					, value: 3
				}
				,{
					title: '灵巧值'
					, value: 8
				}
			]
			, talents: ['千里耳']
		},

		{
			id: 18
			, title: 'HTML'
			, maxPoints: 2
			, rankDescriptions: [
				'知道<head>，<body>之类的是干嘛的，能够做出简单的网页和一定的调整'
				, '知道怎么把不同网页链接到一起，做出一些简单的互动'
			]
            , links: [
             	{
             		label: 'w3schools'
             		, url: 'https://www.w3schools.com/html/'
             	},

              {
             		label: '初识HTML+CSS 慕课网'
             		, url: 'https://www.imooc.com/learn/9'
             	}
            ]
            , description: '超文本标记语言(Hyper Text Markup Language)，标准通用标记语言下的一个应用。HTML 不是一种编程语言，而是一种标记语言 (markup language)，是网页制作所必备的。了解HTML不一定就得做网页，对接入第三方数据库或者使用爬虫也有益处'
			, stats: [
				{
					title: '秃头值'
					, value: 2
				},
        {
					title: '灵巧值'
					, value: 2
				}
			]
		},
		{
			id: 19
			, title: 'CSS'
			, maxPoints: 2
			, rankDescriptions: [
				'熟悉CSS格式和框模型的基础知识。'
				, '熟悉媒体查询和响应式设计，以使您的设计适应不同的设备。'
			]
			, dependsOn: [18]
            , links: [
              {
                label: '初识HTML+CSS 慕课网'
                , url: 'https://www.imooc.com/learn/9'
              }
                , {
                    label: 'CSS Tutorials'
                    , url: 'http://www.htmldog.com/guides/css/'
                }
            ]
            , description: '层叠样式表（CSS）是一种用于样式化网页的语言。 CSS规则指定HTML文档中的元素以指定表示，例如字体，颜色，间距和大小。'
			, stats: [
				{
					title: '秃头值'
					, value: 4
				},
        {
					title: '灵巧值'
					, value: 3
				}
			]
			, talents: ['织网人']
		},
		{
			id: 20
			, title: 'D3.js'
      			, maxPoints: 2
			, dependsOn: [19]
            , links: [
                {
                    label: 'Data-Driven Documents官网'
                    , url: 'https://d3js.org'
                }
            ]
            , description: 'D3.js是一个使用动态图形进行数据可视化的JavaScript程序库。与W3C标准兼容，并且利用广泛实现的SVG、JavaScript和CSS标准。'
			, stats: [
				{
					title: '魅力值'
					, value: 2
				},
        {
					title: '秃头值'
					, value: 8
				},
        {
					title: '灵巧值'
					, value: 3
				}
			]
		},
		{
			id: 21
			, title: 'JavaScript'
			, dependsOn: [18]
            , links: [
                {
                    label: 'JavaScript Tutorial'
	                , url: 'http://www.htmldog.com/guides/javascript/'
                }
                , {
                    label: 'JavaScript Tutorial 菜鸟教程'
                    , url: 'http://www.runoob.com/js/js-tutorial.html'
                }
            ]
            , description: '想要在前端设计走远一定要打的基础。'
			, stats: [
				{
					title: '秃头值'
					, value: 7
				}
			]
			, talents: ['爪哇鬼手']
		},
		{
			id: 22
			, title: '搭建网站'
			, dependsOn: [19, 21]
            , description: '把自己的网站上线吧~ 注意区分wordpress和wordpress.com'
			, stats: [
				{
					title: '秃头值'
					, value: 3
				}
				,{
					title: '魅力值'
					, value: 4
				}
			]
		},
		{
			id: 23
			, title: '数字营销'
			, dependsOn: [22]
            , description: '数字营销，就是指借助于互联网络、电脑通信技术和数字交互式媒体来实现营销目标的一种营销方式。'
            , stats: [
				{
					title: '魅力值'
					, value: 8
				}
				,{
					title: '秃头值'
					, value: 6
				}
			]
			, talents: ['心灵捕手']
		},

		{
			id: 24
			, title: 'NoSQL'
            , links: [
                {
                    label: '什么是NoSQL?'
	                , url: 'http://www.runoob.com/mongodb/nosql.html'
                }
            ]
			, maxPoints: 1
            , description: '了解什么是NoSQL和Schemaless数据结构'
            , stats: [
				{
					title: '灵巧值'
					, value: 1
				}
			]
		},
		{
			id: 25
			, title: '数据库转换'
			, dependsOn: [24]
            , links: [
              {
                  label: 'mongodb 官网'
                  , url: 'https://www.mongodb.com'
              }
            ]
			, maxPoints: 2
            , description: '尝试在结构性数据和非结构性数据之前进行转换。'
            , stats: [
				{
					title: '秃头值'
					, value: 2
				}
				,{
					title: '灵巧值'
					, value: 1
				}
			]
			, talents: ['混沌法师']
		},

		{
			id: 26
			, title: 'AI产品经理'
			, dependsOn: [4, 7, 10, 15, 22, 25]
            , description: '革命尚未成功，同志仍需努力'
			, stats: [
				{
					title: '魅力值'
					, value: 10
				}
				,{
					title: '灵巧值'
					, value: 10
				}
				,{
					title: '秃头值'
					, value: 10
				}
				,{
					title: '秃头值'
					, value: 10
				}
			]
			, talents: ['创世者']
		}

	]
});
