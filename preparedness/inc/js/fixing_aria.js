var fixTables = function(tables) {
    // we can fix the table aria stuff here too
    // take down colgroup
    tables.each(function() {
        var tm = (new Date()).getTime()
        var prefix = 'table-' + tm
        var _table = $(this)
        _table.attr('tabindex', 0)
            .attr('id', prefix)

        _table.on('keyup', [ _table ], kbnav)
        _table.children('colgroup').remove()
        // redefine colgroup, must be before thead and after caption
        var _colg = $('<colgroup>').insertBefore(_table.children('thead'))
        var ncol = 0
        _table.children('thead').children().eq(0).children().each(function() {
            if ($(this).attr('colspan') == undefined) {
                ncol += 1
            } else {
                ncol += +($(this).attr('colspan'))
            }
        })
        for (var i=0; i < ncol; i++) {
            $('<col>').appendTo(_colg)
        }
        // put all th with scope and index
        _table.children('thead')
            .attr('aria-hidden', true)
            .find('th').each(function(i) {
                var surfix = (100 + i).toString().slice(1)
                $(this).attr('id', prefix + '-' + surfix)
                if ($(this).attr('colspan') == undefined) {
                    $(this).attr('scope', 'col')
                } else {
                    $(this).attr('scope', 'colgroup')
                }
        })

        // prepare headers 
        var hdrs = []
        _table.children('thead').children().each(function() {
            hdrs.push([])
        })

        _table.children('thead').children().each(function(irow) {
            // tr
            $(this).children().each(function(ith) {
                hdrs[irow].push( $(this).attr('id') )
                if ( $(this).attr('colspan') != undefined ) {
                    for (var i=1; i < +($(this).attr('colspan')); i++) {
                        hdrs[irow].push( $(this).attr('id') )
                    }
                }
                if ( $(this).attr('rowspan') != undefined ) {
                    for (var i=1; i < +($(this).attr('rowspan')); i++) {
                        hdrs[irow + 1].push( '' )
                    }
                }
                
            })
        })

        var _hdr = []
        // transpose hdrs
        hdrs[0].forEach(function(v, i) {
            _hdr.push( hdrs.map(function(el) { return el[i] }))
        })

        // fixing tbody for th and td
        _table.children('tbody').children('tr').each(function(irow) {
            var surfix = (100 + irow + 1).toString().slice(1)
            $(this).children('th').each(function(ith) {
                var idx = [ prefix , (100 + ith).toString().slice(1), surfix]
                $(this).attr('id', idx.join('-'))
                    .attr('scope', 'row')
                    .attr('tabindex', -1)
                    .on('keyup', [ _table ], kbnav)

            })
            $(this).children('td').each(function(icol) {
                // assume always only have one th per row
                var _idx = $.trim(_hdr[icol+1].join(' '))
                $(this).attr('tabindex', -1)
                    .attr('headers', _idx)
                    .attr('aria-labelledby', _idx)
                    .on('keyup', [ _table ], kbnav)
            })
        })

    })

}


var kbnav = function(event) {
    // draft keyboard navigation inside tbody
    // we will skip thead and tfoot by default
    // all <a> element inside table will have its own behave

    // scope will be <table> tag
    var that = event.data[0]

    // if event.target == table node, enter our keyboard navigation event
    // console.log(event)
    if (event.target.nodeName.toLowerCase() == 'table') {
        // $(event.target).blur()
        if (event.key == 'Tab') {
            event.stopPropagation()
            // entering table
            that.find('tbody').find('th, td').attr('tabindex', -1)
                .first().attr('tabindex', 0)
                .focus()
                return
        }
        return
    }
    // it is th or td, enable arrow key
    var el = event.target
    switch (event.key) {
        case 'Up':
        case 'ArrowUp':
            event.stopPropagation()
            var colindex = el.cellIndex
            var tr = $(el).parent()
            var prevTr = tr.prev()
            // top row
            if (prevTr.length == 0) return 

            var tg = prevTr.children().eq(colindex)
            while (tg.length == 0) {
                colindex = (colindex > 0)? colindex - 1: colindex
                tg = prevTr.children().eq(colindex)
            }
            // console.log(tg)
            $(el).attr('tabIndex', -1)
            tg.attr('tabIndex', 0)
            tg.focus()
            break;				
        case 'Down':
        case 'ArrowDown':
            event.stopPropagation()
            var colindex = el.cellIndex
            var tr = $(el).parent()
            var nextTr = tr.next()
            // bottom row
            if (nextTr.length == 0) return 

            var tg = nextTr.children().eq(colindex)
            while (tg.length == 0) {
                colindex = (colindex > 0)? colindex - 1: colindex
                tg = nextTr.children().eq(colindex)
            }
            // console.log(tg)

            $(el).attr('tabIndex', -1)
            tg.attr('tabIndex', 0)
            tg.focus()
            break;				
        case 'Left':
        case 'ArrowLeft':
            event.stopPropagation()
            var mx = $(el).prevAll('[tabindex]:visible')
            if (mx.length == 0)	{
                // first cell, try to move up a row
                mx = $(el).parent().prev()
                if (mx.length == 0) {
                    // no more action
                    return
                }
                mx = mx.children('[tabindex]:visible').last()
            }
            $(el).attr('tabIndex', -1)
            mx.eq(0).attr('tabIndex', 0)
            mx.eq(0).focus()
            return
            break;				
        case 'Right':
        case 'ArrowRight':
            event.stopPropagation()
            var mx = $(el).nextAll('[tabindex]:visible')
            if (mx.length == 0)	{
                // last cell, try to move to down row
                mx = $(el).parent().next()
                if (mx.length == 0) {
                    // no more action
                    return
                }
                mx = mx.children('[tabindex]:visible').first()
            }
            $(el).attr('tabIndex', -1)
            mx.eq(0).attr('tabIndex', 0)
            mx.eq(0).focus()
            return
            break;
        case 'Escape':
            event.stopPropagation()
            $(el).blur()
            return
            break;
    }
}

$(document).ready(function() {
    // set drawer content to global variable 
    window.drawer_content = $('.drawer').children('.drawer-content')
        .attr('role','region')

    // initialize the default display accordion
    drawer_content.each(function() {
            var _input = $(this).parent().children('input')
            if (_input.is(':checked')) {
                $(this).attr('aria-hidden', false)
                _input.attr('aria-expanded', true)
            } else {
                $(this).attr('aria-hidden', true)
                _input.attr('aria-expanded', false)
            }
        })

    // define event under checkbox
    window.accordionAction = function(event) { 
        var _dcontent = $(event.target).parent().children('.drawer-content')
        if (event.target.checked) {
            // expanded
            _dcontent.attr('aria-hidden',false)
            $(event.target).attr('aria-expanded', true)
        } else {
            // collapsed
            _dcontent.attr('aria-hidden',true)
            $(event.target).attr('aria-expanded', false)
        }
    }
    $('.drawer').children('input').on('change', accordionAction)

    window.fixTables($('main table'))

})