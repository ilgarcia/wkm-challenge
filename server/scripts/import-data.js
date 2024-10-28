const axios = require("axios");
const states = require('./states');
const cities = require('./cities');

async function postStates(stateName) {
  try {
    // Check if the state already exists
    const response = await axios.get(
      `http://127.0.0.1:1337/api/states?filters[state][$eq]=${stateName}`
    );

    if (response.data.data.length === 0) {
      // State doesn't exist, so insert it
      const result = await axios.post("http://127.0.0.1:1337/api/states", {
        data: { state: stateName },
      });
      console.log(`State inserted: ${stateName}`, result.data);
      return result.data.data.id; // Return the new state's ID
    } else {
      console.log(`State already exists: ${stateName}`);
      return response.data.data[0].id; // Return existing state's ID
    }
  } catch (error) {
    console.error(
      `Error checking/inserting state: ${stateName}`,
      error.message
    );
    throw error;
  }
}

async function postCities(cityName, stateName) {
  try {
    const stateId = await postStates(stateName); // Get the state ID

    // Check if the city already exists
    const response = await axios.get(
      `http://127.0.0.1:1337/api/cities?filters[city][$eq]=${cityName}`
    );

    if (response.data.data.length === 0) {
      // City doesn't exist, so insert it
      const result = await axios.post(
        "http://127.0.0.1:1337/api/cities?populate=*",
        {
          data: { city: cityName, state: { id: stateId } },
        }
      );
      console.log(`City inserted: ${cityName}`, result.data);
    } else {
      console.log(`City already exists: ${cityName}`);
    }
  } catch (error) {
    console.error(`Error checking/inserting city: ${cityName}`, error.message);
  }
}

async function insertData() {
  try {
    // Insert states
    for (const state of states) {
      await postStates(state.state);
    }

    // Insert cities
    for (const city of cities) {
      await postCities(city.city, city.state.state);
    }
  } catch (error) {
    console.error("Error inserting data:", error.message);
  }
}

// Run the insertion process
insertData();
