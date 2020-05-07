import React from "react";
import { Dimmer, Header, Icon } from "semantic-ui-react";

const CustomDimmer = ({ onClickOutside, icon, header, children, page }) => (
  <Dimmer active onClickOutside={onClickOutside} page={page}>
    {header && (
      <Header as="h2" icon={icon ? true : false} inverted>
        {icon && <Icon name={icon} />}
        {header}
      </Header>
    )}
    {children}
  </Dimmer>
);

export default CustomDimmer;
