import React, { useState } from 'react'
import { Dropdown } from 'react-bootstrap'

const CheckboxDropdown = ({ options, onChange }) => {
  const [selectedOptions, setSelectedOptions] = useState([])

  const handleOptionClick = (option) => {
    const selectedIndex = selectedOptions.indexOf(option)
    if (selectedIndex > -1) {
      setSelectedOptions(selectedOptions.filter((o) => o !== option))
    } else {
      setSelectedOptions([...selectedOptions, option])
    }
    onChange(selectedOptions)
  }

  return (
    <Dropdown>
      <Dropdown.Toggle variant="secondary" id="dropdown-basic">
        Select Medicines
      </Dropdown.Toggle>
      <Dropdown.Menu>
        { options.map((option) => (
          <Dropdown.Item key={ option }>
            <label>
              <input
                type="checkbox"
                checked={ selectedOptions.includes(option) }
                onChange={ () => handleOptionClick(option) }
              />
              { option }
            </label>
          </Dropdown.Item>
        )) }
      </Dropdown.Menu>
    </Dropdown>
  )
}

export default CheckboxDropdown
