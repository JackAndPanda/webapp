 Ext.define('AskApp.model.SearchModel', {
     extend: 'Ext.data.Model',
     config: {
     	
     	

    	 fields: [ 
    	 	{name: 'id', type: 'auto'},
    	   {name: 'title', type: 'string'},
    	   {name: 'url', type: 'string'},
    	    {name: 'content', type: 'string'}
    	 ]
     }
 });