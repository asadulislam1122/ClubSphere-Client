const express = require("express");
const cors = require("cors");
const app = express();
require("dotenv").config();
const port = process.env.PORT || 3000;
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
//
const admin = require("firebase-admin");

const serviceAccount = require("./fiarbase-admin-key.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});
// payment
const stripe = require("stripe")(process.env.STRIPE_SECRET);
// madileWare

app.use(express.json());
app.use(cors());

const verifyFBtoken = async (req, res, next) => {
  // console.log("headers in the madileWare", req.headers.authorization);
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).send({ message: "unauthorized access" });
  }
  try {
    const idToken = token.split(" ")[1];
    const decoded = await admin.auth().verifyIdToken(idToken);
    // console.log("decoded in the token", decoded);
    req.decoded_email = decoded.email;
    next();
  } catch (error) {
    return res.status(401).send({ message: "unauthorized access" });
  }
};
// mongodb setup

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster-first-server-ap.bcgcgzv.mongodb.net/?appName=Cluster-first-server-app`;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    await client.connect();
    // Send a ping to confirm a successful connection
    const db = client.db("photography-club");
    const clubCollection = db.collection("club");
    const paymentCollection = db.collection("payment");
    const userCollection = db.collection("users");
    const managerCollection = db.collection("manager");
    const eventCollection = db.collection("events");
    const eventRegistrationCollection = db.collection("eventRegistrations");

    //

    // payment
    // ইভেন্ট পেমেন্ট সেশন তৈরি (Server Side)
    app.post(
      "/create-event-checkout-session",
      verifyFBtoken,
      async (req, res) => {
        try {
          const info = req.body;
          const amount = parseInt(info.eventFee) * 100;

          const session = await stripe.checkout.sessions.create({
            line_items: [
              {
                price_data: {
                  currency: "usd",
                  unit_amount: amount,
                  product_data: {
                    name: `Event: ${info.eventTitle}`,
                    description: `Club: ${info.clubName}`,
                  },
                },
                quantity: 1,
              },
            ],
            customer_email: info.userEmail,
            mode: "payment",
            metadata: {
              type: "event_registration", // এটি দিয়ে আমরা সাকসেস পেজে আলাদা করব
              eventId: info.eventId,
              eventTitle: info.eventTitle,
              clubId: info.clubId,
              clubName: info.clubName,
              eventDate: info.eventDate,
              userEmail: info.userEmail,
              userName: info.userName,
            },
            success_url: `${process.env.SITE_DOMAIN}/dashboard/payment-success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${process.env.SITE_DOMAIN}/all-events`,
          });

          res.send({ url: session.url });
        } catch (error) {
          res.status(400).send({ error: error.message });
        }
      }
    );
    // 11111

    app.patch("/payment-success", async (req, res) => {
      try {
        const sessionId = req.query.session_id;
        if (!sessionId)
          return res.status(400).send({ message: "No session ID" });

        // ১. স্ট্রাইপ থেকে সেশন রিট্রিভ করা
        const session = await stripe.checkout.sessions.retrieve(sessionId);
        const transactionId = session.payment_intent;

        if (session.payment_status === "paid") {
          // ২. ডুপ্লিকেট চেক: এই ট্রানজ্যাকশন আইডি দিয়ে অলরেডি সেভ হয়েছে কি না?
          const alreadyExists = await eventRegistrationCollection.findOne({
            transactionId,
          });

          if (alreadyExists) {
            return res.send({
              success: true,
              message: "Already recorded",
              transactionId,
            });
          }

          // ৩. ডাটাবেসে সেভ করার লজিক
          if (session.metadata.type === "event_registration") {
            const meta = session.metadata;
            const registration = {
              eventId: meta.eventId,
              eventTitle: meta.eventTitle,
              userEmail: meta.userEmail,
              userName: meta.userName,
              clubId: meta.clubId,
              clubName: meta.clubName,
              eventDate: meta.eventDate,
              transactionId: transactionId,
              status: "paid",
              amount: session.amount_total / 100,
              registeredAt: new Date(),
            };

            const result = await eventRegistrationCollection.insertOne(
              registration
            );
            return res.send({
              success: true,
              type: "event",
              transactionId,
              result,
            });
          }
        }
        res
          .status(400)
          .send({ success: false, message: "Payment not completed" });
      } catch (error) {
        console.error("Error in payment-success:", error);
        res.status(500).send({ message: "Internal server error" });
      }
    });
    // 000000000000000000
    app.get("/my-event-registrations", verifyFBtoken, async (req, res) => {
      const email = req.query.email;

      // সিকিউরিটি চেক: লগইন করা ইউজারের ইমেইল আর কুয়েরি ইমেইল এক কিনা
      if (email !== req.decoded_email) {
        return res.status(403).send({ message: "forbidden access" });
      }

      const query = { userEmail: email };
      const result = await eventRegistrationCollection.find(query).toArray();
      res.send(result);
    });
    // details 11111111111111111111111111
    // একটি নির্দিষ্ট ইভেন্ট আইডি দিয়ে খুঁজে বের করা
    app.get("/events/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await eventCollection.findOne(query);
      res.send(result);
    });
    // 22222222
    app.get("/events", async (req, res) => {
      const searchText = req.query.searchText;
      const clubName = req.query.clubName; // নতুন ফিল্টার
      const sort = req.query.sort;

      let query = {};

      // ১. যদি ক্লাব নেম দিয়ে সার্চ করা হয়
      if (clubName) {
        query.clubName = { $regex: clubName, $options: "i" };
      }

      // ২. যদি টেক্সট দিয়ে সার্চ করা হয়
      if (searchText) {
        query.title = { $regex: searchText, $options: "i" };
      }

      let sortOptions = { eventDate: 1 };
      if (sort === "newest") {
        sortOptions = { createdAt: -1 };
      }

      const result = await eventCollection
        .find(query)
        .sort(sortOptions)
        .toArray();
      res.send(result);
    });
    // 222222222222222222
    // app.get("/events", async (req, res) => {
    //   const searchText = req.query.searchText;
    //   const sort = req.query.sort; // newest বা oldest
    //   let query = {};

    //   // সার্চ লজিক (Title দিয়ে)
    //   if (searchText) {
    //     query.title = { $regex: searchText, $options: "i" };
    //   }

    //   // সর্টিং লজিক
    //   let sortOptions = { eventDate: 1 }; // ডিফল্ট: কাছের তারিখের ইভেন্ট আগে
    //   if (sort === "newest") {
    //     sortOptions = { createdAt: -1 };
    //   }

    //   const result = await eventCollection
    //     .find(query)
    //     .sort(sortOptions)
    //     .toArray();
    //   res.send(result);
    // });
    // Post a new event 333333333333333333333333
    app.post("/events", verifyFBtoken, async (req, res) => {
      const event = req.body;
      // নিশ্চিত করুন যে event এ clubId এবং managerEmail আছে
      event.createdAt = new Date();
      const result = await eventCollection.insertOne(event);
      res.send(result);
    });
    // 555555555555555555555555
    // ৪. ইভেন্ট রেজিস্ট্রেশন সেভ করার জন্য POST API
    app.post("/event-registrations", verifyFBtoken, async (req, res) => {
      const registration = req.body;

      // ডুপ্লিকেট রেজিস্ট্রেশন চেক (একই ইউজার এক ইভেন্টে দুইবার পারবে না)
      const query = {
        eventId: registration.eventId,
        userEmail: registration.userEmail,
      };
      const alreadyRegistered = await eventRegistrationCollection.findOne(
        query
      );

      if (alreadyRegistered) {
        return res
          .status(400)
          .send({ message: "You have already registered for this event!" });
      }

      registration.registeredAt = new Date(); // রেজিস্ট্রেশনের সময় যোগ করা
      const result = await eventRegistrationCollection.insertOne(registration);
      res.send(result);
    });

    // manage event
    app.get("/manageEvents", async (req, res) => {
      try {
        const email = req.query.email;
        // এক লাইনে কুয়েরি সেট করা (ইমেইল থাকলে ফিল্টার করবে, না থাকলে খালি অবজেক্ট)
        const query = email ? { managerEmail: email } : {};

        const result = await eventCollection
          .find(query)
          .sort({ createdAt: -1 })
          .toArray();
        res.send(result);
      } catch (error) {
        res.status(500).send({ error: true, message: error.message });
      }
    });
    // event delete
    app.delete("/events/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await eventCollection.deleteOne(query);
      res.send(result);
    });
    // event edit
    app.patch("/events/:id", async (req, res) => {
      const id = req.params.id;
      const filter = { _id: new ObjectId(id) };
      const updatedData = {
        $set: {
          title: req.body.title,
          eventDate: req.body.eventDate,
          location: req.body.location,
        },
      };
      const result = await eventCollection.updateOne(filter, updatedData);
      res.send(result);
    });
    // middele more with database access
    const verifayAdmin = async (req, res, next) => {
      const email = req.decoded_email;
      const query = { email };
      const user = await userCollection.findOne(query);
      if (!user || user.role !== "admin") {
        return res.status(403).send({ message: "forbidden access" });
      }
      next();
    };
    // user related api

    app.post("/users", async (req, res) => {
      const user = req.body;
      user.role = "user";
      user.createdAt = new Date();
      const email = user.email;
      const userExists = await userCollection.findOne({ email });
      if (userExists) {
        return res.send({ message: "user exists" });
      }
      const result = await userCollection.insertOne(user);
      res.send(result);
    });

    // users get
    app.get("/users", verifyFBtoken, async (req, res) => {
      const searchText = req.query.searchText;
      let query = {};

      if (searchText) {
        // 'displyName' ঠিক করে 'displayName' করা হয়েছে
        // এবং $regex ব্যবহার করা হয়েছে যাতে বড়/ছোট হাতের অক্ষরে সমস্যা না হয়
        query.displayName = { $regex: searchText, $options: "i" };
      }

      // অবশ্যই find(query) লিখতে হবে
      const cursor = userCollection
        .find(query)
        .limit(10)
        .sort({ createdAt: -1 });
      const result = await cursor.toArray();
      res.send(result);
    });
    // user patch
    app.patch(
      "/users/:id/role",
      verifyFBtoken,
      verifayAdmin,
      async (req, res) => {
        const id = req.params.id;
        const roleInfo = req.body;
        const query = { _id: new ObjectId(id) };
        const updateDoc = {
          $set: {
            role: roleInfo.role,
          },
        };
        const result = await userCollection.updateOne(query, updateDoc);
        res.send(result);
      }
    );
    // user role
    app.get("/users/:email/role", async (req, res) => {
      const email = req.params.email;
      const query = { email };
      const user = await userCollection.findOne(query);
      res.send({ role: user?.role || "user" });
    });
    // manager api
    app.post("/managers", async (req, res) => {
      const manager = req.body;
      (manager.status = "pending"), (manager.createdAt = new Date());
      const result = await managerCollection.insertOne(manager);
      res.send(result);
    });

    // managet get
    app.get("/managers", async (req, res) => {
      const query = {};
      if (req.query.status) {
        query.status = req.query.status;
      }
      const cursor = managerCollection.find(query).sort({ createdAt: -1 });
      const result = await cursor.toArray();
      res.send(result);
    });

    // manager delete
    app.delete("/managers/:id", async (req, res) => {
      try {
        const id = req.params.id;
        const query = { _id: new ObjectId(id) };
        const result = await managerCollection.deleteOne(query);

        if (result.deletedCount === 1) {
          res.send(result);
        } else {
          res.status(404).send({ message: "No manager found with this id" });
        }
      } catch (error) {
        console.error("Delete error:", error);
        res.status(500).send({ message: "Internal Server Error" });
      }
    });
    // manager patch
    app.patch(
      "/managers/:id",
      verifyFBtoken,
      verifayAdmin,
      async (req, res) => {
        const status = req.body.status;
        const id = req.params.id;
        const query = { _id: new ObjectId(id) };
        const updateDoc = {
          $set: {
            status: status,
          },
        };
        const result = await managerCollection.updateOne(query, updateDoc);
        if (status === "approved") {
          const email = req.body.email;
          const userQuary = { email };
          const updateUser = {
            $set: {
              role: "manager",
            },
          };
          const userResult = await userCollection.updateOne(
            userQuary,
            updateUser
          );
        }
        res.send(result);
      }
    );
    // club api
    app.get("/club", async (req, res) => {
      const email = req.query.email;
      let query = {};
      if (email) {
        query = { email: email }; // assuming club document has email field
      }
      const result = await clubCollection
        .find(query)
        .sort({ createdAt: -1 })
        .toArray();
      res.send(result);
    });
    //Club post
    app.post("/club", async (req, res) => {
      const club = req.body;
      const result = await clubCollection.insertOne(club);
      res.send(result);
    });
    // GET single club by id
    app.get("/club/:id", async (req, res) => {
      const id = req.params.id;
      const ObjectId = require("mongodb").ObjectId;
      const result = await clubCollection.findOne({ _id: new ObjectId(id) });
      res.send(result);
    });
    // delete
    // ক্লাব ডিলিট করার এপিআই
    app.delete("/club/:id", verifyFBtoken, async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };

      // আপনি চাইলে এখানে চেক করতে পারেন যে ডিলিট রিকোয়েস্টটি ওই ক্লাবের ম্যানেজারই পাঠাচ্ছে কি না
      const result = await clubCollection.deleteOne(query);
      res.send(result);
    });
    // edit
    app.patch("/club/:id", verifyFBtoken, async (req, res) => {
      const id = req.params.id;
      const filter = { _id: new ObjectId(id) };
      const updatedClub = req.body;
      const updateDoc = {
        $set: {
          clubName: updatedClub.clubName,
          description: updatedClub.description,
          category: updatedClub.category,
          location: updatedClub.location,
          bannerImage: updatedClub.bannerImage,
          membershipFee: updatedClub.membershipFee,
        },
      };
      const result = await clubCollection.updateOne(filter, updateDoc);
      res.send(result);
    });
    // taka
    // ১. অ্যাডমিনের জন্য সব পেমেন্ট ডাটা নিয়ে আসা (সিম্পল উপায়)
    app.get("/all-payments", verifyFBtoken, verifayAdmin, async (req, res) => {
      try {
        // সব ইভেন্ট রেজিস্ট্রেশন ডাটা নিয়ে আসা
        const result = await eventRegistrationCollection
          .find()
          .sort({ registeredAt: -1 })
          .toArray();

        // জাভাস্ক্রিপ্ট দিয়ে মোট টাকার পরিমাণ (Total Revenue) বের করা
        const totalAmount = result.reduce(
          (sum, payment) => sum + (parseFloat(payment.amount) || 0),
          0
        );

        res.send({
          payments: result,
          totalRevenue: totalAmount,
          totalCount: result.length,
        });
      } catch (error) {
        res.status(500).send({ message: "Failed to fetch payments" });
      }
    });
    // payment related api
    // app.post("/create-checkout-section", async (req, res) => {
    //   try {
    //     const paymentInfo = req.body;
    //     const amount = parseInt(paymentInfo.membershipFee) * 100;

    //     const session = await stripe.checkout.sessions.create({
    //       line_items: [
    //         {
    //           price_data: {
    //             currency: "usd",
    //             unit_amount: amount,
    //             product_data: {
    //               // ✅ সঠিক
    //               name: paymentInfo.clubName,
    //             },
    //           },
    //           quantity: 1,
    //         },
    //       ],
    //       customer_email: paymentInfo.email,
    //       mode: "payment",
    //       metadata: {
    //         clubId: paymentInfo.clubId,
    //         clubName: paymentInfo.clubName,
    //       },
    //       success_url: `${process.env.SITE_DOMAIN}/dashboard/payment-success?session_id={CHECKOUT_SESSION_ID}`,
    //       cancel_url: `${process.env.SITE_DOMAIN}/dashboard/payment-canceled`,
    //     });

    //     res.send({ url: session.url });
    //   } catch (error) {
    //     console.error("Stripe error:", error.message);
    //     res.status(400).send({ error: error.message });
    //   }
    // });
    // // 222222222222222222222222222222222222222
    // // payment success
    // app.patch("/payment-success", async (req, res) => {
    //   const sessionId = req.query.session_id;
    //   // console.log("session id", sessionId);
    //   const session = await stripe.checkout.sessions.retrieve(sessionId);
    //   // console.log("session retrieve", session);
    //   const transactionId = session.payment_intent;
    //   const query = {
    //     transactionId: transactionId,
    //   };
    //   const paymentExist = await paymentCollection.findOne(query);
    //   if (paymentExist) {
    //     return res.send({ message: "already exists", transactionId });
    //   }
    //   if (session.payment_status === "paid") {
    //     const id = session.metadata.clubId;
    //     const query = { _id: new ObjectId(id) };
    //     const update = {
    //       $set: {
    //         status: "paid",
    //       },
    //     };
    //     const result = await clubCollection.updateOne(query, update);
    //     // payment collection
    //     const payment = {
    //       amount: session.amount_total,
    //       currency: session.currency,
    //       userEmail: session.customer_email,
    //       clubId: session.metadata.clubId,
    //       createdAt: new Date(),
    //       status: session.payment_status,
    //       clubName: session.metadata.clubName,
    //       transactionId: session.payment_intent,
    //     };
    //     if (session.payment_status === "paid") {
    //       const resultPayment = await paymentCollection.insertOne(payment);
    //       return res.send({
    //         success: true,
    //         modifyParcel: result,
    //         transactionId: session.payment_intent,
    //         paymentInfo: resultPayment,
    //       });
    //     }
    //     // res.send(result);
    //   }
    //   return res.send({ success: false });
    // });

    // // payment get
    // app.get("/payments", verifyFBtoken, async (req, res) => {
    //   const email = req.query.email;
    //   const query = {};
    //   // console.log("hraders", req.headers);

    //   if (email) {
    //     query.userEmail = email;
    //     // chek email address
    //     if (email !== req.decoded_email) {
    //       return res.status(403).send({ message: "forbidden access" });
    //     }
    //   }
    //   const cursor = paymentCollection.find(query).sort({ createdAt: -1 });
    //   const result = await cursor.toArray();
    //   res.send(result);
    // });

    //
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // await client.close();
  }
}
run().catch(console.dir);
//
app.get("/", (req, res) => {
  res.send("PhotoGraphy Club!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
