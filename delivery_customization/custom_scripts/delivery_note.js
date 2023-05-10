frappe.ui.form.on('Delivery Note', {
	setup: function(frm) {
		frm.set_query('company_shipping_address_c', function(doc) {
                        if(!doc.company) {
                                frappe.throw(__('Please set Company'));
                        }

                        return {
                                query: 'frappe.contacts.doctype.address.address.address_query',
                                filters: {
                                        link_doctype: 'Company',
                                        link_name: doc.company
                                }
                      };
	                });
	    },
	onload: function(frm) {
        frm.set_query("set_warehouse", function() {
    			return {
    				"filters": {
    					"company_address": frm.doc.company_address,
    					"is_group": 0
    				}
    			};
    		});

		frm.set_query("set_target_warehouse", function() {
			return {
				"filters": {
					"company_address": frm.doc.company_shipping_address_c,
					"is_group": 0
				}
			};
		});
	}
});

frappe.ui.form.on("Delivery Note", {
	refresh: function(frm) {
		if(frm.doc.set_warehouse && frm.doc.set_target_warehouse){
			frappe.call({
				"method":"delivery_customization.delivery_customization.delivery_note.check_warehouse_state",
				"freeze":true,
				"args":{
					"source_warehouse":frm.doc.set_warehouse,
					"target_warehouse":frm.doc.set_target_warehouse
				},
				"callback":function(res){
					console.log(res.message);
					if(res.message == 0){
						frm.remove_custom_button("E-Way Bill JSON", 'Create');
					}
				  
				}
			   });
		}
        
	        
	}
});


