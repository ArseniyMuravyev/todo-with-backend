import { TUser } from "@arseniy/types";
import { createSlice } from "@reduxjs/toolkit";
import {
	checkAuth,
	deleteAvatar,
	deleteUser,
	login,
	logout,
	register,
	updateUser,
	uploadAvatar,
} from "./actions";

interface UserState {
	isAuthenticated: boolean;
	user: TUser | null;
	loading: boolean;
}

const initialState: UserState = {
	isAuthenticated: false,
	user: null,
	loading: false,
};

export const userSlice = createSlice({
	name: "user",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(login.pending, (state) => {
				state.loading = true;
			})
			.addCase(login.fulfilled, (state, action) => {
				state.user = action.payload;
				state.loading = false;
				state.isAuthenticated = true;
			})
			.addCase(login.rejected, (state) => {
				state.loading = false;
			})
			.addCase(logout.pending, (state) => {
				state.loading = true;
			})
			.addCase(logout.fulfilled, (state) => {
				state.user = null;
				state.loading = false;
				state.isAuthenticated = false;
			})
			.addCase(logout.rejected, (state) => {
				state.loading = false;
			})
			.addCase(register.fulfilled, (state, action) => {
				state.loading = false;
				state.user = action.payload;
				state.isAuthenticated = true;
			})
			.addCase(register.pending, (state) => {
				state.loading = true;
			})
			.addCase(register.rejected, (state) => {
				state.loading = false;
			})
			.addCase(updateUser.pending, (state) => {
				state.loading = true;
			})
			.addCase(updateUser.fulfilled, (state, action) => {
				state.loading = false;
				if (state.user) {
					state.user.name = action.payload.name;
				}
			})
			.addCase(updateUser.rejected, (state) => {
				state.loading = false;
			})
			.addCase(checkAuth.fulfilled, (state, action) => {
				state.user = action.payload;
				state.loading = false;
			})
			.addCase(checkAuth.pending, (state) => {
				state.loading = true;
			})
			.addCase(checkAuth.rejected, (state) => {
				state.loading = false;
			})
			.addCase(deleteUser.pending, (state) => {
				state.loading = true;
			})
			.addCase(deleteUser.fulfilled, (state) => {
				state.user = null;
				state.loading = false;
				state.isAuthenticated = false;
			})
			.addCase(deleteUser.rejected, (state) => {
				state.loading = false;
			})
			.addCase(uploadAvatar.pending, (state) => {
				state.loading = true;
			})
			.addCase(uploadAvatar.fulfilled, (state, action) => {
				state.loading = false;
				if (state.user && action.payload.avatarName) {
					state.user.avatarName = action.payload.avatarName;
				}
			})
			.addCase(uploadAvatar.rejected, (state) => {
				state.loading = false;
			})
			.addCase(deleteAvatar.pending, (state) => {
				state.loading = true;
			})
			.addCase(deleteAvatar.fulfilled, (state) => {
				state.loading = false;
				if (state.user) {
					state.user.avatarName = undefined;
				}
			})
			.addCase(deleteAvatar.rejected, (state) => {
				state.loading = false;
			});
	},
});

export default userSlice.reducer;
