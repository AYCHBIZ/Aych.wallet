import React from 'react'
import ui from 'redux-ui'

import Navigation from './template.js'

const NavigationContainer = ({ ui, updateUI, resetUI, ...props }) => {
  return (
    <Navigation
      toggled={ui.toggled}
      handleToggle={() => updateUI({ toggled: !ui.toggled })}
      handleClose={() => resetUI()}
      {...props}
    />
  )
}

let enhance = ui({ persist: true, state: { toggled: false } })

export default enhance(NavigationContainer)
