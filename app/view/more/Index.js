

/**
 * 更多分类
 */
Ext.define('AskApp.view.more.Index', 
{
	extend: 'Ext.navigation.View',
	xtype: 'more',

    config: {
        	defaultBackButtonText :'返回',
        	items:[
        			
        			{
        				title:Global.Title+'—更多分类',
        			   xtype:'classlist'
        			   
        			}]
        
        }
	
});