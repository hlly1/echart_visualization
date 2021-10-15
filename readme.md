***Readme:***

This page visualized the fatal police shootings in USA from 2015 to 2021. **The best resolution of this dashboard is 1920x937 (scaling/zoom: 100%).** 

The initial data for the chart 1-5, 7 and 8 are from year 2021, the control panel at the right box could be used to view data from another year (2015 - 2021). Chart 5 could be used to view data by gender. Since data about females are to less, only chart 5 has a dimension that is by gender.

***Chart Descriptions and Interactions***

**Chart 1** shows how many people were shot by officers per month in this year (In 2021, data is only updated to Sep). Lines represent the trend and amount of incidents while police taking the body camera and not. Green line is for amount of incidents when police taking camera, red line is for that when police not taking camera. The chart indicates that each month has possibility to have more victims and in most of the incidents, police usually does not take camera.

**Chart 2** indicates amount of victims shot by races in the year. It indicates that white victims occupies the largest portion, black and hispanic victims are always following from 2015 to 2021.

**Chart 3** shows how the victims armed and which armed way is the most popular in this year. The chart indicates that most victims shot were armed with gun. Knife is the second popular armed way while the third one is usually not armed. Escape 2019 and 2021. In 2019, the third popular armed way is vehicle and in 2021, the third one is undetermined.

**Chart 4** describes the distribution of fatal police shootings in USA by state in this year. The dimension is the amount of fatal shootings of the state in the year. The map shows that California and Texas have the most fatal shootings. Their total trends are decreasing, except some slight increasing during the 7 years.

**Chart 5** Shows the amount of shootings by weeks and days in the year. The color and size of a circle represents the high or low amount of shooting accidents. The chart indicates that in the incidents happened randomly and female victims are far less than male victims.

**Chart 6** is a static bar chart showing the threat level of victims among 7 years. It indicates that most victims shot are aggressive, but other level also has a big portion after aggressive level.

**Chart 7** shows how many victims have a sign of mental illness in this year. The blue bar represents the no sigh of mental illness while green bar expresses opposite. The total amount of blue bar and green bar in a month also matches the data from Chart 1. Chart 7 tells us that most victims has no sign of mental illness, but there is also a significant number of victims that cannot be ignored, even if they are not the majority.

**Chart 8** shows the escaping Ways for Victims in the year, most victims did not flee according to the chart from 2015 to 2021. For escaping victims, most of them choose car and foot. Victims in a small portion used other ways to flee.

**Reference**

**Data Source:**

Github - washingtonPost/data-police-shootings

URL: <https://github.com/washingtonpost/data-police-shootings> 

**Data Process Tool:**

Covert csv to json file

URL: <https://csvjson.com/csv2json> 

**Background Image (bg.png):**

URL: <https://m.zcool.com.cn/work/ZMzMxNjI3NDQ=.html> 

**Card Background Image (card-bg.png):**

URL: <https://lovepik.com/images/png-blue.html> 

Blue Png vectors by Lovepik.com

The image was modified by Windows10 paint 3D to change the canvas size.

**USA State Names and Abbreviations Data Files:**

URL: <https://worldpopulationreview.com/static/states/abbr-name.json> 

**Code Reference:**

Bootstrap for style:

<https://getbootstrap.com/>

Flexible.js libary for layout

<http://g.tbcdn.cn/mtb/lib-flexible/0.3.4/??flexible_css.js,flexible.js>

jQuery for loading map:

<https://cdn.bootcdn.net/ajax/libs/jquery/3.6.0/jquery.js>

Echarts for drawing charts

<https://cdn.jsdelivr.net/npm/echarts@5/dist/echarts.min.js> 

Codes for drawing charts are learned from Echart API document:

<https://echarts.apache.org/examples/en/index.html>

