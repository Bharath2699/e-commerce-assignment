import {Component} from 'react'
import ProductModel from '../ProductModel'
import Cookies from "js-cookie";
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Products extends Component {
  state = {
    productsList: [],
    apiStatus: apiStatusConstants.initial,
   
  }

  componentDidMount() {
    this.getProducts()
  }

  getProducts = async () => {
    
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })
    
    
    const apiUrl = "http://localhost:4001/products"
    
    const response = await fetch(apiUrl)
    if (response.ok) {
      const fetchedData = await response.json()
      const updatedData = fetchedData.map(product => ({
        name: product.name,
        brand: product.brand,
        price: product.price,
        id: product.id,
        imageUrl: product.image_url,
        rating: product.rating,
      }))
      this.setState({
        productsList: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }


  onClickLogout=()=>{
       Cookies.remove("jwt_token")
       window.location.href="/"
  }

  renderLoadingView = () => (
    <div className="products-loader-container">
      <h1>Loading</h1>
    </div>
  )

  renderFailureView = () => (
    <div className="products-error-view-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/nxt-trendz/nxt-trendz-products-error-view.png"
        alt="all-products-error"
        className="products-failure-img"
      />
      <h1 className="product-failure-heading-text">
        Oops! Something Went Wrong
      </h1>
      <p className="products-failure-description">
        We are having some trouble processing your request. Please try again.
      </p>
    </div>
  )

 

  renderProductsListView = () => {
    const {productsList} = this.state
    const shouldShowProductsList = productsList.length > 0

    return shouldShowProductsList ? (
      <div className="all-products-container">
       <button type="button" onClick={this.onClickLogout}>Logout</button>
        <ul className="products-list">
          {productsList.map(product => (
            <ProductModel productData={product} key={product.id} />
          ))}
        </ul>
      </div>
    ) : (
      <div className="no-products-view">
        <img
          src="https://assets.ccbp.in/frontend/react-js/nxt-trendz/nxt-trendz-no-products-view.png"
          className="no-products-img"
          alt="no products"
        />
        <h1 className="no-products-heading">No Products Found</h1>
        <p className="no-products-description">
          We could not find any products. Try other filters.
        </p>
      </div>
    )
  }

  renderAllProducts = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderProductsListView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

 

  render() {
    

    return (
      <div className="all-products-section">
       
        {this.renderAllProducts()}
      </div>
    )
  }
}

export default Products
