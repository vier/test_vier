Ext.require(['*']);
Ext.onReady(function() {
    var cw;

    function closeRegion (e, target, header, tool) {
        var region = header.ownerCt;
        newRegions.unshift(region.initialConfig);
        viewport.remove(region);
    }

    var newRegions = [{
            region: 'north',
            title: 'North 2',
            height: 100,
            collapsible: true,
            weight: -120
        }, {
            region: 'east',
            title: 'East 2',
            width: 100,
            collapsible: true,
            weight: -110
        }, {
            region: 'west',
            title: 'West 2',
            width: 100,
            collapsible: true,
            weight: -110
        }];

    var viewport = Ext.create('Ext.Viewport', {
        layout: {
            type: 'border',
            padding: 5
        },
        defaults: {
            split: true
        },
        items: [{
            region: 'west',
            collapsible: true,
            collapsed: true,
            title: 'Starts at width 30%',
            split: true,
            width: '30%',
            minWidth: 100,
            minHeight: 140,
            html: '여기는 내가 수정'
        },{
            region: 'center',
            html: 'center center',
            title: 'Center',
            minHeight: 80,
            items: [cw = Ext.create('Ext.Window', {
                xtype: 'window',
                closable: false,
                minimizable: true,
                title: 'Constrained Window',
                height: 200,
                width: 400,
                constrain: true,
                html: 'I am in a Container',
                itemId: 'center-window',
                minimize: function() {
                    this.floatParent.down('button#toggleCw').toggle();
                }
            })],
            bbar: [ 'Text followed by a spacer', ' ', {
                itemId: 'toggleCw',
                text: 'Constrained Window',
                enableToggle: true,
                toggleHandler: function() {
                    cw.setVisible(!cw.isVisible());
                }
            }, {
                text: 'Add Region',
                listeners: {
                    click: function () {
                        if (newRegions.length) {
                            var region = newRegions.pop();
                            region.tools = [ { type: 'close', handler: closeRegion }];
                            viewport.add(region);
                        } else {
                            Ext.Msg.show({
                                title: 'All added',
                                msg: 'Close one of the dynamic regions first',
                                //minWidth: Ext.Msg.minWidth,
                                buttons: Ext.Msg.OK,
                                icon: Ext.Msg.ERROR
                            });
                        }
                    }
                }
            }, {
                text: 'Change Titles',
                listeners: {
                    click: function () {
                        var panels = viewport.query('panel');
                        Ext.each(panels, function (panel) {
                            panel.setTitle(panel.title + '!');
                        })
                    }
                }
            }]
        },{
            region: 'east',
            collapsible: true,
            collapsed: true,
            floatable: true,
            split: true,
            width: 200,
            minWidth: 120,
            minHeight: 140,
            title: 'SNS',
            layout: {
                type: 'vbox',
                padding: 5,
                align: 'stretch'
            },
            items: [{
                xtype: 'textfield',
                labelWidth: 70,
                fieldLabel: 'Text field'
            }, {
                xtype: 'component',
                html: 'I am floatable'
            }]
        },{
            region: 'south',
            collapsible: true,
            collapsed: true,
            split: true,
            height: 200,
            minHeight: 120,
            title: 'South',
            layout: {
                type: 'border',
                padding: 5
            },
            items: [{
                title: 'South Central',
                region: 'center',
                minWidth: 80,
                html: 'South Central'
            }, {
                title: 'South Eastern',
                region: 'east',
                flex: 1,
                minWidth: 80,
                html: 'South Eastern',
                split: true,
                collapsible: true
            }, {
                title: 'South Western - not resizable',
                region: 'west',
                flex: 1,
                minWidth: 80,
                html: 'South Western<br>I collapse to nothing',
                split: true,
                collapsible: true,
                splitterResize: false,
                collapseMode: 'mini'
            }]
        }]
    });
});