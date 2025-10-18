import { createSlice } from "@reduxjs/toolkit";
import {
  GetOthereUserThunk,
  userAvatarChangeThunk,
  userGetProfileThunk,
  userLoginThunk,
  userLogoutThunk,
  userPassChangeThunk,
  userProfilechangeThunk,
  userRegisterThunk,
} from "./user.thunk";

const initialState = {
  isAuthenticated: false,
  screenLoading: true,
  OtherUserProfile: null,
  userProfile: null,
  selectedUser: JSON.parse(localStorage.getItem("_id")),
  buttonLoading: false,
};
export const userslice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setSelectedUser: (state, action) => {
      localStorage.setItem(
        "_id",
        JSON.stringify({
          _id: action.payload?._id,
          fullname: action.payload?.fullname,
        })
      );
      state.selectedUser = {
        _id: action.payload?._id,
        fullname: action.payload?.fullname,
      };
    },
  },
  extraReducers: (builder) => {
    // login
    builder.addCase(userLoginThunk.pending, (state, action) => {
      state.buttonLoading = true;
    });
    builder.addCase(userLoginThunk.fulfilled, (state, action) => {
      state.userProfile = action.payload.responseData?.user;
      state.isAuthenticated = true;
      state.buttonLoading = false;
    });
    builder.addCase(userLoginThunk.rejected, (state, action) => {
      state.buttonLoading = false;
    });

    // User password change
    builder.addCase(userPassChangeThunk.pending, (state, action) => {
      state.buttonLoading = true;
    });
    builder.addCase(userPassChangeThunk.fulfilled, (state, action) => {
      state.buttonLoading = false;
    });
    builder.addCase(userPassChangeThunk.rejected, (state, action) => {
      state.buttonLoading = false;
    });

    // user Profile change
    builder.addCase(userProfilechangeThunk.pending, (state, action) => {
      state.buttonLoading = true;
    });
    builder.addCase(userProfilechangeThunk.fulfilled, (state, action) => {
      state.buttonLoading = false;
    });
    builder.addCase(userProfilechangeThunk.rejected, (state, action) => {
      state.buttonLoading = false;
    });

    // user avatar change
    builder.addCase(userAvatarChangeThunk.pending, (state, action) => {
      state.buttonLoading = true;
    });
    builder.addCase(userAvatarChangeThunk.fulfilled, (state, action) => {
      state.userProfile = action.payload.data.responseData;
      state.buttonLoading = false;
    });
    builder.addCase(userAvatarChangeThunk.rejected, (state, action) => {
      state.buttonLoading = false;
    });

    // register

    builder.addCase(userRegisterThunk.pending, (state, action) => {
      state.buttonLoading = true;
    });
    builder.addCase(userRegisterThunk.fulfilled, (state, action) => {
      state.userProfile = action.payload.responseData?.user;
      state.isAuthenticated = true;
      state.buttonLoading = false;
    });
    builder.addCase(userRegisterThunk.rejected, (state, action) => {
      state.buttonLoading = false;
    });

    // logout

    builder.addCase(userLogoutThunk.pending, (state, action) => {});
    builder.addCase(userLogoutThunk.fulfilled, (state, action) => {
      state.userProfile = null;
      state.isAuthenticated = false;
      state.buttonLoading = false;
      localStorage.clear();
    });
    builder.addCase(userLogoutThunk.rejected, (state, action) => {
      state.buttonLoading = false;
    });

    // get profile

    builder.addCase(userGetProfileThunk.pending, (state, action) => {});
    builder.addCase(userGetProfileThunk.fulfilled, (state, action) => {
      state.userProfile = action.payload?.responseData;
      state.isAuthenticated = true;
      state.screenLoading = false;
    });
    builder.addCase(userGetProfileThunk.rejected, (state, action) => {
      state.screenLoading = false;
    });

    // get-other-user

    builder.addCase(GetOthereUserThunk.pending, (state, action) => {});
    builder.addCase(GetOthereUserThunk.fulfilled, (state, action) => {
      state.screenLoading = false;
      state.OtherUserProfile = action.payload?.responseData;
    });
    builder.addCase(GetOthereUserThunk.rejected, (state, action) => {
      state.screenLoading = false;
    });
  },
});

export const { setSelectedUser } = userslice.actions;

export default userslice.reducer;
