#! /bin/bash

mongoimport --host db_container --db project --collection restaurants --type json --file /mongo_seed/restaurants_slice.json --jsonArray  && /
mongoimport --host db_container --db project --collection avatars --type json --file /mongo_seed/avatars.json --jsonArray