Ext.require([
    'Ext.window.MessageBox'
]);

Ext.define('Regleep.controller.CtCourseListPanel', {
    extend: 'Ext.app.Controller',

    views: ['VwCourseListPanel'],
    
    //stores: ['StCourses'],
    
    //models: ['AM.model.MdCourse'],

    init: function() {
        this.control({
            'courselistpanel': {
                beforerender: this.onRender,
                show: this.onShow
            },
            
            'courselistpanel button[action=create]': {
                click: this.createNewCourse
            },
            
            'courselistpanel combobox': {
				collapse: this.combochanged
			},
            
            'courselistpanel textfield': {
				change: this.textchanged
			},
        });
    },
    
    onRender: function (panel) {
		panel.hide();
    },
    
    onShow: function(panel) {
		this.updateCourses(panel);
	},
    
    combochanged: function(field) {
		this.updateCourses(field.up('courselistpanel'));
	},
    
    textchanged: function(field, oldVal, newVal) {
		this.updateCourses(field.up('courselistpanel'));
	},
    
    updateCourses: function (courseListPanel) {
       var subjectFilter = courseListPanel.down('combobox[itemId="subjectField"]');
       var termFilter = courseListPanel.down('combobox[itemId="termField"]');
       var titleFilter = courseListPanel.down('textfield[itemId="titleField"]');
       var facultyFilter = courseListPanel.down('textfield[itemId="facNameField"]');
       var courselist = courseListPanel.down('coursecalendar');
       courselist.store.proxy.extraParams.fac_name = facultyFilter.getValue();
       courselist.store.proxy.extraParams.title = titleFilter.getValue();
       courselist.store.proxy.extraParams.subject = subjectFilter.getValue().join();
       courselist.store.proxy.extraParams.term = termFilter.getValue();
       courselist.store.load();
    },
    
    createNewCourse: function (button){
		//var window = Ext.create('widget.newcourse', { width: 500});
		//window.show();
		Ext.MessageBox.show({
            title: 'Choose timeblock type',
            msg: 'Would you like to create your course in a standard or custom timeblock? <br> <b>Note: Custom timeblocks must be approved unless for lab or discussion.<b>',
            buttons: Ext.MessageBox.YESNOCANCEL,
            buttonText:{ 
                yes: "Standard timeblock", 
                no: "Custom timeblock"
            },
            
            calendar: button.up('courselistpanel').down('coursecalendar'),
            
            fn: function (btn, text, opt) {
				if (btn == "yes") {
					opt.calendar.setTimeblockView(true);
				} else if (btn == "no") {
					var window = Ext.create('widget.newcourse', { width: 500});
					window.show();
				}
			}
        });
    },
    
    showResult: function (btn) {
    },
});
