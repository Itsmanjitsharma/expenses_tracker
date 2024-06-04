import './SignIn.css';
const SignIn = () => {
return(
    <div className="signIn-container">
        <div className='signIn-container-header'><h3>Welcome</h3></div>
        <div className='signIn-container-credential'>
            <input type="text" placeholder="Email"/>
            <input type="password" placeholder="Password"/>
            <button>Login</button>
        </div>
        <div className='signIn-container-signUp'>
            <p>Don't have an account ?</p>
            <a href="#">Sign Up</a>
        </div>
    </div>
)
}
export default SignIn;