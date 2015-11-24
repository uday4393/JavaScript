

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
                      //var CashCropType = ["Cotton", "Jute and Mesta", "Sugarcane"];
                      for(var year=4; year < 26 ; year++)
                      {
                          var obj={};
                          obj["year"] = curryear;curryear++;
                          var yearly = 0.0;
                          for(var i=1 ; i<lines.length ; i++)
                            {
                                  var currentline = lines[i].split(",");
                                  //console.log(currentline[0]);
                                  if((currentline[0].indexOf("Agricultural Production Commercial Crops Cotton") != -1)
                                      || (currentline[0].indexOf("Agricultural Production Commercial Crops Jute and Mesta") != -1)
                                      || (currentline[0].indexOf("Agricultural Production Commercial Crops Sugarcane") != -1)
                                    )
                                  {
                                    //console.log("yayy");
                                    if(currentline[year] == "NA") currentline[year] = "0.0";
                                    yearly = yearly + parseFloat(currentline[year]);
                                  }
                            }
                            obj["CashCropAggregate"] = yearly;
                            result.push(obj);
                        }

                        //writing into json file

                              var outputFilename = '../json/tempCashCropFile.json';

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
