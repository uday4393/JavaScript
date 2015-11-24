

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
                      var both;
                      var grainType = ["Rice", "Wheat", "Jowar", "Bajra", "Maize", "Ragi",
                       "Small Millets", "Barley", "Coarse Cereals", "Cereals", "Tur", "Other Kharif Pulses", "Gram", "Pulses"];
                      for(var m=0;m<grainType.length;m++)
                      {
                              both=0;
                              var obj={};
                              for(var i=1;i<lines.length;i++)
                              {
                                var currentline = lines[i].split(",");
                                if( (currentline[0].indexOf("Area") == -1) && (currentline[0].indexOf("Total") == -1) && (currentline[0].indexOf("Yield") == -1)
                                  && (currentline[0].indexOf("Volume") == -1) && (currentline[0].indexOf("Agricultural Production Foodgrains Production Foodgrains") == -1)
                                  && (currentline[0].indexOf("Agricultural Production Foodgrains")!=-1) && (currentline[0].indexOf(grainType[m]) != -1)
                                && (currentline[0].indexOf("Kharif") != -1  || currentline[0].indexOf("Rabi") != -1 )
                                  )
                                {
                                    both = both + parseFloat(currentline[24]);
                                }
                              }// inner for end
                                    obj["grain"] = grainType[m];
                                    obj["value"] = both;
                                    result.push(obj);
                                    //console.log(result);
                        }//Outer for end

                        //writing into json file

                              var outputFilename = '../json/tempFoodgrainFile.json';

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
