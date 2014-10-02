For http://solidarity-with-hk.code4.hk/

https://www.facebook.com/globalsolidarityHK


###How do I add new events?

Add them to [this spreadsheet](https://docs.google.com/spreadsheets/d/16i87Mw3jBRH-vYB0A8WESzUKcRrUS1bzNBRHpEVeSMk/edit#gid=942163273) and highlight the new columns in green.

To get new events into the website

1. Seperate the new events into their own spreadsheet
2. Download the spreadsheet as a .csv file
3. Upload the .csv file to mapbox.com
4. Download the converted file as new.geojson
5. run ./convert.py new.geojson final.geojson (this will add some fields)
6. Add the new features in final.geojson into the current data.geojson file.
7. Make a pull request with your new data.geojson file


###How do I add new photos?

Upload new photos [here](https://drive.google.com/?tab=mo&authuser=0#folders/0B2vZb3bzwhG-N2ZtbFFtY2M4SlU) under the appropriate location folder

To get new photos into the website

1. Add the photos to the git repo under ./img/photos/<place-name>
2. Reference the photos in the geojson like this: https://github.com/code4hk/solidarity-with-hk/commit/3b351bc490deb778729ab616fec46914a2182381


###What else can I do to help?

Look into the [github issues](https://github.com/code4hk/solidarity-with-hk/issues)

