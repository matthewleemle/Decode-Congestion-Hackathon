import json

origin = input()
origin = json.loads(origin)

destination = input()
destination = json.loads(destination)



origin_long = origin["longitude"]
origin_lat = origin["latitude"]
dest_long = destination["longitude"]
dest_long = destination["latitude"]


lat1 = 12
long1 = 23
lat2 = 34
long2 = 123
lat3 = 13
long3 = 34


coords1 = str(lat1) + "," + str(long2)
coords2 = str(lat2) + "," + str(long2)
coords3 = str(lat3) + "," + str(long3)


#parkloc = '{"park1": 2}'
parkloc = '{"park1" :' + '"' + coords1 + '"' + "," + '"park2" :' + '"' + coords2 + '"' + "," + '"park3" :'+ '"' + coords3 + '"' + "}"


print(parkloc)
