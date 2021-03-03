// ref:  https://stackoverflow.com/questions/1207939/adding-an-onclick-event-to-a-table-row
function addRowHandlers(tableID) {
    var table = document.getElementById(tableID);
    var rows = table.getElementsByTagName("tr");
    for (i = 0; i < rows.length; i++) {
        var currentRow = table.rows[i];
        var createClickHandler = function (row) {
            return function () {
                var cell = row.getElementsByTagName("td")[0];
                var id = cell.innerHTML;
                //  alert("id:" + id);
                rowClickFunction(id);
            };
        };
        currentRow.onclick = createClickHandler(currentRow);
    }
}
