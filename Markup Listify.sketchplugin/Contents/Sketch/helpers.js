function copy_markup_list(list) {
	clipboard.set(list);
}

function alert(title, message) {
	var app = [NSApplication sharedApplication];
	[app displayDialog:message withTitle:title];
}

function is_group(layer) {
	return [layer isMemberOfClass:[MSLayerGroup class]] || [layer isMemberOfClass:[MSArtboardGroup class]]
}

function is_text(layer) {
	return [layer isMemberOfClass:[MSTextLayer class]]
}

function set_classname(name) {
	var empty_string = "";

	// Lower case everything.
	layer_name = name.toLowerCase();

	// Make alphanumeric (removes all other characters).
	layer_name = layer_name.replace(/[^a-z0-9_\s-]/g, empty_string);

	// Convert whitespaces and underscore to dash.
	layer_name = layer_name.replace(/[\s+_]+/g, "-");

	return layer_name;
}

function get_classname(layer) {
	var empty_string = "";
	var name = empty_string + layer.name();

	layer_name = set_classname(name);
	return layer_name;
}

function get_name(layer) {
	return layer.name;
}

function get_text(layer) {
	return layer.stringValue();
}

function indent(string, num_of_indents) {
	string = string.replace(/^(?=.)/gm, new Array(num_of_indents + 1).join("\t"));
	num_of_indents = new Array(0).join(" ");

	return string;
}

function create_markup_list(list, classname) {
	var html = "";

	if (list.length == 0) {
		return html;
	}

	html += '<ul class="' + classname + '">\n';

	for (var i = 0; i < list.length; i++) {
		var item = list[i];
		var sublist = item.nodes;

		if (Array.isArray(sublist)) {
			var classname = set_classname(item.name);

			html += indent("<li>\n", 1);
			html += indent(create_markup_list(sublist, classname), 2);
			html += indent("</li>\n", 1);

		} else {
			html += indent("<li>" + get_text(item) + "</li>\n", 1);
		}
	};

	html += '</ul>\n';
	
	return html;
}

function select_text_layers(layers) {
	var text_layers = [];

	for (var i = layers.length - 1; i >= 0; i--) {
		var layer = layers[i];

		if (is_group(layer)) {
			var obj = {};
			obj.name = layer.name();
			obj.nodes = select_text_layers([layer layers]);
			text_layers.push(obj);
		}

		if (is_text(layer)) {
			text_layers.push(layer);
		}
	}

	return text_layers;
}

var clipboard = {
	pasteBoard: null,
	init: function() {
		this.pasteBoard = NSPasteboard.generalPasteboard();
	},
	set: function(text) {
		if (typeof text === 'undefined') {
			return null;
		}

		if (!this.pasteBoard) {
			this.init();
		}

		this.pasteBoard.declareTypes_owner([NSPasteboardTypeString], null);
		this.pasteBoard.setString_forType(text, NSPasteboardTypeString);

		return true;
	},
	get: function() {
		if (!this.pasteBoard) {
			this.init();
		}

		var text = this.pasteBoard.stringForType(NSPasteboardTypeString);
		return text.toString();
	}
};