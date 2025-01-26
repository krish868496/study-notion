import { createSlice } from "@reduxjs/toolkit";

const myForm = createSlice({
  name: "form",
  initialState: {
    section: {
      address: "",
      city: "",
      state: "",
      zip: "",
    },
  },
  reducers: {
    setSection: (state, action) => {
      // Update the entire section object
      state.section = action.payload;
    },
    updateField: (state, action) => {
      // Update a specific field within the section
      const { field, value } = action.payload;
      if (field in state.section) {
        state.section[field] = value;
      }
    },
  },
});

export const { setSection, updateField } = myForm.actions;

export default myForm.reducer;
