import React, { useEffect, useState } from 'react';
import bg from '../../assets/image/bg-5.jpg';
import SimpleReactValidator from 'simple-react-validator';
import useForceUpdate from 'use-force-update';
import { FormHelperText } from '@material-ui/core';
import { connect, useDispatch, useSelector } from 'react-redux';
import { checkAuthCred, checkAuthOTP } from '../../_redux/actions/auth.action';
import GlobalAlert from '../../components/GlobalAlert';

const Login = () => {
	const dispatch = useDispatch();
	const forceUpdate = useForceUpdate();
	const [validator , setValidator] = useState(new SimpleReactValidator())
	const [userDetails , setUserDetails] = useState({
		user_name:'',
		password:''
	});

	const [messageAlert , setMessageAlert] = useState({
		show:false,
		message:"",
		type:""
	});

	const [isLoading , setIsLoading] = useState(false);

	const checkAuthCredResponse = useSelector((state) => state.auth);
	const checkAuthOtpResponse = useSelector((state) => state.auth.getOtpResponse);

	const [otp , setOtp] = useState('');

	const handleOtp = (event) => {	
		setOtp(event.target.value);
	}

	const [showOtp , setShowOtp] = useState(false);

	const handleChange = (event) => {
		setUserDetails({...userDetails, 
			[event.target.name]:event.target.value
		});
	}

	const checkLogin = () => {
		if(validator.fieldValid('Username') && validator.fieldValid('Password')){
			dispatch(checkAuthCred(userDetails))
		}
		else{
			validator.showMessages();
			forceUpdate();
		}
	}

	const checkOTP = () => {
		if(validator.fieldValid('OTP')){
			var login = `grant_type=password&username=${userDetails.user_name}&password=${otp}`;
			dispatch(checkAuthOTP(login));
			setIsLoading(true);
		}
		else{
			validator.showMessages();
			forceUpdate();
		}
	}

	useEffect(() => {
		if(checkAuthCredResponse){
			setIsLoading(checkAuthCredResponse.loadingStatus);
			setMessageAlert({...messageAlert,
				show:checkAuthCredResponse.responseMessage !== "",
		    	message:checkAuthCredResponse.responseMessage,
				type:checkAuthCredResponse.isValidCred ? "success" : "danger"
			});
			setShowOtp(checkAuthCredResponse.isValidCred);
		}
	},[checkAuthCredResponse]);

	useEffect(() => {
		if(!(Object.keys(checkAuthOtpResponse).length === 0 && checkAuthOtpResponse.constructor === Object)){
			if(checkAuthOtpResponse.valid){
				localStorage.setItem("token",checkAuthOtpResponse.access_token);
				localStorage.setItem("login",checkAuthOtpResponse.valid);
				localStorage.setItem("userName",checkAuthOtpResponse.userName);
				localStorage.setItem("userId",checkAuthOtpResponse.userId);
				localStorage.setItem("code",checkAuthOtpResponse.code);
				localStorage.setItem("encrypt_userId",checkAuthOtpResponse.encrypt_userId);
				window.location.reload();
			}
			else{
				setMessageAlert({...messageAlert,
					show:!checkAuthOtpResponse.valid,
					message:checkAuthOtpResponse.message,
					type:checkAuthOtpResponse.valid ? "success" : "danger"
				});
				setIsLoading(false);
			}
		}
	},[checkAuthOtpResponse])

    return(
        <div className="d-flex flex-column flex-root h-100">
		 
			<div className="login login-2 login-signin-on d-flex flex-column flex-lg-row flex-column-fluid bg-white" id="kt_login">
				 
				<div className="login-aside order-2 order-lg-1 d-flex flex-column-fluid flex-lg-row-auto bgi-size-cover bgi-no-repeat p-7 p-lg-10">
					 
					<div className="d-flex flex-row-fluid flex-column justify-content-between">
						 
						<div className="d-flex flex-column-fluid flex-column flex-center mt-5 mt-lg-0">
							<a href="#" className="mb-15 text-center">
								<img src="assets/media/logos/logo-letter-1.png" className="max-h-75px" alt="" />
							</a>
							 
							<div className="login-form login-signin">
								<div className="text-center mb-10 mb-lg-20">
									<h2 className="font-weight-bold">Sign In</h2>
									<p className="text-muted font-weight-bold">{showOtp ? "OTP sent on email and whatsapp" : "Enter your username and password"}</p>
								</div>
							 	<GlobalAlert show={messageAlert.show} type={messageAlert.type} message={messageAlert.message} />
								<form className="form" noValidate="novalidate" onSubmit={(e) => {
									e.preventDefault();
									if(showOtp){
										checkOTP();
									}
									else{
										checkLogin();
									}
								}}>
									{!showOtp ? <React.Fragment> <div className="form-group py-3 m-0">
										<input className="form-control h-auto border-0 px-0 placeholder-dark-75" type="Email" placeholder="Username" name="user_name" onChange={handleChange} autoComplete="off" />
										<FormHelperText className="text-danger">{validator.message('Username', userDetails.user_name , 'required')}</FormHelperText>
									</div>
									<div className="form-group py-3 border-top m-0">
										<input className="form-control h-auto border-0 px-0 placeholder-dark-75" type="Password" onChange={handleChange} placeholder="Password" name="password" />
										<FormHelperText className="text-danger">{validator.message('Password', userDetails.password , 'required')}</FormHelperText>

									</div>
									<div className="form-group d-flex flex-wrap justify-content-between align-items-center mt-3">
										<div className="checkbox-inline">
											<label className="checkbox checkbox-outline m-0 text-muted">
											<input type="checkbox" name="remember" />
											<span></span>Remember me</label>
										</div>
										<a href="#" id="kt_login_forgot" className="text-muted text-hover-primary">Forgot Password ?</a>
									</div> </React.Fragment> : <div className="form-group py-3 border-top m-0">
										<input className="form-control h-auto border-0 px-0 placeholder-dark-75" type="Password" onChange={handleOtp} placeholder="OTP"  name="otp" />
										<FormHelperText className="text-danger">{validator.message('OTP', otp , 'required|min:4|max:4')}</FormHelperText>

									</div>}
									<div className="form-group d-flex flex-wrap justify-content-between align-items-center mt-2">
										<button id="kt_login_signin_submit" className="btn btn-primary font-weight-bold w-100 px-9 py-4 my-3" disabled={isLoading}>{isLoading ? <i class="fas fa-spinner fa-spin"></i> : showOtp ? "Submit" : "Sign In"}</button>
									</div>
								</form>
								 
							</div>
						</div>
						 
						<div className="d-flex flex-column-auto justify-content-between mt-15">
							<div className="text-dark-50 font-weight-bold order-2 order-sm-1 my-2">Developed and maintained by Rohin Infotech</div>
							 
						</div>
						 
					</div>
					 
				</div>
				 
				<div className="order-1 order-lg-2 flex-column-auto flex-lg-row-fluid d-flex flex-column p-7" style={{backgroundImage:`url(${bg})`}}>
					 
					<div className="d-flex flex-column-fluid flex-lg-center">
						<div className="d-flex flex-column justify-content-center">
							<h1 className="display-2 font-weight-bold my-7 text-white">ΔIAΓNO∑TIX</h1>
							{/* <p className="font-weight-bold font-size-lg text-white opacity-80">The ultimate Bootstrap, Angular 8, React &amp; VueJS admin theme
							<br />framework for next generation web apps.</p> */}
						</div>
					</div>
					 
				</div>
				 
			</div>
			 
		</div>
    )
}



export  default Login;