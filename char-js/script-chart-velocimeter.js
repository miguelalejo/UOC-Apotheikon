 crearVelocmetroMas();
  async function crearVelocmetroMas() {
    var ctx = document.getElementById("velocimeter-mascarillas");
    new Chart(ctx, {
      type: "tsgauge",
      data: {
        datasets: [{
          backgroundColor: ["#0fdc63", "#fd9704", "#ff7143"],
          borderWidth: 0,
          gaugeData: {
            value: 7777,
            valueColor: "#ff7143"
          },
          gaugeLimits: [0, 3000, 7000, 10000]
        }]
      },
      options: {
                events: [],
                showMarkers: true
      }
    });
  }