import sys 
import requests as rs
from bs4 import BeautifulSoup
from datetime import datetime
from datetime import timedelta

page = rs.get("https://www.ndbc.noaa.gov/data/realtime2/HBYC1.txt")
soup = BeautifulSoup(page.text, 'html.parser')

#grab the text from the oage
readings = soup.text

#split the text into an array where each index is a line in the document
row = readings.split('\n')

#convert the user input into a datetime object
inputDate = datetime.strptime(sys.argv[1], "%m/%d/%Y %I:%S %p")
inputDate = inputDate + timedelta(hours=8)

#search through each line until you find a row that is close to the user's inputted time and print the data
x = 2
while(x < len(row)-1):
        data = row[x].split()
        rowDate  = datetime(int(data[0]), int(data[1]), int(data[2]), int(data[3]), int(data[4]))
        if(inputDate > rowDate):
            print(data)
            break
        x += 1

