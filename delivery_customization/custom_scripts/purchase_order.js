frappe.ui.form.on('Purchase Order', {
	onload: function(frm) {
        frm.set_query("set_warehouse", function() {
    			return {
    				"filters": {
    					"company_address": frm.doc.billing_address,
    					"is_group": 0
    				}
    			};
    		});
	}
});