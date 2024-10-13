$(document).ready(function() {
    
    localStorage.clear();
    let selectedTable = null;
    const bookedTables = JSON.parse(localStorage.getItem('bookedTables')) || [];

    
    bookedTables.forEach(tableId => {
        $(`.table[id="${tableId}"]`).addClass('booked');
    });    
    
    $('.table').on('click', function() {
        selectedTable = $(this).attr('id');
        if ($(this).hasClass('booked')) {
            alert("This table has been booked.");
            return; 
        }

        
        $('.message').text(`Do you want to book Table ${selectedTable}?`);
        $('.buttons').show();
    });

    $('.confirm').on('click', function() {
        if (selectedTable !== null) {
            $(`.table[id="${selectedTable}"]`).addClass('booked');
            $('.message').text(`Click a Table to book`);
            
            bookedTables.push(selectedTable);
            localStorage.setItem('bookedTables', JSON.stringify(bookedTables));

            $('.buttons').hide();
            selectedTable = null;
        }
    });

    $('.dismiss').on('click', function() {
        $('.message').text('Click a Table to book');
        $('.buttons').hide();
        selectedTable = null;
    });
});