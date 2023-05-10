import frappe

@frappe.whitelist()
def check_warehouse_state(source_warehouse,target_warehouse):
    # frappe.msgprint(str(source_warehouse))
    # frappe.msgprint(str(target_warehouse))
    source_address = frappe.db.get_value("Warehouse",source_warehouse,"company_address")
    target_address = frappe.db.get_value("Warehouse",target_warehouse,"company_address")
    # frappe.msgprint(str(source_address))
    # frappe.msgprint(str(target_address))

    source_state = ""
    target_state = ""
    if source_warehouse:
        source_state = frappe.db.get_value("Address",source_address,"state")
        # frappe.msgprint(str(source_state))

    if target_warehouse:
        target_state = frappe.db.get_value("Address",target_address,"state")
        # frappe.msgprint(str(target_state))

    if source_state and target_state:
        if source_state == target_state:
            return 1
        else:
            return 0

