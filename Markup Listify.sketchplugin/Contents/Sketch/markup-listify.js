@import "helpers.js"

var onRun = function(context) {

	var doc       = context.document;
	var selection = context.selection;

	// If nothing is selected.
	if ([selection count] < 1) {
		alert("Nothing was selected.", 
		"Please select, at least, one text layer or group containing text layers.");
		return;
	}

	var text_layers_in_group = [];
	var text_layers = [];
	var markup_for_copy = "";
	
	for (var i = [selection count] - 1; i >= 0; i--) {
		var layer = selection[i];
		
		if (is_group(layer)) {
			text_layers_in_group = select_text_layers([layer layers]);

			var classname = get_classname(layer);
			markup_for_copy += create_markup_list(text_layers_in_group, classname);
			
		} else if (is_text(layer)) {
			text_layers.push(layer);
		}
	}

	// If the selection doesn't include text layers.
	if (text_layers_in_group.length == 0 && text_layers.length == 0 ) {
		alert("No text layers were selected.", 
		"Please select, at least, one text layer or group containing text layers.");
		return;
	}

	markup_for_copy += create_markup_list(text_layers, "");

	doc.showMessage("Markup copied with sucess. ✔");
	copy_markup_list(markup_for_copy);
}