# OTP request # OTP request # OTP request # OTP request # OTP request # OTP request # OTP request # OTP request
import json
from datetime import datetime
from typing import List
import polyline
import requests
import pandas as pd
import time as t
import csv

from classes.Location import Location


def otprequest(input_startloc, input_endloc, mode, input_time=None, input_waxWalkDistance='500'):

    mode = mode.value

    if not input_time:
        input_time = datetime.now()
        # 1:02pm&date=02-02-2020
    # input_time = '1:02pm&date=22-02-2020'
    response = requests.get("http://localhost:8080/otp/routers/default/plan?fromPlace=" + input_startloc + "&toPlace=" +
                            input_endloc + "&time=" + str(input_time.hour) + ":" + str(input_time.minute) + "&date=" +
                            str(input_time.month) + "-" + str(input_time.day) + "-" + str(input_time.year) + "&mode=" +
                            mode + "&maxWalkDistance=50000&arriveBy=false")
    print("otp response: " + str(response))


    resp = json.loads(response.content)

    # pprint.pprint(resp)

    return resp


def otp_get_response(start_location: Location, end_location: Location, mode, time=None):
    start_coords = start_location.get_string()
    end_coords = end_location.get_string()

    start = t.time()
    response = otprequest(start_coords, end_coords, mode=mode, input_time=time)

    if 'error' in response:
        print("Error in otp request")

    if (response["plan"].get("itineraries") == []):
        print("Keine OTP Strecke für diesen Start- und End-Standort und den Modus " + str(mode) + " gefunden.\nVersuchen Sie es nochmal")

    end = t.time()
    print("otp request: " + str(end - start))

    return response


def otp_get_duration(response) -> float:
    try:
        itineraries = (response["plan"].get("itineraries"))
        duration = 0
        for nr in range(0, len(itineraries)):
            duration += (itineraries[nr].get("duration"))

    except IndexError:
        print("Liste der OTP Strecken ist leer")
        return 0

    except KeyError:
        print('OTP KeyError duration')
        return 0

    return duration


def otp_get_distance(response) -> float:
    try:
        itineraries = (response["plan"].get("itineraries"))
        it = itineraries[0]
        legs = it['legs']
        dist = 0
        for leg in legs:
            dist += int(leg['distance'])
    except KeyError:
        print('OTP KeyError distance')
        return 0
    except IndexError:
        print("Liste der OTP Strecken ist leer")
        return 0

    return int(dist)

# Function to return coordinates of OTP Itinerary
def otp_get_route_coordinates(response) -> List[Location] or 0:
    try:

        list_locations = []
        legs = response["plan"].get('itineraries')[0].get('legs')
        for i in range(len(legs)):
            #TODO: optionally generate different segments from one otp segment
            result = legs[i].get('legGeometry').get('points')
            coordinates = polyline.decode(result, 5)
            df_coordinates = pd.DataFrame(coordinates)
            df_coordinates = df_coordinates.apply(lambda x: Location(x[0], x[1]), axis=1)
            list_locations.extend(df_coordinates.values.tolist())

        return (list_locations)

    except KeyError:
        print('OTP KeyError route coordinates')
        return 0

    except IndexError:
        print("Liste der OTP Strecken ist leer")
        return 0

