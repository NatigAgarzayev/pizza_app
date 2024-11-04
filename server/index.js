import express from 'express'
import {db} from './db.js'
import cors from 'cors'
import bodyParser from 'body-parser'
import multer from 'multer'
import stripe from 'stripe'

const app = express()
const stripeInstance = stripe("sk_test_51OFF1bIJnMaIRKiDjhveM9lIRPjn5rKVrqL6VI6BpNGpfkTwbcL1Zz0acqMMVRnA8u9M7qCBcaYG4ET7yr4jTjq7008RlfkA0H")
// const stripeInstance = stripe("pk_test_51OFF1bIJnMaIRKiDnREUeNLd0zKJAXYSTjUFkoncA9YLX9qHL2YNKHChUdiEnezyKKIoIHZfmV9K0aiwsgLcjQoj00Mo5pp58O")

app.use(bodyParser.json())
app.use(cors())
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads');
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname); // Use the original file name
  },
});
const upload = multer({ storage });

app.use(express.static('uploads'));

app.post("/upload", upload.single('image'), (req, res) => {
  res.json({ message: 'Image uploaded successfully' });
})


app.post('/create-checkout-session', async (req, res) => {
  try {
    const session = await stripeInstance.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: req.body.map(item => {
        return {
          price_data: {
            currency: "usd",
            product_data: {
              name: item.pizza_name,
            },
            unit_amount: item.pizza_price * 100,
          },
          quantity: item.pizza_quantity,
        }
      }),
      mode: 'payment',
      success_url: `http://127.0.0.1:5173/`,
      cancel_url: `http://127.0.0.1:5173/`,
    });
    res.json({session: session, url: session.url});
  } catch (error) {
    res.status(500).send('Internal Server Error');
  }
})

app.get('/get_all_orders', async (req, res) => {
  try {
    const products = await stripeInstance.charges.list()
    res.json(products)
  } catch (error) {
    res.status(500).send('Internal Server Error');
  }
})

app.get("/", (req, res) => {
    try{
        db.query('SELECT * FROM pizzas', [], (err, data) => {
            if(err) return res.json({message: err})
            res.json(data)
        })
    }
    catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
      }
})

app.post("/", (req, res) => {
  try {
    const values = [
       req.body.pizza_name, req.body.pizza_price, req.body.pizza_ingredients, req.body.pizza_image
    ]
    db.query("INSERT INTO pizzas(`pizza_name`, `pizza_price`, `pizza_ingredients`, `pizza_image`) VALUES (?)", [values], (err, data) => {
      if(err) return res.json({message: err})
      res.json(data)
    })
  } catch (error) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
})

app.get("/:id", (req, res) => {
  try{
      db.query('SELECT * FROM pizzas WHERE pizza_id = ?', [req.params.id], (err, data) => {
          if(err) return res.json({message: err})
          res.json(data)
      })
  }
  catch (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
    }
})

app.put("/:id", (req, res) => {
  try {
    const q = 'UPDATE pizzas SET `pizza_name` = ?, `pizza_price` = ?, `pizza_ingredients` = ?, `pizza_image` = ? WHERE `pizza_id` = ?'
    const values = [
      req.body.pizza_name, req.body.pizza_price, req.body.pizza_ingredients, req.body.pizza_image
   ]
    db.query(q, [...values, req.params.id], (err, data) => {
      if(err) return res.json({message: err})
      res.json(data)
    })
  } catch (error) {
    console.error(err);
      res.status(500).send('Internal Server Error');
  }
})

app.delete("/:id", (req, res) => {
  try {
    const q = "DELETE FROM pizzas WHERE pizza_id = ?"

    db.query(q, [req.params.id], (err, data) => {
      if(err) return res.json({message: err})
      res.json(data)
    })
  } catch (error) {
    console.error(err);
      res.status(500).send('Internal Server Error');
  }
})

app.listen(3001, () => {
  console.log(`Server is running`);
});
