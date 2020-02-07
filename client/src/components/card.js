import React from 'react'
import { Card } from 'semantic-ui-react'


export default class card extends React.Component{
    render(){
const items = [
  {
    header: 'Project Report - April',
    description:
      'Leverage agile frameworks to provide a robust synopsis for high level overviews.',
    meta: 'ROI: 30%',
  },
  {
    header: 'Project Report - May',
    description:
      'Bring to the table win-win survival strategies to ensure proactive domination.',
    meta: 'ROI: 34%',
  },
  {
    header: 'Project Report - June',
    description:
      'Capitalise on low hanging fruit to identify a ballpark value added activity to beta test.',
    meta: 'ROI: 27%',
  },
]

return ( 
    <div>
        <h1>card view</h1>
        <Card.Group items={items} /> 
    </div>)
    }
}