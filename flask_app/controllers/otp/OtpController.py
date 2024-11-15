import json
import os
import time as t
from datetime import datetime
from typing import List

import pandas as pd
import polyline
import requests
from controllers.otp.OtpHelper import OtpHelper
from model.entities.location.Location import Location
from model.enums.mode.TripMode import TripMode


class OtpController:

    def __init__(self):

        self.otp_helper = OtpHelper()
        self.base_url = os.getenv('OTP_BASE_URL')
        self.path = os.getenv('OTP_ROUTE_PATH')

    def get_waypoints(self, response: json) -> List[Location] or None:
        try:

            list_locations = []
            legs = response["plan"].get('itineraries')[0].get('legs')
            for i in range(len(legs)):
                # TODO: optionally generate different segments from one otp segment
                result = legs[i].get('legGeometry').get('points')
                coordinates = polyline.decode(result, 5)
                df_coordinates = pd.DataFrame(coordinates)
                df_coordinates = df_coordinates.apply(lambda x: Location(x[0], x[1]), axis=1)
                list_locations.extend(df_coordinates.values.tolist())

            return (list_locations)

        except KeyError:
            print('OTP KeyError route coordinates')
            return None

        except IndexError:
            print("Liste der OTP Strecken ist leer")
            return None

    def get_distance(self, response: json) -> float:
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

    def get_duration(self, response: json) -> float:
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

        return duration / 60

    def get_response(self, start_location: Location, end_location: Location, mode: TripMode,
                     input_time=None, input_waxWalkDistance='500'):

        mode = self.otp_helper.mode_to_otp_mode(mode).value
        original_start_location = self.otp_helper.location_to_otp_format(start_location)
        original_end_location = self.otp_helper.location_to_otp_format(end_location)

        if not input_time:
            input_time = datetime.now()

        offsets = [(0, 0), (0.0001, 0), (-0.0001, 0), (0, 0.0001), (0, -0.0001)]
        start_time = t.time()

        def make_request(start_loc: str, end_loc: str) -> json:

            is_dev = os.getenv('DEV', '').lower() == 'true'

            if is_dev:
                # Local IP for testing
                response = requests.get(
                    "http://127.0.0.1:8080/otp/routers/default/plan?fromPlace=" + start_loc + "&toPlace=" +
                    end_loc + "&time=" + str(input_time.hour) + ":" + str(input_time.minute) + "&date=" +
                    str(input_time.month) + "-" + str(input_time.day) + "-" + str(input_time.year) + "&mode=" +
                    mode + "&maxWalkDistance=50000&arriveBy=false"
                )

            else:
                # IP of locally running otp server
                response = requests.get(
                    self.base_url + self.path + "?fromPlace=" + start_loc + "&toPlace=" + end_loc + "&time=" + str(
                        input_time.hour) + ":" + str(input_time.minute) + "&date=" +
                    str(input_time.month) + "-" + str(input_time.day) + "-" + str(input_time.year) + "&mode=" +
                    mode + "&maxWalkDistance=50000&arriveBy=false")

            print(response.url)
            print("otp response: " + str(response))
            return json.loads(response.content)

        def get_adjusted_location(loc: Location, offset: tuple) -> str:
            """Returns location adjusted by the specified offset."""
            adjusted_loc = Location(loc.lat + offset[0], loc.lon + offset[1])
            return self.otp_helper.location_to_otp_format(adjusted_loc)

        # Attempt routing with alternating adjustments to start and end locations
        for offset in offsets:
            # First, adjust the start location with the current offset
            start_loc = get_adjusted_location(start_location, offset)
            end_loc = original_end_location
            try:
                resp = make_request(start_loc, end_loc)
                if 'error' not in resp and resp["plan"].get("itineraries"):
                    if offset != (0, 0):
                        print(f"Start location adjusted by ({offset[0]}, {offset[1]})")
                    return resp
                print(f"Attempt with start offset ({offset[0]}, {offset[1]}) failed to find a route.")

            except KeyError:
                print('OTP KeyError during route request with start location adjustments')
            except IndexError:
                print("Liste der OTP Strecken ist leer during start location adjustments")

            # Next, adjust the end location with the same offset
            start_loc = original_start_location
            end_loc = get_adjusted_location(end_location, offset)
            try:
                resp = make_request(start_loc, end_loc)
                if 'error' not in resp and resp["plan"].get("itineraries"):
                    if offset != (0, 0):
                        print(f"End location adjusted by ({offset[0]}, {offset[1]})")
                    return resp
                print(f"Attempt with end offset ({offset[0]}, {offset[1]}) failed to find a route.")

            except KeyError:
                print('OTP KeyError during route request with end location adjustments')
            except IndexError:
                print("Liste der OTP Strecken ist leer during end location adjustments")

        end_time = t.time()
        print("otp time: " + str(end_time - start_time))
        print(f"Keine OTP Strecke für diesen Start- und End-Standort und den Modus {mode} gefunden.\n"
              "Versuchen Sie es nochmal.")

        return {"error": "No route found after multiple attempts"}

    # start and end coordinates in format (lat, lom) as String
    # OPT modes are CAR, BICYCLE, WALK
    def get_response_from_coordinates(self, start_coordinates: str, end_coordinates: str, otp_mode: str):
        input_time = datetime.now()

        response = requests.get(
            self.base_url + self.path + "?fromPlace=" + start_coordinates + "&toPlace=" + end_coordinates + "&time=" + str(
                input_time.hour) + ":" + str(input_time.minute) + "&date=" +
            str(input_time.month) + "-" + str(input_time.day) + "-" + str(input_time.year) + "&mode=" +
            otp_mode + "&maxWalkDistance=50000&arriveBy=false")

        print(response.url)
        print("otp response: " + str(response))

        resp = json.loads(response.content)

        if 'error' in resp:
            print("Error in otp request")

        if resp["plan"].get("itineraries") == []:
            print("Keine OTP Strecke für diesen Start- und End-Standort und den Modus " + str(
                otp_mode) + " gefunden.\nVersuchen Sie es nochmal")

        return resp

