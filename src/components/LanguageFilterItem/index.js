import './index.css'

const LanguageFilterItem = props => {
  const {filterItem, onChangeItem} = props
  const {language, id, isActive} = filterItem
  const changeItem = () => {
    onChangeItem(id, isActive)
  }
  let textClass = ''
  if (isActive) {
    textClass = 'list-item'
  } else {
    textClass = 'list-cont'
  }
  return (
    <li className={textClass}>
      <button type="button" onClick={changeItem} className="btn">
        {language}
      </button>
    </li>
  )
}

export default LanguageFilterItem
