import React from 'react'
import Meta from '../components/Meta'

const Schedule = ({ seo }) => {
  const [ready, setReady] = React.useState(false)

  React.useEffect(() => setReady(true), [])
  return (
    <section className="schedule">
      <Meta seo={seo || {}} />
      <main>
        <div className="page__header column--medium">
          <h1 className="info__title">Schedule</h1>
        </div>
        {ready ? (
          <div
            className="schedule__calendar"
            dangerouslySetInnerHTML={{
              __html: `
<healcode-widget data-type="schedules" data-widget-partner="object" data-widget-id="3e1451730ab3" data-widget-version="1" ></healcode-widget>
`,
            }}
          />
        ) : null}
      </main>
    </section>
  )
}

export default Schedule
