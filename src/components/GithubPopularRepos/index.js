import {Component} from 'react'
import Loader from 'react-loader-spinner'
import LanguageFilterItem from '../LanguageFilterItem'
import RepositoryItem from '../RepositoryItem'
import './index.css'

const languageFiltersData = [
  {id: 'ALL', language: 'All', isActive: true},
  {id: 'JAVASCRIPT', language: 'Javascript', isActive: false},
  {id: 'RUBY', language: 'Ruby', isActive: false},
  {id: 'JAVA', language: 'Java', isActive: false},
  {id: 'CSS', language: 'CSS', isActive: false},
]

const activeButtons = {
  success: 'SUCCESS',
  failure: 'FAILURE',
  loading: 'LOADING',
}
// Write your code here

class GithubPopularRepos extends Component {
  state = {
    itemsList: [],
    status: 'ALL',
    languagesList: languageFiltersData,
    viewStatus: '',
  }

  componentDidMount() {
    this.getResponse()
  }

  getResponse = async () => {
    const {status} = this.state
    this.setState({viewStatus: activeButtons.loading})
    const url = `https://apis.ccbp.in/popular-repos?language=${status}`
    const response = await fetch(url)
    const data = await response.json()
    const updatedData = data.popular_repos.map(eachItem => ({
      id: eachItem.id,
      avatarUrl: eachItem.avatar_url,
      forkCount: eachItem.forks_count,
      name: eachItem.name,
      issuesCount: eachItem.issues_count,
      starsCount: eachItem.stars_count,
    }))

    if (response.ok === true) {
      this.setState({viewStatus: activeButtons.success, itemsList: updatedData})
    } else if (response.status === 401) {
      this.setState({viewStatus: activeButtons.failure})
    }
  }

  onChangeItem = filterId => {
    const itemStatus = languageFiltersData.map(eachItem => {
      if (eachItem.id === filterId) {
        return {
          ...eachItem,
          isActive: true,
        }
      }
      return {
        ...eachItem,
        isActive: false,
      }
    })
    this.setState(
      {languagesList: itemStatus, status: filterId},
      this.getResponse,
    )
  }

  onSuccess = () => {
    const {itemsList} = this.state
    return (
      <ul className="repos-cont">
        {itemsList.map(eachItem => (
          <RepositoryItem cardItems={eachItem} key={eachItem.id} />
        ))}
      </ul>
    )
  }

  showingStatus = () => {
    const {viewStatus} = this.state

    switch (viewStatus) {
      case activeButtons.success:
        return this.onSuccess()
      case activeButtons.failure:
        return (
          <div className="cont2">
            <img
              src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
              alt="failure view"
              className="img1"
            />
            <h1 className="heading">Something Went Wrong</h1>
          </div>
        )
      case activeButtons.loading:
        return (
          <div className="cont2" data-testid="loader">
            <Loader type="ThreeDots" color="#0284c7" height={80} width={80} />
          </div>
        )
      default:
        return null
    }
  }

  render() {
    const {languagesList} = this.state

    return (
      <div className="main-container">
        <h1 className="heading">Popular</h1>
        <ul className="un-order">
          {languagesList.map(eachItem => (
            <LanguageFilterItem
              filterItem={eachItem}
              key={eachItem.id}
              onChangeItem={this.onChangeItem}
            />
          ))}
        </ul>
        {this.showingStatus()}
      </div>
    )
  }
}
export default GithubPopularRepos
