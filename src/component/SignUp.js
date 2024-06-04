import './SignUp.css';
const SignUp = () => {
return(
    <div className="signIn-container">
        <div className='signIn-container-header'><h3>Welcome</h3></div>
        <div className='signIn-container-credential'>
            <input type="text" placeholder="Username"/>
            <input type="text" placeholder="Email"/>
            <input type="password" placeholder="Password"/>
            <button>Sign Up</button>
        </div>
        <div className='signIn-container-signUp'>
            <p>Already have an account ? or</p>
            <a href="#">Login In</a>
        </div>
    </div>
)
}
export default SignUp;