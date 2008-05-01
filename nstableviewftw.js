$$('table.NSTableViewFTW').each(function(aTable) {
    // Set <thead> width and <tbody> width & height
    var aTableWidth = aTable.getStyle('width').slice(0, -2);
    var aTBody = aTable.select('tbody').first();

    aTable.select('thead').first().setStyle({
        width: aTableWidth + 'px',
    });

    aTBody.setStyle({
        width: aTableWidth + 'px',
        height: aTable.getStyle('height').slice(0, -2) - 17 + 'px'
    });



    // Set <td> widths
    var allRows = aTable.select('tr');

    allRows.each(function(aRow) {
        aRow.select('td').each(function(aCell, aColumnIndex) {
            aCell.addClassName('NSTableViewFTWColumn' + aColumnIndex);
        });
    });
    
    var firstRowCells = allRows.first().select('td');
    var columnCount = firstRowCells.size();

    columnCount.times(function(i) {
        var aColumnOfCells = aTable.select('td.NSTableViewFTWColumn' + i);

        var aCellWidth = (aColumnOfCells.inject(0, function(anAccumulator, aCell) {
            return anAccumulator + aCell.innerHTML.stripScripts().stripTags().strip().length;
        }) / allRows.size()).round() * 10;
        
        aColumnOfCells.invoke('setStyle', {
            width: aCellWidth + 'px'
        });

        if (i) {
            aColumnOfCells.first().setStyle({
                width: ++aCellWidth + 'px'
            });
        }
    });



    // Set <tr> widths
    var rowWidth = firstRowCells.inject(0, function(anAccumulator, aCell) {
        return anAccumulator + aCell.getStyle('width').slice(0, -2) * 1;
    }) + columnCount - 1 + columnCount * 8;

    allRows.invoke('setStyle', {
       width: rowWidth + 'px'
    });
    
    

    // Horizontally scroll <thead>'s <tr> and vertically scroll <tbody>'s background image with <tbody>'s <tr>s
    aTBody.observe('scroll', function(anEvent) {
        var thisTBody = anEvent.element();
        
        thisTBody.up('table.NSTableViewFTW').select('thead tr').first().setStyle({
            left: '-' + thisTBody.scrollLeft + 'px'
        });
        
        thisTBody.setStyle({
            backgroundPosition: '0px -' + thisTBody.scrollTop + 'px'
        });
    });
});