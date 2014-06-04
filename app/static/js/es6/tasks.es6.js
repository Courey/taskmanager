/*jshint unused:false*/
(function(){
	'use strict';

	$(document).ready(init);

	function init(){
		$('#submit').click(addTask);
		$('tbody').on('click', '.delete', deleteTask);
	}

	function addTask(event){
		var title = $('.title').val();
		var date = $('.date').val();
		var color = $('.color').val();
		$('.title').val('');
		$('.date').val('');
		$('.color').val('');
		ajax('/tasks/add', 'put', {title: title, due:date, color:color}, html=>{
			$('tbody').append(html);
		});
		event.preventDefault();
	}

	function deleteTask(event){
		var task = $(this).prev().val();
		ajax(`/tasks/delete/${task}`, 'delete', null, ()=>{
			var thing = $(this).closest('tr');
			console.log(thing);
			$(this).closest('tr').remove();
		});
		event.preventDefault();
	}

	function ajax(url, type,  data={}, success=response=>console.log(response), dataType='html'){
 		 $.ajax({url: url, type: type, data: data, dataType: dataType, success:success});
	}



})();