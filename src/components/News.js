import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'


export default class News extends Component {
     static defaultProps = {
          country: 'in',
          pageSize: 8,
          category: 'general',
     }

     static propTypes = {
          country : PropTypes.string,
          pageSize: PropTypes.number,
          category: PropTypes.string,
     }

     capitalizefirst = (string)=>{
          return string.charAt(0).toUpperCase() + string.slice(1);
     }

     constructor(props){
          super(props);
          this.state = {
               articles : [],
               loading:false,
               page:1

          }
          document.title =   `${this.capitalizefirst(this.props.category)} - DailyNews `
     }

     async updateNews(){
          const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apikey=f5fb9bddd7724d25ba18427389981761&page=${this.state.page}&pageSize=${this.props.pageSize}`;

          this.setState({loading:true});
          // fetch data and return promise
          let data = await fetch(url);

          // changing data to json
          let parsedData = await data.json()
          console.log(parsedData);
          this.setState({
               articles: parsedData.articles, 
               totalResults:parsedData.totalResults,
               loading:false
          });
     }

     // wait for promise to resolve or wait for data
     async componentDidMount(){
          // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apikey=f5fb9bddd7724d25ba18427389981761&page=1&pageSize=${this.props.pageSize}`;

          // this.setState({loading:true});
          // // fetch data and return promise
          // let data = await fetch(url);

          // // changing data to json
          // let parsedData = await data.json()
          // console.log(parsedData);
          // this.setState({
          //      articles: parsedData.articles, 
          //      totalResults:parsedData.totalResults,
          //      loading:false
          // });
          this.updateNews();
     }

     handlePrevClick = async ()=> {
          // console.log("previous");

          // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apikey=f5fb9bddd7724d25ba18427389981761&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`

          // this.setState({loading:true})
          // let data = await fetch(url);

          // let parsedData = data.json()

          // this.setState({
          //      page: this.state.page - 1,
          //      articles: parsedData.articles,
          //      loading:false
          // })
          this.setState({page: this.state.page - 1})
          this.updateNews();

     }

     handleNextClick = async ()=>{
          // console.log("Next");
          
          // if(this.state.page + 1 > Math.ceil(this.state.totalResults/this.props.pageSize )){

          // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apikey=f5fb9bddd7724d25ba18427389981761&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;

          // this.setState({loading:true});

          // // fetch data and return promise
          // let data = await fetch(url);

          // // changing data to json
          // let parsedData = await data.json()
          // // console.log(parsedData);


          // this.setState({
          //      page: this.state.page + 1,
          //      articles: parsedData.articles,
          //      loading: false
          // })
          this.setState({page: this.state.page + 1})
          this.updateNews();
     }

     render() {
     return (
          
          <div className="container my-3">
               <h2 className="text-center" style={{ margin:'35px 0px' }}>DailyNews - Top {this.capitalizefirst(this.props.category)} Headlines</h2>

               {/* if loading is true then show spinner */}
               {this.state.loading && <Spinner />} 

               {/* getting the articles element */}
                    <div className="row">
                    {!this.state.loading && this.state.articles.map((element)=> {
                         return <div className="col-md-4" key={element.url} >
                              <NewsItem  title={element.title?element.title:""} description={element.description?element.description:""} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt } source={element.source.name} />  
                         </div>
                         })}
                    </div>

                    <div className="container d-flex justify-content-between">
                         <button disabled={this.state.page<=1} type="button" className="btn btn-dark" onClick={this.handlePrevClick}>&larr; Previous</button>
                         <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults/this.props.pageSize)} type="submit" className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>
                    </div>
          </div>             
               
          
     )
     }
}
