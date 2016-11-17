@import "helpers.js";

function onRunMarkup(context) {
	try {
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

		var list_type = [ "ul > li", "ul > li > a", "ul > li > p", "ul > li > span", "ol > li", "ol > li > a", "ol > li > p", "ol > li > span, select > option" ];
		
		for (var i = [selection count] - 1; i >= 0; i--) {
			var layer = selection[i];
			
			if (is_group(layer)) {
				text_layers_in_group = select_text_layers([layer layers]);

				var classname = get_classname(layer);
				markup_for_copy += create_markup_list(text_layers_in_group, classname, "ul > li > a");
				
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
		
		markup_for_copy += create_markup_list(text_layers, "", "ul > li > a");

		doc.showMessage("✔ Markup successfully copied.");
		copy_markup_list(markup_for_copy);

	} catch (e) {
		log("Oops. Something went wrong.");
	}
}


function onRunMarkdown(context) {
	try {
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
				markup_for_copy += create_markdown_list(text_layers_in_group);
				
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
		
		markup_for_copy += create_markdown_list(text_layers);

		doc.showMessage("Markdown copied with sucess. ✔");
		copy_markup_list(markup_for_copy);

	} catch (e) {
		log("Oops. Something went wrong.");
	}
}


function onRunJade(context) {
	try {
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
				markup_for_copy += create_jade_list(text_layers_in_group, classname);
				
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
		
		markup_for_copy += create_jade_list(text_layers, "");

		doc.showMessage("Jade copied with sucess. ✔");
		copy_markup_list(markup_for_copy);

	} catch (e) {
		log("Oops. Something went wrong.");
	}
}

function onRunHaml(context) {
	try {
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
				markup_for_copy += create_haml_list(text_layers_in_group, classname);
				
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
		
		markup_for_copy += create_haml_list(text_layers, classname);

		doc.showMessage("Haml copied with sucess. ✔");
		copy_markup_list(markup_for_copy);

	} catch (e) {
		log("Oops. Something went wrong.");
	}
}