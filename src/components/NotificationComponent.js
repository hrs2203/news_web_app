import React from 'react'

export class NotificationComponent extends React.Component {
  render() {

    if (!this.props.NotificationDetail.showMessage) {
      return <div></div>
    }

    var newsClass = "alert alert-primary text-center";
    var btnClass = "btn btn-primary";
    if (this.props.NotificationDetail.messageType === 1) {
      newsClass = "alert alert-danger text-center"
      btnClass = "btn btn-danger";
    }

    return (
      <div>
        <div className={newsClass}>
          <div className="row">
            <div className="col-10">
              {this.props.NotificationDetail.messageBody}
            </div>
            <div className="col-2">
              <button
                className={btnClass}
                onClick={() => {
                  this.props.changeMessageBody({
                    "messageType": 0,
                    "messageBody": "Welcome Message",
                    "showMessage": false
                  })
                }}>
                Close
              </button>
            </div>
          </div>
        </div>
        <hr />
      </div>
    )
  }
}