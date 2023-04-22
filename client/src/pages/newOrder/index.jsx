import React, { useState } from 'react'
import { Box, Button, TextField } from '@mui/material'
import { Formik } from "formik";
import * as yup from 'yup';
import { useMediaQuery } from "@mui/material";
import Autocomplete from '@mui/material/Autocomplete';
import Header from "../../components/Header";
import ProductDataService from "../../service/product.service"
import OrderService from "../../service/order.service"
import orderDetailsService from "../../service/orderDetail.service"
import customerService from '../../service/customer.service';


const NewOrder = () => {
    const isNonMobile = useMediaQuery("(min-width:600px)");

    const handleFormSubmit = (values) => {
      const order = {
        order_date: "",
        customer_comments : "new order",
        phone_number: values.customer.phone_number
      }
      OrderService.create(order).then(res => {
        const orderDetail1 = {
          order_id: res.data.id,
          product_id: values.product1.id, 
          phone_number: values.customer.phone_number,
          quantity: values.quantity1
        };
        const orderDetail2 = {
          order_id: res.data.id,
          phone_number: values.customer.phone_number,
          product_id: values.product2.id, 
          quantity: values.quantity2
        };

        orderDetailsService.create(orderDetail1);
        orderDetailsService.create(orderDetail2);

        console.log(values);
    }).then(res => {
       var updatingPoint = {
        points: 1
      }
      customerService.update(values.customer.phone_number, updatingPoint);
    });
  }
    
    const [product, setProduct] = useState([]);
    const [customer, setCustomer] = useState([]);

    React.useEffect(() => {
      ProductDataService.getAll().then(res => {
        setProduct(res.data);
      }).catch(e => {
        console.log(e)
      });

      customerService.getAll().then(res => {
        setCustomer(res.data);
      }).catch(e => {
        console.log(e)
      });

    }, []);


    const initialValues = {
        product1: product[0],
        quantity1: "1",
        product2: product[0],
        quantity2: "1",
        customer: customer[0]
    };

    const checkoutSchema = yup.object().shape({
        product1: yup.string().required("Required"),
        quantity1: yup.string().required("Required"),
        product2: yup.string().required("Required"),
        quantity2: yup.string().required("Required"),
        customer: yup.string().required("Required")
    })

    const Form1 = () => {
    
    return ( <Formik onSubmit={handleFormSubmit} initialValues={initialValues} >
      {({ values, errors, touched, handleBlur, handleChange, handleSubmit, setFieldValue}) => (
        <form onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
      }}>
          <Box
            display="grid"
            gap="30px"
            gridTemplateColumns="repeat(4, minmax(0, 1fr))"
            sx={{
              "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
            }}
          >
            <Autocomplete
             disablePortal
             options={product}
             getOptionLabel={product => product.productName}
             isOptionEqualToValue={(option, value) => option.id === value.id}
             sx={{ width: 300 }}
             onChange={(e, value) => setFieldValue("product1", value)}
             renderInput={(params) => <TextField {...params} label="Product 1" />}/>

            <TextField
              fullWidth
              variant="filled"
              label="quantity1"
              id='quantity1'
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.quantity1}
              sx={{ gridColumn: "span 2" }}
            />

        </Box>

        <Box
            display="grid"
            gap="30px"
            gridTemplateColumns="repeat(4, minmax(0, 1fr))"
            sx={{
              "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
            }}
          >
            <Autocomplete
             disablePortal
             options={product}
             getOptionLabel={product => product.productName}
             isOptionEqualToValue={(option, value) => option.id === value.id}
             sx={{ width: 300 }}
             onChange={(e, value) => setFieldValue("product2", value)}
             renderInput={(params) => <TextField {...params} label="Product 2" />}/>
             
            <TextField
              fullWidth
              variant="filled"
              label="quantity2"
              id='quantity2'
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.quantity2}
              sx={{ gridColumn: "span 2" }}
            />
        </Box>


        <Box
            display="grid"
            gap="30px"
            gridTemplateColumns="repeat(4, minmax(0, 1fr))"
            sx={{
              "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
            }}
          >

            <Autocomplete
             disablePortal
             label="customer"
             name="customer"
             options={customer}
             getOptionLabel={customer => customer.phone_number}
             isOptionEqualToValue={(option, value) => option.phone_number === value.phone_number}
             sx={{ width: 300 }}
             onChange={(e, value) => setFieldValue("customer", value)}
             renderInput={(params) => <TextField {...params} label="customer" />}
             />
          </Box>

          <Box display="flex" justifyContent="end" mt="20px">
            <Button type="submit" color="secondary" variant="contained">
              Create New Order
            </Button>
          </Box>
        </form>
      )}
    </Formik>)
    };


    return (
        <Box m="20px">
          <Header title="Create New Order" subtitle="Create a New Order" />
          <Form1 />
        </Box>
      );
}

export default NewOrder