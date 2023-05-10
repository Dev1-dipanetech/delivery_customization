frappe.ui.form.on('Sales Order', {
	onload: function(frm) {
        frm.set_query("set_warehouse", function() {
    			return {
    				"filters": {
    					"company_address": frm.doc.company_address,
    					"is_group": 0
    				}
    			};
    		});
	}
});

