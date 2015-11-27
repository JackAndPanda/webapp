Ext.define('AskApp.view.Main', {
    extend: 'Ext.tab.Panel',
    xtype: 'main',
    requires: [
        'Ext.TitleBar',
        'Ext.Video'
    ],
    config: {
        tabBarPosition: 'bottom',

        items: [
            {
                title: '主页',
                iconCls: 'home',
                xtype:'home'
            },
            {
                title: '更多分类',
                iconCls: 'more',
                xtype: 'more'
            }
            ,
            {
                title: '搜索直达',
                iconCls: 'search',
                xtype: 'search'
     
            }
            ,
            {
                title: '关于我们',
                iconCls: 'user',
                xtype: 'about'
     
            }
        ]
    }
});
