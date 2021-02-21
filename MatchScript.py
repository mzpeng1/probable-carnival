import csv
import json
import pymongo
import matching
import os
from matching.games import StableRoommates  
from operator import eq 
# Function to convert a CSV to JSON
# Takes the file paths as arguments
def match(eventName):
    client = pymongo.MongoClient("mongodb+srv://admin1:90Hkwfxjo94MBaMl@cluster0.odi3f.mongodb.net/matching?retryWrites=true&w=majority")
    db = client['matching']
    print(db.list_collection_names())
    dbt = db['matchings']
    getresponses = db['responses']
    # create a dictionary
    print("HERE : ")
    users = {}
    resps = getresponses.find({"eventName":  eventName })
    for response in resps:
        print(response)
        users[response['userEmail']] = {}
        users[response['userEmail']]["responses"] = response['Responses']
        users[response['userEmail']]["Name"] = response["userName"]
    usersim = {}
    simrank = {}
    #actual matching logic
    for key in users:
        simrank[key] = []
        for key2 in users:
            tempsim = 0
            for question in users[key]["responses"]:
                c1 = question.split(", ")
                c2 = question.split(", ")
                tempsim += sum(map(eq, c1 , c2)) 
            #invert tempsim
            tempsim *= -1
            mytuple = (tempsim, key2)
            simrank[key].append(mytuple)
    for key in simrank:
        simrank[key].sort()
    gamedict = {}
    for key in simrank:
        gamedict[key] =  [lis[1] for lis in  simrank[key]] 
    for key in gamedict:
        for match in gamedict[key]:
            if match == key:
                gamedict[key].remove(key)
    game = StableRoommates.create_from_dictionary(
        gamedict
    )
    matching = game.solve()
    # Open a json writer, and use the json.dumps() 
    # function to dump data
    #Replace <password> with the password for the admin1 user. Replace <dbname> with the name of the database that connections will use by default. Ensure any option params are 
    tosend = {}
    tosend['matchings'] = []
    for pair1 in matching:
        pair2 = matching[pair1]
        pair1 = str(pair1)
        pair2 = str(pair2)
        if pair2 in users:
            tosend['matchings'].append({"email":pair1,"match":{"name":users[pair2]['Name'],"email":pair2}})
    x = dbt.insert_one(tosend)

# Call the make_json function
match('HackSC')
 