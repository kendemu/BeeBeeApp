import sqlite3
import os, sys

conn = sqlite3.connect("menu.db")
dirs = os.listdir("menu")

menus = []
prices = []

for files in dirs:
    if files.find("_price") > -1:
        prices.append(files)
    else:
        menus.append(files)

menus = sorted(menus)
prices = sorted(prices)

for i, j in zip(menus, prices):
    table = i.replace(".txt", "")
    names = open("menu/"+i, "r")
    prices = open("menu/"+j, "r")
    
    query = "CREATE TABLE " + table + "(name string,price int);"
    print query
    print("*" *20)
    conn.execute(query)
    
    cursor = conn.execute("SELECT * FROM " + i.replace(".txt", ""))
    for name, price in zip(names, prices):
        name = name.encode(encoding='UTF-8').replace("'", "''")
        query = "INSERT INTO " + table + " VALUES(\'" + name  + "\'," + price + ");"
        print query
        conn.execute(query)

conn.commit()        
conn.close()
