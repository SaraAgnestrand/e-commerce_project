const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY)
const fs = require("fs");
const { ProductModel } = require("../product/product.model");
const filePath = "./db/orders.json"; // Lokal JSON-fil för orderhistorik
const CLIENT_URL = "http://localhost:5173"



async function fetchProductDetails(productId) {
  try {
    const product = await ProductModel.findById(productId);
    if (!product) {
      throw new Error(`Product with ID ${productId} not found`);
    }
    return product; // Returnera hela produktobjektet
  } catch (error) {
    console.error("Error fetching product details:", error);
    throw error;
  }
}

async function checkout(req, res) {
  try {
    const items = req.body;
    console.log("Request body:", items);
    
    // Hämta pris-ID och annan information från din MongoDB-databas baserat på produkt-ID
    const lineItems = await Promise.all(
      items.map(async (item) => {
        const product = await fetchProductDetails(item._id); // Hämta hela produktobjektet
        if (!product.price_id) {
          throw new Error(`No Stripe price ID found for product ID ${item._id}`);
        }
        return {
          price: product.price_id, // Använd Stripe-pris-ID:t här
          quantity: item.quantity,
        };
      })
    );

    const session = await stripe.checkout.sessions.create({
      line_items: lineItems,
      mode: "payment",
      success_url: `${CLIENT_URL}/confirmation`,
      cancel_url: CLIENT_URL,
      allow_promotion_codes: true,
    });
    res.status(200).json({ url: session.url, sessionId: session.id });
  } catch (error) {
    console.log(error);
    res.status(400).json("Det gick inte så bra");
  }
}

// async function checkout (req, res) {
//     try {
//         console.log(req.body +"i checkout---------------------------------")
//         const session = await stripe.checkout.sessions.create({
//             line_items: req.body.map(item => {
//               console.log("Cart Item: ", item)
//                 return {
//                     price: item.id,   
//                     quantity: item.quantity,
//                 }
//             }),
//             mode: "payment",
//             success_url: `${CLIENT_URL}/confirmation`,
//             cancel_url: CLIENT_URL,
//             allow_promotion_codes: true
//         });
//         res.status(200).json({ url: session.url, sessionId: session.id  })
//     } catch (error) {
//         console.log(error);
//         res.status(400).json("Det gick inte så bra")
//     }
// }

async function verify(req, res) {
    try {
      const session = await stripe.checkout.sessions.retrieve(req.body.sessionId);
      if (session.payment_status !== "paid") {
        return res.status(400).json({ verified: false });
      }
  
      // Lägg till hantera MongoDB-databas och spara ordern.
  
      res.status(200).json({ verified: true });
    } catch (error) {
      console.log(error.message);
      res.status(500).json({ error: "Ett fel uppstod vid behandling av ordern." });
    }
  }

module.exports = { checkout, verify }