

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
                      var seedType = ["Groundnut", "Castorseed", "Sesamun", "Nigerseed", "Rapeseed and Mustard", "Linseed", "Safflower", "Sunflower", "Soyabean"];
                      for(var m=0;m<seedType.length;m++)
                      {
                              both=0;
                              var obj={};
                              for(var i=1;i<lines.length;i++)
                              {
                                var currentline = lines[i].split(",");
                                if((currentline[0].indexOf("Agricultural Production Oilseeds")!=-1) && (currentline[0].indexOf(seedType[m]) != -1)
                                && (currentline[0].indexOf("Kharif") != -1  || currentline[0].indexOf("Rabi") != -1 ))
                                {
                                    both = both + parseFloat(currentline[24]);
                                }
                              }// inner for end
                                    obj["seed"] = seedType[m];
                                    obj["value"] = both;
                                    result.push(obj);
                                  //  console.log(result);
                        }//Outer for end

                        //writing into json file

                              var outputFilename = '../json/tempOilseedFile.json';

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
