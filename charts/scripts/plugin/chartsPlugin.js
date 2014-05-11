/// <reference path="../jquery-2.0.3.js" />
/// <reference path="../jquery-2.0.3.intellisense.js" />
/// <reference path="../gChartsIntellisense.js" />
/// <reference path="smartResize.js" />

; (function ($) {

    var me = $(document);

    //Initialize Charts
    google.load('visualization', '1.1', { packages: ['controls'] });

    $.fn.chartsPlugin = function (options) {
        //Merge passed options with defaults
        var opts = $.extend({}, $.fn.chartsPlugin.defaults, options);

        //Call functions of the plugin
        return this.each(function () {
            me.trigger('drawCharts', opts); /*Pass in the plugin options object*/
        });
    };


    me.on('drawCharts', function (event, opts) {
        console.log(opts);

        var chartContainers = $('div[data-gChart]');
        console.log('Chart container count: ' + chartContainers.length);

        $.each(chartContainers, function (i) {

            /*Grab the html container declared as chart*/
            var o_ds = $(chartContainers[i]);

            /*Add desired chart size*/
            o_ds.addClass(o_ds.data('chartsize'));

            var ds = o_ds.data('datasource');
            var chartType = o_ds.data('gcharttype');
            var containerName = o_ds.data('containername');
            var chartTitle = o_ds.data('charttitle');
            var horizontalChartTitle = o_ds.data('horizontalcharttitle');
            var verticalChartTitle = o_ds.data('verticalcharttitle');


            
            console.log('Container ' + i + ' data source = ' + ds);

            //Run the query for this chart
            var query = new google.visualization.Query(ds);

            //Select data in query statement
            query.setQuery('SELECT A,B,C,D,E');


            //Send query with callback function.
            query.send(handleQueryResponse);

            function handleQueryResponse(response) {
                if (response.isError()) {
                    //alert('Error in query: ' + response.getMessage() + ' ' + response.getDetailedMessage());
                    //return;

                    query.setQuery('SELECT A,B,C,D,E');

                }
                console.log('Handling query response.');


                //Grab the data as a data table
                var data = response.getDataTable();

                /*What type of chart are we drawing?*/
                switch (chartType) {
                    case 'bar':
                        //console.log(chartType);
                        drawBarChart(containerName,
                                     chartTitle,
                                     horizontalChartTitle,
                                     verticalChartTitle, data, opts);
                        break;
                    case 'column':
                        //console.log(chartType);
                        drawColumnChart(containerName,
                                     chartTitle,
                                     horizontalChartTitle,
                                     verticalChartTitle, data, opts);
                        break;
                    case 'pie':
                        //console.log(chartType);
                        drawPieChart(containerName,
                                     chartTitle,
                                     horizontalChartTitle,
                                     verticalChartTitle, data, opts);
                        break;
                    case 'bubble':
                        //console.log(chartType);
                        drawBubbleChart(containerName,
                                     chartTitle,
                                     horizontalChartTitle,
                                     verticalChartTitle, data, opts);
                        break;
                    case 'candlestick':
                        //console.log(chartType);
                        drawCandlestickChart(containerName,
                                     chartTitle,
                                     horizontalChartTitle,
                                     verticalChartTitle, data, opts);
                        break;
                    case 'line':
                        //console.log(chartType);
                        drawLineChart(containerName,
                                     chartTitle,
                                     horizontalChartTitle,
                                     verticalChartTitle, data, opts);
                        break;
                    default:

                }
            };


        });
    });

    /*Bar Chart*/
    function drawBarChart(containerName, title, vTitle, hTitle, data, opts) {
        console.log('Ready to draw chart');
        console.log(opts.chartsFont);

        var barchart = new google.visualization.ChartWrapper({
            'chartType': 'BarChart',
            'containerId': containerName,
            'dataTable': data,
            'options': {
                'hAxis': { title: hTitle },
                'fontName': opts.chartsFont,
                'vAxis': { title: vTitle },
                'title': title,
                'legend': 'bottom',
                'animation': { 'duration': 1000, 'easing': 'out' },
                'colors': opts.colors

            }
        })

        /*Draw the chart*/
        barchart.draw();

        /*Add responsiveness*/
        $(window).smartresize(function () {
            barchart.draw();
        });

    };

    /*Column Chart*/
    function drawColumnChart(containerName, title, vTitle, hTitle, data, opts) {
        console.log('Ready to draw chart');
        console.log(opts.chartsFont);

        var columnchart = new google.visualization.ChartWrapper({
            'chartType': 'ColumnChart',
            'containerId': containerName,
            'dataTable': data,
            'options': {
                'hAxis': { title: hTitle },
                'fontName': opts.chartsFont,
                'vAxis': { title: vTitle },
                'title': title,
                'legend': 'bottom',
                'animation': { 'duration': 1000, 'easing': 'out' },
                'colors': opts.colors

            }
        })

        /*Draw the chart*/
        columnchart.draw();

        /*Add responsiveness*/
        $(window).smartresize(function () {
            columnchart.draw();
        });

    };

    /*Pie Chart*/
    function drawPieChart(containerName, title, vTitle, hTitle, data, opts) {
        console.log('Ready to draw chart');
        //console.log(opts.chartsFont);

        var piechart = new google.visualization.ChartWrapper({
            'chartType': 'PieChart',
            'containerId': containerName,
            'dataTable': data,
            'options': {
                'curveType': 'function',
                'hAxis': { title: hTitle },
                'fontName': opts.chartsFont,
                'vAxis': { title: vTitle },
                'title': title,
                'legend': 'bottom',
                'animation': { 'duration': 1000, 'easing': 'out' },
                'colors': opts.colors

            }
        })

        /*Draw the chart*/
        piechart.draw();

        /*Add responsiveness*/
        $(window).smartresize(function () {
            piechart.draw();
        });

    };

    /*Bubble Chart*/
    function drawBubbleChart(containerName, title, vTitle, hTitle, data, opts) {
        console.log('Ready to draw chart');
        //console.log(opts.chartsFont);

        var bubblechart = new google.visualization.ChartWrapper({
            'chartType': 'BubbleChart',
            'containerId': containerName,
            'dataTable': data,
            'options': {
                'curveType': 'function',
                'hAxis': { title: hTitle },
                'fontName': opts.chartsFont,
                'vAxis': { title: vTitle },
                'title': title,
                'legend': 'bottom',
                'animation': { 'duration': 1000, 'easing': 'out' },
                'colors': opts.colors

            }
        })

        /*Draw the chart*/
        bubblechart.draw();

        /*Add responsiveness*/
        $(window).smartresize(function () {
            bubblechart.draw();
        });

    };

    /*Candlestick Chart*/
    function drawCandlestickChart(containerName, title, vTitle, hTitle, data, opts) {
        console.log('Ready to draw chart');
        console.log(opts.chartsFont);

        var candlestickchart = new google.visualization.ChartWrapper({
            'chartType': 'CandlestickChart',
            'containerId': containerName,
            'dataTable': data,
            'options': {
                'hAxis': { title: hTitle },
                'fontName': opts.chartsFont,
                'vAxis': { title: vTitle },
                'title': title,
                'legend': 'bottom',
                'animation': { 'duration': 1000, 'easing': 'out' },
                'colors': opts.colors

            }
        })

        /*Draw the chart*/
        candlestickchart.draw();

        /*Add responsiveness*/
        $(window).smartresize(function () {
            candlestickchart.draw();
        });

    };

    /*Line Chart*/
    function drawLineChart(containerName, title, vTitle, hTitle, data, opts) {
        //console.log('Ready to draw chart');
        //console.log(opts.chartsFont);

        var linechart = new google.visualization.ChartWrapper({
            'chartType': 'LineChart',
            'containerId': containerName,
            'dataTable': data,
            'options': {
                'hAxis': { title: hTitle },
                'fontName': opts.chartsFont,
                'vAxis': { title: vTitle },
                'title': title,
                'legend': 'bottom',
                'animation': { 'duration': 1000, 'easing': 'out' },
                'colors': opts.colors

            }
        })

        /*Draw the chart*/
        linechart.draw();

        /*Add responsiveness*/
        $(window).smartresize(function () {
            linechart.draw();
        });

    };

    /*Line Chart*/
    function drawGeoChart(containerName, title, vTitle, hTitle, data, opts) {
        //console.log('Ready to draw chart');
        //console.log(opts.chartsFont);

        var geochart = new google.visualization.ChartWrapper({
            'chartType': 'GeoChart',
            'containerId': containerName,
            'dataTable': data,
            'options': {
                'hAxis': { title: hTitle },
                'fontName': opts.chartsFont,
                'vAxis': { title: vTitle },
                'title': title,
                'legend': 'bottom',
                'animation': { 'duration': 1000, 'easing': 'out' },
                'colors': opts.colors

            }
        })

        /*Draw the chart*/
        geochart.draw();

        /*Add responsiveness*/
        $(window).smartresize(function () {
            geochart.draw();
        });

    };

    //Plugin options
    $.fn.chartsPlugin.defaults = {
        chartsFont: 'Arial',
        colors: ['#ECECEC', '#BFBFBF', '#737373', '#595959', '#262626']
    };



})(jQuery);