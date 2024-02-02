const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const { ProductModel } = require("../product/product.model");
const { OrderModel } = require("../order/order.model");
const CLIENT_URL = "http://localhost:5173"



async function fetchProductDetails(productId) {
  try {
    const product = await ProductModel.findById(productId);
    if (!product) {
      throw new Error(`Product with ID ${productId} not found`);
    }
    return product; 
  } catch (error) {
    console.error("Error fetching product details:", error);
    throw error;
  }
}

async function checkout(req, res) {
  try {
    const items = req.body;
    console.log("Request body:", items);
    
    // Hämta pris-ID och annan information från MongoDB-databas baserat på produkt-ID
    const lineItems = await Promise.all(
      items.map(async (item) => {
        const product = await fetchProductDetails(item._id); 
        if (!product.price_id) {
          throw new Error(`No Stripe price ID found for product ID ${item._id}`);
        }
        return {
          price: product.price_id, 
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

    
    const orderItems = items.map(item => ({
      product: item._id, 
      quantity: item.quantity,
      price: item.price,
    }));

    const totalCost = calculateTotalPrice(orderItems);

    const order = new OrderModel({
      orderNumber: session.id,
      orderItems: orderItems,
      totalCost: totalCost,
      status: 'Pending', 
      paymentConfirmation: false, 
      createdAt: new Date(),
    });

    await order.save(); 
    res.status(200).json({ url: session.url, sessionId: session.id });
  } catch (error) {
    console.log(error);
    res.status(400).json("Det gick inte så bra");
  }
}

function calculateTotalPrice(lineItems) {
  let totalPrice = 0;

  // Loopa igenom varje lineItem i arrayen
  lineItems.forEach(item => {
      // Addera produkten av priset och kvantiteten för varje lineItem till det totala priset
      totalPrice += item.price * item.quantity;
  });

  return totalPrice;
}

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




