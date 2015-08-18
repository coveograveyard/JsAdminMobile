Available here : [m.cloud.coveo.com](https://m.cloud.coveo.com)

# JsAdminMobile
### Coveo’s mobile enabled cloud friendly administration console

**JsAdminMobile** allows mobile users to view most of the content available on Coveo's JsAdmin console. 

#### Screenshots
![Screenshots](https://raw.githubusercontent.com/Coveo/JsAdminMobile/master/screenshot.png)
##### [More screenshots here](https://drive.google.com/folderview?id=0B2rBrydxhUyhflBXYUNIdEltMzVYV1FiTlhjVE4tV3RZeGU2dzRDcThCYnBJU25SQ21LSE0&usp=sharing)
#
#
#### Description
JsAdminMobile allows users to access most of the important information related to the available organizations in Coveo Search Platform. It is possible to list the data sources to crawl in the search engine and their recent activities. It is also possible to perform refresh and rebuild actions on the available sources. The app also allows users to perform basic search queries and then displays the results. The app allows to manage the users and the groups that have access to the console. Finally, the app allows users to list the available servers and nodes related to the existing organizations. It is possible to shut down or start a server. This app is only accessible internally at Coveo. At the moment, it only works with the development environment.

#### Development
This app was developped by [Simon Lacoursiere](https://github.com/lacoursieresimon) in a Hackathon at Coveo during his summer internship. The idea came up since there was no way at the time to access the Coveo search engine admin console with a mobile device. In 24 hour, a prototype was developped with basic functionalities. After the hackathon development, the app was developped full time to have a clean code base, a valid authentication system and some other interesting features that were missing from the original prototype.

#### Tools
JsAdminMobile has been developped using
* [Ionic Framework](http://ionicframework.com/)
* [Underscore.js](http://underscorejs.org/)

#### Steps to run the app locally
This app is a static website, so cloning it and accessing to the _index.html_ file in _./www_ should give you a functionnal app. However, if you want to access all the functionnalities the Ionic CLI gives you (you should!!), here are the steps to follow:
* Install [node.js](https://nodejs.org/)
* ``` $ npm install -g cordova ionic // installs the ionic node package```
* ```cd ``` at the root of the project
* ``` $ ionic serve -l // runs a localserver with a watch on file changes```

#### Contributors
* [Simon Lacoursière](https://github.com/lacoursieresimon)


#### Nice to have features
The following features are things that would be nice to have someday
* Versionning during the Jenkins task so that the Amazon S3 cache invalidates itself
* Minify the code to help with loading times
* Allow the "Accept invite to organization" feature
* Allow the creation of new organizations
* Integrate TypeScript
