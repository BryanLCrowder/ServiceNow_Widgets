function addOrRemove() {
    var dialog = new GlideModal("sn_audit_addremovectrl");
    dialog.setTitle('Add or Remove Controls');
    var pln = g_form.getValue('top_plan');
    dialog.setPreference("url", "https://dev101833.service-now.com/sp?id=addremove&eng="+g_form.getUniqueValue()+"&list="+g_list.getChecked());
    dialog.render();
}