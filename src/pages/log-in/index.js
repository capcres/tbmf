import { useRef } from 'react';
import Head from 'next/head';
import Router from 'next/router';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Box, Button, Container, TextField, Typography } from '@mui/material';
import { useAuthContext } from '../../contexts/auth-context';
import axios from 'axios';

const Login = () => {
  const authContext = useAuthContext();
  const invalidLogin = useRef(false);
  const formik = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    validationSchema: Yup.object({
      email: Yup
        .string()
        .email('Must be a valid email')
        .max(255)
        .required('Email is required'),
      password: Yup
        .string()
        .max(255)
        .required('Password is required')
    }),
    onSubmit: async (values) => {

      const {email, password} = values;
      var res = await axios.post(`http://${process.env.NEXT_PUBLIC_TBMB_IP}/login`, {account : email, password : password});
      //console.log(res);
      if (res.data.result == 'success')
      {        
        globalThis.sessionStorage.setItem('isAuthenticated', 'true');
        globalThis.sessionStorage.setItem('account_id', res.data.id);
        globalThis.sessionStorage.setItem('account', res.data.account);
        globalThis.sessionStorage.setItem('authority', res.data.authority);

        const user = { id : res.data.id, account : res.data.account, authority : res.data.authority};
        //console.log(user);
        
        authContext.signIn(user);

        Router.push('/').catch(console.error);
      }
      else
      {
        invalidLogin.current = true;
      }
    }
  });

  return (
    <>
      <Head>
        <title>Login | Material Kit</title>
      </Head>
      <Box
        component="main"
        sx={{
          alignItems: 'center',
          display: 'flex',
          flexGrow: 1,
          minHeight: '100%'
        }}
      >
        <Container maxWidth="sm">          
          <form onSubmit={formik.handleSubmit}>
            <Box sx={{ my: 3 }}>
              <Typography
                color="textPrimary"                
                variant="h4"
                align="center"
              >
                Log in
              </Typography>
              <Typography
                margin="normal"
                color="red"
                variant="h8"
                align="center"
              >
                {
                  (invalidLogin.current) ? (<div>invalid Login</div>) : (<div> </div>)
                }
              </Typography>
            </Box>            
            <TextField
              error={Boolean(formik.touched.email && formik.errors.email)}
              fullWidth
              helperText={formik.touched.email && formik.errors.email}
              label="Email Address"
              margin="normal"
              name="email"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              type="email"
              value={formik.values.email}
              variant="outlined"
              autoFocus
            />
            <TextField
              error={Boolean(formik.touched.password && formik.errors.password)}
              fullWidth
              helperText={formik.touched.password && formik.errors.password}
              label="Password"
              margin="normal"
              name="password"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              type="password"
              value={formik.values.password}
              variant="outlined"
            />
            <Box sx={{ py: 2 }}>
              <Button
                color="primary"
                disabled={formik.isSubmitting}
                fullWidth
                size="large"
                type="submit"
                variant="contained"
              >
                Log In Now
              </Button>               
            </Box>            
          </form>
        </Container>
      </Box>
    </>
  );
};

export default Login;
