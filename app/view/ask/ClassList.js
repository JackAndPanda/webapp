
/**
 * 新闻页面
 */
Ext.define('AskApp.view.ask.ClassList', 
{
	extend: 'Ext.List',
	xtype: 'classlist',
	
    config: {
        	
       
    	    store: 'ClassListStore',
							
			itemTpl: '<div class="contact">{name}</div>'
//			emptyText: '没有找到数据,请检查条件！',
//			plugins: {
//				            xclass: 'Ext.plugin.ListPaging', // Reference plugin by class
//				           autoPaging: true,
//				            loadMoreText:'更多……',
//				            noMoreRecordsText:'没有更多记录了'
//				        }
				        
//				        ,
//							
//		
//			items:[
//				        	{
//				              docked: 'top',
//				              xtype: 'titlebar',
//				              title: '医药吧-资讯',
//				              items:[
//				               {
//						            iconCls: 'star',
//						            align: 'left'
//						        }
//				              ]
//				              
//				          }
//          ]
			
        
      
        }
	
});