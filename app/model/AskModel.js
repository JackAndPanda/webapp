 Ext.define('AskApp.model.AskModel', {
     extend: 'Ext.data.Model',
     config: {
     	
     	

    	 fields: [ 
    	 	{name: 'id', type: 'auto'},
    	    {name: 'title', type: 'string'},
    	    {name: 'askclass ', type: 'string'},
    	    {name: 'classname', type: 'string'},
    	   {name: 'count', type: 'string'}
//    	   {
//               name:'message',
//               convert: function(v, record) {return record.raw.answer.message; }
//           }
    	  //{name:'answer',type:'auto'}
    	 ]
     }
 });