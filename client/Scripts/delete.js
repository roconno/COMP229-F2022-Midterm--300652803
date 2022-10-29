/**
 * Filename: delete.js
 * Author name:
 * Student ID:
 * Webapp name:
 * 
 * This is the delete.js file for handle the logic when clicking on the delete button
 * Make a request to server and delete by name, then reload the FacultyList page
 */

$.fn.handleDelete = function () {
    var $this = this;
    
    var facultyName = document.getElementById('facultyName').value;

    $this.href = `/faculties/delete?name=${facultyName}`;
};


(function(){
   $('#deleteBtn').on('click', $.fn.handleDelete);
})();