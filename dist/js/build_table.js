var myList  = (function() {
        var myList = null;
        $.ajax({
	    'async': false,
            'global': false,
            'url': "trials.json",
            'dataType': "json",
            'success': function (data) {
                myList = data;
            }
        });
        return myList;
    })();

// Builds the HTML Table out of myList json data from Ivy restful service.
 function buildHtmlTable() {
     var columns = addAllColumnHeaders(myList);
     $("#dataTables-example").append("<tbody/>");

     for (var i = 0 ; i < myList.length ; i++) {
         var row$ = $('<tr/>');
         for (var colIndex = 0 ; colIndex < columns.length ; colIndex++) {
             var cellValue = myList[i][columns[colIndex]];

             if (cellValue == null) { cellValue = ""; }

             row$.append($('<td/>').html(cellValue));
         }
         $("#dataTables-example").append(row$);
     }
 }

 // Adds a header row to the table and returns the set of columns.
 // Need to do union of keys from all records as some records may not contain
 // all records
 function addAllColumnHeaders(myList)
 {
     var columnSet = [];
     var headerTr$ = $('<thead/>');

     for (var i = 0 ; i < myList.length ; i++) {
         var rowHash = myList[i];
         for (var key in rowHash) {
             if ($.inArray(key, columnSet) == -1){
                 columnSet.push(key);
                 headerTr$.append($('<th/>').html(key));
             }
         }
     }
     $("#dataTables-example").append(headerTr$);
     $("th").wrapAll("<tr></tr>");
     return columnSet;
 }
