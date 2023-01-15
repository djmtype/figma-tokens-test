const StyleDictionary = require('style-dictionary').extend({
    source: ['build/tokens/parsed-tokens.json'],
    platforms: {
        css: {
            transformGroup: 'css',
            // transforms: ["attribute/cti", "color/rgb"],
            buildPath: 'build/',
            files: [
                {
                    destination: 'css/global.css',
                    format: 'css/variables',
                    // options: {
                    //     // Look here 👇
                    //     outputReferences: true
                    //   }
                    // options: { showFileHeader: false },
                    
                },
                // {
                //     destination: "css/_sizes.css",
                //     format: "css/variables",
                //     filter: {
                //       type: "sizing"
                //     }
                //   }
            ]
        }
    }
});

// StyleDictionary.registerTransform({
//     name: "sizeToPx",
//     type: "value",
//     transitive: true,
//     matcher: (token) => ["fontSizes", "dimension", "borderRadius", "spacing"].includes(token.type),
//     transformer: (token) => transformDimension(token.value),
//   });

  StyleDictionary.registerTransform({
    name: 'transformPxToRem',
    type: 'value',
    // matcher: token => {
    //   return token.unit === 'pixel' && token.value !== 0
    // },
      matcher: (token) =>
      ["fontSizes", "dimension", "borderRadius", "spacing", "sizing"].includes(token.type),
  
    // transformer: token => {
    //   return `${token.original.value / 16}rem`
    // },
      transformer: (token) => {
          // return `${token.value / 16}rem`
      return (token.value / 16).toFixed(2) + 'rem'
      }
  })


StyleDictionary.registerTransform({
    name: "numberToPx",
    type: "value",
    matcher: (token) =>
      typeof token.value === "number" && token.type !== "opacity",
    transformer: (token) => `${token.value}px`,
  });

//   StyleDictionary.registerTransform({
//     name: 'colorToHsl',
//     type: 'value',
//     matcher: (token)  => ["color"].includes(token.type),
//     //   return token.attributes.category === "color";
//     transformer: (token) => token.original.value
    
// });

StyleDictionary.registerTransform({
    name: 'colorHsl', 
    type: 'value',
    matcher: (token) =>  ["color"].includes(token.type),
    transformer: (token) =>  token.value.hsl()
    });



    StyleDictionary.registerTransform({
        name: 'hexARGB',
        type: 'value',
        matcher: (token) => ["color"].includes(token.type),
        
        transformer: (token) => token.value.replace(/^#/,'#FF')
        
      });

const customTransforms = [
    "transformPxToRem",
    // "colorHsl"
    // "sizeToPx"
  //  "numberToPx",
    // "flattenShadow",
    // "fontweightsToNumber",
    // "letterSpacingPercentageToEM",
    // "descriptionToComment",
  ];

StyleDictionary.registerTransformGroup({
    name: "css",
    transforms: [
      // based on https://amzn.github.io/style-dictionary/#/transform_groups?id=css
      "attribute/cti",
      "name/cti/kebab",
      "time/seconds",
      "content/icon",
    //  "size/rem",
      "color/hsl-4",
      // custom transforms
      ...customTransforms,
    ],
  });

StyleDictionary.buildAllPlatforms();