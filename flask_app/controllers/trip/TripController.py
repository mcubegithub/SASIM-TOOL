from enum import Enum

import pandas as pd
from controllers.costs.CostsController import CostsController
from controllers.efa_mvv.EfaMvvCoordController import EfaMvvCoordController
from controllers.efa_mvv.EfaMvvTripController import EfaMvvRouteController
from controllers.mobi_score.MobiScoreController import MobiScoreController
from controllers.muenchenapi.MunchenapiController import MuenchenapiController
from controllers.otp.OtpController import OtpController
from controllers.sharing.EmmyController import EmmyController
from controllers.sharing.ShareNowController import ShareNowController
from controllers.sharing.TierController import TierController
from controllers.sharing.deutsche_bahn.CallABikeController import CallABikeController
from controllers.sharing.deutsche_bahn.FlinksterController import FlinksterController
from helpers.GeoHelper import GeoHelper
from model.entities.costs.Costs import Costs
from model.entities.costs.ExternalCosts import ExternalCosts
from model.entities.costs.InternalCosts import InternalCosts
from model.entities.location.Location import Location
from model.entities.segment.IndividualSegment import IndividualSegment
from model.entities.segment.PublicTransportSegment import PublicTransportSegment
from model.entities.segment.SharingSegment import SharingSegment
from model.entities.trip.Trip import Trip
from model.enums.mode.IndividualMode import IndividualMode
from model.enums.mode.Mode import Mode
from model.enums.mode.SharingMode import SharingMode
from model.enums.mode.TripMode import TripMode
from model.enums.tarif_zone.MvvTarifZone import MvvTarifZone
from model.enums.trip_type.TripType import TripType


# TODO: enable different types of routing controller
class RoutingType(Enum):
    OTP = OtpController()
    MVGO = MuenchenapiController()


class TripController:
    def __init__(self, df_sharing_vehicles: pd.DataFrame):

        self._df_sharing_vehicles = df_sharing_vehicles

        self._routing_controller = OtpController()
        # self._routing_controller = MuenchenapiController()
        # self._pt_controller = MvvController()
        self._pt_controller = EfaMvvRouteController()

        self._emmy_controller = EmmyController()
        self._share_now_controller = ShareNowController()
        self._tier_controller = TierController()
        self._call_a_bike_controller = CallABikeController()
        self._flinkster_controller = FlinksterController()

        self._efa_coords_controller = EfaMvvCoordController()

        self._costs_controller = CostsController()
        self._mobi_score_controller = MobiScoreController()

        self._geo_helper = GeoHelper()

    def get_trip(self, start_location: Location, end_location: Location, trip_mode: TripMode,
                 df_sharing_vehicels: pd.DataFrame, start_id=None,
                 end_id=None) -> Trip:

        trip_type = self._get_trip_type_from_trip_mode(trip_mode=trip_mode)

        if trip_type == TripType.TYPE_1:
            try:
                mode = self._get_mode_from_trip_mode(trip_mode)
                trip = self._get_trip_type_1(start_location=start_location, end_location=end_location, mode=mode,
                                             trip_mode=trip_mode)
            except IndexError:
                print("Error: could not get trip type 1")
                trip = None

        elif trip_type == TripType.TYPE_2:

            mode = self._get_mode_from_trip_mode(trip_mode=trip_mode)

            try:
                trip = self._get_trip_type_2(start_location=start_location, end_location=end_location,
                                             sharing_mode=mode,
                                             trip_mode=trip_mode, df_sharing_vehicles=df_sharing_vehicels)
            except IndexError:
                print("Error: could not get trip type 2")
                trip = None

        elif trip_type == TripType.TYPE_3:
            try:
                trip = self._get_trip_type_3_4_efa(start_location=start_location, end_location=end_location,
                                                   trip_type=TripType.TYPE_3, trip_mode=trip_mode, start_id=start_id,
                                                   end_id=end_id)
            except IndexError:
                print("Error: could not get trip type 3")
                trip = None

        elif trip_type == TripType.TYPE_4:
            try:
                trip = self._get_trip_type_3_4_efa(start_location=start_location, end_location=end_location,
                                                   trip_type=TripType.TYPE_4, trip_mode=trip_mode, start_id=start_id,
                                                   end_id=end_id)
            except IndexError:
                print("Error: could not get trip type 4")
                trip = None

        else:
            print("Error: trip type now valid")
            trip = None

        return trip

    def _get_trip_type_1(self, start_location: Location, end_location: Location, mode: Mode,
                         trip_mode: TripMode):

        router_response = self._routing_controller.get_response(
            start_location=start_location,
            end_location=end_location,
            mode=trip_mode
        )

        waypoints = self._routing_controller.get_waypoints(router_response)
        duration = self._routing_controller.get_duration(router_response)
        distance = self._routing_controller.get_distance(router_response)

        external_costs = self._costs_controller.get_external_costs(
            distance=distance,
            mode=mode
        )

        internal_costs = self._costs_controller.get_internal_costs(
            distance=distance,
            duration=duration,
            mode=mode
        )

        costs = Costs(
            internal_costs=internal_costs,
            external_costs=external_costs
        )

        segment = IndividualSegment(
            mode=mode,
            duration=duration,
            distance=distance,
            costs=costs,
            waypoints=waypoints
        )

        direct_distance = self._geo_helper.get_distance(start_location=start_location, end_location=end_location)
        mobi_score = self._mobi_score_controller.get_mobi_score(
            segment.costs.external_costs,
            direct_distance=direct_distance
        )

        trip = Trip(
            start_location=start_location,
            end_location=end_location,
            trip_mode=trip_mode,
            segments=[segment],
            duration=segment.duration,
            distance=segment.distance,
            costs=segment.costs,
            mobi_score=mobi_score
        )

        return trip

    def _get_trip_type_2(self, start_location: Location, end_location: Location, sharing_mode: SharingMode,
                         trip_mode: TripMode, df_sharing_vehicles: pd.DataFrame):

        # 1. get sharing position
        location_closest_vehicle = self._efa_coords_controller.get_location_closest_vehicle_single(df_sharing_vehicles,
                                                                                                   trip_mode)
        # 2. get walk waypoints, distance, duration, costs
        router_response_walk = self._routing_controller.get_response(
            start_location=start_location,
            end_location=location_closest_vehicle,
            mode=TripMode.WALK
        )

        distance_walk = self._routing_controller.get_distance(response=router_response_walk)
        duration_walk = self._routing_controller.get_duration(response=router_response_walk)
        waypoints_walk = self._routing_controller.get_waypoints(response=router_response_walk)
        internal_costs_walk = self._costs_controller.get_internal_costs(
            distance=distance_walk,
            duration=duration_walk,
            mode=IndividualMode.WALK
        )
        external_costs_walk = self._costs_controller.get_external_costs(distance=distance_walk,
                                                                        mode=IndividualMode.WALK)
        costs_walk = Costs(external_costs=external_costs_walk, internal_costs=internal_costs_walk)

        segment_walk = IndividualSegment(
            mode=IndividualMode.WALK,
            duration=duration_walk,
            distance=distance_walk,
            costs=costs_walk,
            waypoints=waypoints_walk
        )

        # 3. get ride waypoints, distance, duration, costs
        router_response_ride = self._routing_controller.get_response(
            start_location=location_closest_vehicle,
            end_location=end_location,
            mode=trip_mode
        )

        distance_ride = self._routing_controller.get_distance(response=router_response_ride)
        duration_ride = self._routing_controller.get_duration(response=router_response_ride)
        waypoints_ride = self._routing_controller.get_waypoints(response=router_response_ride)
        internal_costs_ride = self._costs_controller.get_internal_costs(
            distance=distance_ride,
            duration=duration_ride,
            mode=sharing_mode
        )

        external_costs_ride = self._costs_controller.get_external_costs(
            distance=distance_ride,
            mode=sharing_mode
        )

        costs_ride = Costs(external_costs=external_costs_ride, internal_costs=internal_costs_ride)

        segment_ride = SharingSegment(
            mode=sharing_mode,
            duration=duration_ride,
            distance=distance_ride,
            costs=costs_ride,
            waypoints=waypoints_ride
        )

        external_costs = external_costs_walk + external_costs_ride
        direct_distance = self._geo_helper.get_distance(start_location=start_location, end_location=end_location)
        mobi_score = self._mobi_score_controller.get_mobi_score(
            external_costs=external_costs,
            direct_distance=direct_distance
        )

        trip = Trip(
            start_location=start_location,
            end_location=end_location,
            trip_mode=trip_mode,
            segments=[segment_walk, segment_ride],
            duration=duration_walk + duration_ride,
            distance=distance_walk + distance_ride,
            costs=costs_walk + costs_ride,
            mobi_score=mobi_score
        )

        return trip

    ### deprecated function
    def _get_trip_type_3_4(self, start_location: Location, end_location: Location, trip_type: TripType,
                           trip_mode: TripMode):

        mvv_response = self._mvv_controller.get_response(start_location=start_location, end_location=end_location)
        mvv_trip_data = self._mvv_controller.get_mvv_trip_data(mvv_response)

        segments = []
        total_distance = 0
        total_duration = 0
        total_internal_costs = InternalCosts()
        total_external_costs = ExternalCosts()

        for i in range(len(mvv_trip_data.mvv_trip)):

            if (trip_type == TripType.TYPE_4 and i == 0):

                end_location_bike = mvv_trip_data.mvv_trip[0].waypoints[-1]
                router_response = self._routing_controller.get_response(
                    start_location=start_location,
                    end_location=end_location_bike,
                    mode=TripMode.BICYCLE)

                mode = IndividualMode.BICYCLE
                duration = self._routing_controller.get_duration(router_response)
                distance = self._routing_controller.get_distance(router_response)
                waypoints = self._routing_controller.get_waypoints(router_response)
                internal_costs = self._costs_controller.get_internal_costs(distance, duration, mode)
                external_costs = self._costs_controller.get_external_costs(distance, mode)
                costs = Costs(
                    internal_costs=internal_costs,
                    external_costs=external_costs
                )

                segments.append(IndividualSegment(
                    mode=mode,
                    duration=duration,
                    distance=distance,
                    costs=costs,
                    waypoints=waypoints
                ))

            else:
                mode = mvv_trip_data.mvv_trip[i].mode
                duration = mvv_trip_data.mvv_trip[i].duration
                distance = mvv_trip_data.mvv_trip[i].distance
                waypoints = mvv_trip_data.mvv_trip[i].waypoints
                from_tarif_zone = mvv_trip_data.mvv_trip[i].from_tarif_zone
                to_tarif_zone = mvv_trip_data.mvv_trip[i].to_tarif_zone

                external_costs = self._costs_controller.get_external_costs(distance, mode)
                internal_costs = InternalCosts(variable=0)

                costs = Costs(
                    internal_costs=internal_costs,
                    external_costs=external_costs
                )

                segments.append(PublicTransportSegment(
                    mode=mode,
                    duration=duration,
                    distance=distance,
                    costs=costs,
                    waypoints=waypoints,
                    from_tarif_zone=from_tarif_zone,
                    to_tarif_zone=to_tarif_zone
                ))

            total_distance += distance
            total_duration += duration
            total_internal_costs += internal_costs
            total_external_costs += external_costs

        direct_distance = self._geo_helper.get_distance(start_location=start_location, end_location=end_location)
        mobi_score = self._mobi_score_controller.get_mobi_score(
            external_costs=total_external_costs,
            direct_distance=direct_distance
        )

        internal_trip_costs = self._costs_controller.get_internal_public_transport_costs(mvv_trip_data.mvv_ticket_name)
        total_costs = Costs(
            internal_costs=internal_trip_costs,
            external_costs=total_external_costs
        )

        trip = Trip(
            start_location=start_location,
            end_location=end_location,
            trip_mode=trip_mode,
            segments=segments,
            duration=total_duration,
            distance=total_distance,
            costs=total_costs,
            mobi_score=mobi_score
        )

        return trip

    def _get_trip_type_3_4_efa(self, start_location: Location, end_location: Location, trip_type: TripType,
                               trip_mode: TripMode, start_id: str, end_id: str):

        # mvv_response = self._mvv_controller.get_response(start_location=start_location, end_location=end_location)
        # mvv_trip_data = self._mvv_controller.get_mvv_trip_data(mvv_response)

        efa_response = self._pt_controller.get_response(start_id=start_id, end_id=end_id)
        efa_trip = self._pt_controller.get_mvv_trip_data(efa_response)

        segments = []
        total_distance = 0
        total_duration = 0
        total_internal_costs = InternalCosts()
        total_external_costs = ExternalCosts()

        for i in range(len(efa_trip.efa_segments)):

            if (trip_type == TripType.TYPE_4 and i == 0):

                end_location_bike = efa_trip.efa_segments[0].waypoints[-1]
                router_response = self._routing_controller.get_response(
                    start_location=start_location,
                    end_location=end_location_bike,
                    mode=TripMode.BICYCLE)

                mode = IndividualMode.BICYCLE
                duration = self._routing_controller.get_duration(router_response)
                distance = self._routing_controller.get_distance(router_response)
                waypoints = self._routing_controller.get_waypoints(router_response)
                internal_costs = self._costs_controller.get_internal_costs(distance, duration, mode)
                external_costs = self._costs_controller.get_external_costs(distance, mode)
                costs = Costs(
                    internal_costs=internal_costs,
                    external_costs=external_costs
                )

                segments.append(IndividualSegment(
                    mode=mode,
                    duration=duration,
                    distance=distance,
                    costs=costs,
                    waypoints=waypoints
                ))

            else:
                mode = efa_trip.efa_segments[i].mode
                duration = efa_trip.efa_segments[i].duration
                distance = efa_trip.efa_segments[i].distance
                waypoints = efa_trip.efa_segments[i].waypoints
                from_tarif_zone = MvvTarifZone.none
                to_tarif_zone = MvvTarifZone.none

                external_costs = self._costs_controller.get_external_costs(distance, mode)
                internal_costs = InternalCosts(variable=0)

                costs = Costs(
                    internal_costs=internal_costs,
                    external_costs=external_costs
                )

                segments.append(PublicTransportSegment(
                    mode=mode,
                    duration=duration,
                    distance=distance,
                    costs=costs,
                    waypoints=waypoints,
                    from_tarif_zone=from_tarif_zone,
                    to_tarif_zone=to_tarif_zone
                ))

            total_distance += distance
            total_duration += duration
            total_internal_costs += internal_costs
            total_external_costs += external_costs

        # total_duration = efa_trip.total_duration

        direct_distance = self._geo_helper.get_distance(start_location=start_location, end_location=end_location)
        mobi_score = self._mobi_score_controller.get_mobi_score(
            external_costs=total_external_costs,
            direct_distance=direct_distance
        )

        internal_trip_costs = InternalCosts(variable=efa_trip.ticket_price)
        total_costs = Costs(
            internal_costs=internal_trip_costs + total_internal_costs,
            external_costs=total_external_costs
        )

        trip = Trip(
            start_location=start_location,
            end_location=end_location,
            trip_mode=trip_mode,
            segments=segments,
            duration=total_duration,
            distance=total_distance,
            costs=total_costs,
            mobi_score=mobi_score
        )

        return trip

    def _get_sharing_position(self, sharing_mode: SharingMode, start_location: Location):

        if (sharing_mode == SharingMode.EMMY):
            closest_vehicle = self._emmy_controller.get_closest_vehicle(start_location)

        elif (sharing_mode == SharingMode.TIER):
            closest_vehicle = self._tier_controller.get_closest_vehicle(start_location)

        elif (sharing_mode == SharingMode.CAB):
            closest_vehicle = self._call_a_bike_controller.get_closest_vehicle(start_location)

        elif (sharing_mode == SharingMode.SHARENOW):
            closest_vehicle = self._share_now_controller.get_closest_vehicle(start_location)

        elif (sharing_mode == SharingMode.FLINKSTER):
            closest_vehicle = self._flinkster_controller.get_closest_vehicle(start_location)

        else:
            print("ERROR: sharing mode is not valid to find closest sharing vehicle")
            closest_vehicle = None

        return closest_vehicle

    def _fetch_sharing_vehicles_efa(self, start_location: Location, quick_response: bool):

        response = self._efa_coords_controller.get_response(start_location, radius=1000, quick_response=quick_response)
        df_all_vehicles = self._efa_coords_controller.get_closest_vehicles_each(response, start_location)

        return df_all_vehicles

    def _get_trip_type_from_trip_mode(self, trip_mode: TripMode) -> TripType or None:

        if (
                trip_mode == TripMode.CAR or
                trip_mode == TripMode.ECAR or
                trip_mode == TripMode.MOPED or
                trip_mode == TripMode.EMOPED or
                trip_mode == TripMode.BICYCLE or
                trip_mode == TripMode.EBICYCLE or
                trip_mode == TripMode.WALK
        ):
            return TripType.TYPE_1

        elif (
                trip_mode == TripMode.CAB or
                trip_mode == TripMode.FLINKSTER or
                trip_mode == TripMode.SHARENOW or
                trip_mode == TripMode.TIER or
                trip_mode == TripMode.EMMY
        ):
            return TripType.TYPE_2

        elif (trip_mode == TripMode.PT):
            return TripType.TYPE_3
        elif (trip_mode == TripMode.INTERMODAL_PT_BIKE):
            return TripType.TYPE_4
        else:
            print("ERROR: trip mode not valid for conversion into trip type")
            return None

    def _get_mode_from_trip_mode(self, trip_mode: TripMode) -> Mode or None:
        if (trip_mode == TripMode.CAR):
            return IndividualMode.CAR
        elif (trip_mode == TripMode.ECAR):
            return IndividualMode.ECAR
        if (trip_mode == TripMode.MOPED): return IndividualMode.MOPED
        if (trip_mode == TripMode.EMOPED): return IndividualMode.EMOPED
        if (trip_mode == TripMode.BICYCLE): return IndividualMode.BICYCLE
        if (trip_mode == TripMode.EBICYCLE): return IndividualMode.EBICYCLE
        if (trip_mode == TripMode.WALK): return IndividualMode.WALK

        if (trip_mode == TripMode.CAB): return SharingMode.CAB
        if (trip_mode == TripMode.FLINKSTER): return SharingMode.FLINKSTER
        if (trip_mode == TripMode.SHARENOW): return SharingMode.SHARENOW
        if (trip_mode == TripMode.TIER): return SharingMode.TIER
        if (trip_mode == TripMode.EMMY):
            return SharingMode.EMMY

        else:
            print("ERROR: trip mode not valid for conversion into mode")
            return None

# ## TESTING
# # Ansprengerstr. 22
# lat1 = 48.1663834
# lon1 = 11.5748712
#
# # Sonnenstra. 11
# lat2 = 48.1377949
# lon2 = 11.5630753
#
# loc1 = Location(lat=lat1, lon=lon1)
# loc2 = Location(lat=lat2, lon=lon2)
#
# trip_controller = TripController()
# trip = trip_controller.get_trip(loc1, loc2, TripMode.CAR)
# trip_n = trip_controller.get_trip(loc1, loc2, TripMode.TIER)
# trip_pt = trip_controller.get_trip(loc1, loc2, TripMode.PT)
#
# print("\nmobiscore: " + str(trip.mobi_score))
# print("distance: " + str(trip.distance))
# print("internal: " + str(trip.costs.internal_costs.internal_costs))
# print("external: " + str(trip.costs.external_costs.external_costs))
#
# print("\nmobiscore: " + str(trip_n.mobi_score))
# print("distance: " + str(trip_n.distance))
# print("internal: " + str(trip_n.costs.internal_costs.internal_costs))
# print("external: " + str(trip_n.costs.external_costs.external_costs))
#
# print("\nmobiscore: " + str(trip_pt.mobi_score))
# print("distance: " + str(trip_pt.distance))
# print("internal: " + str(trip_pt.costs.internal_costs.internal_costs))
# print("external: " + str(trip_pt.costs.external_costs.external_costs))
