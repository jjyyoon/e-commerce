import React, { useState } from "react";
import { Dimmer, Header, Icon } from "semantic-ui-react";

const CustomDimmer = ({ icon, children }) => {
  const [active, setActive] = useState(true);

  return (
    <Dimmer active={active} onClickOutside={() => setActive(false)} page>
      <Header as="h2" icon={icon ? true : false} inverted>
        {icon ? <Icon name={icon} /> : null}
        {children}
      </Header>
    </Dimmer>
  );
};

export default CustomDimmer;
