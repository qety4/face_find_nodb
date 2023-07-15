import React,{Component} from 'react'
import Navigation from './component/Navigaton/Navigation.jsx'
import Logo from './component/Logo/Logo.jsx'
import ImageLinkForm from './component/ImageLink/ImageLink.jsx'
import Rank from './component/Rank/Rank.jsx'
import Particles from './component/Particles/Particles.jsx'
import Facerecog from './component/Facerecog/FaceRecog.jsx'
import Signin from './component/Signin/Signin.jsx'
import Register from './component/register/register.jsx'
import tachyons from 'tachyons'

const PAT= 'e7313e0097f44114a0490b941a179261';

const USER_ID='ian_oo899';

const MODEL_ID= 'face-detection';

const APP_ID='face-recog';

const apiCallParam=(IMAGE_URL)=>{

const raw = JSON.stringify({
  "user_app_id": {
      "user_id": USER_ID,
      "app_id": APP_ID
  },
  "inputs": [
      {
          "data": {
              "image": {
                  "url": IMAGE_URL
              }
          }
      }
  ]
});

const requestOptions = {
  method: 'POST',
  headers: {
      'Accept': 'application/json',
      'Authorization': 'Key ' + PAT
  },
  body: raw
};
return requestOptions
}

class App extends Component{
  constructor(){
    super();
    this.state={
      input:"",
      imageUrl :"",
      box:{},
      route:'signin',
      user:{
        id: '',
        name:'',
        email:'',
        entries:'',
        joined:''
      }
    }
  }

  loadUser=(data)=>{
    this.setState({user : 
      {
      id: data.id,
      name: data.name,
      email: data.email,
      entries: data.entries,
      joined: data.joined
    }
    })
  }
  calcLocation=(data)=>{
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputimage')
    const width=Number(image.width)
    const height=Number(image.height)
    return{
      leftCol: clarifaiFace.left_col * width ,
      topRow: clarifaiFace.top_row * height ,
      rightCol: width - (clarifaiFace.right_col*width),
      bottomRow: height - (clarifaiFace.bottom_row * height)
    }
  }

  displayFaceBox = (box)=>{
    this.setState({box: box});
  }

  onChange=(event)=>{
  this.setState({input:event.target.value});
  }

  onSubmit= ()=>{
    console.log(this.state.input)
    this.setState({imageUrl:this.state.input});
    fetch("https://api.clarifai.com/v2/models/" + MODEL_ID + "/outputs", apiCallParam(this.state.input))
        .then(response => response.json())
        .then(result => {
          if(result){
            fetch('http://localhost:3000/image',{
              method:'PUT',
              headers:{
                'Content-Type':'application/json'
              },
              body: JSON.stringify({
                  id:this.state.user.id
                })
            })
            .then(res=>res.json())
            .then(count=>this.setState(Object.assign(this.state.user,{entries:count}))
            )
        }
          this.displayFaceBox(this.calcLocation(result))
        })
        .catch(error => console.log('error', error));
    
  }

  Route = (route)=> {
    this.setState({route: route});
  };


  render() {
    return(
      <div className='App'>
        
        <Particles/>
       
        {this.state.route==='home' 
        ?
        <>
        <Navigation Route={this.Route}/>
        <Logo/>
        <Rank Entries={this.state.user.entries} Name={this.state.user.name} />
        <ImageLinkForm onChange={this.onChange} onSubmit={this.onSubmit}/>
        <Facerecog box={this.state.box} image={this.state.imageUrl}/>
        </>
        :
        (
        this.state.route ==='signin'
        ?
        <div className='mt6'>
        <Signin Route={this.Route} loadUser={this.loadUser}/>
        </div>
        :
        <Register Route={this.Route} />
        )
      }
      </div>
    )
    };
}

export default App;