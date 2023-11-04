import React, { useState } from "react";
import { Grid, Typography, TextField, Paper, Button } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import axios from "axios";

const styles = {
  root: {
    width: "80%",
    padding: "20px",
    margin: "0 auto",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  question: {
    fontSize: "20px",
    fontWeight: 600,
    marginBottom: "10px",
  },
  formField: {
    margin: "10px 0",
  },
  submitButton: {
    marginTop: "20px",
  },
  paper: {
    padding: "20px",
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
    width: "95%",
  },
  descriptionBox: {
    margin: "10px 0",
  },
  characterCounter: {
    fontSize: "14px",
    color: "gray",
    textAlign: "right",
  },
};

const currencies = [
  {
    value: "Mumbai",
    label: "Mumbai",
  },
  {
    value: "Banglore",
    label: "Banglore",
  },
  {
    value: "Chandigarh",
    label: "Chandigarh",
  },
  {
    value: "Delhi",
    label: "Delhi",
  },
  {
    value: "Ahmedabad",
    label: "Ahmedabad",
  },
  {
    value: "Kolkata",
    label: "Kolkata",
  },
  {
    value: "Hyderabad",
    label: "Hyderabad",
  },
];
const food = [
  {
    value: "Mexican",
    label: "Mexican",
  },
  {
    value: "Homemade Style",
    label: "Homemade Style",
  },
  {
    value: "Punjabi",
    label: "Punjabi",
  },
  {
    value: "South Indian",
    label: "South Indian",
  },
  {
    value: "Chinese",
    label: "Chinese",
  },
];
const places = [
  {
    value: "Religious Places",
    label: "Religious Places",
  },
  {
    value: "Fun Activities",
    label: "Fun Activities",
  },
  {
    value: "Heritage",
    label: "Heritage",
  },
  {
    value: "Local Attractions",
    label: "Local Attractions",
  },
];

export default function AddressForm() {
  const [noOfPeople, setNoOfPeople] = useState("");
  const [noOfDays, setNoOfDays] = useState("");
  const [planStay, setPlanStay] = useState("");
  const [typeOfFood, setTypeOfFood] = useState("");
  const [interestedPlaces, setInterestedPlaces] = useState("");
  const [interestedOutdoor, setInterestedOutdoor] = useState("");

  const [description, setDescription] = useState("");
  const maxCharacterLimit = 600;

  const handleDescriptionChange = (event) => {
    const inputValue = event.target.value;
    if (inputValue.length <= maxCharacterLimit) {
      setDescription(inputValue);
    }
  };

  const handleOnClick = async () => {
    console.log({
      noOfDays,
      noOfPeople,
      planStay,
      typeOfFood,
      interestedOutdoor,
      interestedPlaces,
    });

    try {
      const response = await axios.post("http://localhost:8000/api/v1/getRecomendation", {
        noOfDays,
        noOfPeople,
        planStay,
        typeOfFood,
        interestedOutdoor,
        interestedPlaces,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div style={styles.root}>
      <Paper style={styles.paper} elevation={3}>
        <Typography variant="h4" gutterBottom>
          Travel Trivia
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <TextField
              label="How many people will be in your travel group"
              placeholder="Number of People"
              fullWidth
              onChange={(e) => setNoOfPeople(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Total Number of Days for the Trip"
              placeholder="How many days are you planning to stay on this trip"
              fullWidth
              onChange={(e) => setNoOfDays(e.target.value)}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              id="outlined-select-currency"
              select
              label="Where do you plan to stay during your trip?"
              placeholder="Preferred Stay Location"
              fullWidth
              onChange={(e) => setPlanStay(e.target.value)}
            >
              {currencies.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              id="outlined-select-currency"
              select
              label="What types of food are you interested in during your trip?"
              placeholder="Preferred Stay Location"
              fullWidth
              onChange={(e) => setTypeOfFood(e.target.value)}
            >
              {food.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              id="outlined-select-currency"
              select
              label="What types of places are you interested in visiting during your trip? "
              placeholder="Places of Interest"
              fullWidth
              onChange={(e) => setInterestedPlaces(e.target.value)}
            >
              {places.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Are you interested in any outdoor adventures or activities?"
              placeholder="Tell us your outdoor interests"
              fullWidth
              onChange={(e) => setInterestedOutdoor(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Tell us about your previous travel experiences and details "
              fullWidth
              multiline
              rows={4}
              value={description}
              onChange={handleDescriptionChange}
              className={styles.descriptionBox}
            />
            <div style={styles.characterCounter}>
              {description.length}/{maxCharacterLimit}
            </div>
          </Grid>
          <Grid item xs={12}>
            <Button
              variant="contained"
              color="primary"
              style={styles.submitButton}
              onClick={handleOnClick}
            >
              Submit
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
}