import './index.css'

const RepositoryItem = props => {
  const {cardItems} = props
  const {avatarUrl, name, forkCount, issuesCount, starsCount} = cardItems

  return (
    <li className="cont">
      <img src={avatarUrl} alt={name} className="image" />
      <h1 className="head">{name}</h1>
      <div className="cont1">
        <img
          src="https://assets.ccbp.in/frontend/react-js/stars-count-img.png"
          alt="stars"
          className="star-img"
        />
        <p className="para1">{starsCount} stars</p>
      </div>
      <div className="cont1">
        <img
          src="https://assets.ccbp.in/frontend/react-js/forks-count-img.png "
          alt="forks"
          className="star-img"
        />
        <p className="para1">{forkCount} forks</p>
      </div>
      <div className="cont1">
        <img
          src="https://assets.ccbp.in/frontend/react-js/issues-count-img.png"
          alt="open issues"
          className="star-img"
        />
        <p className="para1">{issuesCount} open issues </p>
      </div>
    </li>
  )
}

export default RepositoryItem
