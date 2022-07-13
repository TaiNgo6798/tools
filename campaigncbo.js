const axios = require("axios").default;
const resultHelper = require("./resultHelper");

const main = async () => {
  let optimizeGoals = [
    "LEAD_GENERATION",
    "FOLLOWERS",
    "SHOW",
    "VALUE",
    "CONVERT",
    "ANCHOR_CLICK",
    "MT_LIVE_ROOM",
    "CLICK",
    "POST_ENGAGEMNT",
    "REACH",
    "PROFILE_VIEWS",
    "PRODUCT_CLICK_IN_LIVE",
    "VIDEO_VIEW",
    "INSTALL",
    "IN_APP_EVENT",
    "ENGAGED_VIEW",
  ];
  let objectiveTypes = [
    "APP_INSTALL",
    "CONVERSIONS",
    "ENGAGEMENT",
    "TRAFFIC",
    "REACH",
    "VIDEO_VIEWS",
    "LEAD_GENERATION",
    "CATALOG_SALES",
  ];

  let result = {};
  let errors = [];

  let total = objectiveTypes.length * optimizeGoals.length;
  let finished = 0;
  console.log(`Doing ${total} requests...`);

  for (let objectiveType of objectiveTypes) {
    let availableGoals = [];
    for (let optimizeGoal of optimizeGoals) {
      let data = JSON.stringify({
        advertiser_id: "7037362514581012482",
        budget_mode: "BUDGET_MODE_DAY",
        objective_type: objectiveType,
        campaign_name: `CBO - ${objectiveType} - ${optimizeGoal} - ` + Date.now(),
        bid_type: "BID_TYPE_NO_BID",
        budget_optimize_switch: 1,
        optimize_goal: optimizeGoal,
        budget: "5000",
        start_time: 123,
        end_time: 456,
      });

      let config = {
        method: "post",
        url: "https://business-api.tiktok.com/open_api/v1.2/campaign/create/",
        headers: {
          "Access-Token": "cafc3296c27e6e7dc5c8dd3eff7284f26a1d92a6",
          "Content-Type": "application/json",
        },
        data: data,
      };

      const response = await axios(config);
      let status = "FAILED";
      if (response.data.code === 0) {
        availableGoals.push(optimizeGoal);
        status = "SUCCESS";
      } else {
        errors.push(response);
      }
      console.log(
        `${++finished}/${total} ==== ${status} ==== ${response.data.message}`
      );
    }
    result[objectiveType] = availableGoals;
  }

  let fileName = "test CBO Campaign Result"
  resultHelper.writeResult(result, fileName)
  console.log("Check the result at ./results/" + fileName + ".json")
};

main();
