

/**
 * 关于
 */
Ext.define('AskApp.view.about.Index', 
{
	extend: 'Ext.DataView',
	xtype: 'about',
	
    config: {  

        styleHtmlContent: true,
        scrollable: true,
        items:[
        	{
              docked: 'top',
              xtype: 'titlebar',
              title: Global.Title+'开发者',
              items:[
               {
		            iconCls: 'user',
		            align: 'right'
		        }
              ]
              
          }
         
        ]
		,
		html: [
		       '<br>',
		       '<b>医药吧网：</b><br>',
		       '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;是由个人工作室2013年3月所创建，服务于医药健康信息的综合信息平台。医药吧网站的目标就是以医药健康数据为中心的一个数据服务网站， 同时开放数据提供接口API和移动终端服务。',
		       '<br>',
		       '<b>医药吧开发者：</b><br>',
		       '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;基于<a href="http://www.yi18.net" target="_blank">www.yi18.net</a>网站而成立的技术开发者。我们的目标是打造医药健康智能系统，虽然目标难以完成。如过有你的加入，我们可能更加的强大，欢迎你的加入！',
		       '<br><b>成员联系信息：</b>',
		       '<br>邮箱: mail.yi18.net@gmail.com ',
		       '<br>博客: <a href="http://blog.yi18.net" target="_blank">http://blog.yi18.net</a>',
		       '<br>QQ群：277916496 ',
		       '<br>新浪微博：<a href="http://weibo.com/u/3914154979" target="_blank">@医药吧网</a>'
		       
		       ].join("")
        }
	
});