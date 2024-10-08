export const selectIsRefreshing = (state) => state.auth.isRefreshing;
export const selectIsLoggedIn = (state) => state.auth.isLoggedIn;
export const selectUserEmail = (state) => state.auth.user;
export const selectErrorAuth = (state) => state.auth.isError;
export const selectIsRegistered = (state) => state.auth.isRegistered;
export const selectToken = (state) => state.auth.token;
