const StyleDictionary = require('style-dictionary');


const StyleDictionaryExtended = StyleDictionary.extend({
    source: ['tokens/tokens-build.json'],
    platforms: {
        css: {
            transformGroup: 'css',
            buildPath: 'assets/css/',
            files: [
                {
                    destination: 'style.css',
                    format: 'css/variables',
                    // filter: {
                    //     type: "colors"
                    // }
                },
                // {
                //     destination: "_spacing.css",
                //     format: "css/variables",
                //     filter: {
                //       type: "spacing"
                //     }
                //   }
            ]
        },
    }
});

StyleDictionaryExtended.buildAllPlatforms();