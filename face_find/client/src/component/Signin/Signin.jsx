import React from 'react'

class SingIn extends React.Component {
  constructor(props){
    super(props);
    this.state={

      signInEmail:"",
      signInPassword:""
    }
  }

  onEmailChange = (event)=>{
    this.setState({signInEmail: event.target.value})
  }

  onPasswordChange = (event)=>{
    console.log(this.state.signInPassword)
    this.setState({signInPassword: event.target.value})
  }

  onSubmitSignIn = ()=>{
    fetch('http://localhost:3000/signin',{
      method:'POST',
      headers:{
        'Content-Type':'application/json'
      },
      body: JSON.stringify({
          email: this.state.signInEmail,
          password:this.state.signInPassword
        })
    })
    .then(res=>res.json())
    .then(user=>{
      if (user){
        this.props.loadUser(user) 
        this.props.Route('home')  
      }
    })
  }

  render(){
    const { Route }= this.props
    return(
        <main className="pa4 black-80">
        <div className="measure center">
        <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
            <legend className="center f4 fw6 ph0 mh0">Sign In</legend>
            <div className="mt3">
              <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
              <input 
              className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
              type="email" name="email-address"  
              id="email-address"
              onChange={this.onEmailChange}
              />
            </div>
            <div className="mv3">
              <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
              <input 
              className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
              type="password" 
              name="password"  
              id="password"
              onChange={this.onPasswordChange}
              />
            </div>
            
         
          <div className="center mt2">
            <input
            onClick={this.onSubmitSignIn}
            className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" 
            type="submit" 
            value="Sign in"/>
          </div>
          <div className="lh-copy mt3">
            <p
            onClick={()=> Route('register')}
            className="f6 link dim black db pointer">Register</p>
            <a href="#0" className="f6 link dim black db">Forgot your password?</a>
          </div>
        </fieldset>
        </div>
      </main>      
    )
    }
}

export default SingIn