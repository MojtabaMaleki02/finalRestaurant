import { t } from "i18next";
import React, {Component} from "react";
import axios from 'axios'
import {useTranslation} from "react-i18next";
import {Suspense} from 'react';


class PostForm extends Component{

    constructor(props){
      super(props)

      this.state = {
        name : '',
        phone: '',
        distance:'',
        image:'',
        menu:''
      }
    }

    changeHandler = (e) => {
      this.setState({[e.target.name]: e.target.value})
    }

    submitHandler = (e) =>{
      e.preventDefault()
      console.log(this.state)
      axios
      .post('http://localhost:4000/restaurants', this.state)
      .then(response =>{
        console.log(response)
      })
      .catch(error =>{
        console.log(error)
      })
    }


    render() {
      const {name, phone, distance, image, menu} = this.state

      return(

            <div className="bg-cover h-screen w-screen" style={{ backgroundImage: 'url(https://wallpaperset.com/w/full/b/0/0/487576.jpg)' }}>
              <div className="flex flex-col items-center flex-1 h-full justify-center px-4 sm:px-0">
                <div className="bg-yellow-50 rounded w-1/2">
                  <h1 className="text-4xl text-center font-thin">Add Your Restaurant</h1>
                  <form className="text-center" onSubmit={this.submitHandler}>
                    <div>
                      <label htmlFor="username" className="block uppercase tracking-wide text-gray-700 text-sm font-medium mb-2">
                      Restaurant Name
                      </label>
                      <input placeholder="Name" className="flex-grow h-10 px-2 rounded border border-grey-400 focus:border-gray-700 focus:outline-none" type="text" name="name" value={name} onChange={this.changeHandler}/>
                    </div>
                    <div>
                      <label htmlFor="username" className="block uppercase tracking-wide text-gray-700 text-sm font-medium mb-2">
                        Phone number 
                      </label>
                      <input placeholder="Phone number" className="flex-grow h-10 px-2 rounded border border-grey-400 focus:border-gray-700 focus:outline-none" type="text" name="phone" value={phone} onChange={this.changeHandler}/>
                    </div>
                    <div>
                      <label htmlFor="username" className="block uppercase tracking-wide text-gray-700 text-sm font-medium mb-2">
                          Distance
                      </label>
                      <input placeholder="Name" className="flex-grow h-10 px-2 rounded border border-grey-400 focus:border-gray-700 focus:outline-none" type="text" name="distance" value={distance} onChange={this.changeHandler}/>
                    </div>
                    <div>
                      <label htmlFor="Distance" className="block uppercase tracking-wide text-gray-700 text-sm font-medium mb-2">
                            Image URL
                      </label>
                      <input placeholder="Image URL" className="flex-grow h-10 px-2 rounded border border-grey-400 focus:border-gray-700 focus:outline-none" type="text" name="image" value={image} onChange={this.changeHandler}/>
                    </div> 
                    <div>
                      <label htmlFor="username" className="block uppercase tracking-wide text-gray-700 text-sm font-medium mb-2">
                              Menu URL
                      </label>
                      <input placeholder="Menu URL" className="flex-grow h-10 px-2 rounded border border-grey-400 focus:border-gray-700 focus:outline-none" type="text" name="menu" value={menu} onChange={this.changeHandler}/>
                    </div>  
                    <button typer="submit" className="text-center mt-4 border border-gray-700 bg-transparent hover:bg-gray-700 text-lg text-black bg-yellow-300 hover:bg-yellow-400 font-medium py-2 px-4 rounded focus:outline-none">Submit</button>

                  </form>
                </div>
              </div>
            </div>

      )
    }
}


export default PostForm;
