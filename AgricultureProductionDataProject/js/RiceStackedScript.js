

(function(){

        fs = require('fs');
        fs.readFile('../Production-Department_of_Agriculture_and_Cooperation_1.csv', 'utf8', function (err,data) {
              if (err) {
                return console.log(err);
              }
              else
              {
            //var csv is the CSV file with headers
                      var lines=data.split("\n");
                      var result = [];
                      //headers
                      var headers=lines[0].split(",");
                      var curryear = 1993;
                      var states = ["Andhra Pradesh", "Karnataka", "Kerala", "Tamil Nadu"];
                      //var CashCropType = ["Cotton", "Jute and Mesta", "Sugarcane"];
                      for(var year=4; year < 26 ; year++)
                      {
                          var obj={};
                          obj["year"] = curryear;curryear++;
                          //var yearly = [];
                            var array=[];
                            for(var i=1 ; i<lines.length ; i++)
                            {
                            for(var j=0; j < states.length ; j++ )
                              {
                                var currentline = lines[i].split(",");
                                if((currentline[0].indexOf("Agricultural Production Foodgrains Rice Yield") != -1)
                                      && (currentline[0].indexOf(states[j]) != -1))
                                        {
                                          if(currentline[year] == "NA" || currentline[year] == "NA\r") currentline[year] = "0.0";
                                          obj[states[j]]= currentline[year];
                                        }
                                      }// end line iteration

                              } //end state iteration
                            result.push(obj);
                        }// en eac

                        //writing into json file

                              var outputFilename = '../tempRiceStackedData.json';

                                fs.writeFile(outputFilename, JSON.stringify(result, null, 4), function(err) {
                                    if(err) {
                                      console.log(err);
                                    } else {
                                      console.log("JSON saved to " + outputFilename);
                                    }
                                });
                }
            });
}());
