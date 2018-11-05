import sys
import requests as rs
from bs4 import BeautifulSoup
from datetime import datetime

page = rs.get("https://www.ndbc.noaa.gov/data/realtime2/46244.spec")
soup = BeautifulSoup(page.text, 'html.parser')

readings = soup.text
row = readings.split('\n')
inputDate = datetime.strptime(sys.argv[1], "%m/%d/%Y %I:%S %p")


data = row[2].split()
date =  data[0] + ' '+ data[1] +' ' + data[2]
x = 2 
while(x < len(row)-1):
    data = row[x].split()
    rowDate  = datetime(int(data[0]), int(data[1]), int(data[2]), int(data[3]), int(data[4]))
    if(inputDate > rowDate):
        print(data)
        break
    x += 1
    
    

