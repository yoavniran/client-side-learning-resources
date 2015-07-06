$(function(){
"use strict";

	function loadIntroMD(){
		return $.get("intro.md");
	}

	function loadResourcesJSON(){
		return $.getJSON("resources.json");
	}

	function showIntroAsHtml(text){

		var converter = new showdown.Converter();

		var html = converter.makeHtml(text);

		$("#intro-container").html(html);
	}
	
	function getSectionTemplate(){
		return Handlebars.compile($("#res-section-template").html());
	}

	function showResourcesAsHtml(data){

		var options ={
			container: $("#resource-container"),
			resType: data.RES_TYPE,
			sectionTemplate: getSectionTemplate()
		};

		Object.keys(data.resources).forEach(function(section){
			showResourcesSectionAsHtml(data.resources[section], options);
		});
	}

	function showResourcesSectionAsHtml(section, options){
		console.log("processing section type: " + section.title);

		var html = options.sectionTemplate(section);

		options.container.append(html);
	}

	function showIntro(){
		loadIntroMD()
		.then(function(mdText){			
			showIntroAsHtml(mdText)
		},
		function(){
			console.log("failed to load intro! ", arguments);
		})
	}

	function showResources(){
		loadResourcesJSON()
		.then(function(data){
			console.log("loaded resources data: ", data);
			showResourcesAsHtml(data);
		},
		function(){
			console.log("failed to load resources! ", arguments);
		});
	}

	showIntro();
	showResources();
});