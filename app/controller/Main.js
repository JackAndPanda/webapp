Ext.define('AskApp.controller.Main', {
    extend: 'Ext.app.Controller',

    config: {
        refs: {
            main: 'main',
            home: 'home',
            more: 'more',
            asklist:'asklist',
            search:'search',
            searchlist:'searchlist',
            askclasslist:'askclasslist',
            classlist:'classlist',
            	
            keyword:'#keyword'
       
        },
   		control:{
   			main:{
   			activeitemchange:function()
   				{
   			
   			
   				}
   			},
   			asklist: {
                itemtap: 'onAskListSelect'
            },
            askclasslist:{
            	itemtap:'onAskClassListSelect'
            },
           classlist: {
                itemtap: 'onClassListSelect'
            },
              
            searchlist:{
            	itemtap:'onSearchListSelect'
            },
            
            'button[action=search]': {
                tap: function(){ 
                	var value = this.getKeyword().getValue( );
                	
                	//alert(value);
                	if(value=="")
                	{
                		Ext.Msg.alert('提示', '请输入查询的内容.');
                		return;
                	}
                	
                	var store = Ext.create('AskApp.store.SearchListStore');
              		
               		store.getProxy().setExtraParam('keyword', value);
              		store.setAutoLoad(true);
               		this.getSearchlist().setStore(store);
                	this.getSearchlist().getStore().load();
                }
            }
            
   			
    	
   	 	}
    },

  
    
    
    /**
     * 自动运行
     */
     launch: function(){ 
     	
     	
     	 //this.getMain().setActiveItem(3);
        //this.getMain().add(Ext.create('yi18app.view.news.Index',{id:'searchPie',title:'12'}));
    		//var store= Ext.create('yi18app.store.NewsInfoStore',{autoLoad: true,storeId:'1'});
    	 
      	
     },
      onAskListSelect: function(list, index, node, record) {
     
       		//alert(record.get('id'));
        	var store= Ext.create('AskApp.store.AskInfoStore',{autoLoad: true,storeId:record.get('id')});
			var askshow = Ext.create('AskApp.view.ask.AskShow',{title:record.get('title'),store:store});	
			this.getHome().push(askshow);
 
    }
    ,
    onAskClassListSelect: function(list, index, node, record) {
        
   		//alert(record.get('id'));
    	var store= Ext.create('AskApp.store.AskInfoStore',{autoLoad: true,storeId:record.get('id')});
		var askshow = Ext.create('AskApp.view.ask.AskShow',{title:record.get('title'),store:store});
//
	
		this.getMore().push(askshow);
   
    
}
,
      onClassListSelect: function(list, index, node, record) {
      
        var store= Ext.create('AskApp.store.AskListStore',{autoLoad: true,storeId:record.get('id')});
		var askList = Ext.create('AskApp.view.ask.AskClassList',{title:record.get('name'),store:store});
//    
        this.getMore().push(askList);
         
        
    },
     
     
      onSearchListSelect: function(list, index, node, record) {
     
    	//  alert(record.get('id'));
    	  var store= Ext.create('AskApp.store.AskInfoStore',{autoLoad: true,storeId:record.get('id')});
			var askshow = Ext.create('AskApp.view.ask.AskShow',{title:record.get('title'),store:store});
//  
		
			this.getSearch().push(askshow);
                	
//                		var store= Ext.create('yi18app.store.NewsInfoStore',{autoLoad: true,storeId:record.get('id')});
//					var newsshow = Ext.create('yi18app.view.news.NewsShow',{title:"综合信息正文",store:store});
//   					 this.getHome().push(newsshow);
                	
      	
 
    }
});