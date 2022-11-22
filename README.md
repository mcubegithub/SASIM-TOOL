
### a fullcost based multimodal route planner

The VMRP Web App is a routeplanner for the city of Munich, that enables to plan and compare routes with many different modes (private, sharing and public transport). It is part of the research project SASIM of M-Cube (Munich Cluster for the Future of Mobility in Metropolitan Regions). The goal of this project is, to give users a better understanding of the external effects of their mobility behaviour.

## Features:
- plan multiple routes for a start- and destination address and a mobility mode
- compare different routes in a result list 
- MobiScore: the MobiScore is a score developed by M-Cube, to evaluate the sustainability of a mobility choice for a particular route. The MobiScore calculation is based on the distance and the external costs of a route.
- compare costs, distance and travel time in a bar chart
- (coming soon ...) get further information on the external costs of a particular route 

## Use of Web-App:
The VMRP Web-App is already deployed and can be accessed at sasim.mcube-cluster.de. It is to note, that the current version 0.2 is a beta-version, and bugs can occur.

## Get started for Developers:
For developers, it is important, that after cloning the project additionally add the file api_keys.py to the config folder. Then add your TIER and DB Api keys in the following format:

```
dbkey = 'Own DB API-Key'
tierkey = 'Own TIER API-Key'
```

IMPORTANT: if you want to run the project, change constant ROOT_DIR in config/definitions to variant 2 by commenting VARIANT 1 and uncommenting VARIANT 2. VARIANT 1 is needed if you want to build an .exe file

Before the backend can be used, it is necessary to run a local instance of OTP2 (Open Trip Planner) on the local device of the developer (find tutorial here --> https://docs.opentripplanner.org/en/latest/Basic-Tutorial/)

The application server can be then deployed locally (--> run app.py). The Backend REST-Api can be accessed at localhost:5000/plattform/ with the following params:
- inputStartAddress:
a Munich address as type string in format "<Streetname> <#>, München"
- inputEndAddress: 
a Munich address as type string in format "<Streetname> <#>, München"
- tripMode: a valid tripMode 
following tripModes can be used:
- "CAR" : trip with a private gasoline car
- "ECAR" : trip with a private electric car
- "MOPED" : trip with a private moped
- "EMOPED" : trip with a private electric moped
- "BICYCLE" : trip with a private bicycle
- "EBICYCLE" : trip with a private electric bicycle
- "EMMY: trip using the closest Emmy sharing electric moped and walking to the vehicle
- "TIER" : trip using the closest TIER sharing e-scooter and walking to the vehicle
- "CAB": trip using the closest Call a Bike sharing bicycle and walking to the vehicle
- "FLINKSTER": trip using the closest Flinkster sharing car and walking to the vehicle
- "SHARENOW" : trip using the closest Sharenow sharing car and walking to the vehicle
- "PT" : trip using public transport and walking to the first station
- "INTERMODAL_PT_BIKE" : trip using public transport and using the bicycle to get to the first station

## Support:
contact g.ottrubay@gmail.com for support

## Licence:
MIT Public Licence
