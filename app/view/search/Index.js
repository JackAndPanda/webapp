

/**
 * 主页信息
 */
Ext.define('AskApp.view.search.Index', 
{
	extend: 'Ext.navigation.View',
	xtype: 'search',

    config: {
        	defaultBackButtonText :'返回',
        	items:[
        			
        			{
        				title:'搜索结果',
        			   xtype:'searchlist'
        			   
        			},

     		       {
     				docked: 'bottom',
                  	 xtype: 'toolbar',
     				    ui:'light',
     				    layout: {
                             pack: 'center',
                             align: 'center'
                         },
     					items:[
     					     
     				    {
     				       
     				      xtype: 'searchfield',
     				      name: 'search',
     				      id:'keyword',
     				      placeHolder: '请输入查询的信息' ,
     				      autoComplete:'on'
     				     
     				    }   ,
     				    { xtype: 'button',
     				    	//text:'鎼滅储' ,
     				    	iconCls:'search',
     				    	ui:'confirm',
     				    	action:'search'
     				    	//width:40
     				    }
     				    ]
     			
     			
                 }
     			
     			
        			
        			]
        
        }
	
});