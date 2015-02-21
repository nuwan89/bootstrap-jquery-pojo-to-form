(function($V, $, undefined){
	//Default settings
	$V.settings = {size: 26, color: "no-color", form: 
	{labelLength: 3, fieldLength: 9, type: "horizontal"}};
	//User call this method to generate the form.
	$V.build = function(userSettings){
		$.extend(true, $V.settings, userSettings);
		printModel($V.settings.model);
		createFields();
	};

	var my1 = "hoooooooo";
	$V.my1 = "booooooooo";

	var printModel = function(model){
		for(var m in model){
			// console.log(m.val());
		}
	}

	var createFields = function(){
		if($V.settings.form.type === "horizontal"){
			var form = $("#"+$V.settings.formId);
			for(var m in $V.settings.model){
				var formGroup = $('<div class="form-group"></div>');
				var labelSpan = $("<span></span>");
				var label = $("<label></label>");
				var fieldDiv = $('<div></div>');
				$(form).append(formGroup);
				$(labelSpan).addClass("col-sm-"+$V.settings.form.labelLength);
				$(formGroup).append(labelSpan);
				if($V.settings.model[m].constructor === String || $V.settings.model[m].constructor === Array){
					$(label).text(capitalizeFirstLetter(m));
					$(label).attr("for",m);
					$(labelSpan).append(label);
					$(fieldDiv).addClass("col-sm-"+$V.settings.form.fieldLength);
					$(formGroup).append(fieldDiv);
					$(fieldDiv).append(createSingleField(m, $V.settings.model));
				}else{ //m should be an object
					var field = {classes: ["form-control"]};
					$.extend(true, field, $V.settings.model[m]);
					$(label).text(capitalizeFirstLetter(field.label || field.name || field.id));
					$(label).attr("for",field.id);
					$(labelSpan).append(label);
					$(fieldDiv).addClass("col-sm-"+$V.settings.form.fieldLength);
					$(formGroup).append(fieldDiv);
					$(fieldDiv).append(createSingleFieldFromObject(field, $V.settings.model));
				}
			}
			var submitButton = $('<input type="submit" />')
			.addClass("btn col-sm-offset-"+$V.settings.form.labelLength+" btn-primary pull-right");
			$(form).append(submitButton);
		}
	}

	function createSingleField(name, model){
		var defaultField = $('<input type="text" class="form-control" />')
			.attr("id", name).attr("name",name);
		if(model[name].constructor === Array){ //Render a combobox
			var combobox = $('<select></select>').attr("id", name)
				.attr("name",name).addClass("form-control");
			$.each(model[name], function(key, value){
				$(combobox).append($('<option></option>').attr("value", value).text(value));
			});
			return combobox;
		}else if(model[name] === "" || model[name] === "text"){//Create text field
			return defaultField;
		}else if(model[name] === "textarea"){//Create textarea
			return $('<textarea class="form-control"></textarea>').attr("id", name).attr("name",name);
		}
	}


	function createSingleFieldFromObject(object, model){
		var defaultField = $('<input type="text" />')
			.attr("id", object.id).attr("name",object.name);
			$.each(object.classes, function(key, value){
				$(defaultField).addClass(value);
			});
			var validationRules = object.validation;
			console.log(validationRules);
			if(validationRules){
				$(defaultField).attr("data-validate", validationRules);
			}
			return defaultField;
		// if(model[object].constructor === Array){ //Render a combobox
		// 	var combobox = $('<select></select>').attr("id", object)
		// 		.attr("name",object).addClass("form-control");
		// 	$.each(model[object], function(key, value){
		// 		$(combobox).append($('<option></option>').attr("value", value).text(value));
		// 	});
		// 	return combobox;
		// }else if(model[object] === "" || model[object] === "text"){//Create text field
		// 	return defaultField;
		// }else if(model[object] === "textarea"){//Create textarea
		// 	return $('<textarea class="form-control"></textarea>').attr("id", object).attr("name",object);
		// }
	}

	function capitalizeFirstLetter(string){
		return string.charAt(0).toUpperCase() + string.slice(1);
	}
}
)(window.$FG = window.$FG || {}, jQuery);

// <div class="form-group">
//         <span class="col-sm-3">
//             <label for="email" class="">Email :</label>
//         </span>
//         <div class="col-sm-9">
//             <input name="email" type="text" id="email" class="form-control" data-validate="custom(myf),email"/>
//         </div>
//     </div>