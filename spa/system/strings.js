spa.Strings = {

    add: function (group, strings) {
        //make from strings objects of keys and values
        let keys = Object.keys(strings);

        for (let i = 0; i < keys.length; i++) {
            spa[group] = spa[group] || {};
            
            spa[group][keys[i]] = {
                group: group,
                key: keys[i],
                value: strings[keys[i]],
            }
        }
    },

	refresh: function () {
        //change any text that we have on screen to the new language
        let elements = document.querySelectorAll('[data-string]');

        for (let i = 0; i < elements.length; i++) {
            let group = elements[i].getAttribute('data-string-group');
            let key = elements[i].getAttribute('data-string-key');

            if (spa[group]?.[key] != undefined){
                if (elements[i].tagName.toLowerCase() == 'input'){
                    elements[i].placeholder = spa[group][key].value;
                }
                else{
                    elements[i].innerHTML = spa[group][key].value;
                }
            }
        }
    },

	clear: function () {
        spa.Str = {};
    },

    setText: function(div, text) {
        let stringDiv = div.querySelector('[data-string-key]') || div;

        stringDiv.setAttribute('data-string', '');
        stringDiv.setAttribute('data-string-group', (text?.group || ''));
        stringDiv.setAttribute('data-string-key', (text?.key || ''));
        stringDiv.innerHTML = (text?.value ?? text);
    },

    getText: function(div) {
        let stringDiv = div.querySelector('[data-string]') || div;

        let group = stringDiv.getAttribute('data-string-group') || '';
        let key = stringDiv.getAttribute('data-string-key') || '';
        let value = stringDiv.innerHTML || '';

        return {group: group, key: key, value: value};
    },

    checkStrings: function(app)
    {
        let strings = window.app[app].Strings;
        let str = {};

        for(let keyLang in strings.langs){
            let valueLang = strings.langs[keyLang];

            for(let keyWord in valueLang){
                let valueWord = valueLang[keyWord];

                str[keyWord] = str[keyWord] ||  {};
                str[keyWord][keyLang] = valueWord;
            }
        }


        for(let keyWord in str){
            let valueWord = str[keyWord];

            for (let keyLang in strings.langs){
                if (valueWord[keyLang] == undefined){
                    console.log('missing in "' + app + '" strings "' + keyWord + '" in ' + keyLang);
                }
            }
        }

    },
}