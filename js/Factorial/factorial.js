(function ($) {

    $.fn.factorial = function (options) {

        if (!options)
            options = {};

        // This is the easiest way to have default options.
        const settings = $.extend({
            title: "Validation Form",
            type: 'range',
            min: 0,
            max: 100,
            value: 10,
            style: "",
            onChange: null,
            parseText: null
        }, options);

        // Prida class widget factorial
        $(this).attr('class', $(this).attr('class') + ' widget-factorial');

        if (settings.style)
            $(this).attr('style', settings.style);

        // Vytvorili a nastavili nodeElement header
        const headerNode = $("<h1></h1>");
        //1.Uloha
        $(headerNode).text(settings.title);

        const resultNode = $("<p></p>");
        resultNode.attr('class', 'factorial-result');

        // Vytvorili a nastavili nodeElement input
        const inputNode = $('<input/>');
        $(inputNode)
            .attr('type', settings.type)
            .attr('min', settings.min)
            .attr('max', settings.max)
            .attr('value', settings.value)
            .attr('class', 'factorial-range-slider');


        // Tu sme ich obidva pridali do appDiv
        $(this).append(headerNode)
            .append(inputNode)
            .append(resultNode);

        //2.Callback
        $(inputNode).on('input', function () {
            if (settings.onChange)
                settings.onChange(this);

            const value = this.value;
            const factorialValue = factorial(value);
            const defaultText = value + ' ' + factorialValue;

            if (settings.parseText) {
                $(resultNode).html(settings.parseText(value, factorialValue));
            } else {
                $(resultNode).html(defaultText);
            }
        });

        function factorial(x) {
            if (x < 0) {
                throw new Error('Enter positive number!');
            } else if (x === 0) {
                return 1;
            } else {
                return x * factorial(x - 1);
            }
        }

        return this;
    };

}(jQuery));