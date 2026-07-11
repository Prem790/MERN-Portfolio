import { createSlice } from "@reduxjs/toolkit";

const rootSlice = createSlice({
  name: "root",
  initialState: {
    loading: false,
    portfolioData: null,
    reloadData: false,
  },
  reducers: {
    ShowLoading: (state) => {
      state.loading = true;
    },
    HideLoading: (state) => {
      state.loading = false;
    },
    SetPortfolioData: (state, action) => {
      state.portfolioData = action.payload;
    },
    SetReloadData: (state, action) => {
      state.reloadData = action.payload;
    },

    // --- Optimistic updates: mutate the store directly instead of
    // --- re-downloading the entire portfolio after every change. ---

    SetIntro: (state, action) => {
      state.portfolioData.intro = action.payload;
    },
    SetAbout: (state, action) => {
      state.portfolioData.about = action.payload;
    },
    SetContact: (state, action) => {
      state.portfolioData.contact = action.payload;
    },

    AddExperience: (state, action) => {
      state.portfolioData.expreiences.push(action.payload);
    },
    UpdateExperience: (state, action) => {
      const list = state.portfolioData.expreiences;
      const i = list.findIndex((e) => e._id === action.payload._id);
      if (i !== -1) list[i] = action.payload;
    },
    DeleteExperience: (state, action) => {
      state.portfolioData.expreiences = state.portfolioData.expreiences.filter(
        (e) => e._id !== action.payload
      );
    },

    AddProject: (state, action) => {
      state.portfolioData.projects.push(action.payload);
    },
    UpdateProject: (state, action) => {
      const list = state.portfolioData.projects;
      const i = list.findIndex((p) => p._id === action.payload._id);
      if (i !== -1) list[i] = action.payload;
    },
    DeleteProject: (state, action) => {
      state.portfolioData.projects = state.portfolioData.projects.filter(
        (p) => p._id !== action.payload
      );
    },
  },
});

export default rootSlice.reducer;
export const {
  ShowLoading,
  HideLoading,
  SetPortfolioData,
  SetReloadData,
  SetIntro,
  SetAbout,
  SetContact,
  AddExperience,
  UpdateExperience,
  DeleteExperience,
  AddProject,
  UpdateProject,
  DeleteProject,
} = rootSlice.actions;
