const express = require("express");
const app = express();
const cors = require("cors");
app.use(express.json());
require("./db/config");
const Subscription = require("./db/Subscription");
app.use(cors());

app.get("/", (req, resp) => {
  resp.send("working...");
});

app.post("/subscriptions", async (req, res) => {
  // console.log("req.body", req.body);
  const { name, gridDetails } = req.body;

  try {
    // Create an array to hold the grid details
    const gridDetailsArray = [];

    // Iterate over the gridDetails from the request and push each grid detail object into the gridDetailsArray
    for (const gridDetail of gridDetails) {
      const { date, startTime, endTime,id } = gridDetail;
      gridDetailsArray.push({ date, startTime, endTime , id });
    }

    // Create a new subscription with the array of gridDetails
    const newSubscription = new Subscription({
      name,
      gridDetails: gridDetailsArray,
    });

    // Save the new subscription to the database
    let result = await newSubscription.save();
    res.send(result);
  } catch (err) {
    res.send({ result: err });
  }
});

app.get("/subscriptions", async (req, resp) => {
  try {
    let subscribers = await Subscription.find();
    if (subscribers.length > 0) {
      resp.send(subscribers);
    } else {
      resp.send({ result: "No data in DB" });
    }
  } catch (err) {
    resp.send({ result: err });
  }
});

app.put("/update/:id/:gridDetailId", async (req, resp) => {
  try {
    console.log(req.body);
    const { name, _id, gridDetails } = req.body;

    // Create an object to hold the updated subscription fields
    const updateFields = {};

    // Update the name if provided
    if (name) {
      updateFields.name = name;
    }

    // Update the specific grid detail in the gridDetails array
    if (_id && gridDetails) {
      const updatedGridDetailsArray = gridDetails.map((gridDetail) =>
        gridDetail._id === _id ? { ...gridDetail } : gridDetail
      );
      updateFields.gridDetails = updatedGridDetailsArray;
    }

    console.log(updateFields);

    // Use the extracted updateFields in the updateOne method
    let result = await Subscription.updateOne(
      {
        _id: req.params.id,
      },
      {
        $set: updateFields,
      }
    );

    resp.send(result);
  } catch (err) {
    resp.send({ result: err });
  }
});

app.delete("/subscriptions-delete/:id", async (req, resp) => {
  try {
    // console.log('req.params.id',req.params.id);
    const result = await Subscription.deleteOne({
      _id: req.params.id,
    });
    // console.log("result",result);
    resp.send(result);
  } catch {
    resp.send({ result: "some thing went wrong  please try after some time" });
  }
});

app.delete("/subscriptions-delete/:subscriptionId/:gridDetailId", async (req, resp) => {
    try {
      const subscriptionId = req.params.subscriptionId;
      const gridDetailId = req.params.gridDetailId;
  
      const result = await Subscription.findOneAndUpdate(
        { _id: subscriptionId },
        { $pull: { gridDetails: { _id: gridDetailId } } }
      );
      resp.send(result);
    } catch (err) {
      resp.send({ result: "something went wrong, please try again later" });
    }
  });
  

const PORT = 4800;
app.listen(PORT, () => {
  console.log(`Server started on http://localhost:${PORT}`);
});
