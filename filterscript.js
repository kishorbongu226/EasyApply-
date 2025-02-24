document.addEventListener("DOMContentLoaded", function () {
  // State to City Mapping
  const stateCityMap = {
    "Andhra Pradesh": ["Vijayawada", "Visakhapatnam", "Guntur"],
    "Tamil Nadu": ["Chennai", "Coimbatore", "Madurai"],
    Telangana: ["Hyderabad", "Warangal"],
    Karnataka: ["Bangalore", "Mysore"],
    Kerala: ["Thiruvananthapuram", "Kochi"],
  };

  // Stream to Degree & Specialization Mapping
  const streamDegreeMap = {
    Commerce: ["B.Com", "BBA"],
    Engineering: ["BE", "B.Tech"],
    Design: ["B.Des"],
    "Hotel Management": ["BHM"],
    Nursing: ["B.Sc Nursing"],
  };

  const streamSpecializationMap = {
    Engineering: [
      "Computer Science",
      "Mechanical Engineering",
      "Civil Engineering",
    ],
    Commerce: ["Finance", "Accounting"],
    Design: ["Graphic Design", "Fashion Design"],
    "Hotel Management": ["Culinary Arts", "Hospitality Management"],
    Nursing: ["General Nursing", "Midwifery"],
  };

  // Function to update cities based on state
  function updateCities() {
    const selectedStates = Array.from(
      document.querySelectorAll("#stateList input:checked")
    ).map((el) => el.parentElement.textContent.trim());

    let cityList = document.getElementById("cityList");
    cityList.innerHTML = ""; // Clear previous entries

    selectedStates.forEach((state) => {
      if (stateCityMap[state]) {
        stateCityMap[state].forEach((city) => {
          let label = document.createElement("label");
          label.innerHTML = `<input type='checkbox' /> ${city}`;
          cityList.appendChild(label);
        });
      }
    });
  }

  // Function to update degree and specialization based on stream
  function updateDegreeAndSpecialization() {
    const selectedStream = document
      .querySelector("#streamList input:checked")
      ?.parentElement.textContent.trim();

    let degreeList = document.getElementById("degreeList");
    let specializationList = document.getElementById("specializationList");
    degreeList.innerHTML = "";
    specializationList.innerHTML = "";

    if (selectedStream && streamDegreeMap[selectedStream]) {
      streamDegreeMap[selectedStream].forEach((degree) => {
        let label = document.createElement("label");
        label.innerHTML = `<input type='checkbox' /> ${degree}`;
        degreeList.appendChild(label);
      });
    }

    if (selectedStream && streamSpecializationMap[selectedStream]) {
      streamSpecializationMap[selectedStream].forEach((specialization) => {
        let label = document.createElement("label");
        label.innerHTML = `<input type='checkbox' /> ${specialization}`;
        specializationList.appendChild(label);
      });
    }
  }

  // Event Listeners
  document.querySelectorAll("#stateList input").forEach((el) => {
    el.addEventListener("change", updateCities);
  });

  document.querySelectorAll("#streamList input").forEach((el) => {
    el.addEventListener("change", updateDegreeAndSpecialization);
  });
});
