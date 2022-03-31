// 0. Ako to cele funguje  - check...
// 1. Urobit option, ktorym by som nastavil header
// 2. Urobit callback, ktorym by som mohol upravovat zobrazenu hodnotu faktorialu
// 3. do headru vlozit jQuery
// 4. Cheknut tento postup: https://learn.jquery.com/plugins/basic-plugin-creation/

function Factorial(domSelector, options = {}){
    if(!domSelector)
        throw new Error('Missing domSelector required for initialize Factorial component!');

    const appDiv = document.querySelector(domSelector);
    if(!appDiv)
        throw new Error(`Element ${domSelector} not found!`);

    // Prida class widget factorial
    appDiv.setAttribute('class',  appDiv.getAttribute('class') + ' widget-factorial');

    if(options.style)
        appDiv.setAttribute('style', options.style);

    // Vytvorili a nastavili nodeElement header
    const headerNode = document.createElement('h1');
   //1.Uloha
    headerNode.innerText = (options.title ? options.title :  "Validation Form");

    const resultNode = document.createElement('p');
    resultNode.setAttribute('class', 'factorial-result');

    // Vytvorili a nastavili nodeElement input
    const inputNode = document.createElement('input');
    inputNode.setAttribute('type', options?.type || 'range');
    inputNode.setAttribute('min', options?.min || 0);
    inputNode.setAttribute('max', options?.max || 100);
    inputNode.setAttribute('value', options?.value || 10);
    inputNode.setAttribute('class', 'factorial-range-slider');


    // Tu sme ich obidva pridali do appDiv
    appDiv.appendChild(headerNode);
    appDiv.appendChild(inputNode);
    appDiv.appendChild(resultNode);


/*
    inputNode.oninput = function () {
        if(options.onChange)
            options.onChange(this);

        resultNode.innerText = this.value + ' ' + factorial(this.value);
    };
    */

    //2.Callback
    inputNode.oninput = function () {
        if(options.onChange)
            options.onChange(this);

        const value = this.value;
        const factorialValue = factorial(value);
        const defaultText = value + ' ' + factorialValue;

        if(options.parseText) {
            resultNode.innerHTML = options.parseText(value, factorialValue);
        }
        else {
            resultNode.innerHTML = defaultText;
        }
    };


    function factorial(x) {

        if (x < 0) {
            throw new Error('Enter positive number!');
        } else if (x == 0) {
            return 1;
        } else {
            return x * factorial(x - 1);
        }
    }
}
