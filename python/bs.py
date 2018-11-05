import requests as rs
from bs4 import BeautifulSoup

#grabs the html doc
page =rs.get("https://www.ndbc.noaa.gov/station_page.php?station=46244")
soup = BeautifulSoup(page.content,'html.parser')

#grabs the second table
swelltable = soup.findAll("table",{"class" : "dataTable"})[1]

#sets a navigable string variable to check against to avoid parsing whitespace
typechecker = type(list(swelltable)[0])

#grab all the rows in the table
for tablerows in list(swelltable):

    #makes sure that the current item is not a space
    if(type(tablerows) != typechecker ):
        
        #set a counter to keep track of columns for database entry
        columncounter = 0

        #grab each c
        row = list(tablerows.children)
         
        #make sure that the row isnt a header and doens have any whitespace 
        if(type(list(row)[0])  != typechecker and str(row[0]) != '<th class="dataHeader">MM</th>' ): 
            
            print('the time is: ' +  row[2].text + '\n')
            
            for data in row:
                
                #print out data from each row and save the row data into variables to be entered into our table
                
                if(columncounter == 0):
                    MM = data.text
                    columncounter = columncounter + 1
                    
                elif(columncounter == 1):
                    DD = data.text
                    columncounter =  columncounter + 1  

                elif(columncounter == 2):
                    TIME = data.text
                    columncounter =  columncounter + 1

                elif(columncounter == 3):
                    WVHT = data.text
                    columncounter =  columncounter + 1

                elif(columncounter == 4):
                    SwH = data.text
                    columncounter =  columncounter + 1

                elif(columncounter == 5):
                    SwP = data.text
                    columncounter =  columncounter + 1

                elif(columncounter == 6):
                    SwD = data.text
                    columncounter = columncounter + 1

                elif(columncounter == 7):
                    WWH = data.text
                    columncounter =  columncounter + 1
                    
                elif(columncounter == 8):
                    WWP = data.text
                    columncounter =  columncounter + 1

                elif(columncounter == 9):
                    WWD = data.text
                    columncounter =  columncounter + 1

                elif(columncounter == 10):
                    STEEPNESS = data.text
                    columncounter =  columncounter + 1

                elif(columncounter == 11):
                    APD = data.text
                    columncounter = 0; 
            
            noaaData = {"MM":MM,
                    "DD":DD,
                    "TIME":TIME,
                    "WVHT":WVHT,
                    "SwH":SwH,
                    "SwP":SwP,
                    "SwD":SwD, 
                    "WWH":WWP,
                    "WWD":WWD, 
                    "STEEPNESS":STEEPNESS,
                    "APD":APD}
            print(noaaData)    
                      
                    
                    
                    
                    
                    
                    
                    
                    
 
        print("\n")








