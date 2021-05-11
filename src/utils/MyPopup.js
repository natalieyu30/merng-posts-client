import { Popup } from 'semantic-ui-react';
import React from 'react';

const MyPopup = ({ content, style, children}) => {
  return (
    <Popup
      content = {content}
      style = { style ? {backgroundColor: 'plum', color: 'white'} : {backgroundColor:'grey', color:'white'}}
      trigger={children}
    />
  )
}

export default MyPopup
