import Coupon from "../models/coupon.model.js";
import Order from "../models/order.model.js";
import paystack from "../lib/paystack.js";

/**
 * Initialize Payment via Paystack
 */
export const createCheckoutSession = async (req, res) => {
	try {
		const { products, couponCode } = req.body;

		if (!Array.isArray(products) || products.length === 0) {
			return res.status(400).json({ error: "Invalid or empty products array" });
		}

		// Calculate Total Amount (in kobo for Paystack)
		let totalAmount = 0;
		products.forEach((product) => {
			totalAmount += product.price * 100 * product.quantity; // kobo conversion
		});

		// Apply coupon if exists
		let coupon = null;
		if (couponCode) {
			coupon = await Coupon.findOne({ code: couponCode, userId: req.user._id, isActive: true });
			if (coupon) {
				totalAmount -= Math.round((totalAmount * coupon.discountPercentage) / 100);
			}
		}

		// Initialize Paystack Payment
		const response = await paystack.transaction.initialize({
			email: req.user.email,
			amount: totalAmount,
			callback_url: `${process.env.CLIENT_URL}/payment-success`,
			metadata: {
				userId: req.user._id.toString(),
				couponCode: couponCode || "",
				products: JSON.stringify(
					products.map((p) => ({
						id: p._id,
						quantity: p.quantity,
						price: p.price,
					}))
				),
			},
		});

		// Check if payment URL exists
		if (!response.data.authorization_url) {
			throw new Error("Failed to initialize Paystack payment.");
		}

		// Create a coupon if totalAmount exceeds threshold
		if (totalAmount >= 2000000) {
			await createNewCoupon(req.user._id);
		}

		res.status(200).json({ authorization_url: response.data.authorization_url, totalAmount: totalAmount / 100 });
	} catch (error) {
		console.error("Error processing checkout:", error.message);
		res.status(500).json({ message: "Error processing checkout", error: error.message });
	}
};

/**
 * Verify Payment via Paystack
 */
export const checkoutSuccess = async (req, res) => {
	try {
		const { reference } = req.query;

		// Verify transaction on Paystack
		const response = await paystack.transaction.verify(reference);

		if (response.data.status === "success") {
			const metadata = response.data.metadata;

			// Deactivate coupon if used
			if (metadata.couponCode) {
				await Coupon.findOneAndUpdate(
					{
						code: metadata.couponCode,
						userId: metadata.userId,
					},
					{ isActive: false }
				);
			}

			// Create a new Order
			const products = JSON.parse(metadata.products);
			const newOrder = new Order({
				user: metadata.userId,
				products: products.map((product) => ({
					product: product.id,
					quantity: product.quantity,
					price: product.price,
				})),
				totalAmount: response.data.amount / 100, // Convert from kobo to naira
				paystackReference: reference,
			});

			await newOrder.save();

			res.status(200).json({
				success: true,
				message: "Payment successful, order created, and coupon deactivated if used.",
				orderId: newOrder._id,
			});
		} else {
			res.status(400).json({ error: "Payment verification failed." });
		}
	} catch (error) {
		console.error("Error verifying payment:", error.message);
		res.status(500).json({ message: "Error verifying payment", error: error.message });
	}
};

/**
 * Generate a New Coupon
 */
async function createNewCoupon(userId) {
	await Coupon.findOneAndDelete({ userId });

	const newCoupon = new Coupon({
		code: "GIFT" + Math.random().toString(36).substring(2, 8).toUpperCase(),
		discountPercentage: 10,
		expirationDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
		userId: userId,
	});

	await newCoupon.save();

	return newCoupon;
}
