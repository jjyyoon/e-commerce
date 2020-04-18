import React from "react";
import { Dimmer, Header, Icon } from "semantic-ui-react";

const CustomDimmer = ({ setDimmer, icon, header, children }) => (
  <Dimmer active onClickOutside={() => setDimmer(false)} page>
    <Header as="h2" icon={icon ? true : false} inverted>
      {icon ? <Icon name={icon} /> : null}
      {header}
    </Header>
    {children}
  </Dimmer>
);

export default CustomDimmer;
