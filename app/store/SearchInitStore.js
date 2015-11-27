
Ext.define('AskApp.store.SearchInitStore',{
	extend:'Ext.data.Store',
	config: {
		 model: 'AskApp.model.AskModel',
	
        //filter the data using the firstName field
//        sorters : [{
//						property : 'id',
//						direction : 'desc'
//					}],

            //autoload the data from the server
		    pageSize:20,
       		autoLoad: true,
        	 proxy: {
               		 type: 'jsonp',
              	 	 url: Global.Website+'ask/list',
               		 reader: {
				            type: "json",
				            rootProperty: "yi18"
				        }
           	 },
					
			listeners : {
				
				beforeload : {
						fn : function(store, options) {
								var id = store.getStoreId()  ;
								store.getProxy().setExtraParam('type', 'scount');
								store.getProxy().setExtraParam('id', id);
						}
				}
			}
	}
});