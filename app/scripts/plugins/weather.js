
define(['plugins/weather'], function() {
    return {
        name: 'weather',
        reply: function(args) {
            if (!this.shouldAnswer(args)) {
                return { confidence: 0, message: "No weather word"}
            }
            var place =  'San Francisco, CA';
            var url = 'http://www.google.com/ig/api?weather='+place;

            args.jQuery.ajax({
                url: url,
                type: 'get',
                dataType: 'xml',
                async: false,
                success: function(data) {
                    console.log(data);
                    output = "Right now, Google says it's "+
                 data.getElementsByTagName("temp_f")[0].getAttribute("data")  + 
                " and " +
                 data.getElementsByTagName("condition")[0].getAttribute("data") 
                + " in "+place +".\n";


                    output = output + "Tomorrow, it should be " +
                 data.getElementsByTagName("condition")[1].getAttribute("data") +
                 " with a low of " + data.getElementsByTagName("low")[1].getAttribute("data") +
                 " and a high of " + data.getElementsByTagName("high")[1].getAttribute("data") + ".";



                }
            });
            return { confidence: 9, message: output};
        },
        shouldAnswer: function(args) {
            var statements = this.myStatements();
                          console.log("in shouldanswer");
                          console.log(this.myStatements());
            for (var statement in statements){
            // If the query contains
            // hot, warm, cold, chilly, freezing, wet, rain, snow, icy,
            // forecast, weather, sun, raincoat, umbrella, sunscreen
            var result;
            if (result = XRegExp.exec(args.rawInput, XRegExp(statements[statement]))) {
                console.log("Input matches "+statements[statement]);
                console.log(result.condition);
                return true;    
            }
            }

        },
        when: function(args) {
            // assume "now"
            // forecast: tomorrow
            // tomorrow: tomorrow
            // day of week: day of week
            // this weekend
            // next month

              },
        where: function(args) {
            // look for a noun phrase
               },
        myStatements: function() {
            return [
                'weather',  
                'is it (?<condition>.*?) out',
                '(?:what\'s|what is) it like outside',
                'weather forecast',
                'what\'s the forecast',
                'will it be (?<condition>\\w+)\\s+(?<time>.*)?',
                '(?:do|will) i need a (?:raincoat|macintosh|umbrella|slicker)',
                ];

                      },
        timeSense: function(statement) {
            var countTimeUnits = '(?<count>.*?)\\s+(?<units>second|minute|hour|day|week|fortnight|month|quarter|year|decade|aeon)';
           return [     
            "right now",
            "now",
            "in "+countTimeUnits,
            countTimeUnits + " ago",
            "yesterday",
            "today",
            "tonight",
            "tomorrow (?<timeofday>morning|afternoon|evening|night)",
                            
            ]

                   },
    }
});
