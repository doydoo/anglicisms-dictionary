function myDisplay() {
    const DICT = require('./data.json')
}

function mySearch() {
    let input, filter, table, tr, td, i, txtValue;
    input = document.getElementById("myInput");
    filter = input.value.toUpperCase();
    table = document.getElementById("myTable");
    tr = table.getElementsByTagName("tr");


    for (i = 0; i < tr.length; i++) {
      td = tr[i].getElementsByTagName("td")[1]; //use this to parse through dict keys
      if (td) {
        txtValue = td.textContent || td.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
          tr[i].style.display = "";
        } else {
          tr[i].style.display = "none";
        }
      }
    }
  }

