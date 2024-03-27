import React, { Component } from 'react'

export default class NewsItem extends Component {

     render() {
          let {title, description, imageUrl, newsUrl, author, date ,source } = this.props;
     return (
          <div className="my-4">
               <div className="card">
                    <img src={imageUrl} className="card-img-top" alt=".." />
                    <div className="card-body">
                         <h4 className="card-title">{title}...</h4><span className="badge bg-danger">{source}</span>
                         <p className="card-text">{description}...</p>
                         <p className="card-text"><small className="text-danger">By {author?author:"Unknown"} on {new Date(date).toGMTString()}</small></p>
                         <a rel="noreferrer" href={newsUrl} target= "_blank" className="btn btn-dark" >Read More</a>
                    </div>
               </div>
          </div>
     )
     }
}
