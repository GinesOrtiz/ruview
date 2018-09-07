import React from "react";
import { Button } from "reactstrap";
import Icon from "./Icon";

const shareLink = name => {
  let str = "";
  const params = {
    text: `Watching ${name} on Ruview!`,
    url: window.location.href
  };

  for (let key in params) {
    if (str !== "") {
      str += "&";
    }
    str += key + "=" + encodeURIComponent(params[key]);
  }

  window.open(`https://twitter.com/intent/tweet?${str}`, "_blank");
};

const ShareButton = props => (
  <Button
    color="primary"
    onClick={() => shareLink(props.name)}
    className={props.fixed ? "fixed-share" : ""}
  >
    Share it on Twitter
  </Button>
);

export default ShareButton;
