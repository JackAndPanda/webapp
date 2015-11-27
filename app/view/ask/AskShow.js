
/**
 * 新闻页面
 */
Ext.define('AskApp.view.ask.AskShow', 
{
	extend: 'Ext.DataView',
	xtype: 'askshow',
	
    config: {
        	
 			 
			
			    itemTpl: '<br><div style="font-size:12pt;font-weight: bold;" align="center">{title}</div>' +
			    		'<div style="color:#666;font-size:10pt;" align="center">{author} 分类: {classname} ({count}阅读)</div>' +
			    		'<HR style="FILTER: alpha(opacity=100,finishopacity=0,style=3)" width="98%" color=#aaa SIZE=2>' +
			    		'<div>{message}</div>'
        }
        
  
	
});