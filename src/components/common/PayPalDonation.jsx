import React from "react";
import { Alert } from "reactstrap";

class PayPalDonation extends React.Component {
  state = {
    visible: true
  };

  onDismiss = () => {
    this.setState({ visible: false });
  };

  render() {
    return (
      <Alert
        className="m-4 changelog"
        isOpen={this.state.visible}
        toggle={this.onDismiss}
      >
        <p>
          I ain't Wikipedia here during christmas but I pay premium accounts
          from WowPresents+, Outtv and Rakuten in order to bring all these
          content. <br />
          If you can, please consider a small donation to mantein this service.
          Thanks!
        </p>
        <form
          action="https://www.paypal.com/cgi-bin/webscr"
          method="post"
          target="_blank"
        >
          <input type="hidden" name="cmd" value="_s-xclick" />
          <input type="hidden" name="hosted_button_id" value="PT4Y9H3J7NFV4" />
          <input
            type="image"
            src="https://www.paypalobjects.com/en_US/i/btn/btn_donate_SM.gif"
            border="0"
            name="submit"
            alt="PayPal - The safer, easier way to pay online!"
          />
          <img
            alt=""
            border="0"
            src="https://www.paypalobjects.com/es_ES/i/scr/pixel.gif"
            width="1"
            height="1"
          />
        </form>
      </Alert>
    );
  }
}

export default PayPalDonation;
