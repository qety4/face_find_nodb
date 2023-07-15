import React from 'react'

class Register extends React.Component{

  constructor(props){
    super(props);
    this.state={

      email:"",
      password:"",
      name:""
    }
  }

  onEmailChange = (event)=>{
    this.setState({email: event.target.value})
  }

  onNameChange = (event)=>{
    this.setState({name: event.target.value})
  }

  onPasswordChange = (event)=>{
    console.log(this.state.password)
    this.setState({password: event.target.value})
  }

  onSubmitReg= ()=>{
    fetch('http://localhost:3000/register',{
      method:'POST',
      headers:{
        'Content-Type':'application/json'
      },
      body: JSON.stringify({
          email: this.state.email,
          password:this.state.password,
          name:this.state.name
        })
    })
    .then(response=>response.json())
    .then(res=>{
      if(res==='succes'){
        this.props.Route('signin')
      }
    })
    
  }


  render(){
    return(
        <main className="pa4 black-80">
        <div className="measure center">
        <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
            <legend className="center f4 fw6 ph0 mh0">Register</legend>
            <div className="mt3">
              <label className="db fw6 lh-copy f6" htmlFor="password">Name</label>
              <input 
              className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
              type="name" 
              name="name"  
              id="name"
              onChange={this.onNameChange}
              />
            </div>
            <div className="mt3">
              <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
              <input 
              className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
              type="email" 
              name="email-address"  
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
            onClick={()=>this.onSubmitReg() }
            className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" 
            type="submit" 
            value="Register"/>
          </div>
          <div className="lh-copy mt3">
          </div>
        </fieldset>
        </div>
      </main>      
    )
  }
}

export default Register