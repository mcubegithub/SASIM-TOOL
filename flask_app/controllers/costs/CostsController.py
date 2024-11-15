import math
import os

import pandas as pd

from model.entities.costs.ExternalCosts import ExternalCosts
from model.entities.costs.InternalCosts import InternalCosts
from model.enums.mode.IndividualMode import IndividualMode
from model.enums.mode.Mode import Mode
from model.enums.mode.PublicTransportMode import PublicTransportMode
from model.enums.mode.SharingMode import SharingMode
from config.definitions import ROOT_DIR


class CostsController:

    def __init__(self):
        self._df_db_internal_costs, self._df_db_internal_costs_mvv, self._df_db_external_costs = self._initialise_db()

    def get_external_costs(self, distance: float, mode: Mode) -> ExternalCosts or None:

        if type(mode) == SharingMode:
            if mode == SharingMode.TIER:
                mode = SharingMode.ESCOOTER_SHARING
            elif mode == SharingMode.EMMY:
                mode = SharingMode.MOPED_SHARING
            elif mode == SharingMode.CAB:
                mode = SharingMode.BICYCLE_SHARING
            elif mode == SharingMode.SHARENOW or mode == SharingMode.FLINKSTER:
                mode = SharingMode.CAR_SHARING
            else:
                print("ERROR: mode cannot be converted to simplified sharing mode ")
                return None

        distance = distance / 1000

        external_costs = ExternalCosts(
            air=self._df_db_external_costs['AIR'][mode.value] * distance,
            noise=self._df_db_external_costs['NOISE'][mode.value] * distance,
            climate=self._df_db_external_costs['CLIMATE'][mode.value] * distance,
            accidents=self._df_db_external_costs['ACCIDENTS'][mode.value] * distance,
            space=self._df_db_external_costs['SPACE'][mode.value] * distance,
            barrier=self._df_db_external_costs['BARRIER'][mode.value] * distance,
            congestion=self._df_db_external_costs['CONGESTION'][mode.value] * distance,
            external_costs=self._df_db_external_costs['TOTAL'][mode.value] * distance
        )

        return external_costs

    def get_internal_costs(self, distance: float, duration: float, mode: Mode) -> InternalCosts:

        distance = distance / 1000

        if type(mode) == IndividualMode:
            internal_costs = self._calculate_internal_costs_individual(distance, mode)

        elif type(mode) == PublicTransportMode:
            internal_costs = self._calculate_internal_costs_pt()

        elif type(mode) == SharingMode:
            internal_costs = self._calculate_internal_costs_sharing(distance, duration, mode)

        else:
            print("ERROR: mode is not valid for internal costs calculation")
            internal_costs = 0

        return internal_costs

    def get_internal_public_transport_costs(self, mvv_ticket_name: str) -> InternalCosts:

        internal_costs_mvv = self._df_db_internal_costs_mvv['TICKET'][mvv_ticket_name]
        return InternalCosts(variable=internal_costs_mvv)

    @staticmethod
    def _initialise_db():
        # internal_costs_path = os.path.join(ROOT_DIR, 'multimodal-costbased-routeplanner', 'db', 'costs_db',
        #                                    'db_internal_costs.csv')
        # internal_costs_mvv_path = os.path.join(ROOT_DIR, 'multimodal-costbased-routeplanner', 'db', 'costs_db',
        #                                        'db_internal_costs_mvv.csv')
        # external_costs_path = os.path.join(ROOT_DIR, 'multimodal-costbased-routeplanner', 'db', 'costs_db',
        #                                    'db_external_costs.csv')

        # heroku deployment path
        internal_costs_path = os.path.join(ROOT_DIR, 'db', 'costs_db',
                                           'db_internal_costs.csv')
        internal_costs_mvv_path = os.path.join(ROOT_DIR, 'db', 'costs_db',
                                               'db_internal_costs_mvv.csv')
        external_costs_path = os.path.join(ROOT_DIR, 'db', 'costs_db',
                                           'db_external_costs.csv')

        df_db_internal_costs = pd.read_csv(internal_costs_path, delimiter=",", index_col=0)
        df_db_internal_costs_mvv = pd.read_csv(internal_costs_mvv_path, delimiter=",", index_col=0)
        df_db_external_costs = pd.read_csv(external_costs_path, delimiter=",", index_col=0)

        df_db_internal_costs = df_db_internal_costs.astype(float)
        df_db_external_costs = df_db_external_costs.astype(float) / 100

        return df_db_internal_costs, df_db_internal_costs_mvv, df_db_external_costs

    def _calculate_internal_costs_sharing(self, distance: float, duration: float, mode: SharingMode) -> InternalCosts:
        internal_costs_per_km = self._df_db_internal_costs['PER_KM'][mode.value]
        internal_costs_per_ride = self._df_db_internal_costs['PER_RIDE'][mode.value]
        internal_costs_per_minute = self._df_db_internal_costs['PER_MINUTE'][mode.value]
        internal_costs_per_quarter_hour = self._df_db_internal_costs['PER_QUARTER_HOUR'][mode.value]
        internal_costs_per_hour = self._df_db_internal_costs['PER_HOUR'][mode.value]
        internal_costs_max = self._df_db_internal_costs['MAX_COSTS'][mode.value]

        internal_costs = internal_costs_per_ride + internal_costs_per_minute * math.ceil(
            duration) + internal_costs_per_quarter_hour * math.ceil(
            duration / 15) + internal_costs_per_hour * math.ceil(duration / 60) + internal_costs_per_km * distance

        if internal_costs_max != 0 and internal_costs > internal_costs_max:
            internal_costs = internal_costs_max

        return InternalCosts(variable=internal_costs)

    def _calculate_internal_costs_individual(self, distance: float, mode: IndividualMode) -> InternalCosts:

        internal_variable_costs = self._df_db_internal_costs['PER_KM'][mode.value] * distance
        internal_fixed_costs = self._df_db_internal_costs['FIXED_PER_KM'][mode.value]

        return InternalCosts(variable=internal_variable_costs, fixed=internal_fixed_costs)

    @staticmethod
    def _calculate_internal_costs_pt() -> InternalCosts:

        internal_costs = 0

        return InternalCosts(variable=internal_costs)
