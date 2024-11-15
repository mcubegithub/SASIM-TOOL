import json
import os
import time

import requests
# TODO: check if file location including 'flask_app/.../'  is working on VM
from model.entities.location.Location import Location


class EfaMvvStopFinder:

    def __init__(self):
        self.base_url = os.getenv('MVV_API_BASE_URL')
        self.path = os.getenv('MVV_API_STOP_FINDER_PATH')
        self.path_coord = os.getenv('MVV_API_STOP_FINDER_PATH_COORD')

    def get_response(self, address: str) -> json:
        start = time.time()

        url = (self.base_url + self.path + '&name_sf=' + str(address))

        response = requests.get(url)

        print("Efa MVV API StopFinder response: " + str(response))
        end = time.time()
        print("Efa MVV API StopFinder time: " + str(end - start))
        response = response.json()

        return response

    def get_response_coord(self, location: Location) -> json:
        start = time.time()

        url = (self.base_url + self.path_coord + '&name_sf=' + str(location.lon) + ':' + str(location.lat) +
               ':WGS84[DD.ddddd]')

        response = requests.get(url)

        print("Efa MVV API StopFinder response: " + str(response))
        end = time.time()
        print("Efa MVV API StopFinder time: " + str(end - start))
        response = response.json()

        return response

    @staticmethod
    def get_location(response: json) -> Location:
        coords = response.get('locations')[0].get('coord')
        location = Location(lat=coords[0], lon=coords[1])
        return location

    @staticmethod
    def get_efa_location_id(response: json) -> str:
        efa_id = response.get('locations')[0].get('id')
        return efa_id

# efaMvvStopFinder = EfaMvvStopFinder()
# response = efaMvvStopFinder.get_response('Ansprengerstr.22, München')
# id = efaMvvStopFinder.get_efa_location_id(response)
# location = efaMvvStopFinder.get_location(response)
# print(id)
# print(location)
