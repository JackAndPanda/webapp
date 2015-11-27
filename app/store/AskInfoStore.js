
Ext.define('AskApp.store.AskInfoStore',{
	extend:'Ext.data.Store',
	config: {
		// model: 'AskApp.model.AskModel',
		 fields: [ 
		    	 	{name: 'id', type: 'auto'},
		    	    {name: 'title', type: 'string'},
		    	    {name: 'askclass ', type: 'string'},
		    	    {name: 'classname', type: 'string'},
		    	   {name: 'count', type: 'string'},
		    	   {
		               name:'message',
		               convert: function(v, record) {return record.raw.answer[0].message; }
		           }
		    	   //{name:'answer',type:'auto'}
		    	 ],
	
        //filter the data using the firstName field
//        sorters : [{
//						property : 'id',
//						direction : 'desc'
//					}],

            //autoload the data from the server
			
       		//autoLoad: false,
        	 proxy: {
               		 type: 'jsonp',
              	 	 url: Global.Website+'ask/show',
               		 reader: {
				            type: "json",
				            rootProperty: "yi18"
				        }
           	 },
					
			
	    listeners : {
	    	
	    	beforeload : {
					fn : function(store, options) {
							var id = store.getStoreId()  ;
							
							store.getProxy().setExtraParam('id', id);
					}
	    	}
		}
	}
});