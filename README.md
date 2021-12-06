# Run project
  - `yarn start`

# Complete Functionality
  - User List：list the user about git hub information.
  - Click each User then can show dialog to see a person detail information.
# Flow:
1. component use useUserStore through userDispatch to call function to fetch api.
2. dispatchers(src/stores/user/dispatchers.ts) can subscribe response and call dispatch reducer.
3. reducers(src/stores/user/reducers.ts)  can management  and update state.
4. useUserStore get new state.
# Introduction
- userProvider store state and dispatch, through dispatch update state.
- useReducer hook accept current state(usually from after completing a fetch request) and dispatch function(action object).
- action object from src/stores/user/actions.ts
- dispatcher can through function to fetch data.
- request(src/helpers/request.ts) changes every response to Observable, then dispatcher can subscribe api response.
