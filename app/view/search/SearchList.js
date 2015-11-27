
/**
 * 新闻页面
 */
Ext.define('AskApp.view.search.SearchList', 
{
	extend: 'Ext.List',
	xtype: 'searchlist',
	
    config: {
        	
       
    	    store: 'SearchInitStore',
							
			itemTpl: '<div class="contact">{title}</div>',
			emptyText: '没有找到数据,请检查条件！',
			plugins: {
				            xclass: 'Ext.plugin.ListPaging', // Reference plugin by class
				           autoPaging: true,
				            loadMoreText:'更多……',
				            noMoreRecordsText:'没有更多记录了'
				        }
				        

			
        
      
        }
	
});