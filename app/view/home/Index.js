

/**
 * 主页信息
 */
Ext.define('AskApp.view.home.Index', 
{
	extend: 'Ext.navigation.View',
	xtype: 'home',

    config: {
        	defaultBackButtonText :'返回',
        	items:[
        	       
        	 
        			
        			{
        				title:Global.Title+'—最新问答',
        			   xtype:'asklist'
        			   
        			}]
        
        }
	
});