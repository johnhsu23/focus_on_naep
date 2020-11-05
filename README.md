# focus_on_naep
Focus on NAEP(FoN) production folder structure overview

    ├── public                  # the codes that shared by `preparedness`,`student group`, etc
    │   ├── js      						# scripts
     				├── header.js 			# FoN global header script
            ├── footer.js				# FoN global footer script
        ├── inc             
            ├── header.inc  		# FoN global header html file           
            ├── footer.inc			# FoN global footer html file           
    	  ├── css
    	  		├── header.css  		# FoN global header stylesheet           
            ├── footer.css			# FoN global footer stylesheet
        ├── images             
        └── ...                 # etc.
    └── preparedness						# John can organize files in his way
        ├── js      					
        ├── css     						 
        ├── images               
        └── index.aspx					# entry page for `Preparedness`
    └── student_group									
    └── others...
    └── index.aspx							# homepage for FoN

Steps to use FoN footer and header

1. Includes external css link between the head tag. 

    ```html
    <head>
      ......
      <link href="/focus_on_naep/public/css/header.css" rel="stylesheet" />
      <link href="/focus_on_naep/public/css/footer.css" rel="stylesheet" />
      ......
    </head>
    ```

2. Includes .inc files inside the body tag.

    ```html
    <body>
      ......
      <!--#include file="/focus_on_naep/public/inc/header.inc"-->
      <!-- your own code -->
      <!--#include file="/focus_on_naep/public/inc/footer.inc"-->
      ......
    </body>
    ```

3. Insert .js files before end of the body tag. The header.js and footer.js

    ```html
    <body>
    
      ......
    
      <script src="/focus_on_naep/public/js/vendor/jquery.chunk.js"></script>
      <script src="/focus_on_naep/public/js/header.js"></script>
      <script src="/focus_on_naep/public/js/footer.js"></script>
    
      ......
    </body>
    ```

Note: Recommend use absolute path to include resources (css, inc, js).