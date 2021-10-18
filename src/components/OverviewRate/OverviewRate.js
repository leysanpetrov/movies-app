import React from 'react'
import { Rate } from 'antd'
import "./OverviewRate.css"


const OverviewRate = ({ overview, makeRate, id, rememberRate }) => (
    <div>
          <section className="overview">
            <p>{overview}</p>
          </section>
        <Rate allowHalf
              className="rate"
              defaultValue={rememberRate(id)}
              count={10}
              onChange={(value) => makeRate(id, value)}
        />
    </div>
  )

export default OverviewRate


