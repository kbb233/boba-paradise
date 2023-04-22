import React from 'react'
import { Box, Button, TextField } from '@mui/material'
import { Formik } from "formik";
import * as yup from 'yup';
import { useMediaQuery } from "@mui/material";
import Header from "../../components/Header";
import ProductDataService from "../../service/product.service"
import OrderService from "../../service/order.service"
import orderDetailsService from "../../service/orderDetail.service"
import customerService from '../../service/customer.service';


const NewCustomer = () => {
    const isNonMobile = useMediaQuery("(min-width:600px)");
    const phoneRegExp = /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/;
    const handleFormSubmit = (values) => {
      customerService.create(values);
        console.log(values);
    };

    const initialValues = {
      customer_name: "",
      phone_number: ""

    };
    const checkoutSchema = yup.object().shape({
        customer_name:yup.string().required("Required"),
        phone_number:yup.string().matches(phoneRegExp, "phone number is not valid!").required("Required")
    })

    return (
        <Box m="20px">
          <Header title="CREATE USER" subtitle="Create a New User Profile" />
    
          <Formik onSubmit={handleFormSubmit} initialValues={initialValues} validationSchema={checkoutSchema}>
            {({ values, errors, touched, handleBlur, handleChange, handleSubmit,}) => (
              <form onSubmit={handleSubmit}>
                <Box
                  display="grid"
                  gap="30px"
                  gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                  sx={{
                    "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
                  }}
                >
                  <TextField
                    fullWidth
                    variant="filled"
                    type="text"
                    label="Customer Name"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.customer_name}
                    name="customer_name"
                    error={!!touched.customer_name && !!errors.customer_name}
                    helperText={touched.customer_name && errors.customer_name}
                    sx={{ gridColumn: "span 2" }}
                  />
                  <TextField
                    fullWidth
                    variant="filled"
                    type="text"
                    label="Phone Number"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.phone_number}
                    name="phone_number"
                    error={!!touched.phone_number && !!errors.phone_number}
                    helperText={touched.phone_number && errors.phone_number}
                    sx={{ gridColumn: "span 4" }}
                  />
                </Box>
                <Box display="flex" justifyContent="end" mt="20px">
                  <Button type="submit" color="secondary" variant="contained">
                    Create New User
                  </Button>
                </Box>
              </form>
            )}
          </Formik>
        </Box>
      );
}

export default NewCustomer