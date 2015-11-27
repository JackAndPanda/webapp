
Ext.define('AskApp.store.SearchListStore',{
	extend:'Ext.data.Store',
	config: {
		 model: 'AskApp.model.SearchModel',
	
        //filter the data using the firstName field
       
            //autoload the data from the server
			
       		autoLoad: false,
        	 proxy: {
               		 type: 'jsonp',
              	 	 url: Global.Website+'ask/search',
               		 reader: {
				            type: "json",
				            rootProperty: "yi18"
				        }
           	 }
					

	}
});